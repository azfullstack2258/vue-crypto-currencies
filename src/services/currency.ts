import axios from "axios";
import {
  MIN_API_CRYPTOCOMPARE_API_KEY,
  MIN_API_CRYPTOCOMPARE_API_URL,
  COINMARKETCAP_API_URL,
  COINMARKETCAP_API_KEY,
} from "@/config";

export const fetchPopularCurrencies = async () => {
  return axios.get(
    `${COINMARKETCAP_API_URL}/v1/cryptocurrency/listings/latest`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
      },
    }
  );
};

export const fetchCurrencyInfo = async (symbol: string) => {
  return axios.get(
    `${COINMARKETCAP_API_URL}/v1/cryptocurrency/info?symbol=${symbol}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
      },
    }
  );
};

export const fetchCurrencyHistorical = async (symbol: string) => {
  return axios.get(
    `${MIN_API_CRYPTOCOMPARE_API_URL}/data/blockchain/histo/day?fsym=${symbol}`,
    {
      headers: {
        Authorization: `Apikey ${MIN_API_CRYPTOCOMPARE_API_KEY}`,
      },
    }
  );
};
