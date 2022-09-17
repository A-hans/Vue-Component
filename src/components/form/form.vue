<template>
  <form>
      <slot></slot>
  </form>
</template>

<script>
export default {
name:'hansForm',
props:{
    //需要校验或重置的表单数据
    model:{
        type:Object,
        default(){
            return {}
        }
    },
    //需要验证的表单规则
    rules:{
        type:Object,
        default(){
            return {}
        }
    }
},
provide(){
    return {
        form:this
    }
},
data(){
    return{
        fields:[]//收集form-item需要校验的依赖
    }
},
methods:{
      //重置所有表单数据
      resetFields() {
          this.form.forEach(field =>{
              field.resetField();
          })
    },
    validate(callback) {
        //支持promise调用
        return  new Promise((reslove,reject)=>{
            let valid = true;
            let count = 0;
            this.field.forEach(filed =>{
                filed.validate('',errors=>{
                    if(errors){
                        valid = false;
                        reject(errors);
                    }
                    if (++count === this.fields.length) {
                    // 全部完成
                        reslove(valid);
                    if (typeof callback === 'function') {
                        callback(valid);
                    }
                    }
                })
            })
        })
    }
},
created(){
    this.$on('on-form-item-add',(filed)=>{
        if(filed) this.fields.push(filed);
    });
    this.$on('on-form-item-remove',(filed)=>{
        if(filed.porp)this.fields.splice(this.fields.indexOf(filed),1);
    })
}
}
</script>

<style scoped>

</style>