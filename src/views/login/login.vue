<template>
  <el-row :span="12" style="display: flex; justify-content: center; height: 100%">
    <el-col :span="12" style="align-self: center; text-align: center">
      <ElForms :formConfig= "loginFormRule" ref="refDataForm" />
      <el-button type="primary" @click="toLogin" style="align-self: center"
        >登录/注册</el-button
      >
      <!-- <el-button type="primary" @click="test" style="align-self: center">token测试</el-button> -->
      <ElForms :formConfig= "changeDataFormRule" ref="changeDataForm" />
      <el-button type="primary" @click="changePwd" style="align-self: center"
        >修改密码</el-button
      >
    </el-col>
  </el-row>
</template>

<script lang="ts">
import ElForms from "@/components/ElForm/ElForms.vue";
import { defineComponent } from "vue";
import loginHooks from "./login.hooks";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  props: [],
  setup() {
    // let { proxy } = getCurrentInstance()!;
    // 调用插件方法
    // proxy!.$Loading.showLoading();

    const {
      toLogin,
      changePwd,
      loginFormRule,
      refDataForm,
      changeDataForm,
      changeDataFormRule,
    } = loginHooks();

    return {
      toLogin,
      changePwd,
      loginFormRule,
      refDataForm,
      changeDataForm,
      changeDataFormRule,
    };
  },
  components: {
    ElForms,
  },
});
</script>
<style lang="stylus" scoped></style>
