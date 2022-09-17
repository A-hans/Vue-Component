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
            <template v-if="'render' in col">
              <Render
                :row="row"
                :column="col"
                :index="rowIndex"
                :render="col.render"
              />
            </template>

            <!-- 此处渲染slot-function -->
            <template v-else-if="'slot' in col">
                 <slot-scoped :row="row" :column="col" :index="rowIndex"></slot-scoped>
            </template>
            <template v-else>{{ row[col.key] }}</template>
          </td>
          <!-- col中的render是否有值 -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Render from "./render.js";
import slotScoped from './slot.js'
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
  provide(){
    return {
        tableRoot:this
    }
  },
  components: {
    Render,
    slotScoped
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