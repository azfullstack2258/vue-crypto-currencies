<template>
  <div>
    Currency detail page
    <div>id: {{ symbol }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CurrencyDetail extends Vue {
  public symbol = "";

  mounted() {
    this.symbol = this.$route.params.symbol;
  }
}
</script>
