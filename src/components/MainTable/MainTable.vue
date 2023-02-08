<template>
  <el-row class="container">
    <el-col class="tableTop">
      <el-icon>
        <List />
      </el-icon>
      <span> 数据列表</span>
      <div style="float: right;display:flex;align-items:center">
        <slot name="MainTableBtn">
          <el-button type="primary" @click="add">新增</el-button>
        </slot>
        <slot name="tableBtn"></slot>

        <!-- 刷新 -->
        <el-tooltip effect="dark" content="刷新" placement="top">
          <div class="tableConfig" @click="refresh">
            <el-icon>
              <Refresh />
            </el-icon>
          </div>
        </el-tooltip>

        <!-- 列设置 -->
        <el-tooltip effect="dark" content="列设置" placement="top">
          <div class="tableConfig">
            <el-popover placement="top" :width="330" trigger="click" @show="popoverShow">
              <!-- <div style="display: flex;justify-content: space-between;">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="0">列展示</el-checkbox>
                  <el-checkbox label="1">序号列</el-checkbox>
                  <el-checkbox label="2">勾选列</el-checkbox>
                </el-checkbox-group>
                <el-button type="primary" link>重置</el-button>
              </div> -->
              <div ref="columnListRef">
                <div v-for="item in Columns" :key="item.prop" style="position:relative">
                  <div style="display:flex;align-items:center;width:100%">
                    <el-icon class="table-column-drag-icon">
                      <Rank />
                    </el-icon>
                    <el-checkbox style="margin:0 5px" v-model="item.visible" />
                    <span>{{ item.label }}</span>
                  </div>
                  <span style="position: absolute;right: 0px;top: 10px;">
                    <el-tooltip class="box-item" effect="dark" content="固定到左侧" placement="bottom">
                      <el-icon class="fixed-left" @click.prevent="fixeds(item, 'left')"
                        :class="{ 'active': item.fixed == 'left', disabled: !item.visible }">
                        <Back />
                      </el-icon>
                    </el-tooltip>
                    <el-tooltip class="box-item" effect="dark" content="固定到右侧" placement="bottom">
                      <el-icon class="fixed-right" @click.prevent="fixeds(item, 'right')"
                        :class="{ 'active': item.fixed == 'right', disabled: !item.visible }">
                        <Right />
                      </el-icon>
                    </el-tooltip>
                  </span>
                </div>
              </div>
              <template #reference>
                <span>
                  <el-icon>
                    <Setting />
                  </el-icon>
                </span>
              </template>
            </el-popover>
          </div>
        </el-tooltip>

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
        <el-table v-bind="tableData?.tableProps" style="width: 100%" empty-text="暂无数据"
          :height="tableData?.tableProps?.height" :max-height="tableData?.tableProps?.maxHeight"
          :stripe="tableData?.tableProps?.stripe || false" :border="tableData?.tableProps?.border || false"
          :size="tableData?.tableProps?.size || ''" :fit="tableData?.tableProps?.fit || true"
          :show-header="tableData?.tableProps?.showHeader || true"
          :highlight-current-row="tableData?.tableProps?.highlightCurrentRow || false"
          :current-row-key="tableData?.tableProps?.currentRowKey || ''"
          :row-class-name="tableData?.tableProps?.rowClassName" :cell-class-name="tableData?.tableProps?.cellClassName"
          :cell-style="tableData?.tableProps?.cellStyle"
          :header-row-class-name="tableData?.tableProps?.headerRowClassName"
          :header-row-style="tableData?.tableProps?.headerRowStyle">
          <template v-for="item in Columns?.filter(item => item.visible)" :key="item.key">

            <el-table-column v-if="item.type" :type="item.type" :label="item.label" :width="item.width || '60px'"
              :align="item.align || 'center'" :key="item.type" :fixed="item.fixed || false"></el-table-column>
            <el-table-column v-else :prop="item.prop" :label="item.label" :fixed="item.fixed || false"
              :align="item.align || 'center'" :width="item.width || ''"
              :show-overflow-tooltip="item.showOverflowTooltip" :key="item.prop">
              <template #default="scope">
                <span v-if="item.prop&&item.slot&&item.slot=='formatterSlot'">
                  {{ formatterDataList[item.prop]?.filter(item3=>item3.dictValue==scope.row[(item.prop)])[0].cnName }}
                </span>
                <slot :name="item.slot" :scopeData="scope" v-else-if="item.slot"></slot>
                <template v-else-if="item.operationBtn">

                  <el-dropdown>
                    <el-button type="primary">
                      操作<el-icon class="el-icon--right">
                        <arrow-down />
                      </el-icon>
                    </el-button>
                    <!-- <template #dropdown>
                      <el-dropdown-menu>
                        <template v-for="item2 in item.operationBtn" :key="item2.id">
                          <el-dropdown-item @click="btnClick(item2,scope.row)" :disabled="true">{{item2.label }}</el-dropdown-item>
                        </template>
                      </el-dropdown-menu>
                    </template> -->

                    <template v-slot:dropdown>
                      <el-dropdown-item @click="btnClick(item2, scope.row)" v-for="item2 in item.operationBtn" :key="item2.id">
                        <span>{{ item2.label }}</span>
                      </el-dropdown-item>
                    </template>
                  </el-dropdown>

                  <!-- <el-popover :width="300"
                    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
                    <template #reference>
                      <el-button type="primary">
                        操作<el-icon class="el-icon--right">
                          <arrow-down />
                        </el-icon>
                      </el-button>
                    </template>
                    <template #default>
                      <div style="width:100%">
                        <el-button v-for="item2 in item.operationBtn" :key="item2.id" @click="btnClick(item2, scope.row)" style="width:100%">
                        {{ item2.label }}
                      </el-button>
                      </div>
                    </template>
                  </el-popover> -->

                  <!-- <Dropdown :title="'11'"></Dropdown> -->
                </template>
              </template>
            </el-table-column>


          </template>
        </el-table>
      </el-skeleton>
    </el-col>

    <el-col style="padding: 12px" v-show="page.total >= 0">
      <el-skeleton :rows="5" animated :loading="loading" :throttle="500">
        <el-pagination v-model:currentPage="page.currentPage" v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="page.total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: right" />
      </el-skeleton>
    </el-col>
  </el-row>
</template>

<script lang="ts">
interface MainTable {
  checkList: string[],
  page: PaginationInterface,
  searchFormData: object,
  searchFormDataCopy: {
    currentPage: number,
    pageSize: number,
    searchData: object;
  },
  tableData: tableConfigType<unknown>,
  loading: boolean,
  sortable: Sortable;
  formatterFieldList: string[],
  formatterDataList: any,
}
import { PaginationInterface } from "#/ele";
import { columnsBtnType, columnsType, tableConfigType, tableConfigTypes } from "./MainTable";
import {
  ComponentInternalInstance,
  computed,
  ComputedRef,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  ToRefs,
  toRefs,
  unref,
  watch,
} from "vue";
import EventBus from "@/utils/mitt/mitt";
import Sortablejs from 'sortablejs';
import type Sortable from 'sortablejs';
import { ElMessage } from "element-plus";
import { isNullAndUnDef } from "@/utils/is";
import { cloneDeep } from 'lodash-es';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import dictServiceImpl from '@/api/dict/index';
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
      required: false,
      default: () => {
        return {};
      },
    },
    tableConfig: {
      type: tableConfigTypes,
      // type: Object,
      required: true,
    },
    // aaa:{
    //   type:PersonTypeHelper,
    //   required:true
    // },
  },
  setup(props) {
    let Pctx: ComponentInternalInstance | null | undefined = inject("Pctx");

    /**
     * 初始化状态
     * @date 2022-12-08
     * @returns {any}
     */
    const initState = (): MainTable => {
      return {
        checkList: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        searchFormData: props.searchData,
        searchFormDataCopy: {
          currentPage: 1,
          pageSize: 10,
          searchData: {},
        },
        tableData: props.tableConfig,
        loading: true,
        sortable: null,
        formatterFieldList:[],
        formatterDataList:{}
      };
    };
    const model = reactive(initState());
    let data: ToRefs<MainTable> = toRefs(model);

    const Columns = computed(() => model.tableData.columns) as ComputedRef<Array<columnsType>>;

    for (const item of Columns.value) {
      if(item.slot){
        model.formatterFieldList.push((item.prop as string));
      }
    }

    const refreshTable = () => {
      initTableData(1, 10, props.searchData);
    };

     onMounted(async() => {
      EventBus.on('refresh', refreshTable);
      initTableData(1, 10, props.searchData);
      if(model.formatterFieldList.length>0){
        const {data} = await dictServiceImpl.queryDictByDictType(model.formatterFieldList)
        model.formatterDataList = data
      }
    });

    onBeforeUnmount(() => {
      EventBus.off('refresh', refreshTable);
    });

    /**
     * 查询表格方法
     * @date 2022-12-08
     * @param {any} currentPage:number
     * @param {any} pageSize:number
     * @param {any} searchData:object
     * @returns {any}
     */
    const initTableData = async (
      currentPage: number,
      pageSize: number,
      searchData: object
    ): Promise<void> => {
      model.searchFormDataCopy = Object.assign({}, JSON.parse(JSON.stringify({ currentPage, pageSize, searchData })));
      let { data } = await props.searchFn(currentPage, pageSize, searchData);
      model.page.total = data.total;
      model.loading = false;
      model.tableData.tableProps.data = data.results;
    };

    watch(
      () => props.searchData,
      (newValue, oldValue) => {
        model.searchFormData = newValue as object;
        console.log(newValue, "tttttnewValue", oldValue, "tttttoldValue");
        initTableData(1, model.page.pageSize, newValue as object);
      }
    );

    /**
     * 新增弹窗
     * @date 2022-12-08
     * @returns {any}
     */
    const add = (): void => {
      try {
        Pctx?.proxy?.openDialog();
      } catch (error) {
        console.error("缺少openDialog方法");
      }
    };

    /**
     * 改变条数
     * @date 2022-12-08
     * @param {any} pageSize:number
     * @returns {any}
     */
    const handleSizeChange = (pageSize: number): void => {
      if (pageSize * (model.page.currentPage - 1) > model.page.total) return;
      model.page.pageSize = pageSize;
      initTableData(model.page.currentPage, model.page.pageSize, props.searchData);
    };

    /**
     * 改变页数
     * @date 2022-12-08
     * @param {any} currentPage:number
     * @returns {any}
     */
    const handleCurrentChange = (currentPage: number): void => {
      model.page.currentPage = currentPage;
      initTableData(model.page.currentPage, model.page.pageSize, props.searchData);
    };

    /**
     * 刷新表格
     * @date 2022-12-08
     * @returns {any}
     */
    const refresh = (): void => {
      const { currentPage, pageSize, searchData } = model.searchFormDataCopy;
      initTableData(currentPage, pageSize, searchData);
    };
    const columnListRef = ref(null);


    const popoverShow = () => {
      // model.checkList = model.tableData.columns?.filter(item => item.show !== false) || []
      // checkList
      nextTick(() => {
        const columnListEl = unref(columnListRef);
        if (!columnListEl) return;
        // if (!el) return;
        // Drag and drop sort
        model.sortable = Sortablejs.create(unref(columnListEl), {
          animation: 500,
          delay: 400,
          delayOnTouchOnly: true,
          handle: '.table-column-drag-icon',
          onEnd: (evt) => {
            const { oldIndex, newIndex } = evt;
            if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
              return;
            }
            const oldRow = cloneDeep(Columns.value[oldIndex]);
            const newRow = cloneDeep(Columns.value[newIndex]);
            Columns.value[oldIndex] = cloneDeep(newRow);
            Columns.value[newIndex] = cloneDeep(oldRow);
            console.log(evt, oldIndex, newIndex, Columns.value);
            // // Sort column
            // const columns = cloneDeep(plainSortOptions.value);

            // if (oldIndex > newIndex) {
            //   columns.splice(newIndex, 0, columns[oldIndex]);
            //   columns.splice(oldIndex + 1, 1);
            // } else {
            //   columns.splice(newIndex + 1, 0, columns[oldIndex]);
            //   columns.splice(oldIndex, 1);
            // }

            // plainSortOptions.value = columns;

            // setColumns(
            //   columns
            //     .map((col: Options) => col.value)
            //     .filter((value: string) => state.checkedList.includes(value)),
            // );
          },
        });
        // 记录原始order 序列
        // sortableOrder = sortable.toArray();
        // inited = true;
      });
    };

    const handleSelectCheckChange = (): void => {
      console.log(model.tableData.columns, model.checkList);
    };



    const btnClick = (item: columnsBtnType, row): void => {
      if(!Pctx){
        ElMessage({
          message: "父级没有注入ctx",
          type: "warning",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      console.log(item, row, eval(item.visible), Pctx!.proxy);
      if (item.visible) {
        if (!eval(item.visible)) {
          ElMessage({
            message: "当前状态不符合",
            type: "warning",
          });
          return;
        }
      }
      try {
        eval('Pctx.proxy.' + item.fn);
      } catch (error) {
        console.error(error);
      }
    };

    /**
     * 固定列
     * @date 2023-01-05
     * @returns {any}
     */
    const fixeds = (row: columnsType, type: boolean | 'left' | 'right'): void => {
      if (!row.visible) return;
      Columns.value.forEach(item => {
        if (item.label == row.label) {
          item.fixed == type ? item.fixed = false : item.fixed = type;
        }
      });
      console.log(row, type);
    };

    const formatterSlot = (row:columnsType)=>{
      console.log(row,model.formatterDataList,111)
    }

    return {
      add,
      handleSizeChange,
      handleCurrentChange,
      ...data,
      refreshTable,
      refresh,
      popoverShow,
      columnListRef,
      handleSelectCheckChange,
      Columns,
      btnClick,
      fixeds,
      formatterSlot,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Dropdown
  },
});
</script>
<style lang="stylus" scoped>
.container{
  padding:12px
  width:100%
}
.tableTop{
  height:32px;
  margin-bottom:12px
}
.tableConfig{
  margin-left: 6px
  height: 100%
  cursor pointer
  width 1.3rem
  height 1.3rem
  font-size 1.3rem
}
.table-column-drag-icon {
    margin: 0 5px;
    cursor: move;
  }
.fixed-left,.fixed-right  {
  margin-right:12px;
  cursor: pointer;
  :hover{
    color:var(--el-color-primary)
  }
}
.active{
  color:var(--el-color-primary)
}
.disabled {
  cursor: not-allowed;
}
</style>
