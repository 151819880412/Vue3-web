<template>
  <div>
    <el-row :span="12" style="display: flex; justify-content: center; height: 100%">
      <el-col :span="12" style="align-self: center; text-align: center">
        <ElForms :rule="addRoleConfig" ref="refDataForm" />
        <el-button type="primary" @click="toAddRole" style="align-self: center"
          >新增角色</el-button
        >
        <!-- <el-button type="primary" @click="test" style="align-self: center">token测试</el-button> -->
        <ElForms :rule="changeDataFormRule" ref="changeDataForm" />
        <el-button type="primary" @click="changePwd" style="align-self: center"
          >修改密码</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import ElForms from "@/components/ElForm/ElForms.vue";
import loginServiceImpl from "@/api/login";
import { defineComponent, Ref, ref } from "vue";
import { ElFormConfig, Options, Rules } from "#/form-config";
import roleServiceImpl from "@/api/role/index";
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "role",
  props: [],
  setup() {
    const refDataForm = ref();
    const configArr: Array<ElFormConfig<Rules, Options>> = [
      {
        type: "Input",
        title: "角色名",
        field: "roleName",
        value: "",
        maxlength: 20,
        required: true,
        rules: [{ message: "请输入角色名", required: true, trigger: "blur" }],
        on: [],
      },
    ];

    const addRoleConfig: Ref<Array<ElFormConfig<Rules, Options>>> = ref(configArr);

    const changeDataForm = ref();
    const configArr2: Array<ElFormConfig<Rules, Options>> = [
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
        title: "旧密码",
        field: "password",
        value: "",
        maxlength: 20,
        required: true,
        rules: [{ message: "请输入旧密码", required: true, trigger: "blur" }],
        on: [],
        props: {
          "show-password": true,
        },
      },
      {
        type: "Input",
        title: "新密码",
        field: "newPassword",
        value: "",
        maxlength: 20,
        required: true,
        rules: [{ message: "请输入新密码", required: true, trigger: "blur" }],
        on: [],
        props: {
          "show-password": true,
        },
      },
    ];

    const changeDataFormRule: Ref<Array<ElFormConfig<Rules, Options>>> = ref(configArr2);

    // methods
    const toAddRole = () => {
      const addRole = async (formData) => {
        let data = await roleServiceImpl.addRole(formData)
        console.log(data)
      }
      refDataForm.value.validate((formData) => addRole(formData));
    };

    const changePwd = () => {
      const reset = async (formData) => {
        const data = await loginServiceImpl.changePwd(formData);
        console.log(data);
      };
      changeDataForm.value.validate((formData) => reset(formData));
    };
  console.log(addRoleConfig)
    return {
      toAddRole,
      changePwd,
      addRoleConfig,
      refDataForm,
      changeDataForm,
      changeDataFormRule,
    };
  },
  components:{
    ElForms
  }
});
</script>
<style lang="stylus" scoped></style>
