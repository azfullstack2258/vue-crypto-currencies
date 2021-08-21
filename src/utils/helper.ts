import { ICurrency } from "@/types"

export const transformCurrencyInfo: (data: any) => ICurrency = (data: any) => {
  return {
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    slug: data.slug,
    description: data.description,
    dateAdded: data['date_added'],
    tags: data.tags
  };
};
