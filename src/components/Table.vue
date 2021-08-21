<template>
  <div class="table">
    <div class="table-header">
      <div class="table__row">
        <div
          v-for="column in columns"
          :key="column.field"
          class="table__cell"
          :style="{
            width: `${column.width || 100}px`,
            flexGrow: column.width ? 0 : 1,
            textAlign: column.align || 'left',
          }"
        >
          {{column.label}}
        </div>
      </div>
    </div>
    <div class="table-body">
      <div v-for="item in data" :key="item[trackKey]" class="table__row selectable" @click="selectRow(item[trackKey])">
        <div
          v-for="column in columns"
          :key="column.field"
          class="table__cell"
          :style="{
            width: `${column.width || 100}px`,
            flexGrow: column.width ? 0 : 1,
            textAlign: column.align || 'left'
          }"
        >
          {{typeof column.render === 'function' ? column.render(item[column.field]) : item[column.field]}}
        </div>        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ITableColumn } from "@/types";

@Component
export default class Table extends Vue {
  @Prop() readonly columns!: ITableColumn[]
  @Prop() readonly data!: Array<any>
  @Prop({ required: true, default: 'id', type: String }) readonly trackKey!: string

  @Emit("click-row")
  selectRow(id: string) {
    return id;
  }
}
</script>

<style lang="scss" scoped>
.table {
  min-width: 775px;
  overflow: auto;

  &-header {
    height: 50px;
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  &__row {
    display: flex;
    height: 30px;
    display: flex;
    align-items: center;

    &.selectable:hover {
      background: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }
  }
  &__cell {
    height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>