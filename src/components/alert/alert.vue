<template>
  <div class="alert">
    <div class="alert-main" v-for="item of notices" :key="item.name">
      <div class="alert-content">{{item.content}}</div>
    </div>
  </div>
</template>

<script>
//用作Toast的唯一标识
let seed = 0;
function getUuid(){
    return `alert_${seed++}`;
}
export default {
  name: "i-alert",
  data() {
    return {
        notices:[]
    };
  },
  methods:{
    add(notice){
        //在notice中增加一个name属性作用该通知唯一标识
        const name = getUuid();
        let _notice = Object.assign({name:name},notice);
        //浅拷贝后加入数组
        this.notices.push(_notice);

        //定时移除，单位：秒
        const duration = notice.duration;
        setTimeout(()=>{
            this.remove(name);
        },duration * 1000);
    },
    remove(name){
        const notices = this.notices;
        //在数组中移除对应这条通知
        for(let i =0;i<notices.length;i++) {
            if(notices[i].name === name){
                this.notices.splice(i,1);
                break;
            }
        }
    }
  }
};
</script>

<style scoped>
.alert{
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
}
.alert-content {
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    margin-bottom: 8px;
}
</style>