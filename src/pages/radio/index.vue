<template>
  <div>
    <div>
      <h2>单独选用</h2>
          <hans-radio v-model="sex" :falseValue="0" :trueValue="1">男</hans-radio>
          <h3>选中值：{{sex}}</h3>
    </div>
    <div>
      <h2>组合单选</h2>
      <hans-radiogroup v-model="model">
          <hans-radio label="1">男</hans-radio>
          <hans-radio label="2">女</hans-radio>
      </hans-radiogroup>
      <h3>选中值：{{model}}</h3>
    </div>
  </div>
</template>

<script>
import hansRadio from '../../components/radio/input-radio.vue';
import hansRadiogroup from "../../components/radio/radio-group.vue"
export default {
name:'radioPage',
data(){
  return{
    sex:false,
    model:'1'
  }
},
components:{
    hansRadio,
    hansRadiogroup
}
}
</script>

<style>

</style>