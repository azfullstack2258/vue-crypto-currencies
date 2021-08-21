import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { ICurrency } from '@/types';
import Vue from 'vue';

@Module({ namespaced: true, name: 'currency' })
class Currency extends VuexModule {
  public currencies: Array<ICurrency> = []
  public loading: boolean = false
  public error: string = ''
  public currentCurrencySymbol: string | undefined
  public currentCurrencyHistorical: { loading: boolean, error: string, data: Array<any> } = { loading: false, error: '', data: []}

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
  public setCurrentCurrencyHistorical({ key, value} : {key: string, value: any}) {
    Vue.set(this.currentCurrencyHistorical, key, value);
  }
  // ----- End Mutations -----

  // ----- Start Actions -----
  @Action
  public loadCurrencies(): void {
    this.context.commit('setError', '');
    this.context.commit('setLoadingStatus', true);

    const currencies: ICurrency[] = [];
    // @todo: fetch popular currencies
    // handle any exceptions and set error state

    this.context.commit('setCurrencies', currencies);

    this.context.commit('setLoadingStatus', false);
  }

  @Action
  public loadCurrencyHistorical(symbol: string): void {
    this.context.commit('setCurrentCurrencyHistorical', { key: 'loading', value: true });
    this.context.commit('setCurrentCurrencyHistorical', { key: 'error', value: '' });

    const historicalData: Array<any> = [];
    // @todo: fetch current currency historical data
    // handle any exceptions and set error state

    this.context.commit('setCurrentCurrencyHistorical', { key: 'data', value: historicalData });
    this.context.commit('setCurrentCurrencyHistorical', { key: 'loading', value: false });
  }
}

export default Currency;
