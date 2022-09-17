<template>
  <div>
    <display :code="code"/>
  </div>
</template>

<script>
import display from '../../components/display/display.vue';
import code from './test.js';
export default {
name:'displayPage',
data(){
    return {
        code:code
    }
},
components:{
    display
},
mounted(){
    console.log(display)
}
}
</script>

<style scoped>

</style>