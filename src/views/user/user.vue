<template>
  <el-row :span="12" style="display: flex; justify-content: center; height: 100%">
    <!-- <el-col :span="12" style="align-self: center; text-align: center">
      <ElForms :rule="loginFormRule" ref="refDataForm" />
      <el-button type="primary" @click="toLogin" style="align-self: center"
        >登录/注册</el-button
      >
      <ElForms :rule="changeDataFormRule" ref="changeDataForm" />
      <el-button type="primary" @click="changePwd" style="align-self: center"
        >修改密码</el-button
      >
      <ElForms :rule="relationRoleConfig" ref="relationRoleForm" />
      <el-button type="primary" @click="toRelationRole" style="align-self: center"
        >关联角色</el-button
      >
    </el-col> -->
    <el-skeleton :rows="5" animated :loading="loading">
      <el-table :data="userTableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="state" label="状态" align="center">
          <template #default="scope">
            {{ formatters(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template #default>
            <el-dropdown>
              <el-button type="primary">
                操作<el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>启 用</el-dropdown-item>
                  <el-dropdown-item>禁 用</el-dropdown-item>
                  <el-dropdown-item>假删除</el-dropdown-item>
                  <el-dropdown-item>真删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-skeleton>
  </el-row>
</template>

<script lang="ts">
import ElForms from "@/components/ElForm/ElForms.vue";
import { defineComponent, Ref, ref, onMounted, reactive, toRefs, ToRefs } from "vue";
import loginHooks from "../login/login.hooks";
import { ElFormConfig, Options, Rules } from "#/form-config";
import userServiceImpl from "@/api/user/index";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  props: [],
  setup() {
    const relationRoleForm = ref();

    const {
      toLogin,
      changePwd,
      loginFormRule,
      refDataForm,
      changeDataForm,
      changeDataFormRule,
    } = loginHooks();

    const configArr: Array<ElFormConfig<Rules, Options>> = [
      {
        type: "Input",
        title: "角色id",
        field: "roleId",
        value: "",
        maxlength: 40,
        required: true,
        rules: [{ message: "请输入角色id", required: true, trigger: "blur" }],
        on: [],
      },
    ];

    const relationRoleConfig: Ref<Array<ElFormConfig<Rules, Options>>> = ref(configArr);
    const toRelationRole = () => {
      let relationRole = async (formData) => {
        let data = await userServiceImpl.relationRole(formData);
        console.log(data);
      };
      relationRoleForm.value.validate((formData) => relationRole(formData));
    };

    onMounted(async () => {
      let { results } = await userServiceImpl.queryUserPage(1, 10, {});
      userModel.userTableData = results;
      loading.value = false;
    });

    type userType = {
      userTableData: Array<object>;
    };

    let userModel: userType = reactive<userType>({
      userTableData: [],
    });


    let loading = ref(true);

    let data: ToRefs<userType> = toRefs(userModel);
    console.log(data);



    let formatters = (data): string => {
      switch (data.state) {
        case 0:
          return '启用';
        case 1:
          return '禁用';
        default:
          return '';
      }
    };

    return {
      toLogin,
      changePwd,
      loginFormRule,
      refDataForm,
      changeDataForm,
      changeDataFormRule,
      relationRoleConfig,
      toRelationRole,
      relationRoleForm,
      ...data,
      loading,
      formatters
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ElForms,
  },
});
</script>
<style lang="stylus" scoped></style>
