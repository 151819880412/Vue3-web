<template>
  <el-row>
    <SearchForm :formConfig="queryFormConfig" ref="searchForm">
      <template v-slot:searchBtn>
        <el-button type="primary">插槽</el-button>
      </template>
    </SearchForm>

    <MainTable
      :searchFn="roleServiceImpl.rolePage"
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
              <el-dropdown-item @click="editState(scopeData.row, 'changeState')">{{
                ["禁用", "启用"][scopeData.row.state]
              }}</el-dropdown-item>
              <el-dropdown-item @click="editState(scopeData.row, 'changeDelFlag')"
                >假删除</el-dropdown-item
              >
              <el-dropdown-item @click="editState(scopeData.row, 'delUser')"
                >真删除</el-dropdown-item
              >
              <el-dropdown-item @click="roleAuthorization(scopeData.row)"
                >角色授权</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </MainTable>

    <DialogMask ref="dialogMask">
      <template #dialogMaskSlot>
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        />
      </template>
    </DialogMask>
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
import roleServiceImpl from "@/api/role/index";
import SearchForm from "@/components/SearchForm/SearchForm.vue";
import DialogMask from "@/components/DialogMask/DialogMask.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { tableConfigType } from "@/components/MainTable/MainTable";
import { UserQueryModel } from "../../api/user/model/userModel";
import { RoleAddModel, RolePageModel } from "@/api/role/service/model/roleModel";

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

    const queryArr: Array<FormInterface<Rules, Options>> = [
      {
        type: "input",
        title: "角色名",
        field: "roleName",
        value: "",
        maxlength: 40,
        required: false,
        rules: [{ message: "请输入角色名", required: false, trigger: "blur" }],
        col: {
          span: 12,
        },
        on: [],
        props: {
          clearable: true,
        },
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
        props: {
          clearable: true,
        },
      },
    ];

    const dialogArr = [
      {
        type: "input",
        title: "角色名",
        field: "roleName",
        value: "",
        maxlength: 40,
        required: true,
        rules: [{ message: "请输入角色名", required: true, trigger: "blur" }],
        col: {
          span: 12,
        },
        on: [],
      },
    ];

    const queryFormConfig: Array<FormInterface<Rules, Options>> = reactive(queryArr);

    const dialogArrConfig: Array<FormInterface<Rules, Options>> = reactive(dialogArr);

    type userType = {
      tableData: Array<object>;
      treeData: Array<object>;
      searchFormData: UserQueryModel;
    };

    let userModel: userType = reactive<userType>({
      tableData: [],
      treeData: [],
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
    const submitDialog = async (formData: RoleAddModel): Promise<boolean> => {
      let { message } = await roleServiceImpl.addRole(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    const dialogMask = ref<InstanceType<typeof DialogMask>>();

    const tableData: tableConfigType<RolePageModel> = {
      attrs: {
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
          label: "角色名",
          prop: "roleName",
          showOverflowTooltip: true,
        },
        {
          label: "状态",
          prop: "state",
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

    const editState = (row: RolePageModel, fnStr: string) => {
      ElMessageBox.confirm("是否确认操作?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { message } = await roleServiceImpl[fnStr]({ roleId: row.roleId });
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

    const roleAuthorization = async (row: RolePageModel) => {
      let data = await roleServiceImpl.queryRoleById({ roleId: row.roleId });
      // const res = await loginServiceImpl.queryRoleMenuList(row.roleId);
      // userModel.treeData = res.data;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dialogMask.value!.dialogFormVisible = true;
      console.log(data)
      // dialogMask?.value?.initConfig(dialogArrConfig, data.data);
    };

    const defaultProps = {
      children: "children",
      label: "name",
    };

    return {
      toLogin,
      changePwd,
      loginFormRule,
      refDataForm,
      changeDataForm,
      changeDataFormRule,
      relationRoleForm,
      ...data,
      formatters,
      queryFormConfig,
      submitSearch,
      openDialog,
      dialogMask,
      dialogArrConfig,
      submitDialog,
      roleServiceImpl,
      tableData,
      editState,
      roleAuthorization,
      defaultProps,
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
