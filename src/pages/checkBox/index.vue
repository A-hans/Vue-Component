<template>
  <div>
    <checkbox-group v-model="checkedName">
    <check-box v-for="(item,index) of model" 
    :key="index"
    :label="item"
    >
    {{item}}
    </check-box>
    </checkbox-group>
    <h3>选项展示值:{{checkedName}}</h3>
    <div>
      <check-box v-model="checkModel.checked" 
                :trueValue="checkModel.trueVal" 
                :falseValue='checkModel.falseVal'>单选</check-box>
                <h3>单选值展示：{{checkModel.checked}}</h3>
    </div>
  </div>
</template>

<script>
import checkBox from '../../components/checkBox/check-box.vue'
import checkboxGroup from '@/components/checkBox/checkbox-group.vue'
export default {
name:'page-checkBox',
data(){
return{
  model:['jack','lucy','hans'],
  checkedName:[],
  checkModel:{
    checked:0,
    trueVal:1,
    falseVal:0
  }
}
},
components:{
  checkBox,
  checkboxGroup
}
}
</script>

<style scoped>

</style>