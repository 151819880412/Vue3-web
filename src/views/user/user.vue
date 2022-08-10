<template>
  <el-row>
    <SearchForm :formConfig="queryFormConfig" ref="searchForm">
      <template v-slot:searchBtn>
        <el-button type="primary">插槽</el-button>
      </template>
    </SearchForm>

    <MainTable
      :searchFn="userServiceImpl.queryUserPage"
      :searchData="searchFormData"
      :tableConfig="tableData"
    >
      <template v-slot:tableBtn>
        <el-button type="primary">插槽</el-button>
      </template>
      <template v-slot:statusTxtSlot="{ scopeData }">
        <div>
          {{ formatters(scopeData.row) }}
        </div>
      </template>
      <template v-slot:handleSlot="{ scopeData }">
        <el-dropdown>
          <el-button type="primary">
            操作<el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="editState(scopeData.row,'changeState')">{{['禁用','启用'][scopeData.row.state]}}</el-dropdown-item>
              <el-dropdown-item @click="editState(scopeData.row,'changeDelFlag')">假删除</el-dropdown-item>
              <el-dropdown-item @click="editState(scopeData.row,'delUser')">真删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </MainTable>

    <DialogMask ref="dialogMask"></DialogMask>
  </el-row>
</template>

<script lang="ts">
import ElForms from "@/components/ElForm/ElForms.vue";
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  ToRefs,
  provide,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import loginHooks from "../login/login.hooks";
import { FormInterface, Options, Rules } from "#/form-config";
import userServiceImpl from "@/api/user/index";
import SearchForm from "@/components/SearchForm/SearchForm.vue";
import DialogMask from "@/components/DialogMask/DialogMask.vue";
import { UserAddModel, UserPageModel } from "@/api/user/model/userModel";
import { ElMessage, ElMessageBox } from "element-plus";
import { tableConfigType } from "@/components/MainTable/MainTable";
import { UserQueryModel } from "../../api/user/model/userModel";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  props: [],
  setup() {
    const ctx = getCurrentInstance() as ComponentInternalInstance;
    provide("Pctx", ctx);

    // let {proxy}  = getCurrentInstance() as ComponentInternalInstance
    // provide('Pctx', proxy);

    const relationRoleForm = ref();

    const {
      toLogin,
      changePwd,
      loginFormRule,
      refDataForm,
      changeDataForm,
      changeDataFormRule,
    } = loginHooks();

    const configArr: Array<FormInterface<Rules, Options>> = [
      {
        type: "Input",
        title: "角色id",
        field: "roleId",
        value: "",
        maxlength: 40,
        required: true,
        rules: [{ message: "请输入角色id", required: true, trigger: "blur" }],
        on: [],
        col: {
          span: 12,
        },
      },
    ];

    const queryArr: Array<FormInterface<Rules, Options>> = [
      {
        type: "input",
        title: "用户名",
        field: "username",
        value: "",
        maxlength: 40,
        required: false,
        rules: [{ message: "请输入用户名", required: false, trigger: "blur" }],
        col: {
          span: 12,
        },
        on: [],
        props:{
          clearable: true,
        }
      },
      {
        type: "select",
        title: "状态",
        field: "state",
        value: "",
        maxlength: 40,
        required: false,
        rules: [{ message: "请选择状态", required: false, trigger: "blur" }],
        col: {
          span: 12,
        },
        on: [],
        options: [
          {
            label: "启用",
            value: 0,
          },
          {
            label: "禁用",
            value: 1,
          },
        ],
        props:{
          clearable: true,
        }
      },
    ];

    const dialogArr = [
      {
        type: "input",
        title: "用户名",
        field: "username",
        value: "",
        maxlength: 40,
        required: true,
        rules: [{ message: "请输入用户名", required: true, trigger: "blur" }],
        col: {
          span: 12,
        },
        on: [],
      },
      {
        type: "input",
        title: "密码",
        field: "password",
        value: "",
        maxlength: 40,
        required: true,
        rules: [{ message: "请输入密码", required: true, trigger: "blur" }],
        col: {
          span: 12,
        },
        on: [],
      },
    ];

    const relationRoleConfig: Array<FormInterface<Rules, Options>> = reactive(configArr);

    const queryFormConfig: Array<FormInterface<Rules, Options>> = reactive(queryArr);

    const dialogArrConfig: Array<FormInterface<Rules, Options>> = reactive(dialogArr);

    const toRelationRole = () => {
      let relationRole = async (formData: any) => {
        let { data } = await userServiceImpl.relationRole(formData);
        console.log(data);
      };
      relationRoleForm.value.validate((formData: any) => relationRole(formData));
    };

    type userType = {
      tableData: Array<object>;
      searchFormData: UserQueryModel;
    };

    let userModel: userType = reactive<userType>({
      tableData: [],
      searchFormData: {},
    });

    let data: ToRefs<userType> = toRefs(userModel);

    let formatters = (data: { state: number }): string => {
      switch (data.state) {
        case 0:
          return "启用";
        case 1:
          return "禁用";
        default:
          return "";
      }
    };

    /**
     * 搜索提交
     * @date 2022-08-04
     * @param {UserQueryModel} searchFormData
     * @returns {Promise<void>}
     */
    const submitSearch = (searchFormData: UserQueryModel): void => {
      userModel.searchFormData = searchFormData;
    };

    /**
     * 打开弹窗
     * @date 2022-08-05
     * @returns {void}
     */
    const openDialog = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dialogMask.value!.dialogFormVisible = true;
      dialogMask?.value?.initConfig(dialogArrConfig);
    };

    /**
     * 新增提交
     * @date 2022-08-05
     * @param {any} formData
     * @returns {any}
     */
    const submitDialog = async (formData: UserAddModel): Promise<boolean> => {
      let { message } = await userServiceImpl.addUser(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    const dialogMask = ref<InstanceType<typeof DialogMask>>();

    const tableData: tableConfigType<UserPageModel> = {
      attrs: {
        rowClassName: function ({ rowIndex }) {
          return rowIndex % 2 == 0 ? "selfClass" : "dubbleClass";
        },
        border: true,
      },
      data: [],
      columns: [
        {
          type: "selection",
        },
        {
          type: "index",
          label: "序号",
        },
        {
          label: "用户名",
          // width: 500,
          prop: "username",
          showOverflowTooltip: true,
        },
        {
          label: "状态",
          // width: 120,
          prop: "status",
          slot: "statusTxtSlot",
          align: "center",
        },
        {
          label: "操作",
          width: 200,
          slot: "handleSlot",
          align: "center",
        },
      ],
    };

    const editState = (row: UserPageModel,fnStr:string) => {
      ElMessageBox.confirm("是否确认操作?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { message } = await userServiceImpl[fnStr]({ userId: row.userId });
          ElMessage({
            message,
            type: "success",
          });
          userModel.searchFormData = JSON.parse(JSON.stringify(userModel.searchFormData));
        })
        .catch((e) => {
          console.log(e);
        });
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
      formatters,
      queryFormConfig,
      submitSearch,
      openDialog,
      dialogMask,
      dialogArrConfig,
      submitDialog,
      userServiceImpl,
      tableData,
      editState,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ElForms,
    // eslint-disable-next-line vue/no-unused-components
    SearchForm,
  },
});
</script>
<style lang="stylus" scoped></style>
