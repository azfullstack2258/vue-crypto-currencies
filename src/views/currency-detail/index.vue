<template>
  <div>
    Currency detail page
    <div>id: {{ symbol }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const currency = namespace("currency");

@Component
export default class CurrencyDetail extends Vue {
  public symbol = "";

  @currency.Action
  loadCurrency!: (symbol: string) => Promise<void>

  @currency.Action
  loadCurrencyHistorical!: (symbol: string) => Promise<void>

  mounted() {
    this.symbol = this.$route.params.symbol;
    this.loadCurrency(this.symbol);
    this.loadCurrencyHistorical(this.symbol);
  }
}
</script>
