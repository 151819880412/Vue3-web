<template>
  <el-row :span="12" style="display: flex;justify-content: center;height:100%">
    <el-col :span="12" style="align-self: center;text-align: center;">
      <ElForms :rule="searchFormRule" ref="refDataForm" />
      <el-button type="primary" @click="toLogin" style="align-self: center">登录</el-button>
    </el-col>
  </el-row>

</template>

<script lang="ts">
import { ElFormConfig, Options, Rules } from "#/form-config";
import ElForms from "@/components/ElForm/ElForms.vue";

import { defineComponent, Ref, ref } from "vue";
import loginServiceImpl from '../../api/login/index';

// // 定义了全局方法之后需要扩充类型
// declare module "@vue/runtime-core" {
//   interface ComponentCustomProperties {
//     $Loading: any;
//   }
// }
export default defineComponent({
  name: "login",
  props: [],
  setup() {
        // let { proxy } = getCurrentInstance()!;
    // 调用插件方法
    // proxy!.$Loading.showLoading();

    const refDataForm = ref();
    let configArr: Array<ElFormConfig<Rules, Options>> = [
      {
        type: "Input",
        title: "用户名",
        field: "username",
        value: "",
        maxlength: 20,
        required: true,
        rules: [{ message: "请输入用户名", required: true, trigger: "blur" }],
        on: [],
      },
      {
        type: "Input",
        title: "密码",
        field: "password",
        value: "",
        maxlength: 20,
        required: true,
        rules: [{ message: "请输入密码", required: true, trigger: "blur" }],
        on: [],
        props: {
          "show-password": true
        }
      },
    ];

    const searchFormRule: Ref<Array<ElFormConfig<Rules, Options>>> = ref(configArr);

    // methods
    function toLogin() {
      refDataForm.value.validate((formData)=>login(formData))
    }

    let login = (formData)=>{
      console.log(formData)
      loginServiceImpl.login(formData)
    }


    return {
      toLogin,
      searchFormRule,
      refDataForm,
    };
  },
  components: {
    ElForms,
  },
});
</script>
<style lang="stylus" scoped></style>
