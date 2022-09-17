<template>
  <button :class="['button-' + size]" :disabled="disabled" @click="handelClick">
      <slot name="icon" :user="user">{{user.name}}</slot>
      <slot>按钮</slot>
  </button>
</template>

<script>
export default {
    name:'Hans-Button',
props:{
    size:{
        type:String,
        validator:function(value){
            return ['small','default','large'].includes(value);
        },
        default:'default'
    },
    disabled:{
        type:Boolean,
        default:false
    }
},
data(){
    return{
        user:{
            name:'Lee'
        }
    }
},
inject: ['foo'],
methods:{
    handelClick(){
        console.log('child click');
        this.$emit('on-click','test');
       console.log(this.$parent.$options);
    }
},
created(){
    console.log(this.foo);
    this.$on('on-click',(text)=>{
        console.log(text);
        //alert('点击')
    })
}
//inheritAttrs:false//是否继承Html属性
}
</script>

<style scoped>
button{
    /* border:none; */
}
.button-small {
    width: 88px;
    height: 32px;
}
.button-default {
    width: 120px;
    height: 48px;
}
</style>