<template>
  <Container>
    <div class="title">Currency List</div>
    <div v-if="loading" class="loading-container">Loading</div>
    <template v-else>
      <div v-if="error" class="error-container">{{error}}</div>
      <div v-else class="table-container">
        <Table
          :columns="columns"
          :data="currencies"
          track-key="symbol"
          @click-row="handleSelectCurrency"
        />
      </div>
    </template>
  </Container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Table from "@/components/Table.vue";
import Container from "@/components/Container.vue";
import { ICurrency, ITableColumn } from "@/types";
import { TABLE_COLUMNS } from "./constants";

const currency = namespace("currency");

@Component({
  components: {
    Container,
    Table,
  }
})
export default class CurrencyList extends Vue {
  private columns: Array<ITableColumn> = TABLE_COLUMNS;

  @currency.State
  loading!: boolean;

  @currency.State
  error!: string;

  @currency.State
  currencies!: Array<ICurrency>

  @currency.Action
  loadCurrencies!: () => Promise<void>

  handleSelectCurrency(symbol: string) {
    this.$router.push(`/${symbol}`);
  }

  mounted() {
    this.loadCurrencies();
  }
}
</script>

<style lang="scss" src="./styles.scss" scoped>
</style>