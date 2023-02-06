<template>
  <el-row>
    <SearchForm :formConfig="queryFormConfig" :formData="formData" ref="searchForm">
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
      <!-- <template v-slot:statusTxtSlot="{ scopeData }">
        <div>
          {{ formatters(scopeData.row) }}
        </div>
      </template> -->
      <!-- <template v-slot:handleSlot="{ scopeData }">
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
      </template> -->
    </MainTable>

    <DialogMask ref="dialogMask">
      <template v-slot:dialogMaskSlot>
        <el-tree
        ref="treeDataRef"
          :props="{
            label: 'menuName',
            children: 'children',
          }"
          show-checkbox
          :data="treeData"
          @check="handleCheckChange"
          highlight-current
          default-expand-all
          node-key="menuId"
          :default-checked-keys="defaultCheckedKeys"
        />
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
import roleServiceImpl from "@/api/role/index";
import SearchForm from "@/components/SearchForm/SearchForm.vue";
import DialogMask from "@/components/DialogMask/DialogMask.vue";
import { ElMessage, ElMessageBox, ElTree } from "element-plus";
import { tableConfigType } from "@/components/MainTable/MainTable";
import {
  RoleAddModel,
  RoleEditorModel,
  RolePageModel,
  RoleQueryModel,
} from "@/api/role/service/model/roleModel";
import { MenuPageModel } from "@/api/login/model/menuModel";
import { flatten } from "@/utils";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Role",
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

    interface Tree<RolePageModel> {
      roleName: string;
      children: Tree<RolePageModel>[];
      roleId: string;
    }

    type RoleType = {
      tableData: tableConfigType<RolePageModel>;
      treeData: Array<Tree<MenuPageModel>>;
      searchFormData: RoleQueryModel;
      defaultCheckedKeys: Array<string>;
      dialogFormConfig: Array<FormInterface<Rules, Options>>;
      queryFormConfig: Array<FormInterface<Rules, Options>>;
      selectTreeList: Array<string>;
      formData:any
    };

    const initState = (): RoleType => {
      return {
        tableData: {
          tableProps: {
            border: true,
            data:[]
          },
          columns: [
            {
              type: "selection",
              label: "勾选列",
              visible :false
            },
            {
              type: "index",
              label: "序号",
              visible:true
            },
            {
              label: "角色名",
              prop: "roleName",
              showOverflowTooltip: true,
              visible:true
            },
            {
              label: "状态",
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
                  // label:'["禁用", "启用"][scopeData.row.state]',
                  // label:(a,b)=>{console.log(a,b,333);return 1},
                  label:"禁用",
                  visible:'row.state==0',
                  fn: 'editState(row, "changeState")'
                },
                {
                  // label:'["禁用", "启用"][scopeData.row.state]',
                  // label:(a,b)=>{console.log(a,b,333);return 1},
                  label:"启用",
                  visible:'row.state==1',
                  fn:'editState(row, "changeState")'
                },
                {
                  label:'假删除',
                  fn:'editState(row, "changeDelFlag")'
                },
                {
                  label:'真删除',
                  fn:'editState(row, "delUser")'
                },
                {
                  label:'角色授权',
                  fn:'roleAuthorization(row)'
                },
              ]
            },
          ],
        },
        treeData: [],
        searchFormData: {},
        defaultCheckedKeys: [],
        dialogFormConfig: [
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
            isShow:true,
          },
        ],
        queryFormConfig: [
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
            props: {
              clearable: true,
            },
            isShow:true,
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
            isShow:true,
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
            isShow:true,
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
            isShow:true,
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
            isShow:true,
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
            isShow:true,
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
            isShow:true,
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
            isShow:true,
          },
        ],
        selectTreeList:[],
        formData:{},
      };
    };

    const roleModel: RoleType = reactive(initState());

    let data: ToRefs<RoleType> = toRefs(roleModel);

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
     * @param {RoleQueryModel} searchFormData
     * @returns {Promise<void>}
     */
    const submitSearch = (searchFormData: RoleQueryModel): void => {
      roleModel.searchFormData = searchFormData;
    };

    /**
     * 打开弹窗
     * @date 2022-08-05
     * @returns {void}
     */
    const openDialog = async (): Promise<void> => {
      roleModel.defaultCheckedKeys = [];
      roleModel.treeData = []
      roleModel.selectTreeList = []
      await dialogMask?.value?.initConfig(roleModel.dialogFormConfig);
      dialogMask.value?.openDialog("Add");
    };

    /**
     * 新增提交
     * @date 2022-08-05
     * @param {any} formData
     * @returns {any}
     */
    const submitDialogAdd = async (formData: RoleAddModel): Promise<boolean> => {
      let { message } = await roleServiceImpl.addRole(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    const dialogMask = ref<InstanceType<typeof DialogMask>>();
    const treeDataRef = ref<InstanceType<typeof ElTree>>()

    /**
     * 修改状态
     * @date 2022-08-22
     * @param {any} row:RolePageModel
     * @param {any} fnStr:string
     * @returns {any}
     */
    const editState = (row: RolePageModel, fnStr: string): void => {
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
          roleModel.searchFormData = JSON.parse(JSON.stringify(roleModel.searchFormData));
        })
        .catch((e) => {
          console.log(e);
        });
    };

    /**
     * 角色授权
     * @date 2022-08-22
     * @param {any} row:RolePageModel
     * @returns {any}
     */
    const roleAuthorization = async (row: RolePageModel): Promise<void> => {


      roleModel.defaultCheckedKeys = [];
      let { data } = await roleServiceImpl.queryRoleById({ roleId: row.roleId });
      await dialogMask?.value?.initConfig(roleModel.dialogFormConfig, data);
      roleModel.treeData = data.menus;
      flatten(JSON.parse(JSON.stringify(data.menus))).forEach(item => {
        if (item.isCheck) {
          roleModel.defaultCheckedKeys.push(item.menuId);
        }
      });
      roleModel.treeData = data.menus;
      dialogMask.value?.openDialog("Editor");
    };

    /**
     * 编辑提交
     * @date 2022-08-18
     * @param {any} formData:RoleAddModel
     * @returns {any}
     */
    const submitDialogEditor = async (formData: RoleAddModel): Promise<boolean> => {
      const obj: RoleEditorModel = { ...formData, menus: roleModel.selectTreeList };
      console.log(obj);
      let { message } = await roleServiceImpl.editorRole(obj);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    const defaultProps = {
      children: "children",
      label: "name",
    };

    const handleCheckChange = (
      data: Tree<RolePageModel>,
      row: {
        checkedKeys: Array<string>;
        checkedNodes: Array<RolePageModel>;
        halfCheckedKeys: Array<string | undefined>;
        halfCheckedNodes: Array<string | undefined>;
      }
    ) => {
      console.log(data, row);
      let idArr:string[] = [];
      treeDataRef.value?.getCheckedNodes().forEach(item=>{
        idArr.push(item.menuId)
      })
      treeDataRef.value?.getHalfCheckedNodes().forEach(item=>{
        idArr.push(item.menuId)
      })
      // [...treeDataRef.value?.getCheckedNodes(), ...treeDataRef.value?.getHalfCheckedNodes()].forEach(item=>{
      //   idArr.push(item.menuId)
      // })
      roleModel.defaultCheckedKeys = row.checkedKeys.filter((item) => item !== "1");
      roleModel.selectTreeList = idArr
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
      submitSearch,
      openDialog,
      dialogMask,
      treeDataRef,
      submitDialogAdd,
      roleServiceImpl,
      editState,
      roleAuthorization,
      defaultProps,
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
