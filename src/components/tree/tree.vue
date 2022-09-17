<template>
  <div>
    <tree-node
      v-for="(item, index) of cloneData"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox"
    ></tree-node>
  </div>
</template>

<script>
import treeNode from "./node.vue";
import { deepCopy } from "@/utils/assist";
export default {
  name: "Tree",
  props: {
    //展示数据
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cloneData: [], //拷贝源数据
    };
  },
  methods: {
    rebuildData() {
      this.cloneData = deepCopy(this.data);
    },
     emitEvent (eventName, data) {
      //将事件传出给调用者
      this.$emit(eventName, data, this.cloneData);
    }
  },
  watch: {
    data() {
      this.rebuildData();
    },
  },
  created() {
    this.rebuildData();
  },
  components: {
    treeNode,
  },
};
</script>

<style>
</style>