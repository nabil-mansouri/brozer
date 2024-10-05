import 'get-random-values'
import { Connection, GetProgramAccountsFilter, PublicKey } from '@solana/web3.js'
import { sha256 } from '@ethersproject/sha2'
import { deserializeUnchecked, Schema } from 'borsh'
import { getMint, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Buffer } from 'buffer'

//https://github.com/Bonfida/sns-sdk/tree/de0116ec7af0c834b9a341e9b0f6142aba4c4da4/js/src
export enum Record {
  IPFS = 'IPFS',
  ARWV = 'ARWV',
  SOL = 'SOL',
  ETH = 'ETH',
  BTC = 'BTC',
  LTC = 'LTC',
  DOGE = 'DOGE',
  Email = 'email',
  Url = 'url',
  Discord = 'discord',
  Github = 'github',
  Reddit = 'reddit',
  Twitter = 'twitter',
  Telegram = 'telegram',
  Pic = 'pic',
  SHDW = 'SHDW',
  POINT = 'POINT',
  BSC = 'BSC',
  Injective = 'INJECT'
}
export const getIpfsRecord = async (connection: Connection, domain: string) => {
  return await getRecord(connection, domain, Record.IPFS)
}
export const getRecord = async (connection: Connection, domain: string, record: Record) => {
  const pubkey = getRecordKeySync(domain, record)
  let { registry } = await NameRegistryState.retrieve(connection, pubkey)

  // Remove trailling 0s
  const idx = record === Record.SOL ? SOL_RECORD_SIG_LEN : registry.data?.indexOf(0x00)
  registry.data = registry.data?.slice(0, idx)

  return registry
}
export const getRecordKeySync = (domain: string, record: Record) => {
  const { pubkey } = getDomainKeySync(record + '.' + domain, true)
  return pubkey
}
export const getDomainKeySync = (domain: string, record = false) => {
  if (domain.endsWith('.sol')) {
    domain = domain.slice(0, -4)
  }
  const splitted = domain.split('.')
  if (splitted.length === 2) {
    const prefix = Buffer.from([record ? 1 : 0]).toString()
    const sub = prefix.concat(splitted[0])
    const { pubkey: parentKey } = _deriveSync(splitted[1])
    const result = _deriveSync(sub, parentKey)
    return { ...result, isSub: true, parent: parentKey }
  } else if (splitted.length === 3 && record) {
    // Parent key
    const { pubkey: parentKey } = _deriveSync(splitted[2])
    // Sub domain
    const { pubkey: subKey } = _deriveSync('\0'.concat(splitted[1]), parentKey)
    // Sub record
    const recordPrefix = Buffer.from([1]).toString()
    const result = _deriveSync(recordPrefix.concat(splitted[0]), subKey)
    return { ...result, isSub: true, parent: parentKey, isSubRecord: true }
  } else if (splitted.length >= 3) {
    throw new Error('Invalid derivation input')
  }
  const result = _deriveSync(domain, ROOT_DOMAIN_ACCOUNT)
  return { ...result, isSub: false, parent: undefined }
}

const _deriveSync = (name: string, parent: PublicKey = ROOT_DOMAIN_ACCOUNT) => {
  let hashed = getHashedNameSync(name)
  let pubkey = getNameAccountKeySync(hashed, undefined, parent)
  return { pubkey, hashed }
}

export const getHashedNameSync = (name: string): Buffer => {
  const input = HASH_PREFIX + name
  const str = sha256(Buffer.from(input, 'utf8')).slice(2)
  return Buffer.from(str, 'hex')
}

export const getNameAccountKeySync = (
  hashed_name: Buffer,
  nameClass?: PublicKey,
  nameParent?: PublicKey
): PublicKey => {
  const seeds = [hashed_name]
  if (nameClass) {
    seeds.push(nameClass.toBuffer())
  } else {
    seeds.push(Buffer.alloc(32))
  }
  if (nameParent) {
    seeds.push(nameParent.toBuffer())
  } else {
    seeds.push(Buffer.alloc(32))
  }
  const [nameAccountKey] = PublicKey.findProgramAddressSync(seeds, NAME_PROGRAM_ID)
  return nameAccountKey
}

/**
 * The Solana Name Service program ID
 */
export const NAME_PROGRAM_ID = new PublicKey('namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX')

/**
 * Hash prefix used to derive domain name addresses
 */
export const HASH_PREFIX = 'SPL Name Service'

/**
 * The `.sol` TLD
 */
export const ROOT_DOMAIN_ACCOUNT = new PublicKey('58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx')

/**
 * The Registry program ID
 */
export const REGISTER_PROGRAM_ID = new PublicKey('jCebN34bUfdeUYJT13J1yG16XWQpt5PDx6Mse9GUqhR')

/**
 * The FIDA Pyth price feed
 */
export const PYTH_FIDA_PRICE_ACC = new PublicKey('ETp9eKXVv1dWwHSpsXRUuXHmw24PwRkttCGVgpZEY9zF')

/**
 * The FIDA buy and burn address
 */
export const BONFIDA_FIDA_BNB = new PublicKey('AUoZ3YAhV3b2rZeEH93UMZHXUZcTramBvb4d9YEVySkc')

/**
 * The reverse look up class
 */
export const REVERSE_LOOKUP_CLASS = new PublicKey('33m47vH6Eav6jr5Ry86XjhRft2jRBLDnDgPSHoquXi2Z')

/**
 * The `.twitter` TLD authority
 */
export const TWITTER_VERIFICATION_AUTHORITY = new PublicKey(
  'FvPH7PrVrLGKPfqaf3xJodFTjZriqrAXXLTVWEorTFBi'
)

/**
 * The `.twitter` TLD
 */
export const TWITTER_ROOT_PARENT_REGISTRY_KEY = new PublicKey(
  '4YcexoW3r78zz16J2aqmukBLRwGq6rAvWzJpkYAXqebv'
)

/**
 * The length of the SOL record signature
 */
export const SOL_RECORD_SIG_LEN = 96

export const BONFIDA_USDC_BNB = new PublicKey('DmSyHDSM9eSLyvoLsPvDr5fRRFZ7Bfr3h3ULvWpgQaq7')

export class NameRegistryState {
  static HEADER_LEN = 96
  parentName: PublicKey
  owner: PublicKey
  class: PublicKey
  data: Buffer | undefined

  static schema: Schema = new Map([
    [
      NameRegistryState,
      {
        kind: 'struct',
        fields: [
          ['parentName', [32]],
          ['owner', [32]],
          ['class', [32]]
        ]
      }
    ]
  ])
  constructor(obj: { parentName: Uint8Array; owner: Uint8Array; class: Uint8Array }) {
    this.parentName = new PublicKey(obj.parentName)
    this.owner = new PublicKey(obj.owner)
    this.class = new PublicKey(obj.class)
  }

  public static async retrieve(connection: Connection, nameAccountKey: PublicKey) {
    const nameAccount = await connection.getAccountInfo(nameAccountKey)
    if (!nameAccount) {
      throw new Error('Invalid name account provided')
    }

    let res: NameRegistryState = deserializeUnchecked(
      this.schema,
      NameRegistryState,
      nameAccount.data
    )

    res.data = nameAccount.data?.slice(this.HEADER_LEN)

    const nftOwner = await retrieveNftOwner(connection, nameAccountKey)

    return { registry: res, nftOwner }
  }

  static async _retrieveBatch(connection: Connection, nameAccountKeys: PublicKey[]) {
    const nameAccounts = await connection.getMultipleAccountsInfo(nameAccountKeys)
    const fn = (data: Buffer | undefined) => {
      if (!data) return undefined
      const res: NameRegistryState = deserializeUnchecked(this.schema, NameRegistryState, data)
      res.data = data?.slice(this.HEADER_LEN)
      return res
    }
    return nameAccounts.map((e) => fn(e?.data))
  }

  public static async retrieveBatch(connection: Connection, nameAccountKeys: PublicKey[]) {
    let result: (NameRegistryState | undefined)[] = []
    const keys = [...nameAccountKeys]
    while (keys.length > 0) {
      result.push(...(await this._retrieveBatch(connection, keys.splice(0, 100))))
    }
    return result
  }
}

export const MINT_PREFIX = Buffer.from('tokenized_name')
export const NAME_TOKENIZER_ID = new PublicKey('nftD3vbNkNqfj2Sd3HZwbpw4BxxKWr4AjGb9X38JeZk')
export const retrieveNftOwner = async (connection: Connection, nameAccount: PublicKey) => {
  try {
    const [mint] = await PublicKey.findProgramAddress(
      [MINT_PREFIX, nameAccount.toBuffer()],
      NAME_TOKENIZER_ID
    )

    const mintInfo = await getMint(connection, mint)
    if (mintInfo.supply.toString() === '0') {
      return undefined
    }

    const filters: GetProgramAccountsFilter[] = [
      {
        memcmp: {
          offset: 0,
          bytes: mint.toBase58()
        }
      },
      {
        memcmp: {
          offset: 64,
          bytes: '2'
        }
      },
      { dataSize: 165 }
    ]

    const result = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
      filters
    })

    if (result.length != 1) {
      return undefined
    }

    return new PublicKey(result[0].account.data.slice(32, 64))
  } catch {
    return undefined
  }
}
//https://github.com/solana-labs/solana-web3.js/blob/ecdf2a7/packages/library-legacy/src/connection.ts#L2976