<template>
  <div class='errorLog'>

    <el-row>
      <el-col :span="14">
        <span>错误日志列表</span>
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
            <el-button key="primary" type="primary" link @click="detail(scopeData.row)">详情</el-button>
          </template> -->
        </MainTable>
      </el-col>
    </el-row>

    <DialogMask ref="dialogMask">
      <template v-slot:dialogMaskFooterSlot>
        <div></div>
      </template>
    </DialogMask>

  </div>
</template>

<script lang='ts'>
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface errorLog {
  images: Array<string>;
  tableData: tableConfigType<ComputedRef<any>>;
  dialogFormConfig: Array<FormInterface<Rules, Options>>;

}
import errorLogServiceImpl from '@/api/errorLog';
import { ErrorlogPageModel } from '@/api/errorLog/service/model/errorLogModel';
import { tableConfigType } from '@/components/MainTable/MainTable';
import { reactive, toRefs, defineComponent, ToRefs, ComputedRef, ref, getCurrentInstance, ComponentInternalInstance, provide } from 'vue';
import DialogMask from "@/components/DialogMask/DialogMask.vue";
import { FormInterface, Options, Rules } from "#/form-config";

export default defineComponent({
  name: 'errorLog',
  props: [],
  setup() {
    const ctx = getCurrentInstance() as ComponentInternalInstance;
    provide("Pctx", ctx);
    const dialogMask = ref<InstanceType<typeof DialogMask>>();

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
              visible:true
            },
            {
              label: "类型",
              prop: "type",
              showOverflowTooltip: true,
              visible:true
            },
            {
              label: "URL",
              prop: "url",
              showOverflowTooltip: true,
              visible:true
            },
            {
              label: "时间",
              prop: "time",
              showOverflowTooltip: true,
              visible:true
            },
            {
              label: "文件",
              prop: "file",
              showOverflowTooltip: true,
              visible:true
            },
            {
              label: "Name",
              prop: "name",
              showOverflowTooltip: true,
              visible:true
            },
            {
              label: "错误信息",
              prop: "message",
              showOverflowTooltip: true,
              visible:true
            },
            {
              label: "stack信息",
              prop: "stack",
              showOverflowTooltip: true,
              visible:true
            },
            {
              label: "详情",
              width: 80,
              // slot: "handleSlot",
              align: "center",
              visible:true,
              operationBtn: [
                {
                  label:"详情",
                  operationFn: 'detail(row)'
                },
              ]
            },
          ],
        },
        dialogFormConfig: [
          {
            type: "input",
            title: "类型",
            field: "type",
            defaultValue: "",
            maxlength: 40,
            required: false,
            rules: [],
            col: {
              span: 12,
            },
            isShow: true,
            props: {
              disabled: true
            }
          },
          {
            type: "input",
            title: "URL",
            field: "url",
            defaultValue: "",
            maxlength: 40,
            required: false,
            rules: [],
            col: {
              span: 12,
            },
            isShow: true,
            props: {
              disabled: true
            }
          },
          {
            type: "input",
            title: "时间",
            field: "time",
            defaultValue: "",
            maxlength: 40,
            required: false,
            rules: [],
            col: {
              span: 12,
            },
            isShow: true,
            props: {
              disabled: true
            }
          },
          {
            type: "input",
            title: "文件",
            field: "file",
            defaultValue: "",
            maxlength: 40,
            required: false,
            rules: [],
            col: {
              span: 12,
            },
            isShow: true,
            props: {
              disabled: true
            }
          },
          {
            type: "input",
            title: "Name",
            field: "name",
            defaultValue: "",
            maxlength: 40,
            required: false,
            rules: [],
            col: {
              span: 12,
            },
            isShow: true,
            props: {
              disabled: true
            }
          },
          {
            type: "input",
            title: "错误信息",
            field: "message",
            defaultValue: "",
            maxlength: 40,
            required: false,
            rules: [],
            col: {
              span: 12,
            },
            isShow: true,
            props: {
              disabled: true
            }
          },
          {
            type: "input",
            title: "stack信息",
            field: "stack",
            defaultValue: "",
            maxlength: 40,
            required: false,
            rules: [],
            col: {
              span: 24,
            },
            isShow: true,
            props: {
              disabled: true,
              type: 'textarea',
              autosize: { minRows: 6, maxRows: 8 },

            }
          },
        ]
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

    const detail = async (row: ErrorlogPageModel): Promise<void> => {
      let { data } = await errorLogServiceImpl.queryById(row.errorLogId);
      await dialogMask?.value?.initConfig(model.dialogFormConfig, data);
      dialogMask.value?.openDialog("Add");
    };

    return {
      ...data,
      errorLogServiceImpl,
      toAxiosErr,
      toVueErr,
      toResourceErr,
      detail,
      dialogMask
    };
  }
});
</script>
<style lang='stylus' scoped>
.errorLog{
  padding 0.5rem
}
</style>