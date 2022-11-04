<template>
  <div class="bg-black">
    <div class="lockTop" @click="handleShowForm">
      <el-icon>
        <Lock />
      </el-icon>
      <div>点击解锁</div>
    </div>
    <div class="lockMid">
      <div class="lockTime lockTimeL">
        {{ hour }}
      </div>
      <div class="lockTime">
        {{ minute }}
      </div>
    </div>
    <div class="lockBottom">{{ year + '/' + month + '/' + day + ' ' + week }} </div>

    <transition name="fade-slide">
      <div class="lockForm" v-show="showForm">
        <div class="lockFormMid">
          <el-input v-model="lockPwd" type="password" placeholder="请输入锁屏密码或者用户密码" show-password />
          <div class="lockBtns">
            <el-button link class="lockButton enter-x" @click="back">返回</el-button>
            <el-button link class="lockButton enter-x" @click="goLogin">返回登录</el-button>
            <el-button link class="lockButton enter-x" @click="unLock">进入系统</el-button>
          </div>
          <div class="lockBottom2" v-show="showForm">{{ hour + ':' + minute }}</div>
        </div>
      </div>
    </transition>


  </div>
</template>

<script lang='ts'>
import { useLockStore } from '@/piniaStore/modules/lock';
import { defineComponent, reactive, ToRefs, toRefs } from 'vue';
import { LockPageHooks } from './LockPage.hook';
import loginServiceImpl from "@/api/login/index";
import { useRouter } from 'vue-router';

interface LockPage {
  showForm: boolean;
  lockPwd: string;
}
export default defineComponent({
  name: 'LockPage',
  props: [],
  setup() {
    const router = useRouter();


    const initState = (): LockPage => {
      console.log(222);
      return {
        showForm: false,
        lockPwd: '',
      };
    };
    let model: LockPage = reactive(initState());
    let data: ToRefs<LockPage> = toRefs(model);

    const handleShowForm = () => {
      model.showForm = true;
    };

    const back = () => {
      model.showForm = false;
    };
    const lockStore = useLockStore();

    const goLogin = async () => {
      const { data } = await loginServiceImpl.logOut('7b5536bb-4540-42c6-9557-75499df42759');
      if (data) {
        lockStore.resetLockInfo();
        router.push('login');
      }
    };

    const unLock = async () => {
      if (!model.lockPwd) {
        return;
      }
      try {
        // loading.value = true;
        const res = await lockStore.unLock(model.lockPwd);
        console.log(res)
        // errMsg.value = !res;
      } finally {
        // loading.value = false;
      }
    };

    return {
      handleShowForm,
      ...data,
      back,
      goLogin,
      unLock,
      ...LockPageHooks(true)

    };
  }
});
</script>
<style lang='stylus' scoped>
.bg-black {
  height: 100%
  background-color: rgba(0, 0, 0, 1);
  color:white
  position relative
  text-align: center
  overflow hidden
}
.lockTop{
  position: absolute
  left: 50%
  top: 20px
  transform: translateX(-50%)
  font-size: 1.5rem
  cursor pointer
}
.lockMid{
  height: 100%
  display: flex
  align-items: center;
  justify-content: center
}
.lockTime{
  display: flex;
  font-weight: 700;
  color: #bababa;
  background-color: #141313;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  height: 80%
  width: 40%
  font-size: 20rem;
}
.lockTimeL{
  margin-right: 80px
}
.lockBottom{
  position: absolute
  bottom 20px
  left: 50%
  transform: translateX(-50%)
  font-size: 3rem
  z-index:101
}
.lockBottom2{
  position: absolute
  bottom 70px
  left: 50%
  transform: translateX(-50%)
  font-size: 3rem
  z-index:101
}
.lockForm{
  width: 100%
  height: 100%
  position: absolute
  top 0
  left 0
  display: flex
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
  z-index:100
}
/* fade-slide */
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.lockFormMid{
  width: 260px
}
.lockButton{
  margin-top:12px
  color: #009688 !important;
}
.lockBtns{
  display: flex
  justify-content: space-between;
  align-items: center;
}
</style>