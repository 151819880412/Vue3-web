<template>
  <div class="headerTabs">
    <el-tabs v-model="tabValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
      <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.name" :name="item.path">

        <!-- 右键菜单开始：自定义标签页显示名称，保证每个标签页都能实现右键菜单 -->
        <template #label>
          <el-dropdown trigger="contextmenu" :id="item.path" @visible-change="handleChange($event, item.path)"
            ref="dropdownRef">
            <span :class="tabValue === item.path ? 'label' : ''">{{ item.name }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="removeTab(item)" :disabled="show(item.path, 'left')">
                  <el-icon>
                    <Close />
                  </el-icon>
                  <span>
                    关闭当前标签页
                  </span>
                </el-dropdown-item>
                <el-dropdown-item @click="removeTab(item, 'left')" :disabled="show(item.path, 'left')">
                  <el-icon>
                    <DArrowLeft />
                  </el-icon>
                  <span>
                    关闭左侧标签页
                  </span>
                </el-dropdown-item>
                <el-dropdown-item @click="removeTab(item, 'right')" :disabled="show(item.path, 'right')">
                  <el-icon>
                    <DArrowRight />
                  </el-icon>
                  <span>
                    关闭右侧标签页
                  </span>
                </el-dropdown-item>
                <el-dropdown-item @click="removeTab(item, 'other')" :disabled="tabList.length < 1">
                  <el-icon>
                    <Operation />
                  </el-icon>
                  <span>
                    关闭其他标签页
                  </span>
                </el-dropdown-item>
                <el-dropdown-item @click="removeTab(item, 'all')">
                  <el-icon>
                    <Minus />
                  </el-icon>
                  <span>
                    关闭全部标签页
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <!-- 右键菜单结束 -->

      </el-tab-pane>
    </el-tabs>
    <div>
      <span class="tabs-content" @click="refresh">
        <el-icon :class="{ 'rotate360': isRefresh }">
          <Refresh />
        </el-icon>
      </span>
      <el-dropdown trigger="click">
        <span class="tabs-content">
          <el-icon>
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-menu>
              <el-dropdown-item @click="refresh">
                <el-icon>
                  <Refresh />
                </el-icon>
                <span>
                  重新加载
                </span>
              </el-dropdown-item>

              <el-dropdown-item @click="removeTab(tabList.filter(item => item.path == tabValue)[0])"
                :disabled="show('', 'left')">
                <el-icon>
                  <Close />
                </el-icon>
                <span>
                  关闭当前标签页
                </span>
              </el-dropdown-item>
              <el-dropdown-item @click="removeTab(tabList.filter(item => item.path == tabValue)[0], 'left')"
                :disabled="show('', 'left')">
                <el-icon>
                  <DArrowLeft />
                </el-icon>
                <span>
                  关闭左侧标签页
                </span>
              </el-dropdown-item>
              <el-dropdown-item @click="removeTab(tabList.filter(item => item.path == tabValue)[0], 'right')"
                :disabled="show('', 'right')">
                <el-icon>
                  <DArrowRight />
                </el-icon>
                <span>
                  关闭右侧标签页
                </span>
              </el-dropdown-item>
              <el-dropdown-item @click="removeTab(tabList.filter(item => item.path == tabValue)[0], 'other')"
                :disabled="tabList.length < 1">
                <el-icon>
                  <Operation />
                </el-icon>
                <span>
                  关闭其他标签页
                </span>
              </el-dropdown-item>
              <el-dropdown-item @click="removeTab(tabList.filter(item => item.path == tabValue)[0], 'all')">
                <el-icon>
                  <Minus />
                </el-icon>
                <span>
                  关闭全部标签页
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="tabs-content">
        <el-icon>
          <Refresh />
        </el-icon>
      </span>
      <!-- {{ tabValue }} -->
    </div>
  </div>

</template>

<script lang='ts'>
import { SideBarItemType } from '@/api/login/model/menuModel';
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
import _ from 'lodash';
import { ComputedRef, computed, defineComponent, ref, } from 'vue';
import { useRouter } from 'vue-router';
import { useRedo } from '@/views/hooks/usePage';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'tabs',
  props: [],
  setup() {
    const appStore = useAppStoreWithOut();
    const router = useRouter();
    const dropdownRef = ref();
    const isRefresh = ref(false);

    const tabValue: ComputedRef<string> = computed(() => appStore.getProjectConfig.menuSetting.defaultActive);
    const tabList: ComputedRef<SideBarItemType[]> = computed(() => appStore.getTabsSetting);

    const tabClick = ({ props }) => {
      router.push({
        path: props.name
      });
    };

    const show = (path: string, type = 'left') => {
      if (path) {
        const index = tabList.value.findIndex((item) => path === item.path);
        return type === 'left' ? index == 0 : index == tabList.value.length - 1;
      } else {
        const paths = tabList.value.filter(item => item.path == tabValue.value).length > 0 ? tabList.value.filter(item => item.path == tabValue.value)[0].path : '';
        const index = tabList.value.findIndex((item) => paths === item.path);
        return type === 'left' ? index == 0 : index == tabList.value.length - 1;
      }
    };

    const removeTab = (row: SideBarItemType, type?: string) => {
      if (type === 'other') {
        if (tabList.value.length < 1) {
          return;
        }
      } else if (type !== 'all' && show(row.path, type)) {
        return;
      }
      console.log(type === 'other' && tabList.value.length < 1, 111, show(row.path, type));
      const index = tabList.value.findIndex((item) => item.path === row.path); //查找触发右键菜单所在标签页index
      const currentIndex = tabList.value.findIndex((item) => item.path === tabValue.value); //查找当前激活标签页index，存在当前激活标签页与触发右键菜单标签页不是同一个的情况
      const other = _.cloneDeep(tabList.value[index]);
      switch (type) {
        case 'all': //关闭全部标签页
          appStore.resetProp('menuTabs');
          router.push({
            path: tabList.value[0].path
          });
          break;
        case 'other': //关闭其他标签页
          router.push({
            path: other.path
          });
          appStore.resetProp('menuTabs');
          appStore.setTabs(other);
          break;
        case 'left': //关闭左侧标签页
          tabList.value.splice(1, index - 1);
          if (currentIndex < index) {
            router.push({
              path: row.path
            });
          }
          break;
        case 'right': //关闭右侧标签页
          tabList.value.splice(index + 1);
          if (currentIndex > index) {
            router.push({
              path: row.path
            });
          }
          break;
        default: //默认关闭当前标签页
          tabList.value.splice(index, 1);
          //当前激活标签页与触发右键菜单标签页是同一页
          if (row.path === tabValue.value) {
            //当前激活标签页是标签页数组的第一个，则将激活标签页设置为 home
            //当前激活标签页不是标签页数组的第一个，则将激活标签页设置为当前激活标签页的前一页
            router.push({
              path: index === 0 ? '/home' : tabList.value[index - 1].path
            });
          }
          break;
      }
    };

    const handleChange = (visible: boolean, path: string) => {
      if (!visible) return;
      dropdownRef.value.forEach((item: { id: string; handleClose: () => void; }) => {
        if (item.id === path) return;
        item.handleClose();
      });
    };

    const refresh = async () => {
      isRefresh.value = true;
      setTimeout(() => {
        isRefresh.value = false;
      }, 1200);
      console.log(111);

      const redo = useRedo(router);
      await redo();
    };


    return {
      removeTab,
      tabValue,
      tabList,
      tabClick,
      show,
      handleChange,
      dropdownRef,
      refresh,
      isRefresh
    };
  }
});
</script>
<style lang='stylus' scoped>
/deep/.el-tabs__header{
  height: 28px
  line-height 28px
  margin: 0
  // border-bottom: 1px solid #e5e7eb
}
/deep/.el-tabs__item{
  height: 28px
  line-height 28px
}
.headerTabs{
  border-top 1px solid var(--el-bg-color-page)
  border-right 1px solid var(--el-bg-color-page)
  display: flex
  .el-tabs{
    display: flex
    flex: auto
  }
}
/deep/.el-tabs__nav .el-tabs__item:first-child:hover{
  padding-left: 20px !important
  padding-right: 20px !important
}
/deep/.el-tabs__nav .el-tabs__item:first-child .el-icon{
  width: 0 !important
}
.label {
  color: var(--el-color-primary); //激活标签页高亮
}
:deep(.el-tabs__item) {
  &:hover {
    span {
      color: var(--el-color-primary); //鼠标移到标签页高亮
    }
  }
  .el-dropdown {
    line-height: inherit; // 统一标签页显示名称行高
  }
}
.tabs-content{
  display: inline-block;
  width: 36px;
  height: 30px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  cursor: pointer;
  border-left: 1px solid #d9d9d9;
}
.tabs-content:hover{
  color: rgba(0, 0, 0, 0.85);
}
.rotate360{
  transition: all 2s;
  transform: rotate(360deg);
}
</style>