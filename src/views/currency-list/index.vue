<template>
  <div>
    Currency list page
    <div
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

  handleSelectCurrency(symbol: string) {
    this.$router.push(`/${symbol}`);
  }
}
</script>
