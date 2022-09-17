<template>
  <div>
    <label>
      <span>
      <input  v-if="group"
             type="checkbox"
             :disabled="disabled"
             :value="label"
             v-model="model"
             @change="change"
             />      
      <input v-else
              type="checkbox" 
             :disabled="disabled"
             :checked="currentValue"
              @change="change"/>
    </span>
     <slot></slot>
    </label>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter';
import { findComponentUpward } from '@/utils/assist';
export default {
  name: "hansCheckbox",
  mixins:[emitter],
  props: {
    //绑定对应checkbox
    label: {
        type: [String, Number, Boolean]
    },
    value: {
      type: [String, Boolean, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
  },
  data(){
    return{
      model:[],//对应group中的value
      group:false,//是否开启多选
      parent:null,//checkboxgroup是否存在
      currentValue:this.value
    }
  },
  methods:{
    change(event){
      if(this.disabled) {
        return false;
      }

      const checked = event.target.checked;
      this.currentValue = checked;
       
      const value = checked ? this.trueValue : this.falseValue;
       this.$emit('input', value);//实现双向绑定
       if(this.group){
          this.parent.change(this.model);
       }else{
          this.$emit('on-change', value); //自定义事件获取值
          this.dispatch('hansFormItem', 'on-form-change', value);//form组件提供校验
       }

    },
    updateModel () {
        this.currentValue = this.value === this.trueValue;
      }
  },
  watch:{
    //若父组件修改value的值，同步子组件
    value(val){
      if(val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      }else{
        throw 'Value should be trueValue or falseValue.';
      }
    }
  },
  mounted(){
    //是否拥有
    this.parent = findComponentUpward(this,'hansCheckboxGroup');
    //开启复选框
    if(this.parent) {
      this.group = true;
    }
    if(this.group){
      this.parent.updateModel(true);
    }else{
      this.updateModel();
    }
  }
};
</script>

<style scoped>
</style>