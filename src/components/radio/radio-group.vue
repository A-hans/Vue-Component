<template>
  <div class="i-radiogroup-wrap">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from "@/utils/assist";
import emitter from "@/mixins/emitter";
export default {
  name: "i-radioGroup",
  mixins:[emitter],
  props: {
    value: {
      type: [String,Number],
      default: "",
    },
  },
  data() {
    return {
      //通过value进行转发
      currentValue: this.value,
      children: [],
    };
  },
  methods: {
    updateModel(update){
      //获取所有子集的radio
      this.children = findComponentsDownward(this,'i-radio');
      if(this.children.length) {
        //v-model所绑定的值
        const { value } = this;
        this.children.forEach(child => {
          child.model = value; // 赋值子组件，v-model绑定进行判断激活
          //动态增加radio
           if (update) {
              child.currentValue = value.indexOf(child.label) >= 0;
              child.group = true;
            }
        });
      }
    },
    change(value){
      this.currentValue = value;
      this.$emit('input', value);
      this.$emit('on-change',value);
      this.dispatch('hansFormItem', 'on-form-change', value);
    }
  },
  watch:{
    value(){
      this.updateModel(true);
    }
  },
  mounted(){
    //初始化激活
    this.updateModel(true);
  }
};
</script>

<style scoped>
.i-radiogroup-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>