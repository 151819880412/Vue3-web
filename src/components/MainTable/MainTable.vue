<template>
  <el-row class="container">
    <el-col class="tableTop">
      <el-icon>
        <List />
      </el-icon>
      <span> 数据列表</span>
      <div style="float: right">
        <el-button type="primary" @click="add">新增</el-button>
        <slot name="tableBtn"></slot>
      </div>
    </el-col>
    <el-col>
      <!-- @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectChange"
        @cell-click="handleCellClick"
        @cell-dblclick="handleCellDbclick"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDbclick"
        https://my.oschina.net/u/4019503/blog/5268336
         -->
      <el-skeleton :rows="5" animated :loading="loading" :throttle="500">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          empty-text="暂无数据"
          :height="tableData?.attrs?.height"
          :max-height="tableData?.attrs?.maxHeight"
          :stripe="tableData?.attrs?.stripe || false"
          :border="tableData?.attrs?.border || false"
          :size="tableData?.attrs?.size || ''"
          :fit="tableData?.attrs?.fit || true"
          :show-header="tableData?.attrs?.showHeader || true"
          :highlight-current-row="tableData?.attrs?.highlight || false"
          :current-row-key="tableData?.attrs?.currentRowKey || ''"
          :row-class-name="tableData?.attrs?.rowClassName"
          :cell-class-name="tableData?.attrs?.cellClassName"
          :cell-style="tableData?.attrs?.cellStyle"
          :header-row-class-name="tableData?.attrs?.headerRowClassName"
          :header-row-style="tableData?.attrs?.headerRowStyle"
        >
          <template v-for="column in tableData.columns" :key="column.key">
            <el-table-column
              v-if="column.slot"
              :label="column.label"
              :fixed="column.fixed || false"
              :align="column.align || 'center'"
              :width="column.width || ''"
            >
              <template #default="scope">
                <slot :name="column.slot" :scopeData="scope"></slot>
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="column.type == 'selection'"
              type="selection"
              :width="column.width || '60px'"
              :align="column.align || 'center'"
            >
            </el-table-column>
            <el-table-column
              v-else-if="column.type == 'index'"
              type="index"
              :label="column.label"
              :width="column.width || '60px'"
              :align="column.align || 'center'"
            ></el-table-column>
            <el-table-column
              v-else-if="!column.slot"
              :prop="column.prop"
              :label="column.label"
              :fixed="column.fixed || false"
              :align="column.align || 'center'"
              :width="column.width || ''"
              :show-overflow-tooltip="column.showOverflowTooltip"
            >
            </el-table-column>
          </template>
        </el-table>
      </el-skeleton>
    </el-col>

    <el-col style="padding: 12px">
      <el-skeleton :rows="5" animated :loading="loading" :throttle="500">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="float: right"
        />
      </el-skeleton>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { PaginationInterface } from "#/ele";
import { tableConfigTypes } from "./MainTable";
import {
  ComponentInternalInstance,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
// type aa = {
//   a:string,
//   b:bb
// }
// type bb = {
//   b:string
// }

// const PersonTypeHelper = function (): aa {
//   return {} as aa
// }
export default defineComponent({
  name: "MainTable",
  props: {
    // loading: {
    //   type: Boolean,
    //   default: () => true,
    //   required: true,
    // },
    searchFn: {
      type: Function,
      required: true,
    },
    searchData: {
      type: Object,
      required: true,
    },
    tableConfig: {
      type: tableConfigTypes,
      required: true,
    },
    // aaa:{
    //   type:PersonTypeHelper,
    //   required:true
    // },
  },
  setup(props) {
    let loading = ref(true);

    let tableData = reactive(props.tableConfig);

    let searchFormData = reactive(props.searchData);
    onMounted(() => {
      initTableData(1, 10, props.searchData);
      console.log(props.searchData)
    });

    const initTableData = async (
      currentPage: number,
      pageSize: number,
      searchData: object
    ): Promise<void> => {
      let { data } = await props.searchFn(currentPage, pageSize, searchData);
      page.total = data.total;
      loading.value = false;
      tableData.data = data.results;
    };

    const ddd = toRefs(props.searchData);

    watch(
      () => props.searchData,
      (newValue, oldValue) => {
        searchFormData = newValue as object;
        console.log(newValue, "tttttnewValue", oldValue, "tttttoldValue");
        initTableData(1, pageObj.pageSize, newValue as object);
      }
    );
    watch(
      () => ddd,
      (newValue, oldValue) => {
        console.log(newValue, "tttttnewValue", oldValue, "tttttoldValue");
      }
    );

    let Pctx: ComponentInternalInstance | null | undefined = inject("Pctx");

    const add = () => {
      try {
        Pctx?.proxy?.openDialog();
      } catch (error) {
        console.error("缺少openDialog方法");
      }
    };

    let pageObj: PaginationInterface = {
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };

    const page: PaginationInterface = reactive(pageObj);

    const handleSizeChange = (pageSize: number): void => {
      if (pageSize * (page.currentPage - 1) > page.total) return;
      page.pageSize = pageSize;
      initTableData(page.currentPage, page.pageSize, props.searchData);
    };
    const handleCurrentChange = (currentPage: number): void => {
      page.currentPage = currentPage;
      initTableData(page.currentPage, page.pageSize, props.searchData);
    };

    return {
      add,
      handleSizeChange,
      handleCurrentChange,
      ...toRefs(page),
      searchFormData,
      loading,
      tableData,
    };
  },
  components: {},
});
</script>
<style lang="stylus" scoped>
.container{
  border:1px solid #ebeef5
  padding:12px
  width:100%
}
.tableTop{
  height:32px;
  line-height:32px
  margin-bottom:12px
  i{
    line-height:32px
  }
  span{
    line-height:32px
  }
}
</style>
