import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { ICurrency } from "@/types";
import Vue from "vue";

import {
  fetchPopularCurrencies,
  fetchCurrencyHistorical,
  fetchCurrencyInfo
} from "@/services/currency";

@Module({ namespaced: true })
class Currency extends VuexModule {
  public currencies: Array<ICurrency> = [];
  public loading = false;
  public error = "";
  public currentCurrencySymbol = '';
  public currentCurrency: {
    loading: boolean;
    error: string;
    data: ICurrency | null
  } = { loading: false, error: "", data: null };
  public currentCurrencyHistorical: {
    loading: boolean;
    error: string;
    data: any;
  } = { loading: false, error: "", data: null };

  // ----- Start Mutations -----
  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.loading = status;
  }

  @Mutation
  public setError(err: string): void {
    this.error = err;
  }

  @Mutation
  public setCurrencies(payload: ICurrency[]): void {
    this.currencies = payload;
  }

  @Mutation
  public setCurrentCurrencyHistorical({
    key,
    value,
  }: {
    key: string;
    value: any;
  }) {
    Vue.set(this.currentCurrencyHistorical, key, value);
  }

  @Mutation
  public setCurrentCurrency({
    key,
    value,
  }: {
    key: string;
    value: any;
  }) {
    Vue.set(this.currentCurrency, key, value);
  }
  // ----- End Mutations -----

  // ----- Start Actions -----
  @Action({ rawError: true })
  public async loadCurrencies(): Promise<void> {
    this.context.commit("setError", "");
    this.context.commit("setLoadingStatus", true);

    let currencies: ICurrency[] = [];
    try {
      const res = await fetchPopularCurrencies();
      // @todo: transform api response => currencies
      currencies = res.data.data as ICurrency[];
    } catch (e) {
      this.context.commit("setError", e.toString());
    }

    this.context.commit("setCurrencies", currencies);

    this.context.commit("setLoadingStatus", false);
  }

  @Action({ rawError: true })
  async loadCurrency(symbol: string): Promise<void> {
    this.context.commit("setCurrentCurrency", {
      key: "loading",
      value: true,
    });
    this.context.commit("setCurrentCurrency", {
      key: "error",
      value: '',
    });

    try {
      const res = await fetchCurrencyInfo(symbol);
      this.context.commit("setCurrentCurrency", {
        key: "data",
        value: res.data.data[symbol]
      });
    } catch (e) {
      this.context.commit("setCurrentCurrency", {
        key: "error",
        value: e && e.toString() || "Something went wrong.",
      });
    }

    this.context.commit("setCurrentCurrency", {
      key: "loading",
      value: false,
    });
  }

  @Action
  public async loadCurrencyHistorical(symbol: string): Promise<void> {
    this.context.commit("setCurrentCurrencyHistorical", {
      key: "loading",
      value: true,
    });
    this.context.commit("setCurrentCurrencyHistorical", {
      key: "error",
      value: "",
    });

    let historicalData;
    try {
      const res = await fetchCurrencyHistorical(symbol);
      // @todo: transform api response => historicalData
      historicalData = res.data.Data;
    } catch (e) {
      this.context.commit("setCurrentCurrencyHistorical", {
        key: "error",
        value: e && e.toString() || "Something went wrong.",
      });
    }

    this.context.commit("setCurrentCurrencyHistorical", {
      key: "data",
      value: historicalData,
    });
    this.context.commit("setCurrentCurrencyHistorical", {
      key: "loading",
      value: false,
    });
  }
}

export default Currency;
