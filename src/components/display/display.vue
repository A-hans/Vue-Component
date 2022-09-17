<template>
  <div ref="display"></div>
</template>

<script>
import Vue from 'vue';
import randomStr from "../../utils/random_str.js";
export default {
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      component: null, //创建的组件
      id: randomStr(),
      html: "",
      css: "",
      js: "",
    };
  },
  methods: {
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex); //return Array,不匹配返回null

      if (!openingTag) return "";
      else openingTag = openingTag[0];
      /* <template> >从这一位index开始 
           lastIndexOf </template> <到这一位为index结束
           只截取内容 
        */
      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      );
    },
    splitCode() {
      // /export default/替换成return的作用在于，通过Function构造器创建函数并返回一个对象
      const script = this.getSource(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = this.getSource(this.code, "style");
      //防止模板没有注入根节点报错
      const template =
        '<div id="app">' + this.getSource(this.code, "template") + "</div>";

      this.js = script;
      this.css = style;
      this.html = template;
    },
    renderCode() {
      //获取分割好的code
      this.splitCode();
      if (this.html !== "" && this.js !== "") {
        //通过Function构造器获得Vue Option
        const componentParseToStr = new Function(this.js)();
        //组合Option
        componentParseToStr.template = this.html;
        //通过extend创建组件
        const Component = Vue.extend(componentParseToStr);//构造函数 VueComponent
        this.component = new Component().$mount();//VueComponent 组件对象
        //挂载组件
        this.$refs.display.appendChild(this.component.$el);
        if (this.css !== "") {
          const style = document.createElement("style");
          style.type = "text/css";
          style.id = this.id;
          style.innerHTML = this.css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
      }
    },
    destroyCode() {
      //组件销毁移除实例，style
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target); //head中移除style

      if (this.component) {
        //移除DOM
        this.$refs.display.removeChild(this.component.$el);
        //销毁实例
        this.component.$destroy();
        this.component = null;
      }
    },
  },
  watch:{
    code(){
        //当code发生变化，则需要重载
        this.destroyCode();
        this.renderCode();
    }
  },
  beforeDestroy () {
    this.destroyCode();
  },
  mounted() {
    this.renderCode();
  },
};
</script>

<style>
</style>