<template>
  <el-row class="container containerTop">
    <el-col>
      <el-icon>
        <Search />
      </el-icon>
      <span> 筛选数据</span>
    </el-col>
    <el-col>
      <ElForms :formConfig="formConfig" ref="queryForm" />
      <div style="float: right">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="clear">刷新</el-button>
        <slot name="searchBtn"></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { FormInterface, Rules, Options } from "#/form-config";
import { defineComponent, ref, PropType, inject, ComponentInternalInstance } from "vue";
import ElForms from "@/components/ElForm/ElForms.vue";

export default defineComponent({
  name: "SearchForm",
  props: {
    formConfig: {
      type: Array as PropType<FormInterface<Rules, Options>[]>,
      default: () => []
    },
  },
  setup() {

    let Pctx = inject('Pctx') as ComponentInternalInstance;

    const queryForm = ref();

    const search = () => {
      try {
        queryForm.value.validate((formData) => Pctx?.proxy?.submitSearch(formData));
      } catch (error) {
        console.error('缺少submitSearch方法');
      }
    };

    const clear = () => {
      queryForm.value.neoResetFields();
      Pctx?.proxy?.submitSearch({});
    };

    return {
      queryForm,
      search,
      clear,
    };
  },
  components: {
    ElForms,
  },
});
</script>
<style lang="stylus" scoped>

.container{
  border:1px solid #ebeef5
  padding:12px
  width:100%
}
.containerTop{
  margin-bottom:12px
}
</style>
