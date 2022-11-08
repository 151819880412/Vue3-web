import type { LockInfo } from '#/store';

import { defineStore } from 'pinia';

import { LOCK_INFO_KEY } from '@/enums/cacheEnum';
import { Persistent } from '@/utils/cache/persistent';

interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useLockStore = defineStore({
  id: 'app-lock',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {
    getLockInfo(): Nullable<LockInfo> {
      return this.lockInfo;
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info);
      console.log(this.lockInfo, info, 1111);
      Persistent.setLocal(LOCK_INFO_KEY, this.lockInfo);
    },
    resetLockInfo() {
      Persistent.removeLocal(LOCK_INFO_KEY);
      this.lockInfo = null;
    },
    // 进入系统
    unLock(password?: string): boolean {
      console.log(password,this.lockInfo?.pwd);
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo();
        return true;
      }
      return false;
    },
  },
});
