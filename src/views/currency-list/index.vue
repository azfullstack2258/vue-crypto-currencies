<template>
  <div>
    Currency list page
    <div v-if="loading">Loading</div>
    <div
      v-else
      v-for="currency in mockData"
      :key="currency.id"
      @click="handleSelectCurrency(currency.symbol)"
    >
      {{ currency.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const currency = namespace("currency");

@Component
export default class CurrencyList extends Vue {
  private mockData: Array<any> = [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC"
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: 'ETH'
    },
  ];

  @currency.State
  loading!: boolean;

  @currency.Action
  loadCurrencies!: () => Promise<void>

  handleSelectCurrency(symbol: string) {
    this.$router.push(`/${symbol}`);
  }

  mounted() {
    console.log('mounted', typeof this.loadCurrencies)
    this.loadCurrencies();
  }
}
</script>
