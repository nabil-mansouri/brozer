/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ethers } from 'ethers'

export type ENSRecords = { address?: string; hash?: string | undefined }

export async function resolveEns(name: string): Promise<ENSRecords> {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth', 1)
  const resolver = await provider.getResolver(name)
  const address = await resolver?.getAddress()
  const hash = await resolver?.getContentHash()
  return { hash, address }
}
