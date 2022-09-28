<template>
  <div class='menu'>

    <MainTable :searchFn="menuServiceImpl.queryAllMenuList" :tableConfig="tableData">
      <template v-slot:MainTableBtn>
        <el-button type="primary" @click="addMenu">添加一级菜单</el-button>
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
              <el-dropdown-item @click="editorMenu(scopeData.row)">编辑</el-dropdown-item>
              <el-dropdown-item @click="delMenu(scopeData.row)">删除</el-dropdown-item>
              <el-dropdown-item @click="addSubmenu(scopeData.row)">添加子菜单</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </MainTable>

    <DialogMask ref="dialogMask"></DialogMask>

  </div>
</template>

<script lang='ts'>
import menuServiceImpl from '@/api/menu/index';
import { MenuAddModel, MenuListModel } from '@/api/menu/model/menuModel';
import { tableConfigType } from '@/components/MainTable/MainTable';
import { ComponentInternalInstance, defineComponent, getCurrentInstance, provide, reactive, ref, ToRefs, toRefs } from 'vue';
import DialogMask from "@/components/DialogMask/DialogMask.vue";
import { FormInterface, Options, Rules } from "#/form-config";
import { ElMessage } from 'element-plus';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'menu',
  props: [],
  setup() {
    const ctx = getCurrentInstance() as ComponentInternalInstance;
    provide("Pctx", ctx);
    const dialogMask = ref<InstanceType<typeof DialogMask>>();

    interface MenuType {
      tableData: tableConfigType<MenuListModel>;
      dialogFormConfig: Array<FormInterface<Rules, Options>>;

    }

    const initState = (): MenuType => {
      return {
        tableData: {
          tableProps: {
            rowClassName: function ({ rowIndex }) {
              return rowIndex % 2 == 0 ? "selfClass" : "dubbleClass";
            },
            border: true,
            data: [],
            rowKey: "id",
            defaultExpandAll: true
          },
          columns: [
            {
              type: "selection",
            },
            {
              type: "index",
              label: "序号",
            },
            {
              label: "名称",
              prop: "menuName",
              showOverflowTooltip: true,
            },
            {
              label: "路径",
              prop: "path",
              showOverflowTooltip: true,
            },
            {
              label: "排序",
              prop: "sort",
            },
            {
              label: "是否显示",
              prop: "delFlag",
              slot: "statusTxtSlot",
            },
            {
              label: "操作",
              width: 200,
              slot: "handleSlot",
              fixed: 'right'
            },
          ],
        },
        dialogFormConfig: [
          {
            type: "input",
            title: "名称",
            field: "menuName",
            value: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入名称", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            on: [],
            props: {
              clearable: true,
            },
          },
          {
            type: "input",
            title: "路径",
            field: "path",
            value: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入路径", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            on: [],
            props: {
              clearable: true,
            },
          },
          {
            type: "inputNumber",
            title: "排序",
            field: "sort",
            value: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入排序", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            on: [],
            props: {
              min: 1
            },
          },
          {
            type: "switch",
            title: "是否显示",
            field: "delFlag",
            value: 1,
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入是否显示", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            on: [],
            props: {
              clearable: true,
              activeValue: 1,
              inactiveValue: 0,
            },
          },
        ]
      };
    };
    const menuModel: MenuType = reactive(initState());
    let menuData: ToRefs<MenuType> = toRefs(menuModel);

    let formatters = (data: { delFlag: number; }): string => {
      switch (data.delFlag) {
        case 1:
          return "显示";
        case 0:
          return "隐藏";
        default:
          return "";
      }
    };

    const addSubmenu = async (row: MenuListModel): Promise<void> => {
      console.log(row);
      const pItem: Array<FormInterface<Rules, Options>> = [{
        type: "input",
        title: "父节点",
        field: "pMenuName",
        value: "",
        maxlength: 40,
        required: false,
        rules: [{ message: "请输入名称", required: false, trigger: "blur" }],
        col: {
          span: 12,
        },
        on: [],
        props: {
          clearable: true,
          disabled: true
        },
      }];
      const arr = JSON.parse(JSON.stringify(menuModel.dialogFormConfig));
      let { data } = await menuServiceImpl.queryMenuById(row.menuId);
      console.log(data);
      await dialogMask?.value?.initConfig(pItem.concat(arr), { menuId: row.menuId, pMenuName: data?.menuName || '' });
      dialogMask.value?.openDialog("Add");
    };

    const addMenu = async (): Promise<void> => {
      await dialogMask?.value?.initConfig(menuModel.dialogFormConfig);
      dialogMask.value?.openDialog("Add");
    };

    const submitDialogAdd = async (formData: MenuAddModel): Promise<boolean> => {
      console.log(formData);
      let { message } = await menuServiceImpl.addMenuItems(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    const editorMenu = async (formData: MenuListModel) => {
      let { data } = await menuServiceImpl.queryMenuById(formData.menuId);
      await dialogMask?.value?.initConfig(menuModel.dialogFormConfig, data);
      dialogMask.value?.openDialog("Editor");
    };

    const submitDialogEditor = async (formData: MenuListModel): Promise<boolean> => {
      let { message } = await menuServiceImpl.editorMenuItems(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    const delMenu = async (formData: MenuListModel) => {
      let { data } = await menuServiceImpl.queryMenuById(formData.menuId);
      console.log(menuModel.dialogFormConfig)
      const config = JSON.parse(JSON.stringify(menuModel.dialogFormConfig))
      config.forEach(item => {
        item.props.disabled = true
      });
      await dialogMask?.value?.initConfig(config, data);
      dialogMask.value?.openDialog("Del");
    };

    const submitDialogDel = async (formData: MenuListModel): Promise<boolean> => {
      let { message } = await menuServiceImpl.delMenuItems(formData.menuId);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    return {
      menuServiceImpl,
      ...menuData,
      menuModel,
      formatters,
      addSubmenu,
      addMenu,
      dialogMask,
      submitDialogAdd,
      editorMenu,
      submitDialogEditor,
      delMenu,
      submitDialogDel,
    };
  }
});
</script>
<style lang='stylus' scoped>
</style>