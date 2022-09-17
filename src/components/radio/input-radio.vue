<template>
  <div class="i-radio-wrap">
      <label>
        <span>
          <!-- 组合单选 -->
           <input type="radio" 
                  v-if="group"
                  :value="label"
                  v-model="model"
                  :disabled="disabled"
                  @change="handelChecked"
              />
          <!-- 单选 -->
           <input 
               v-else
               type="radio" 
               v-model="currentValue"
               :disabled="disabled"
               @change="handelChecked" />
        </span>
       
        <slot></slot>
      </label>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter';
import { findComponentUpward } from '@/utils/assist';
export default {
  name: "i-radio",
  mixins:[emitter],
  props: {
    disabled:{
      type:Boolean,
      default:false
    },
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: [String,Number]
    },
    trueValue:{
      type: [String,Number,Boolean],
      default:true
    },
    falseValue:{
      type:  [String,Number,Boolean],
      default:false
    }
  },
  data() {
    return {
      group:false,//是否开启组合
      model:'',//当前绑定值
      currentValue: this.value,
    };
  },
  watch:{
    value(val){
      if(typeof val ==='boolean'){
       (this.currentValue!==val)&&(this.currentValue = val);
      }else{
        throw 'value is no Boolean'
      }
    }
  },
  methods:{
    handelChecked(e){
      if(this.disabled){
        return;
      }
      const checked = e.target.checked;
      this.currentValue = checked;
      const value = this.currentValue ? this.trueValue : this.falseValue;
      this.$emit('input',checked);

      if(this.group){
         this.parent.change(this.model);
      }else{
      this.$emit('on-change',value);
      //兼容表单校验
      this.dispatch('hansFormItem','on-form-change', value);
      }
    }
  },
  mounted(){
    this.parent = findComponentUpward(this,'i-radioGroup');
    if(this.parent) {
      this.group = true;
      this.parent.updateModel(true);
    }
  }
};
</script>

<style scoped>
</style>