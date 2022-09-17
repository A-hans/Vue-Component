<template>
  <ul class="tree-ul">
    <li class="tree-li">
      <div class="title">
        <span class="tree-expand" @click="handleExpand">
        <!-- 判断是否展开 data.expand -->
        <span v-if="data.children && data.children.length && !data.expand"
          >+</span
        >
        <span v-if="data.children && data.children.length && data.expand"
          >-</span
        >
      </span>
      <i-checkbox
        v-if="showCheckbox"
        :value="data.checked"
        @input="handleCheck"
      />
      <span :class="{'title-active':data.active}">{{ data.name }}</span>
      </div>
      <div v-if="data.expand">
        <tree-node
          v-for="(item, index) of data.children"
          :key="index"
          :data="item"
          :show-checkbox="showCheckbox"
        ></tree-node>
      </div>
    </li>
  </ul>
</template>

<script>
import iCheckbox from "../checkBox/check-box.vue";
import { findComponentUpward } from '../../utils/assist.js'
export default {
  name: "treeNode",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return{
        tree:findComponentUpward(this,'tree'),
        active:false
    }
  },
  watch:{
    //data为上一级的子元素
    'data.children':{
        handler(data){
            //children中的子元素变化，则处理操作
            if(data){
                //Array.some会返回第一个符合条件的结果
                //!data.some(item => item.checked!)
                //console.log(this.data.name);
                const checkedAll = data.every((item)=> item.checked);
                const currentChecked = data.some(item => item.checked || item.active);
                this.$set(this.data,'checked',checkedAll);
                this.$set(this.data,'active',currentChecked);
            }
        },
        deep:true
    }
  },
  methods:{
    handleExpand(){
        this.$set(this.data,'expand',!this.data.expand);

        if(this.tree){
            this.tree.emitEvent('on-toggle-expand',this.data);
        }
    },
    handleCheck(checked){
        //传入单极节点，是否checked
        this.updateTreeDown(this.data, checked);
    },
    updateTreeDown(data,checked){
        //使用$set将当前层级checked数据转化为响应式数据
        this.$set(data,'checked',checked);
        this.$set(data,'active',checked);
        if(data.children&&data.children.length){
            data.children.forEach(item =>{
                this.updateTreeDown(item,checked);
            })
        }
    }
  },
  components: {
    iCheckbox,
  },
  mounted(){
    if(this.data.checked){
        this.updateTreeDown(this.data,true);
    }
  }
};
</script>

<style scoped>
.tree-ul,
.tree-li {
  list-style: none;
  padding-left: 10px;
}
.tree-li .title{
 display: flex;
  justify-content: center;
}
.tree-expand {
  cursor: pointer;
}
.title-active{
  font-weight: 600;
}
</style>