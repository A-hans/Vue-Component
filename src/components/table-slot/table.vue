<template>
  <div class="table-wrap">
    <table class="table">
      <thead>
        <tr>
          <th v-for="col of columns" :key="col.key">{{ col.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) of data" :key="rowIndex">
          <td v-for="col of columns" :key="col.key">
            <!-- col中的render是否有值 -->
            <template v-if="'render' in col">
              <Render
                :row="row"
                :column="col"
                :index="rowIndex"
                :render="col.render"
              />
            </template>
            <!-- 添加slot配置 -->
            <template v-else-if="'slot' in col">
            <!-- 通过配置的slotname 动态渲染具名插槽 -->
              <slot :row="row" :column="col" :index="rowIndex" :name="col.slot"></slot>
            </template>
            <template v-else>{{ row[col.key] }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Render from "./render.js";
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Render,
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #e9e9e9;
}
table th {
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table td,
table th {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
</style>