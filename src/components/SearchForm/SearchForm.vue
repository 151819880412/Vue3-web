<template>
  <el-row class="container containerTop">
    <el-col>
      <el-icon>
        <Search />
      </el-icon>
      <span> 筛选数据</span>
    </el-col>
    <el-col :style="{ height: isOpen ? '' : '50px' }" style="overflow:hidden">
      <ElForms :formConfig="formConfig" :formData="formData" ref="queryForm" />
    </el-col>
    <el-col>
      <div style="float: right">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="clear">刷新</el-button>
        <slot name="searchBtn"></slot>
        <el-button type="primary" link @click="toggleAdvanced">
          <span style="margin-right:6px">{{ isOpen ? '收起' : '展开' }}</span>
          <el-icon :class="{ 'rotate180': isOpen }" class="rotate">
            <ArrowDown />
          </el-icon>
        </el-button>
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
    formData: {
      type: Object
    }
  },
  setup() {

    let Pctx = inject('Pctx') as ComponentInternalInstance;

    const queryForm = ref();
    let isOpen = ref(false);

    const search = (): void => {
      try {
        queryForm.value.validate((formData) => Pctx?.proxy?.submitSearch(formData));
      } catch (error) {
        console.error('缺少submitSearch方法');
      }
    };

    const clear = (): void => {
      queryForm.value.neoResetFields();
      Pctx?.proxy?.submitSearch({});
    };

    const toggleAdvanced = (): void => {
      isOpen.value = !isOpen.value;
    };

    return {
      queryForm,
      search,
      clear,
      toggleAdvanced,
      isOpen,
    };
  },
  components: {
    ElForms,
  },
});
</script>
<style lang="stylus" scoped>

.container{
  padding:12px
  width:100%
}
.containerTop{
  margin-bottom:12px
}
</style>
