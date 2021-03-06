export interface ICurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  dateAdded: string;
  tags: Array<string>;
  description: string;
}

export interface ICurrencyMoreInfo extends ICurrency {
  cmcRank: number;
  numMarketPairs: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  lastUpdated: string;
}

export interface ITableColumn {
  field: string;
  label: string;
  width?: number;
  class?: string;
  render?: (data: any) => any;
}
