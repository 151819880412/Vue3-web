import { FormInterface, Options, Rules } from "#/form-config";

import { Ref, ref } from "vue";
import loginServiceImpl from "@/api/login/index";
import { useRouter } from "vue-router";
import { useUserStoreWithOut } from "@/piniaStore/modules/user";
export default function () {
  const router = useRouter();
  const refDataForm = ref();
  const configArr: Array<FormInterface<Rules, Options>> = [
    {
      type: "input",
      title: "用户名",
      field: "username",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入用户名", required: true, trigger: "blur" }],
      col: {
        span: 24
      },
      isShow: true,
    },
    {
      type: "input",
      title: "密码",
      field: "password",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入密码", required: true, trigger: "blur" }],
      col: {
        span: 24
      },
      props: {
        "show-password": true,
      },
      isShow: true,
    },
  ];

  const loginFormRule: Ref<Array<FormInterface<Rules, Options>>> = ref(configArr);

  const changeDataForm = ref();
  const configArr2: Array<FormInterface<Rules, Options>> = [
    {
      type: "input",
      title: "用户名",
      field: "username",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入用户名", required: true, trigger: "blur" }],
      col: {
        span: 24
      },
      isShow: true,
    },
    {
      type: "input",
      title: "旧密码",
      field: "password",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入旧密码", required: true, trigger: "blur" }],
      col: {
        span: 24
      },
      props: {
        "show-password": true,
      },
      isShow: true,
    },
    {
      type: "input",
      title: "新密码",
      field: "newPassword",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入新密码", required: true, trigger: "blur" }],
      col: {
        span: 24
      },
      props: {
        "show-password": true,
      },
      isShow: true,
    },
  ];

  const changeDataFormRule: Ref<Array<FormInterface<Rules, Options>>> = ref(configArr2);

  // methods
  const getToken = async (formData) => {
    const { data } = await loginServiceImpl.login(formData);
    const userStore = useUserStoreWithOut();
    userStore.setToken({ token: data.accessToken, refreshToken: data.refreshToken });
    userStore.setUserInfo(data);
    router.push({
      path: 'home'
    });
  };
  const toLogin = () => {
    refDataForm.value.validate((formData) => getToken(formData));
  };

  const changePwd = () => {
    const reset = async (formData) => {
      const { data } = await loginServiceImpl.changePwd(formData);
      console.log(data);
    };
    changeDataForm.value.validate((formData) => reset(formData));
  };

  // const getMenu = async (userId) =>{
  //   const data = await loginServiceImpl.queryRoleMenuList(userId);
  // }



  return {
    toLogin,
    changePwd,
    loginFormRule,
    refDataForm,
    changeDataForm,
    changeDataFormRule,
  };
}
