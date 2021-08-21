import axiosInstance from "./AxiosConfig";
import {
  MIN_API_CRYPTOCOMPARE_API_KEY,
  MIN_API_CRYPTOCOMPARE_API_URL,
  COINMARKETCAP_API_URL,
  COINMARKETCAP_API_KEY
} from "@/config";

export const fetchPopularCurrencies = () => {
  axiosInstance.get(`${COINMARKETCAP_API_URL}/v1/cryptocurrency/listings/latest`, {
    headers: {
      'X-CMS_PRO_API_KEY': COINMARKETCAP_API_KEY
    }
  });
}

export const fetchCurrencyHistorical = (symbol: string) => {
  axiosInstance.get(`${MIN_API_CRYPTOCOMPARE_API_URL}/data/blockchain/histo/day?fsym=${symbol}`, {
    headers: {
      'Authorization': `Apikey ${MIN_API_CRYPTOCOMPARE_API_KEY}`
    }
  });
}
