<template>
  <div>
    <label v-if="label" :class="{ 'hans-form-label-required': isRequired }">{{
      label
    }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="hans-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";
import emitter from "../../mixins/emitter.js";
export default {
  name: "hansFormItem",
  mixins: [emitter],
  props: {
    //表单的标签文本
    label: {
      type: String,
      default: "",
    },
    //对应Form里面model里的字段，用于校验或重置时访问表单组件绑定的数据（key）
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isRequired: false, // 是否为必填
      validateState: "", //校验状态
      validateMessage: "", //校验不通过时提示信息
    };
  },
  computed: {
    //获取当前input校验的值
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  inject: ["form"],
  methods: {
    //监听input自身校验
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
          //every默认每项为true，返回不符合条件的false则停止遍历
        rules.every((rule) => {
            //强制第一条写require:true ?
          this.isRequired = rule.required;
        });
        //备选方案
        /* 
        some方法遍历返回第一个为ture的值，返回true
        */
        //this.isRequired = rules.some((rule) => rule.required);
      }
      this.$on("on-form-blur", this.onFieldBlur);
      this.$on("on-form-change", this.onFieldChange);
    },
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    //过滤当前item所使用到的规则进行校验
    getFilteredRule(trigger) {
      //trigger为校验类型
      const rules = this.getRules;
      //!rule.trigger 不传也记录起来，默认做空校验
      return rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback) {
      let rules = this.getFilteredRule(trigger);
      //若无规则，则不校验
      if (!rules || rules.length === true) {
        return true;
      }
      //设置校验状态为校验中
      this.validateState = "validating";

      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      // key:rules
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);

      let model = {};
      //存储当前需要校验的值
      //model中对应key与rules中对应key进行匹配校验
      model[this.prop] = this.fieldValue;
      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        //此处回调函数给form组件做调用
        callback(this.validateMessage);
      });
    },
    //重置表单
    resetField() {
        this.validateState = '';
        this.validateMessage = '';

        //还原默认值
        this.form.model[this.prop] = this.initialValue;
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    },
  },
  mounted() {
    if (this.porp) {
      //传递实例出去，给form组件存储，在父组件中调用校验方法
      this.dispath("hansForm", "on-form-item-add", this);
      // 设置初始值，以便在重置时恢复默认值
      // 此处不需要在实例中定义属性，因为不需要响应式追踪变化
      this.initialValue = this.fieldValue;

      this.setRules();
    }
  },
  beforeDestroy() {
    //组件销毁,通知父组件删除当前子集依赖
    this.dispatch("hansForm", "on-form-item-remove", this);
  },
};
</script>

<style scoped>
.hans-form-item-label-required:before {
  content: "*";
  color: red;
}
.hans-form-item-message {
  color: red;
}
</style>