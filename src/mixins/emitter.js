function boardcast(componentName,eventName,params){
    this.$children.forEach(child=>{
        const name = child.$options.name;
        if(name === componentName) {
            child.$emit.apply(child,[eventName].concat(params))
        }else{
            boardcast.apply(child,[componentName,eventName].concat(params))
        }
    })
}

export default {
    methods:{
        //子组件向上查找父组件事件监听
        dispatch(componentName,eventName,params){
           //父组件最后一级为根，根的parent为undefined
           let parent = this.$parent || this.$root;
           let name = parent.$options.name;

           //name === componentName 则是这一级组件发出事件，不满足则继续向上寻找
           while(parent&&(!name || name !== componentName)) {
                parent = parent.$parent;
                if(parent){
                    name = parent.$options.name;
                }
            }
            //考虑到循环最后一次是根组件
            if(parent){
                parent.$emit.apply(parent,[eventName].concat(params));
            }
        },
        Broadcast(componentName,eventName,params){
            boardcast.call(this,componentName,eventName,params)        
        }
    }
}