import Alert from './alert.vue';
import Vue from 'vue';
//Alert会被Vue-loader编译为实例对象
console.log('Alert',Alert);
//创建实例(args作用在于扩展)
Alert.newInstance = properties => {
    const props = properties || {};
    
    //Instance是一个Vue实例
    const Instance = new Vue({
        data:props,
        render(h){
            return h(Alert,{
                props:props
            })
        }
    })
    console.log(Instance);
    
    //创建Vue组件
    const component = Instance.$mount();
    //挂载DOM
    document.body.appendChild(component.$el);
    //获取组件实例
    const alert = Instance.$children[0];
    //暴露API
    return {
        add(noticeProps){
            alert.add(noticeProps);
        },
        remove(name){
            alert.remove(name);
        }
    }
}

export default Alert;