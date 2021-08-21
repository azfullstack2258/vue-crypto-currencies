export interface ICurrencyMeta {
  id: number,
  name: string,
  symbol: string,
  slug: string,
  dateAdded: string,
  tags: Array<string>,
  description: string
}

export interface ICurrency extends ICurrencyMeta {
  cmcRank: number,
  numMarketPairs: number,
  circulatingSupply: number,
  totalSupply: number,
  maxSupply: number,
  lastUpdated: string
}
