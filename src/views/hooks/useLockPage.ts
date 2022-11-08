import { computed, onUnmounted, unref, watchEffect } from 'vue';
import { useThrottleFn } from '@vueuse/core';

import { useAppStore } from '@/piniaStore/modules/app';
import { useLockStore } from '@/piniaStore/modules/lock';
import { useUserStoreWithOut } from '@/piniaStore/modules/user';

// import { useUserStore } from '@/piniaStore/modules/user';

export function useLockPage() {
  const getLockTime = computed(() => appStore.getProjectConfig.lockTime);

  const lockStore = useLockStore();
  // const userStore = useUserStore();
  const userStore = {getToken:true};
  const appStore = useAppStore();

  let timeId: TimeoutHandle;

  function clear(): void {
    window.clearTimeout(timeId);
  }

  function resetCalcLockTimeout(): void {
    // 没有登陆
    if (!userStore.getToken) {
      clear();
      return;
    }
    const lockTime = appStore.getProjectConfig.lockTime;
    console.log('操作中',lockTime)

    if (!lockTime || lockTime < 1) {
      clear();
      return;
    }
    clear();

    timeId = setTimeout(() => {
      console.log('锁屏了')
      lockPage();
    }, lockTime * 6 *1000  );
  }

  function lockPage(): void {
    const userStore = useUserStoreWithOut()
    lockStore.setLockInfo({
      isLock: true,
      pwd: userStore.getUserInfo.password,
    });
  }

  watchEffect((onClean) => {
    if (userStore.getToken) {
      resetCalcLockTimeout();
    } else {
      clear();
    }
    onClean(() => {
      clear();
    });
  });

  onUnmounted(() => {
    clear();
  });

  const keyupFn = useThrottleFn(resetCalcLockTimeout, 2000);

  return computed(() => {
    if (unref(getLockTime)) {
      return { onKeyup: keyupFn, onMousemove: keyupFn };
    } else {
      clear();
      return {};
    }
  });
}
