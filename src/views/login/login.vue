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
      "id": 8,
      "username": "1",
      "password": "qwe123",
      "phone": "18000000000",
      "type": "customer",
      "userId": "029c89b9-1324-4b72-bf31-e84e1a27f73a",
      "state": 0,
      "delFlag": 0,
      "createdTime": "2023-01-30 14:51:01",
      "updatedTime": null,
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiIxIiwicGFzc3dvcmQiOiJxd2UxMjMiLCJwaG9uZSI6IjE4MDAwMDAwMDAwIiwidHlwZSI6ImN1c3RvbWVyIiwidXNlcklkIjoiMDI5Yzg5YjktMTMyNC00YjcyLWJmMzEtZTg0ZTFhMjdmNzNhIiwic3RhdGUiOjAsImRlbEZsYWciOjAsImNyZWF0ZWRUaW1lIjoiMjAyMy0wMS0zMCAxNDo1MTowMSIsInVwZGF0ZWRUaW1lIjpudWxsLCJpYXQiOjE2ODQyMjY3NzIsImV4cCI6MTY4NDMxMzE3Mn0.8Fzwp3kweSqZwdSV3pN1bJrK6hMjB2p2zQ1f0y0ttdA",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiIxIiwicGFzc3dvcmQiOiJxd2UxMjMiLCJwaG9uZSI6IjE4MDAwMDAwMDAwIiwidHlwZSI6ImN1c3RvbWVyIiwidXNlcklkIjoiMDI5Yzg5YjktMTMyNC00YjcyLWJmMzEtZTg0ZTFhMjdmNzNhIiwic3RhdGUiOjAsImRlbEZsYWciOjAsImNyZWF0ZWRUaW1lIjoiMjAyMy0wMS0zMCAxNDo1MTowMSIsInVwZGF0ZWRUaW1lIjpudWxsLCJpYXQiOjE2ODQyMjY3NzIsImV4cCI6MTY4NDgzMTU3Mn0.3TuCzQm3k4MEpviwjZBHOp0kVB52Gz0q3MxbCJqVPE8",
      "roles": [
        {
          "id": 5,
          "roleId": "cc0a0cbc-c9a0-417b-b3af-9d3e7b8dadfd",
          "roleName": "1",
          "state": 0,
          "delFlag": 0,
          "createdTime": "2022-09-27 14:32:31",
          "updatedTime": "2023-02-03 16:40:34"
        },
        {
          "id": 19,
          "roleId": "31cb0de3-860c-4e83-a033-2d2d4538ae62",
          "roleName": "admin",
          "state": 0,
          "delFlag": 0,
          "createdTime": "2022-11-30 09:56:06",
          "updatedTime": "2022-11-30 10:01:47"
        }
      ],
      "auth": [
        {
          "id": 5,
          "delFlag": 0,
          "state": 0,
          "createdTime": "2022-09-27 11:40:08",
          "updatedTime": "2023-05-16 16:46:13",
          "menuId": "85844f57-2917-44ba-8185-f36aee2ab63a",
          "parentId": null,
          "menuName": "系统",
          "componentName": "LAYOUT",
          "path": "/system",
          "componentPath": "LAYOUT",
          "btnName": null,
          "type": 0,
          "icon": "AddLocation",
          "sort": 2,
          "children": [
            {
              "id": 6,
              "delFlag": 0,
              "state": 0,
              "createdTime": "2022-09-27 11:40:22",
              "updatedTime": "2023-05-16 16:46:13",
              "menuId": "e7738a5d-fa2d-4a2a-866e-a4646be23bcc",
              "parentId": 5,
              "menuName": "用户",
              "componentName": "User",
              "path": "/system/user",
              "componentPath": "/user/user",
              "btnName": null,
              "type": 0,
              "icon": "AddLocation",
              "sort": 1,
              "children": []
            },
            {
              "id": 19,
              "delFlag": 0,
              "state": 0,
              "createdTime": "2023-02-08 17:01:19",
              "updatedTime": "2023-05-16 16:46:13",
              "menuId": "df8fcb85-5305-4fd9-b10c-576d9a00ac9e",
              "parentId": 5,
              "menuName": "模板维护",
              "componentName": "LAYOUT",
              "path": "/system/templateMaintain",
              "componentPath": "/templateMaintain/templateMaintain",
              "btnName": null,
              "type": 1,
              "icon": "AddLocation",
              "sort": 1,
              "children": []
            },
            {
              "id": 7,
              "delFlag": 0,
              "state": 0,
              "createdTime": "2022-09-27 11:40:35",
              "updatedTime": "2023-05-16 16:46:13",
              "menuId": "56385f1e-55b7-4cfb-a90c-a688c3401c08",
              "parentId": 5,
              "menuName": "角色",
              "componentName": "Role",
              "path": "/system/role",
              "componentPath": "/role/role",
              "btnName": null,
              "type": 0,
              "icon": "AddLocation",
              "sort": 2,
              "children": []
            },
            {
              "id": 8,
              "delFlag": 0,
              "state": 0,
              "createdTime": "2022-09-27 11:40:46",
              "updatedTime": "2023-05-16 16:46:13",
              "menuId": "336c6dce-32ca-47cf-a9b8-3fd46affbabc",
              "parentId": 5,
              "menuName": "菜单",
              "componentName": "Menu",
              "path": "/system/menu",
              "componentPath": "/menu/menu",
              "btnName": null,
              "type": 0,
              "icon": "AlarmClock",
              "sort": 3,
              "children": []
            },
            {
              "id": 10,
              "delFlag": 0,
              "state": 0,
              "createdTime": "2022-11-30 09:43:07",
              "updatedTime": "2023-05-16 16:46:13",
              "menuId": "83c065f3-39c9-400c-ad8d-f6c2de24b4a3",
              "parentId": 5,
              "menuName": "错误日志",
              "componentName": "ErrorLog",
              "path": "/system/errorlog",
              "componentPath": "/errorLog/errorLog",
              "btnName": null,
              "type": 1,
              "icon": "Apple",
              "sort": 4,
              "children": []
            },
            {
              "id": 16,
              "delFlag": 0,
              "state": 0,
              "createdTime": "2023-02-01 18:43:51",
              "updatedTime": "2023-05-16 16:46:13",
              "menuId": "9982316a-b443-4005-8e35-02e426822765",
              "parentId": 5,
              "menuName": "字典维护",
              "componentName": "Dict",
              "path": "/system/dict",
              "componentPath": "/dict/dict",
              "btnName": null,
              "type": 1,
              "icon": "ArrowDown",
              "sort": 5,
              "children": []
            }
          ]
        },
        {
          "id": 20,
          "delFlag": 0,
          "state": 0,
          "createdTime": "2023-05-15 10:00:40",
          "updatedTime": "2023-05-16 16:46:13",
          "menuId": "9b625723-ef7e-413a-b034-7e6c17a2e6e9",
          "parentId": null,
          "menuName": "组件",
          "componentName": "LAYOUT",
          "path": "/components",
          "componentPath": "LAYOUT",
          "btnName": null,
          "type": 0,
          "icon": "AddLocation",
          "sort": 2,
          "children": [
            {
              "id": 21,
              "delFlag": 0,
              "state": 0,
              "createdTime": "2023-05-15 10:03:38",
              "updatedTime": "2023-05-16 16:46:13",
              "menuId": "37d91488-8638-4fec-95cc-fed4c1882424",
              "parentId": 20,
              "menuName": "选人组件",
              "componentName": "LAYOUT",
              "path": "/components/selectUser",
              "componentPath": "/selectUser/selectUser",
              "btnName": null,
              "type": 0,
              "icon": "AlarmClock",
              "sort": 1,
              "children": []
            }
          ]
        }
      ],
      "btn": []
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