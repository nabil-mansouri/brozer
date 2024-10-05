import { resolveEns, ENSRecords } from '../common/ens_utils'
import { Resolution } from '@unstoppabledomains/resolution'

export class NavigationUtilsCommon {
  public BROW_SCHEME = 'brow'
  public NOT_FOUND = `${this.BROW_SCHEME}://notfound`
  public DNS_PROBE_POSSIBLE = `${this.BROW_SCHEME}://dnsprobepossible`
  resolution = new Resolution()
  unstoppableDomains = [
    'crypto',
    'nft',
    'x',
    'wallet',
    'polygon',
    'dao',
    '888',
    'zil',
    'blockchain',
    'bitcoin'
  ]
  ensCache: Record<string, ENSRecords> = {}
  ensMutex: Record<string, Promise<ENSRecords>> = {}
  public async resolveUnstoppable(address: string): Promise<string> {
    // brad.zil (ok), nick.crypto (notfound), brad.crypto (ok)
    const ipfsHash = await this.resolution.ipfsHash(address)
    const url = `https://ipfs.io/ipfs/${ipfsHash}`
    return url
  }
  public isUnstoppable(url: string): boolean {
    if (this.isUrl(url)) {
      const urlObject = this.safeUrl(url)
      const host = urlObject.hostname
      const sp = host.split('.')
      if (sp.length > 0) {
        const ext = sp[sp.length - 1]
        return this.unstoppableDomains.includes(ext)
      }
      return false
    }
    return false
  }
  public isSolAddress(url: string): boolean {
    if (this.isUrl(url)) {
      const urlObject = this.safeUrl(url)
      const host = urlObject.hostname
      return host.endsWith('.sol')
    }
    return false
  }
  public isEthAddress(url: string): boolean {
    if (this.isUrl(url)) {
      const urlObject = this.safeUrl(url)
      const host = urlObject.hostname
      return host.endsWith('.eth')
    }
    return false
  }
  public isIpfs(url: string): boolean {
    if (this.isUrl(url)) {
      const urlObject = this.safeUrl(url)
      return urlObject.protocol === 'ipfs:'
    }
    return false
  }
  public resolveIpfs(href: string, prefix = 'ipfs'): string {
    const url = `https://ipfs.io/ipfs/${href.slice(`${prefix}://`.length)}`
    return url
  }
  public isIpns(url: string): boolean {
    if (this.isUrl(url)) {
      const urlObject = this.safeUrl(url)
      return urlObject.protocol === 'ipns:'
    }
    return false
  }
  resolveIpns(href: string, prefix = 'ipfs'): string {
    const url = `https://ipfs.io/ipns/${href.slice(`${prefix}://`.length)}`
    return url
  }
  public async resolveEns(
    url: string
  ): Promise<ENSRecords & { walletUrl: string; webSiteUrl?: string }> {
    //prepare name
    const urlObject = this.safeUrl(url)
    const name = urlObject.hostname
    const generate = (): ENSRecords & { walletUrl: string; webSiteUrl?: string } => {
      const entry = this.ensCache[name]
      const walletUrl = `https://etherscan.io/address/${entry.address}`
      return {
        ...entry,
        walletUrl,
        webSiteUrl: entry.hash
      }
    }
    //prepare eth lib
    // wait mutex
    const mutex = this.ensMutex[name]
    mutex && (await mutex)
    // get from cache
    if (this.ensCache[name] !== undefined) {
      return generate()
    }
    // create mutex
    const temp = resolveEns(name)
    this.ensMutex[name] = temp
    const address = await temp
    this.ensCache[name] = address
    // delete mutex
    delete this.ensMutex[name]
    return generate()
  }
  public safeUrl(url: string): URL {
    return new URL(this.httpsIfNeeded(url))
  }

  public httpsIfNeeded(url: string): string {
    // add https if missing
    if (!/^.*?:\/\//.test(url)) {
      url = `https://${url}`
    }
    return url
  }

  public isUrl(url: string): boolean {
    try {
      this.safeUrl(url)
      return true
    } catch (e) {
      return false
    }
  }

  public googleSearch(href: string): string {
    const url = new URL('https://www.google.com/search')
    try {
      const oldUrl = this.safeUrl(href)
      url.searchParams.set('q', oldUrl.host)
    } catch (e) {
      url.searchParams.set('q', href.replaceAll('http://', '').replaceAll('https://', ''))
    }
    return url.toString()
  }

  public schemeRelativeToDomain(url: string): string {
    const urlObject = this.safeUrl(url)
    const host = urlObject.hostname
    if (host.endsWith('.eth')) {
      return `eth://${urlObject.toString().slice(`${urlObject.protocol}//`.length)}`
    } else {
      return this.httpsIfNeeded(url)
    }
  }

  public prepareUrlForNavigation(url: string): string {
    if (this.isUrl(url)) {
      return this.httpsIfNeeded(url)
    } else {
      return this.googleSearch(url)
    }
  }
}
export const navigationUtilsCommon = new NavigationUtilsCommon()
