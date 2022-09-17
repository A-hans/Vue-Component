<template>
  <div class="hans-checkgroup-wrap">
      <slot></slot>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter';
import { findComponentsDownward } from '@/utils/assist';
export default {
name:'hansCheckboxGroup',
mixins:[emitter],
props: {
      value: {
        type: Array,
        default () {
          return [];
        }
      }
},
data(){
    return{
        currentValue: this.value,
        childrens: []
    }
},
methods:{
    updateModel(update){
        this.childrens = findComponentsDownward(this, 'hansCheckbox');//获取所有的checkbox
        if (this.childrens.length) {
            const { value } = this;
            this.childrens.forEach(child => {
            child.model = value;//赋值当前选中值
            
            //父级动态修改数据时，判断是否匹配多选
            if (update) {
              child.currentValue = value.indexOf(child.label) >= 0;
              child.group = true;
            }
          });
        }
    },
    change (data) {
        this.currentValue = data;
        this.$emit('input', data);//进行双向绑定值更新
        this.$emit('on-change', data);
        this.dispatch('hansFormItem', 'on-form-change', data);
    }
},
watch:{
    value(){
        this.updateModel(true);
    }
},
mounted(){
    this.updateModel(true);
}
}
</script>

<style scoped>
.hans-checkgroup-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>