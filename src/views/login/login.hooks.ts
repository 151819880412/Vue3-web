import { ElFormConfig, Options, Rules } from "#/form-config";

import { Ref, ref } from "vue";
import loginServiceImpl from "@/api/login/index";
import { useRouter } from "vue-router";
export default function () {
  const router = useRouter()
  const refDataForm = ref();
  const configArr: Array<ElFormConfig<Rules, Options>> = [
    {
      type: "Input",
      title: "用户名",
      field: "username",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入用户名", required: true, trigger: "blur" }],
      on: [],
    },
    {
      type: "Input",
      title: "密码",
      field: "password",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入密码", required: true, trigger: "blur" }],
      on: [],
      props: {
        "show-password": true,
      },
    },
  ];

  const loginFormRule: Ref<Array<ElFormConfig<Rules, Options>>> = ref(configArr);

  const changeDataForm = ref();
  const configArr2: Array<ElFormConfig<Rules, Options>> = [
    {
      type: "Input",
      title: "用户名",
      field: "username",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入用户名", required: true, trigger: "blur" }],
      on: [],
    },
    {
      type: "Input",
      title: "旧密码",
      field: "password",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入旧密码", required: true, trigger: "blur" }],
      on: [],
      props: {
        "show-password": true,
      },
    },
    {
      type: "Input",
      title: "新密码",
      field: "newPassword",
      value: "",
      maxlength: 20,
      required: true,
      rules: [{ message: "请输入新密码", required: true, trigger: "blur" }],
      on: [],
      props: {
        "show-password": true,
      },
    },
  ];

  const changeDataFormRule: Ref<Array<ElFormConfig<Rules, Options>>> = ref(configArr2);

  // methods
  const getToken = async (formData) => {
    const data = await loginServiceImpl.login(formData);
    localStorage.setItem("token", data.accessToken);
    router.push({
      path:'home'
    })
    console.log(data);
  };
  const toLogin = () => {
    refDataForm.value.validate((formData) => getToken(formData));
  }

  const changePwd = () => {
    const reset = async (formData) => {
      const data = await loginServiceImpl.changePwd(formData);
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
