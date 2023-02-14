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
    </MainTable>

    <DialogMask ref="dialogMask"></DialogMask>

    <el-dialog v-model="selectIconDialog" destroy-on-close draggable :close-on-click-modal="false" :show-close="false"
      :before-close="openIconDialog" title="图标" :fullscreen="dialogFull" lock-scroll>
      <template #header="{ close, titleId, titleClass }">
        <div>
          <span :id="titleId" :class="titleClass">选择图标</span>
          <el-input style="width:30%;margin-left:5px" placeholder="请输入图标名称" :prefix-icon="ElementPlusIconsVue.Search"
            v-model="searchIcon"></el-input>
        </div>
        <button class="el-dialog__headerbtn" style="margin-right:54px" @click="(dialogFull = !dialogFull)">
          <el-icon>
            <FullScreen />
          </el-icon>
        </button>
        <button class="el-dialog__headerbtn" @click="close">
          <el-icon>
            <Close />
          </el-icon>
        </button>
      </template>
      <div class="iconBody">
        <div class="iconBoxs"
          v-for="item in Object.keys(ElementPlusIconsVue).filter(item => item.toLowerCase().indexOf(searchIcon.toLowerCase()) > -1)"
          :key="item">
          <div class="icons" @click="selectIcons(item)">
            <el-icon class="elIcon">
              <component :is="item"></component>
            </el-icon>
            <span style="margin-top:8px">{{ item.toLowerCase() }}</span>
          </div>
        </div>
      </div>
    </el-dialog>

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
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import _ from 'lodash';

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
      selectIconDialog: boolean;
      dialogFull: boolean;
      searchIcon: string;
    }
    const openIconDialog = (): void => {
      menuModel.selectIconDialog = !menuModel.selectIconDialog;
    };

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
              label: "勾选列",
              visible: true
            },
            {
              type: "index",
              label: "序号",
              visible: true
            },
            {
              label: "名称",
              prop: "menuName",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "路由地址",
              prop: "path",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "组件路径",
              prop: "componentPath",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "排序",
              prop: "sort",
              visible: true
            },
            {
              label: "是否显示",
              prop: "delFlag",
              slot: "statusTxtSlot",
              visible: true
            },
            {
              label: "操作",
              width: 200,
              fixed: 'right',
              visible: true,
              operationBtn: [
                {
                  label: "编辑",
                  operationFn: 'editorMenu(row)'
                },
                {
                  label: "删除",
                  operationFn: 'delMenu(row)'
                },
                {
                  label: "添加子菜单",
                  operationFn: 'addSubmenu(row)'
                },
              ]
            },
          ],
        },
        dialogFormConfig: [
          {
            type: "input",
            title: "名称",
            field: "menuName",
            isShow: true,
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入名称", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            props: {
              clearable: true,
            },
          },
          {
            type: "input",
            title: "组件名称",
            field: "componentName",
            isShow: true,
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入组件名称", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            props: {
              clearable: true,
            },
          },
          {
            type: "input",
            title: "路由地址",
            field: "path",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入路由地址", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            // on: {
            //   change: (val) => {
            //     console.log(val);
            //   },
            // },
            props: {
              clearable: true,
            },
            isShow: true,
          },
          {
            type: "input",
            title: "组件路径",
            field: "componentPath",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入组件路径", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            props: {
              clearable: true,
            },
            isShow: true,
          },
          {
            type: "inputNumber",
            title: "排序",
            field: "sort",
            defaultValue: 1,
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入排序", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            props: {
              min: 1
            },
            isShow: true,
          },
          {
            type: "select",
            title: "类型",
            field: "type",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请选择类型", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            options: [
              {
                label: "目录",
                value: 0,
              },
              {
                label: "菜单",
                value: 1,
              },
              {
                label: "按钮",
                value: 2,
                hide: ['path', 'componentPath']
              },
              {
                label: "页面(待扩展)",
                value: 3,
                hide: ['delFlag']
              },
            ],
            props: {
              clearable: true,
            },
            isShow: true,
          },
          {
            type: "switch",
            title: "是否显示",
            field: "delFlag",
            defaultValue: 0,
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入是否显示", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            props: {
              clearable: true,
              activeValue: 0,
              inactiveValue: 1,
            },
            isShow: true,
          },
          {
            type: "input",
            title: "图标",
            field: "icon",
            isShow: true,
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请选择图标", required: true, trigger: "change" }],
            col: {
              span: 12,
            },
            props: {
              clearable: true,
            },
            on: {
              focus: openIconDialog
            }
          },
        ],
        selectIconDialog: false,
        dialogFull: false,
        searchIcon: '',
      };
    };
    const menuModel: MenuType = reactive(initState());
    let menuData: ToRefs<MenuType> = toRefs(menuModel);

    let formatters = (data: { delFlag: number; }): string => {
      switch (data.delFlag) {
        case 0:
          return "显示";
        case 1:
          return "隐藏";
        default:
          return "";
      }
    };

    // 添加子菜单
    const addSubmenu = async (row: MenuListModel): Promise<void> => {
      const pItem: Array<FormInterface<Rules, Options>> = [{
        type: "input",
        title: "父节点",
        field: "pMenuName",
        defaultValue: "",
        maxlength: 40,
        required: false,
        rules: [{ message: "请输入名称", required: false, trigger: "blur" }],
        col: {
          span: 12,
        },
        props: {
          clearable: true,
          disabled: true
        },
        isShow: true,
      }];
      const arr = _.cloneDeep(menuModel.dialogFormConfig)
      let { data } = await menuServiceImpl.queryMenuById(row.menuId);
      await dialogMask?.value?.initConfig(pItem.concat(arr), { menuId: row.menuId, pMenuName: data?.menuName || '' });
      dialogMask.value?.openDialog("Add");
    };

    // 新增菜单
    const addMenu = async (): Promise<void> => {
      await dialogMask?.value?.initConfig(menuModel.dialogFormConfig);
      dialogMask.value?.openDialog("Add");
    };

    // 新增菜单-提交
    const submitDialogAdd = async (formData: MenuAddModel): Promise<boolean> => {
      let { message } = await menuServiceImpl.addMenuItems(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    // 编辑菜单
    const editorMenu = async (formData: MenuListModel) => {
      let { data } = await menuServiceImpl.queryMenuById(formData.menuId);
      await dialogMask?.value?.initConfig(menuModel.dialogFormConfig, data);
      dialogMask.value?.openDialog("Editor");
    };

    // 编辑菜单-提交
    const submitDialogEditor = async (formData: MenuListModel): Promise<boolean> => {
      let { message } = await menuServiceImpl.editorMenuItems(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    // 删除菜单
    const delMenu = async (formData: MenuListModel) => {
      let { data } = await menuServiceImpl.queryMenuById(formData.menuId);
      const config = JSON.parse(JSON.stringify(menuModel.dialogFormConfig));
      config.forEach(item => {
        item.props.disabled = true;
      });
      await dialogMask?.value?.initConfig(config, data);
      dialogMask.value?.openDialog("Del");
    };

    // 删除菜单-提交
    const submitDialogDel = async (formData: MenuListModel): Promise<boolean> => {
      let { message } = await menuServiceImpl.delMenuItems(formData.menuId);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    const selectIcons = (val: string): void => {
      dialogMask?.value?.editorFieldValue({icon:val});
      menuModel.searchIcon = ''
      openIconDialog()
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
      openIconDialog,
      ElementPlusIconsVue,
      selectIcons,
    };
  },
});
</script>
<style lang='stylus' scoped>

.el-dialog__headerbtn{
  width:30px;
  margin-right:24px
}
.iconBody{
  display: grid;
  grid-template-columns: repeat(7,1fr);
  height: 600px;
   overflow-y: scroll;
}
.iconBoxs{
  border:1px solid var(--el-border-color);
  height:90px
}
.iconBoxs :hover{
  background-color: var(--el-border-color-extra-light);
  color: var(--brand-color-light);
}
.icons{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  font-size:13px
}
.elIcon{
  height:20px;
  width:20px;
  font-size:20px
}
</style>