<template>
  <el-row>
    <SearchForm :formConfig="queryFormConfig" :formData="formData" ref="searchForm">
      <template v-slot:searchBtn>
        <el-button type="primary">插槽</el-button>
      </template>
    </SearchForm>

    <el-upload :http-request="beforeUpload" class="upload-demo" :headers="{
      Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiIxIiwicGFzc3dvcmQiOiIxIiwidXNlcklkIjoiN2I1NTM2YmItNDU0MC00MmM2LTk1NTctNzU0OTlkZjQyNzU5Iiwic3RhdGUiOjAsImRlbEZsYWciOjAsImNyZWF0ZWRUaW1lIjoiMjAyMi0wOS0yMSAxNTo1OToyNiIsInVwZGF0ZWRUaW1lIjoiMjAyMi0xMC0xMyAxNjoxNzoxOSIsImlhdCI6MTY2NTY0OTA0NSwiZXhwIjoxNjY1NzM1NDQ1fQ.j-Tk5J-ZgilozfWjW4YtsLmi-53TCcUE8leV1HLILr0',
      refreshToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiIxIiwicGFzc3dvcmQiOiIxIiwidXNlcklkIjoiN2I1NTM2YmItNDU0MC00MmM2LTk1NTctNzU0OTlkZjQyNzU5Iiwic3RhdGUiOjAsImRlbEZsYWciOjAsImNyZWF0ZWRUaW1lIjoiMjAyMi0wOS0yMSAxNTo1OToyNiIsInVwZGF0ZWRUaW1lIjoiMjAyMi0xMC0xMyAxNjoxNzoxOSIsImlhdCI6MTY2NTY0OTA0NSwiZXhwIjoxNjY2MjUzODQ1fQ.6qmAz_9uYmOavfpUxaPfFKIP6fTTNTPChrsFc5ItGN8',
    }" multiple :limit="3">
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>


    <MainTable :searchFn="userServiceImpl.queryUserPage" :searchData="searchFormData" :tableConfig="tableData">
      <template v-slot:tableBtn>
        <el-button type="primary">插槽</el-button>
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
import { getUuid } from "@/utils";

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

    interface UserType {
      searchFormData: UserQueryModel;
      treeData: Array<Tree<RolePageModel>>,
      defaultCheckedKeys: Array<string>;
      tableData: tableConfigType<UserPageModel>;
      dialogFormConfig: Array<FormInterface<Rules, Options>>;
      queryFormConfig: Array<FormInterface<Rules, Options>>;
      formData: any;
    }

    const initState = (): UserType => {
      return {
        tableData: {
          tableProps: {
            rowClassName: function ({ rowIndex }) {
              return rowIndex % 2 == 0 ? "selfClass" : "dubbleClass";
            },
            border: true,
            data: [],
          },
          columns: [
            {
              type: "selection",
              label: "勾选列",
              visible:true
            },
            {
              type: "index",
              label: "序号",
              visible:true
            },
            {
              label: "用户名",
              // width: 500,
              prop: "username",
              showOverflowTooltip: true,
              visible:true
            },
            {
              label: "状态",
              // width: 120,
              prop: "state",
              slot: "formatterSlot",
              align: "center",
              visible:true
            },
            {
              label: "操作",
              width: 200,
              // slot: "handleSlot",
              align: "center",
              visible:true,
              operationBtn: [
                {
                  label:"编辑",
                  operationFn: 'editor(row)'
                },
                {
                  label:"禁用",
                  visible:'row.state==0',
                  operationFn: 'editState(row, "changeState")'
                },
                {
                  label:"启用",
                  visible:'row.state==1',
                  operationFn:'editState(row, "changeState")'
                },
                {
                  label:'假删除',
                  operationFn:'editState(row, "changeDelFlag")'
                },
                {
                  label:'真删除',
                  operationFn:'editState(row, "delUser")'
                },
                {
                  label:'关联角色',
                  operationFn:'relationRole(row)'
                },
              ]
            },
          ],
        },
        dialogFormConfig: [
          {
            type: "input",
            title: "用户名",
            field: "username",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入用户名", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            isShow: true,
          },
          {
            type: "input",
            title: "密码",
            field: "password",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入密码", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            isShow: true,
          },
        ],
        queryFormConfig: [
          {
            type: "input",
            title: "用户名",
            field: "username",
            defaultValue: "",
            maxlength: 40,
            required: false,
            rules: [{ message: "请输入用户名", required: false, trigger: "blur" }],
            col: {
              span: 12,
            },
            props: {
              clearable: true,
            },
            isShow: true,
          },
          {
            type: "select",
            title: "状态",
            field: "state",
            defaultValue: "",
            maxlength: 40,
            required: false,
            rules: [{ message: "请选择状态", required: false, trigger: "blur" }],
            col: {
              span: 12,
            },
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
            isShow: true,
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
        formData:{},
      };
    };

    const userModel = reactive<UserType>(initState());
    // const userModel = reactive<UserType>(initState());

    let userData: ToRefs<UserType> = toRefs(userModel);

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
      userModel.defaultCheckedKeys = [];
      userModel.treeData[0].children = [];
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
    const editState = (row: UserPageModel, fnStr: string): void => {
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
    const relationRole = async (row: UserPageModel): Promise<void> => {
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

    /**
     * 选择树
     * @date 2022-10-14
     * @param {any} data:Tree<RolePageModel>
     * @param {any} row:{checkedKeys:Array<string>
     * @param {any} checkedNodes:Array<RolePageModel>
     * @param {any} halfCheckedKeys:Array<string|undefined>
     * @param {any} halfCheckedNodes:Array<string|undefined>;}
     * @returns {any}
     */
    const handleCheckChange = (
      data: Tree<RolePageModel>,
      row: { checkedKeys: Array<string>, checkedNodes: Array<RolePageModel>, halfCheckedKeys: Array<string | undefined>, halfCheckedNodes: Array<string | undefined>; },
    ) => {
      console.log(data, row);
      userModel.defaultCheckedKeys = row.checkedKeys.filter(item => item !== '1');
    };

    /**
     * 编辑
     * @date 2022-10-14
     * @param {any} row:UserPageModel
     * @returns {any}
     */
    const editor = async (row: UserPageModel): Promise<void> => {
      const { data } = await userServiceImpl.queryUserById({ userId: row.userId });
      await dialogMask?.value?.initConfig(userModel.dialogFormConfig, data);
      dialogMask.value?.openDialog("Editor");

    };

    
    /**
     * 上传文件之前
     * @date 2022-10-14
     * @param {any} file:UploadFileParams
     * @returns {any}
     */
    const beforeUpload = async (file): Promise<void> => {
      console.log(file.file.name,getUuid())
      file.filename=file.file.name
      file.file.filename=file.file.name
      const a = await userServiceImpl.uploadFile(file);
      console.log(a);
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
      submitSearch,
      openDialog,
      dialogMask,
      submitDialogAdd,
      userServiceImpl,
      editState,
      relationRole,
      editor,
      handleCheckChange,
      submitDialogEditor,
      beforeUpload
    };
  },
  components: {
    SearchForm,
  },
});
</script>
<style lang="stylus" scoped></style>
