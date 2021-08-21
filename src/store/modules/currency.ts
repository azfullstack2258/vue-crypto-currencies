import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { ICurrency } from "@/types";
import Vue from "vue";

import {
  fetchPopularCurrencies,
  fetchCurrencyHistorical,
} from "@/services/currency";

@Module({ namespaced: true, name: "currency" })
class Currency extends VuexModule {
  public currencies: Array<ICurrency> = [];
  public loading = false;
  public error = "";
  public currentCurrencySymbol: string | undefined;
  public currentCurrencyHistorical: {
    loading: boolean;
    error: string;
    data: Array<any>;
  } = { loading: false, error: "", data: [] };

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
  public setCurrentCurrency(payload: string): void {
    this.currentCurrencySymbol = payload;
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
  // ----- End Mutations -----

  // ----- Start Actions -----
  @Action
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

    let historicalData: Array<any> = [];
    try {
      const res = await fetchCurrencyHistorical(symbol);
      // @todo: transform api response => historicalData
      historicalData = res.data.data as Array<any>;
    } catch (e) {
      this.context.commit("setError", e.toString());
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
