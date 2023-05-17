<template>
  <div class='login'>login</div>
</template>

<script lang='ts'>
interface login {
}
import { useUserStoreWithOut } from '@/store/modules/user';
import { UserInfo } from '@/types/store';
import { reactive, toRefs, defineComponent, ToRefs } from 'vue';
export default defineComponent({
  name: 'login',
  props: [],
  setup() {
    const userStore = useUserStoreWithOut();
    let user = {
      "auth": [
        {
          "menuName": "系统",
          "componentName": "system",
          "path": "/system",
          "componentPath": "LAYOUT",
          "children": [
            {
              "menuName": "用户",
              "componentName": "user",
              "path": "/system/user",
              "componentPath": "/user/user",
            },
          ]
        },
        {
          "menuName": "组件",
          "componentName": "components",
          "path": "/components",
          "componentPath": "LAYOUT",
          "children": [
            {
              "menuName": "选人组件",
              "componentName": "SelectUser",
              "path": "/components/selectUser",
              "componentPath": "/selectUser/selectUser",
            }
          ]
        }
      ],
    } as unknown as UserInfo;
    userStore.setUserInfo(user);

    const initState = (): login => {
      return {
      };
    };
    const model: login = reactive(initState());
    let data: ToRefs<login> = toRefs(model);
    let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
    };
    return {
      ...data,
      resetState
    };
  }
});
</script>
<style lang='stylus' scoped>
</style>