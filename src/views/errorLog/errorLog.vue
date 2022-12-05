<template>
  <div class='errorLog'>

    <el-row>
      <el-col :span="14">
        <span>错误日志列表{{tableData.tableProps.data.length}}</span>
      </el-col>
      <el-col :span="10">
        <div v-for="item in images" :key="item" style="width:0;height:0;overflow:hidden">
          <el-image :src="item" />
        </div>
        <div style="float:right">
          <el-button type="primary" @click="toVueErr">点击触发vue错误</el-button>
          <el-button type="primary" @click="toResourceErr">点击触发资源加载错误</el-button>
          <el-button type="primary" @click="toAxiosErr">点击触发ajax错误</el-button>
        </div>
      </el-col>
      <el-col>
        <MainTable :searchFn="errorLogServiceImpl.rerrorLogPage" :tableConfig="tableData">
          <template v-slot:MainTableBtn>
            <el-button type="primary">插槽</el-button>
          </template>
          <!-- <template v-slot:handleSlot="{ scopeData }">
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
          </template> -->
        </MainTable>
      </el-col>
    </el-row>

  </div>
</template>

<script lang='ts'>
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface errorLog {
  images: Array<string>;
  tableData: tableConfigType<ComputedRef<any>>;

}
import errorLogServiceImpl from '@/api/errorLog';
import { tableConfigType } from '@/components/MainTable/MainTable';
import { useErrorLogStoreWithOut } from '@/piniaStore/modules/errorLog';
import { reactive, toRefs, defineComponent, ToRefs, ComputedRef } from 'vue';
// import { ErrorlogPageModel } from '@/api/errorLog/service/model/errorLogModel';
export default defineComponent({
  name: 'errorLog',
  props: [],
  setup() {

    const initState = (): errorLog => {
      return {
        images: [],
        tableData: {
          tableProps: {
            border: true,
            data: []
          },
          columns: [
            {
              type: "index",
              label: "序号",
            },
            {
              label: "类型",
              prop: "type",
              showOverflowTooltip: true,
            },
            {
              label: "URL",
              prop: "url",
              showOverflowTooltip: true,
            },
            {
              label: "时间",
              prop: "time",
              showOverflowTooltip: true,
            },
            {
              label: "文件",
              prop: "file",
              showOverflowTooltip: true,
            },
            {
              label: "Name",
              prop: "name",
              showOverflowTooltip: true,
            },
            {
              label: "错误信息",
              prop: "message",
              showOverflowTooltip: true,
            },
            {
              label: "stack信息",
              prop: "stack",
              showOverflowTooltip: true,
            },
            {
              label: "Action",
              prop: "detail",
              showOverflowTooltip: true,
            },
          ],
        },
      };
    };
    const model: errorLog = reactive(initState());
    let data: ToRefs<errorLog> = toRefs(model);

    const toVueErr = (): void => {
      setTimeout(() => {
        const aaa = undefined as unknown as object;
        aaa.toString();
      });
    };

    const toResourceErr = (): void => {
      model.images.push("./1.png");
    };

    const toAxiosErr = (): void => {
      errorLogServiceImpl.rerrorLogTest(1, 10, {});
    };

    const errorLogStore = useErrorLogStoreWithOut();
    console.log(errorLogStore)
    // model.tableData.tableProps.data =  computed(() => errorLogStore.getErrorLogInfoList) as unknown as ComputedRef<any>[];
    return {
      ...data,
      errorLogServiceImpl,
      toAxiosErr,
      toVueErr,
      toResourceErr,
    };
  }
});
</script>
<style lang='stylus' scoped>
.errorLog{
  padding 0.5rem
}
</style>