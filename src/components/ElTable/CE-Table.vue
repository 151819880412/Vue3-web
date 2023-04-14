<template>
  <div class='CETable'>
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
            <div class="tableConfig" @click="refreshTable">
              <el-icon>
                <Refresh />
              </el-icon>
            </div>
          </el-tooltip>

          <!-- 列设置 -->
          <el-tooltip effect="dark" content="列设置" placement="top">
            <div class="tableConfig">
              <el-popover placement="top" :width="330" trigger="click" @show="popoverShow">
                <div ref="columnListRef">
                  <div v-for="item in tableColumns" :key="item.ceId" style="position:relative">
                    <div style="display:flex;align-items:center;width:100%">
                      <el-icon class="table-column-drag-icon">
                        <Rank />
                      </el-icon>
                      <el-checkbox style="margin:0 5px" v-model="item.ceShow" />
                      <span>{{ item.label }}</span>
                    </div>
                    <span style="position: absolute;right: 0px;top: 10px;">
                      <el-tooltip class="box-item" effect="dark" content="固定到左侧" placement="bottom">
                        <el-icon class="fixed-left" @click.prevent="fixeds(item, 'left')"
                          :class="{ 'active': item.fixed == 'left', disabled: !item.ceShow }">
                          <Back />
                        </el-icon>
                      </el-tooltip>
                      <el-tooltip class="box-item" effect="dark" content="固定到右侧" placement="bottom">
                        <el-icon class="fixed-right" @click.prevent="fixeds(item, 'right')"
                          :class="{ 'active': item.fixed == 'right', disabled: !item.ceShow }">
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
      <!-- 表格 -->
      <el-col>
        <el-skeleton :rows="5" animated :loading="loading" :throttle="500">
          <el-table v-bind="ceTable" style="width: 100%">
            <el-table-column label="序号" type="index" width="70" align="center"></el-table-column>
            <template v-for="item in ceTable.column" :key="item.ceId">
              <template v-if="item.ceShow">

                <el-table-column v-bind="item" v-if="item.type === 'operation'">
                  <template #default="scope">
                    <el-dropdown>
                      <el-button type="primary">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <template v-for="item2 in item.operationBtn" :key="item2.label">
                            <el-dropdown-item v-if="showDropdownItems(item2.ceShow, scope.row)"
                              @click="dropdownItemsFn(item2.operationMethod, scope.row)">{{ item2.label }}</el-dropdown-item>
                          </template>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                </el-table-column>

                <el-table-column v-bind="item" v-else-if="item.type == 'selection'">
                </el-table-column>

                <el-table-column v-bind="item" v-else>
                  <template #default="scope">
                    {{ formatter(item, scope.row) }}
                  </template>
                </el-table-column>
              </template>
            </template>
          </el-table>
        </el-skeleton>
      </el-col>
      <!-- 分页 -->
      <el-col style="padding: 12px" v-show="page.total >= 0">
        <el-skeleton :rows="5" animated :loading="loading" :throttle="500">
          <el-pagination v-model:currentPage="page.currentPage" v-model:page-size="page.pageSize"
            :page-sizes="[10, 20, 30, 40, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="page.total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: right" />
        </el-skeleton>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
interface CETableModel<T> {
  page: PaginationInterface,

  ceTable: CETableProps<T>;
  initCETable: (data: Partial<CETableProps<T>>) => void;
  refreshTable: () => void;
  loading: boolean,
  initTableData: any;
  searchFormDataCopy: {
    currentPage: number,
    pageSize: number,
    searchData: object;
  },
  formatter: (item: CETableColumnProps, row: T) => string;
  add: () => void;
  popoverShow: () => void;
  tableColumns: CETableColumnProps[];
  fixeds: (row: CETableColumnProps, type: boolean | 'left' | 'right') => void;
  sortable: Sortable;
  handleSizeChange: (pageSize: number) => void;
  handleCurrentChange: (currentPage: number) => void;

}

import { PaginationInterface } from '#/ele';
import { CETable, CETableProps } from '@/@types/CETable/CETable';
import { CEColumn, CETableColumnProps } from '@/@types/CETable/CETableColumn';
import { StateMap } from '@/enums/stateEnum';
import EventBus from '@/utils/mitt/mitt';
import { ElMessage } from 'element-plus';
import { reactive, toRefs, getCurrentInstance, defineComponent, ComponentInternalInstance, ToRefs, inject, nextTick, onMounted, ref, unref } from 'vue';
import type Sortable from 'sortablejs';
import Sortablejs from 'sortablejs';
import { isNullAndUnDef } from '@/utils/is';
import { getUuid } from '@/utils';

export default defineComponent({
  name: 'CETable',
  props: {
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
  },
  setup(props) {
    const ctx: ComponentInternalInstance | null = getCurrentInstance();
    let Pctx: ComponentInternalInstance | null | undefined = inject("Pctx");
    const columnListRef = ref();


    const initState = <T>(): CETableModel<T> => {
      // 函数体
      return {
        add: (): void => {
          try {
            Pctx?.proxy?.openDialog();
          } catch (error) {
            ElMessage({
              message: "缺少openDialog方法",
              type: "error",
            });
            console.error("缺少openDialog方法");
          }
        },
        tableColumns: [],
        fixeds: (row: CETableColumnProps, type: boolean | 'left' | 'right'): void => {
          if (!row.ceShow) return;
          model.tableColumns.forEach(item => {
            if (item.label == row.label) {
              item.fixed == type ? item.fixed = false : item.fixed = type;
            }
          });
        },
        sortable: null,
        popoverShow: () => {
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
              onEnd: (evt: Sortable.SortableEvent) => {
                const { oldIndex, newIndex } = evt;
                if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
                  return;
                }
                const item = model.tableColumns.splice(evt.oldIndex, 1)[0];
                model.tableColumns.splice(newIndex, 0, item);
                model.tableColumns[0].ceId = getUuid();
                model.ceTable.column = model.tableColumns;
              },

            });
          });
        },
        ceTable: new CETable({}),
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        initCETable: (data: Partial<CETableProps<T>>) => {
          const column: CETableColumnProps[] = [];
          if (data.column) {
            data.column.forEach(item => {
              column.push(new CEColumn(item));
            });
          }
          model.tableColumns = column;

          model.ceTable = Object.assign({}, new CETable(data), { column });
        },
        loading: true,
        searchFormDataCopy: {
          currentPage: 1,
          pageSize: 10,
          searchData: {},
        },
        initTableData: async (
          currentPage: number,
          pageSize: number,
          searchData: object
        ): Promise<void> => {
          model.searchFormDataCopy = Object.assign({}, JSON.parse(JSON.stringify({ currentPage, pageSize, searchData })));
          if(props.searchFn){
            let { data } = await props.searchFn(currentPage, pageSize, searchData);
            model.page.total = data.total;
            model.loading = false;
            model.ceTable.data = data.results;
          }
        },
        refreshTable: () => {
          model.initTableData(1, 10, props.searchData);
        },
        formatter: (item: any, row: any) => {
          if (item.ceFormatter) {
            return StateMap.get(row[item.ceFormatter]);
          }
          return row[item.prop];
        },
        // 改变条数
        handleSizeChange: (pageSize: number): void => {
          if (pageSize * (model.page.currentPage - 1) > model.page.total) return;
          model.page.pageSize = pageSize;
          model.initTableData(model.page.currentPage, model.page.pageSize, props.searchData);
        },
        // 改变页数
        handleCurrentChange: (currentPage: number): void => {
          model.page.currentPage = currentPage;
          model.initTableData(model.page.currentPage, model.page.pageSize, props.searchData);
        }
      };
    };
    const model: CETableModel<any> = reactive(initState());
    let data: ToRefs<CETableModel<any>> = toRefs(model);
    let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
    };
    const dropdownItemsFn = (operationMethod: string, row: any) => {
      if (!Pctx) {
        ElMessage({
          message: "父级没有注入ctx",
          type: "warning",
        });
      }
      try {
        Pctx?.proxy![operationMethod](row);
      } catch (error) {
        console.error(error);
      }
    };

    const showDropdownItems = (condition: string | boolean, row: any) => {
      row;
      if (typeof condition === "string") {
        return eval(condition);
      }
      return condition;
    };

    onMounted(async () => {
      nextTick(() => {
        EventBus.on('refresh', model.refreshTable);
        model.initTableData(1, 10, props.searchData);
        // if (model.formatterFieldList.length > 0) {
        //   const { data } = await dictServiceImpl.queryDictByDictType(model.formatterFieldList);
        //   model.formatterDataList = data;
        // }
      });
    });

    return {
      ...data,
      resetState,
      dropdownItemsFn,
      showDropdownItems,
      Pctx,
      ctx,
      columnListRef,
    };
  }
});
</script>
<style lang='stylus' scoped>

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