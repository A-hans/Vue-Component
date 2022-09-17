<template>
  <div>
    <h1>页面</h1>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue.common.js'
import input from '../../components/input/hans-input.vue'
export default {
name:'pageAlertTest',
data(){
    return{

    }
},
methods:{
    createInstance(){
        const params = {
            template:`
                <div class='hans-toast'>
                    <h3>{{message}}</h3>
                </div>
            `,
            data(){
                return {
                    message:'Hello'
                }
            }
        }
        return Vue.extend(params);
    },
    renderInstance(component,props){
        //通过render函数渲染一个.vue组件
        return new Vue({
            render(h){
                return h(component,{
                    props
                })
            }
        })
    }
},
created(){
    //返回一个组件实例(构造函数)
    this.instance = this.createInstance();
    const component = new this.instance().$mount();
    console.log(component.$el);
    document.body.appendChild(component.$el);

    //同render函数渲染组件
    this.renderInstance = this.renderInstance(input,{      
    })
    //获取body元素，直接通过mount挂载
    // const body = document.getElementsByTagName('body');
    const renderComponent = this.renderInstance.$mount();
    document.body.appendChild(renderComponent.$el);
    console.log(renderComponent)
    //需要手动调用组件销毁
    console.log(renderComponent.$children[0]);
    setTimeout(()=>{
        console.log('销毁')
        renderComponent.$children[0].$destroy();
        document.getElementsByTagName('input')[0].remove();
    },3000)
}
}
</script>

<style scoped>

</style>