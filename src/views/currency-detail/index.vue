<template>
  <Container>
    <div class="title">
      <div class="back-btn" @click="goBack">Back</div>
      Currency Detail
    </div>
    <div v-if="loading" class="loading-container">Loading</div>
    <div v-if="error" class="error-container">{{ error }}</div>
    <template v-if="currencyData">
      <div class="content">
        <div class="row">
          <div class="label">ID:</div>
          <div class="flex-grow">{{ currencyData.id }}</div>
        </div>
        <div class="row">
          <div class="label">Name:</div>
          <div class="flex-grow">{{ currencyData.name }}</div>
        </div>
        <div class="row">
          <div class="label">Symbol:</div>
          <div class="flex-grow">{{ currencyData.symbol }}</div>
        </div>
        <div class="row">
          <div class="label">Slug:</div>
          <div class="flex-grow">{{ currencyData.slug }}</div>
        </div>
        <div class="row">
          <div class="label">Date added:</div>
          <div class="flex-grow">{{ currencyData.dateAdded }}</div>
        </div>
        <div class="row">
          <div class="label">Tags:</div>
          <div class="flex-grow d-flex flex-wrap">
            <div v-for="tag in currencyData.tags" :key="tag" class="tag">{{ tag }}</div>
          </div>
        </div>
        <div class="row">
          <div class="label">Description:</div>
          <div class="flex-grow">{{ currencyData.description }}</div>
        </div>
        <div class="row flex-wrap">
          <div class="label">History:</div>
          <div class="flex-grow chart-container">
            <Chart />
          </div>
        </div>
      </div>
    </template>
  </Container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import moment from "moment";
import Container from "@/components/Container.vue";
import Chart from "@/components/Chart.vue";
import { ICurrency } from "@/types";

const currency = namespace("currency");

@Component({
  components: {
    Container,
    Chart,
  },
  filters: {
    datetime(str: string) {
      return moment(str).format("YYYY-MM-DD hh:mm:ss");
    },
  },
})
export default class CurrencyDetail extends Vue {
  public symbol = "";

  @currency.State
  currentCurrency!: {
    loading: boolean;
    error: string;
    data: ICurrency | null;
  };

  @currency.State
  currentCurrencyHistorical!: {
    loading: boolean;
    error: string;
    data: any;
  };

  @currency.Action
  loadCurrency!: (symbol: string) => Promise<void>;

  @currency.Action
  loadCurrencyHistorical!: (symbol: string) => Promise<void>;

  get currencyData(): ICurrency | null {
    return this.currentCurrency?.data;
  }

  get loading(): boolean {
    return this.currentCurrency?.loading;
  }

  get error(): string {
    return this.currentCurrency?.error;
  }

  get currencyHistoricalData() {
    return this.currentCurrencyHistorical?.data;
  }

  get historyLoading(): boolean {
    return this.currentCurrencyHistorical?.loading;
  }

  get historyError(): string {
    return this.currentCurrencyHistorical?.error;
  }

  mounted() {
    this.symbol = this.$route.params.symbol;
    this.loadCurrency(this.symbol);
    this.loadCurrencyHistorical(this.symbol);
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" src="./styles.scss" scoped />
