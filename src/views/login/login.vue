<template>
  <el-row :span="12" style="display: flex;justify-content: center;height:100%">
    <el-col :span="12" style="align-self: center;text-align: center;">
      <ElForms :rule="searchFormRule" ref="refDataForm" />
        <el-input
    v-model="input"
    type="password"
    placeholder="Please input password"
    show-password
  />
      <el-button type="primary" @click="toLogin" style="align-self: center">登录</el-button>

      <el-button type="primary" @click="test" style="align-self: center">token测试</el-button>

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
  // eslint-disable-next-line vue/multi-word-component-names
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

    let test = async ()=>{
      let data = await loginServiceImpl.test({username:1,password:1})
      console.log(111,data)

    }

    let login = async (formData)=>{
      
      let data = await loginServiceImpl.login(formData)
      localStorage.setItem('token',data.accessToken)
      console.log(data)
    }

  let input = 1
    return {
      input,
      test,
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
