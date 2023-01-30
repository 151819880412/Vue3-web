<template>
  <div class="dropdown" ref="dropDownRef">
    <a @click.prevent="toggleOpen" class="btn btn-secondary dropdown-toggle" href="#">
      {{ title }}
    </a>
    <div class="dropdown-menu" :style="{ display: 'block' }" v-show="isOpen">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted,  getCurrentInstance, ComponentInternalInstance } from "vue";
export default defineComponent({
  name: "DropDown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup(context) {
    // 获取挂载点元素

    const isOpen = ref(false);
    //vue3.0获取dom对象的引用
    const dropDownRef = ref<null | HTMLElement>(null);
    const instance = getCurrentInstance() as ComponentInternalInstance;
    // let aaa = instance!.proxy!.$el as Node
    console.log(context, instance, 111);
    // 将组件的根元素添加到 body 元素上
    // document.body.appendChild(aaa);
    // 将挂载点元素添加到组件的根元素中
    // dropDownRef.value!.appendChild(aaa);

    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const handleClick = (e: MouseEvent) => {
      console.log(e.target, "e");
      if (dropDownRef.value) {
        console.log(dropDownRef.value);
        if (
          //contains判断节点是否包含节点
          !dropDownRef.value.contains(e.target as HTMLElement) &&
          isOpen.value
        ) {
          isOpen.value = false;
        }
      }
    };
    onMounted(() => {
      //注册全局的点击事件
      document.addEventListener("click", handleClick);
    });
    onUnmounted(() => {
      //解绑
      document.removeEventListener("click", handleClick);
    });
    return {
      isOpen,
      toggleOpen,
      dropDownRef,
    };
  },
  mounted() {
    // 将组件的根元素添加到 body 元素上
    // document.body.appendChild(this.dropDownRef.value);
  },
  // beforeDestroy() {
  //   // 从 body 元素中移除组件的根元素
  //   document.body.removeChild(this.dropDownRef.value);
  // },
});
</script>
<style>
.dropdown-menu {
  position: absolute;
  z-index: 999999999999;
}
</style>