<template>
  <div class="login-container">
    <div class="login-frame">
      <div class="login-img">
        <img src="@/assets/images/login-img.jpg">
      </div>
      <div class="login-info">
        <div class="title">蓝海商家端管理系统</div>
        <div class="input-box">
          <div class="number inp-item"
            :class="[selectItem === 'username' ? 'selected' : '', usernameErrTips ? 'err-line' : '']">
            <img src="@/assets/images/number.png">
            <input v-model="loginInfo.username" type="text" placeholder="用户名" @focus="inputFocus('username')"
              @blur="inputDefocus('username')" :maxlength="20">
            <div class="err-tips" :style="{ height: usernameErrTips ? '16px' : '0' }">请输入正确的用户名</div>
          </div>
          <div class="password inp-item"
            :class="[selectItem === 'password' ? 'selected' : '', passwordErrTips ? 'err-line' : '']">
            <img src="@/assets/images/password.png">
            <input v-model="loginInfo.password" type="password" placeholder="密码" @keyup.enter="handleLogin"
              @focus="inputFocus('password')" @blur="inputDefocus('password')" :maxlength="16">
            <div class="err-tips" :style="{ height: passwordErrTips ? '16px' : '0' }">密码不能少于6位</div>
          </div>
        </div>
        <!-- <div>
          <span style="color: #999">还没有账号？</span>
          <span style="color: #007de4;cursor: pointer;" @click="jumpRoute('/register')">立即注册</span>
          <span style="color: #007de4;cursor: pointer;float:right">忘记密码</span>
        </div> -->
        <div class="login-btn" @click="handleLogin">登录</div>
      </div>

      <!-- <div class="login-info" v-if="fullPath === '/register'">
        <div class="title-box">
          <span>商家注册</span>
          <span style="font-size:14px">
            <span style="color: #999;">已有账号？</span>
            <span style="color: #007de4;cursor: pointer;" @click="jumpRoute('/login')">前去登录</span>
          </span>
        </div>
        <div class="input-box">
          <el-form ref="ruleFormRef" :model="registerForm" :rules="registerRules" class="demo-registerForm"
            size="large">
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" placeholder="请输入用户名" :maxlength="20" />
            </el-form-item>
            <el-form-item prop="phone">
              <el-input v-model="registerForm.phone" placeholder="请输入手机号" :maxlength="11" />
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model="registerForm.code" placeholder="请输入验证码" :maxlength="4">
                <template #append>
                  <span @click="getCode" style="cursor: pointer">获取验证码</span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password" placeholder="请输入密码" show-password :maxlength="16" />
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input v-model="registerForm.confirmPassword" placeholder="请确认密码" show-password :maxlength="16" />
            </el-form-item>
          </el-form>
        </div>
        <div class="login-btn" @click="handleRegister">注册</div>
      </div> -->
    </div>
  </div>
</template>


<script lang="ts">
import loginServiceImpl from "@/api/login";
import { useAppStoreWithOut } from "@/piniaStore/modules/app";
import { useUserStoreWithOut } from "@/piniaStore/modules/user";
import { Persistent } from "@/utils/cache/persistent";
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref, toRefs, ToRefs } from "vue";
import { useRouter } from "vue-router";

interface LoginFormType {
  username: string,
  password: string,
}

interface RegisterFormType {
  username: string,
  phone: string,
  code: string,
  password: string,
  confirmPassword: string,
}

interface LoginType {
  loginInfo: LoginFormType;
  usernameErrTips: boolean;
  passwordErrTips: boolean;
  selectItem: string;
  fullPath: string;
  registerForm: RegisterFormType;
  registerRules: any;
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  props: [],
  setup() {
    const router = useRouter();
    const ruleFormRef = ref();
    // 清空数据
    Persistent.clearAll();
    const userStore = useUserStoreWithOut();
    userStore.resetState();


    // 设置默认值，避免报错
    const appStore = useAppStoreWithOut();
    const initProjectData = {
      showBreadCrumb: true,
      showBreadCrumbIcon: true,
      multiTabsSetting: {
        show: true,
        showQuick: true
      },
      headerSetting: {
        show: true
      },
      showLogo: true,
      showFooter: true,
      showWatermark: false,
      menuTabs: [{
        title: '首页',
        path: '/home',
      }]
    };
    appStore.setProjectConfig(initProjectData);

    const initState = (): LoginType => {
      return {
        loginInfo: {
          username: "",
          password: "",
        },
        usernameErrTips: false,
        passwordErrTips: false,
        selectItem: '',
        fullPath: "",
        registerForm: {
          username: "",
          phone: "",
          code: "",
          password: "",
          confirmPassword: "",
        },
        registerRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: "请输入正确的手机号",
              trigger: "blur",
            },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
              message: "密码长度为6-16位且包含字母和数字",
              trigger: "blur",
            },
          ],
          confirmPassword: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            {
              validator: (_rule: any, value: any, callback: any) => {
                if (value !== loginModel.registerForm.password) {
                  callback(new Error("两次密码不一致"));
                }
                callback();
              }, trigger: "blur"
            }
          ],
        }
      };
    };

    const loginModel = reactive<LoginType>(initState());
    let loginData: ToRefs<LoginType> = toRefs(loginModel);


    loginModel.fullPath = router.currentRoute.value.fullPath;

    // 输入框聚焦监听
    const inputFocus = (item: string): void => {
      lightOutline(item);
      if (item === 'username') {
        loginModel.usernameErrTips = false;
      } else if (item === 'password') {
        loginModel.passwordErrTips = false;
      }
    };

    // 输入框失焦监听
    const inputDefocus = (item: string): void => {
      lightDisappear();
      judgeMonitorInput(item);
    };

    // 底边框恢复成灰色
    const lightDisappear = (): void => {
      loginModel.selectItem = '';
    };

    // 判断监听的是哪个输入框
    const judgeMonitorInput = (item: string): void => {
      if (item === 'username') {
        userNameVerification();
      } else if (item === 'password') {
        passwordVerification();
      }
    };

    // 用户名输入框验证
    const userNameVerification = (): void => {
      const username = loginModel.loginInfo.username;
      if (!username) {
        loginModel.usernameErrTips = true;
        return;
      } else {
        loginModel.usernameErrTips = false;
      }
    };

    // 密码输入框验证
    const passwordVerification = (): void => {
      const password = loginModel.loginInfo.password;
      if (password.length < 6) {
        loginModel.passwordErrTips = true;
        return;
      } else {
        loginModel.passwordErrTips = false;
      }
    };

    // 底边框换颜色
    const lightOutline = (item: string): void => {
      loginModel.selectItem = item;
    };

    // 登录
    const handleLogin = async (): Promise<void> => {
      userNameVerification();
      passwordVerification();
      if (!loginModel.usernameErrTips && !loginModel.passwordErrTips) {
        let { message, data } = await loginServiceImpl.login(loginModel.loginInfo);
        const userStore = useUserStoreWithOut();
        userStore.setToken({ token: data.accessToken, refreshToken: data.refreshToken });
        userStore.setUserInfo(data);
        router.push({
          path: '/home'
        });
        ElMessage({
          message,
          type: "success",
        });
      }
    };

    // 路由跳转
    const jumpRoute = (path: string): void => {
      router.push({ path });
      loginModel.fullPath = path;
    };

    // 获取验证码
    const getCode = (): void => {
      ruleFormRef.value.validateField('phone', (valid: boolean): void => {
        if (valid) {
          console.log(1);
        }
      });
    };

    // 注册
    const handleRegister = (): void => {
      ruleFormRef.value.validate(async (valid: boolean): Promise<void> => {
        if (valid) {
          let { message } = await loginServiceImpl.register({ ...loginModel.registerForm, type: 'customer' });
          ElMessage({
            message,
            type: "success",
          });
        }
      });
    };


    return {
      ...loginData,
      inputFocus,
      lightOutline,
      handleLogin,
      inputDefocus,
      lightDisappear,
      judgeMonitorInput,
      jumpRoute,
      getCode,
      ruleFormRef,
      handleRegister
    };
  },
});
</script>


<style lang="stylus" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh !important;
  background: url(@/assets/images/login-bg.jpg) no-repeat;
  background-size: cover;
  .login-frame {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    width: 1200px;
    height: 678px;
    background: #fff;
    box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.1);
    margin: auto;
    .login-img {
      margin-left: 80px;
    }
    .login-info {
      margin-left: 80px;
      .title {
        font-size: 30px;
        font-weight: 400;
        color: #000000;
      }
      .input-box {
        margin-top: 75px;
        margin-bottom:40px
        .inp-item {
          position: relative;
          display: flex;
          align-items: center;
          width: 330px;
          height: 40px;
          padding-bottom: 8px;
          border-bottom: 1px solid #eee;
          img {
            width: 20px;
            height: 20px;
          }
          input {
            border: none;
            outline: none;
            width: 100%;
            height: 100%;
            padding: 0 12px;
          }
          .err-tips {
            position: absolute;
            top: 54px;
            font-size: 14px;
            color: #d40000;
            transition: .3s
            overflow: hidden
          }
        }
        .password {
          margin-top: 35px;
        }
        .selected {
          border-bottom: 1px solid #007de4;
        }
        .err-line {
          border-bottom: 1px solid #d40000;
        }
      }
      .login-btn {
        width: 334px;
        height: 48px;
        line-height: 48px;
        font-size: 18px;
        font-weight: 400;
        color: #FFFFFF;
        background: #007DE4;
        text-align: center;
        margin-top: 80px;
        cursor: pointer;
      }
    }
    .switch-language {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 0 8px;
      border: 1px solid #0076FE;
      .el-dropdown-link {
        font-size: 12px;
        color: #0076FE;
        cursor: pointer;
      }
    }
  }
  .bottom {
    position: absolute;
    width: 100%;
    bottom: 63px;
    font-size: 12px;
    color: #AAA;
    text-align: center;
  }
}

.title-box{
  font-size: 30px;
  font-weight: 400;
  color: #000000;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
</style>
