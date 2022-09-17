<template>
  <div>
      <input type="text"
            :value="currentValue"
            @input="handleInput"
            @blur="handleBlur">
  </div>
</template>

<script>
import emitter from '../../mixins/emitter.js';
export default {
  name: "hans-input",
  mixins:[emitter],
  props:{
      value:{
          type:String,
          default:''
      }
  },
  data() {
    return {
        currentValue:''
    };
  },
  watch:{
      value:{
          handler: function(value){
              this.currentValue = value;
          }
      }
  },
  methods:{
      handleInput(e) {
          const value = e.target.value;
          this.currentValue = value;
          this.$emit('input', value);
          this.dispatch('hansFormItem', 'on-form-change', value);
      },
      handleBlur() {
          this.dispatch('hansFormItem','on-form-blur',this.currentValue);
      }
  }
};
</script>

<style scoped>
</style>