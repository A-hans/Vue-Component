<template>
  <div id="app">
    <!-- html属性会传入组件元素的最外层 -->
    <!-- <HansButton  id="btn" class="btn-primary" @click.native="handelClick" @on-click="childClick" size="small">
      <template v-slot:icon="slotProps">
        <span>{{ slotProps.user.name }}</span>
      </template>
      确定
    </HansButton> -->
    <!-- <hans-form :model="model">
    </hans-form> -->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <div style="margin-top:20px">
      <button @click="btnClick1">Toast1</button>
    <button @click="btnClick2">Toast2</button>
    </div>
  </div>
</template>

<script>
//import HansButton from "./components/button/button.vue";
// import HansForm from "./components/form/form.vue";
// import HansFormItem from "./components/form/form-item.vue"
export default {
  name: "App",
  data() {
    return {
      name: "Lee",
      model:{
        
      }
    };
  },
  provide: {
    foo: this
},
  methods:{
    handelClick(){
      console.log('main click');
    },
    childClick(){
      
    },
    btnClick1(){
      this.$Alert.info({
        content:'测试消息1',
    })
    },
    btnClick2(){
   this.$Alert.info({
        content:'测试消息2',
    })
    }
  },
  components: {
    //HansButton,
    // HansForm,
    // HansFormItem
  },
  created(){
    console.log('parent',this.$parent.$parent);
    console.log('root',this.$root);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
