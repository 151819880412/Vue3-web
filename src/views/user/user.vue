<template>
  <el-row>
    <SearchForm :formConfig="queryFormConfig" ref="searchForm">
      <template v-slot:searchBtn>
        <el-button type="primary">插槽</el-button>
      </template>
    </SearchForm>

    <MainTable :searchFn="userServiceImpl.queryUserPage" :searchData="searchFormData" :tableConfig="tableData">
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
              <el-dropdown-item @click="editState(scopeData.row, 'changeState')">{{ ['禁用', '启用'][scopeData.row.state] }}
              </el-dropdown-item>
              <el-dropdown-item @click="editState(scopeData.row, 'changeDelFlag')">假删除</el-dropdown-item>
              <el-dropdown-item @click="editState(scopeData.row, 'delUser')">真删除</el-dropdown-item>
              <el-dropdown-item @click="relationRole(scopeData.row)">关联角色</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </MainTable>

    <DialogMask ref="dialogMask">
      <template v-slot:dialogMaskSlot>
        <el-tree :props="{
          label: 'roleName',
          children: 'children',
        }" show-checkbox :data="treeData" @check="handleCheckChange" highlight-current default-expand-all
          node-key="roleId" :default-checked-keys="defaultCheckedKeys" />
      </template>

    </DialogMask>
  </el-row>
</template>

<script lang="ts">
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
import { UserAddModel, UserEditorModel, UserPageModel } from "@/api/user/model/userModel";
import { ElMessage, ElMessageBox } from "element-plus";
import { tableConfigType } from "@/components/MainTable/MainTable";
import { UserQueryModel } from "../../api/user/model/userModel";
import { RolePageModel } from "@/api/role/service/model/roleModel";

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

    const dialogMask = ref<InstanceType<typeof DialogMask>>();

    const {
      toLogin,
      changePwd,
      loginFormRule,
      refDataForm,
      changeDataForm,
      changeDataFormRule,
    } = loginHooks();

    interface Tree<RolePageModel> {
      roleName: string;
      children: Tree<RolePageModel>[];
      roleId: string;
    }

    interface userType {
      searchFormData: UserQueryModel;
      treeData: Array<Tree<RolePageModel>>,
      defaultCheckedKeys: Array<string>;
      tableData: tableConfigType<UserPageModel>;
      dialogFormConfig: Array<FormInterface<Rules, Options>>;
      queryFormConfig: Array<FormInterface<Rules, Options>>;
    }

    const initState = (): userType => {
      return {
        tableData: {
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
        },
        dialogFormConfig: [
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
          // {
          //   type: "select",
          //   title: "关联用户",
          //   field: "roles",
          //   value: [],
          //   maxlength: 40,
          //   required: true,
          //   rules: [{ message: "请输入密码", required: true, trigger: "blur" }],
          //   col: {
          //     span: 12,
          //   },
          //   on: [],
          //   props: {
          //     multiple: true,
          //   },
          //   options: [
          //     { label: '1', value: 1 },
          //     { label: '3', value: 3 },
          //   ],
          //   queryOptionsFn: {
          //     url: '/role/page/1/10',
          //     data: '{"state":0}',
          //     label: "roleName",
          //     value: "roleId"
          //   }
          // },
        ],
        queryFormConfig: [
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
            props: {
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
            props: {
              clearable: true,
            }
          },
        ],
        searchFormData: {},
        treeData: [
          {
            roleName: "全部角色",
            children: [],
            roleId: "1"
          }
        ],
        defaultCheckedKeys: [],
      };
    };

    const userModel: userType = reactive(initState());
    // const userModel = reactive<userType>(initState());

    let userData: ToRefs<userType> = toRefs(userModel);

    /**
     * 状态转文字
     * @date 2022-08-18
     * @param {any} data:{state:number;}
     * @returns {any}
     */
    let formatters = (data: { state: number; }): string => {
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
    const openDialog = async (): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await dialogMask?.value?.initConfig(userModel.dialogFormConfig);
      dialogMask.value?.openDialog('Add');
    };

    /**
     * 新增提交
     * @date 2022-08-05
     * @param {any} formData
     * @returns {any}
     */
    const submitDialogAdd = async (formData: UserAddModel): Promise<boolean> => {
      let { message } = await userServiceImpl.addUser(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    /**
     * 修改状态
     * @date 2022-08-18
     * @param {any} row:UserPageModel
     * @param {any} fnStr:string
     * @returns {any}
     */
    const editState = (row: UserPageModel, fnStr: string) => {
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

    /**
     * 关联角色
     * @date 2022-08-18
     * @param {any} row:UserPageModel
     * @returns {any}
     */
    const relationRole = async (row: UserPageModel) => {
      console.log(111);
      const { data } = await userServiceImpl.queryUserById({ userId: row.userId });
      userModel.defaultCheckedKeys = [];
      await dialogMask?.value?.initConfig(userModel.dialogFormConfig, data);
      userModel.treeData[0].children = data.roles;
      data.roles.forEach(item => {
        if (item.isCheck) {
          userModel.defaultCheckedKeys.push(item.roleId);
        }
      });
      dialogMask.value?.openDialog('Editor');
    };

    /**
     * 编辑提交
     * @date 2022-08-18
     * @param {any} formData:UserAddModel
     * @returns {any}
     */
    const submitDialogEditor = async (formData: UserAddModel): Promise<boolean> => {
      const obj: UserEditorModel = { ...formData, roles: userModel.defaultCheckedKeys };
      let { message } = await userServiceImpl.editorUser(obj);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    const handleCheckChange = (
      data: Tree<RolePageModel>,
      row: { checkedKeys: Array<string>, checkedNodes: Array<RolePageModel>, halfCheckedKeys: Array<string | undefined>, halfCheckedNodes: Array<string | undefined>; },
    ) => {
      console.log(data, row);
      userModel.defaultCheckedKeys = row.checkedKeys.filter(item => item !== '1');
    };

    return {
      toLogin,
      changePwd,
      loginFormRule,
      refDataForm,
      changeDataForm,
      changeDataFormRule,
      relationRoleForm,
      ...userData,
      formatters,
      submitSearch,
      openDialog,
      dialogMask,
      submitDialogAdd,
      userServiceImpl,
      editState,
      relationRole,
      handleCheckChange,
      submitDialogEditor,
    };
  },
  components: {
    SearchForm,
  },
});
</script>
<style lang="stylus" scoped></style>
