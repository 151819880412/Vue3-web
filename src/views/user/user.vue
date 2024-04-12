<template>
  <div class='user'>
    <RForm ref="RFormRef" :formData="formData" />
    <el-button @click="aaa">数据</el-button>
    <el-button @click="showButton">展示异步组件</el-button>
    <Suspense v-if="isShowButton">
      <template #default>
        <AsyncViews />
      </template>
      <template #fallback>
        <div>组件加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script lang='ts'>
import RForm from '@/components/RElForm/RForm';
interface user {
  isShowButton: boolean;
  showButton: () => void;
  formData: Record<string, unknown>;
}
import { toRefs, defineComponent, ToRefs, defineAsyncComponent, reactive, ref } from 'vue';
export default defineComponent({
  name: 'User',
  props: [],
  setup() {

    const RFormRef = ref();


    const initState = (): user => {
      return {
        isShowButton: false,
        showButton: () => {
          model.isShowButton = true;
        },
        formData: {
          aaa: 111,
          bbb: 111,
        }
      };
    };


    const model: user = reactive(initState());
    let data: ToRefs<user> = toRefs(model);
    let resetState = (): void => {
      Object.assign(model, initState());
    };

    const aaa = () => {
      console.log(model, RFormRef.value.rElFormRef );
    };


    return {
      ...data,
      resetState,
      aaa,
      RFormRef,
    };
  },

  components: {
    RForm,
    // 延时不生效
    // AsyncViews: defineAsyncComponent({
    //   // 加载函数
    //   loader: () => import("@/views/defineAsyncComponent/DefineAsyncComponent.vue"),
    //   // 加载异步组件时使用的组件
    //   loadingComponent: () => import("@/views/defineAsyncComponent/LoadingComponent.vue"),
    //   // 展示加载组件前的延迟时间，默认为 200ms
    //   delay: 2000,
    //   // 加载失败后展示的组件
    //   errorComponent: () => import("@/views/defineAsyncComponent/ErrorComponent.vue"),
    //   // 如果提供了一个 timeout 时间限制，并超时了
    //   // 也会显示这里配置的报错组件，默认值是：Infinity
    //   timeout: 3000
    // }),
    AsyncViews: defineAsyncComponent(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(import("@/views/defineAsyncComponent/DefineAsyncComponent.vue") as unknown as PromiseLike<{ default: never; }>);
        }, 1000);
      });
    })
  }
});
</script>
<style lang='stylus' scoped>
</style>