<template>
  <div class="bg-black">

    <div class="lockTop" @click="unLock">
      <el-icon>
        <Lock />
      </el-icon>
      <div>点击解锁</div>
    </div>
    <div class="lockMid">
      <div class="lockTime lockTimeL">
        11
      </div>
      <div class="lockTime">
        11
      </div>
    </div>
    <div class="lockBottom">2022/8/25 星期四</div>

    <transition name="fade-slide">
      <div class="lockForm" v-show="showForm">
        <div class="lockFormMid">
          <el-input v-model="lockPwd" type="password" placeholder="Please input password" show-password />
          <div class="lockBtns">
            <el-button link class="lockButton" @click="back">返回</el-button>
            <el-button link class="lockButton">返回登录</el-button>
            <el-button link class="lockButton">进入系统</el-button>
          </div>
          <div class="lockBottom2" v-show="showForm">11:11</div>
        </div>
      </div>
    </transition>


  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'LockPage',
  props: [],
  setup() {

    let showForm = ref(false);
    const unLock = () => {
      console.log(111);
      showForm.value = true;
    };

    const back = () => {
      showForm.value = false;
    }

    return {
      unLock,
      showForm,
      lockPwd: "",
      back,
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
  font-size: 3rem
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
  font-size: 320px;
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
  font-size: 6rem
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