import {webcrypto} from "crypto";
import { getIpfsRecord as getIpfsRecordSns } from './sns_utils'
import { NavigationUtilsCommon } from '../common/navigation_utils'
import { clusterApiUrl, Connection } from '@solana/web3.js'

export { NavigationUtilsCommon }
export class NavigationUtils extends NavigationUtilsCommon{
  connection = new Connection(clusterApiUrl('mainnet-beta'))
  constructor() {
    super()
  }
  async resolveSns(url: string): Promise<string> {
    global.crypto = webcrypto as any
    const urlObject = this.safeUrl(url)
    const name = urlObject.hostname
    const domains = await getIpfsRecordSns(this.connection, name)
    const hash = domains.data!.toString()
    return `https://ipfs.io/ipfs/${hash}`
  }
}
export const navigationUtils = new NavigationUtils()
