// import type { RouteLocationNormalized } from 'vue-router';
// import { ProjectConfig } from '#/config';
import { createLocalStorage, createSessionStorage } from '@/utils/cache';
import { Memory } from './memory';
import { toRaw } from 'vue';
import { UserInfo } from '#/store';
import { pick, omit } from 'lodash-es';
import { useAppStore } from '@/piniaStore/modules/app';

interface LockInfo {
  pwd?: string | undefined;
  isLock?: boolean;
}

interface BasicStore {
  TOKEN_KEY: string | number | null | undefined;
  USER_INFO_KEY: UserInfo;
  LOCK_INFO_KEY: LockInfo;
}

type LocalStore = BasicStore;
type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

const localMemory = new Memory();
const sessionMemory = new Memory();
console.log(localMemory, sessionMemory, ls);

function initPersistentMemory() {
  const localCache = ls.get('COMMON__LOCAL__KEY__');
  const sessionCache = ss.get('COMMON__SESSION__KEY__');
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

export class Persistent {

  static getLocal<T>(key: any) {
    console.log(999)
  // static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }
  static setLocal(key: any, value: any, immediate = false): void {
    console.log(999)
  // static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, toRaw(value));
    immediate && ls.set('COMMON__LOCAL__KEY__', localMemory.getCache);
  }
  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key);
    immediate && ls.set('COMMON__LOCAL__KEY__', localMemory.getCache);
  }
  static clearLocal(immediate = false): void {
    localMemory.clear();
    console.log(immediate && ls.clear())
    immediate && ls.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }
  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
    sessionMemory.set(key, toRaw(value));
    immediate && ss.set('COMMON__SESSION__KEY__', sessionMemory.getCache);
  }
  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key);
    immediate && ss.set('COMMON__SESSION__KEY__', sessionMemory.getCache);
  }
  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && ss.clear();
  }

  static clearAll(immediate = false) {
    sessionMemory.clear();
    localMemory.clear();
    if (immediate) {
      ls.clear();
      ss.clear();
    }
  }
}

// window.addEventListener('beforeunload', function () {
//   console.log(22222222222);
//   // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
//   // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
//   ls.set('COMMON__LOCAL__KEY__', {
//     ...omit(localMemory.getCache, 'LOCK_INFO_KEY'),
//     ...pick(ls.get('COMMON__LOCAL__KEY__'), ['TOKEN_KEY', 'USER_INFO_KEY', 'LOCK_INFO_KEY']),
//   });
//   ss.set('COMMON__SESSION__KEY__', {
//     ...omit(sessionMemory.getCache, 'LOCK_INFO_KEY'),
//     ...pick(ss.get('COMMON__SESSION__KEY__'), ['TOKEN_KEY', 'USER_INFO_KEY', 'LOCK_INFO_KEY']),
//   });
// });

setTimeout(() => {
  console.log(4444);
  ls.set('COMMON__LOCAL__KEY__', {
    ...omit(localMemory.getCache, 'LOCK_INFO_KEY'),
    ...pick(ls.get('COMMON__LOCAL__KEY__'), ['TOKEN_KEY', 'USER_INFO_KEY', 'LOCK_INFO_KEY']),
  });
  // ss.set('COMMON__SESSION__KEY__', {
  //   ...omit(sessionMemory.getCache, 'LOCK_INFO_KEY'),
  //   ...pick(ss.get('COMMON__SESSION__KEY__'), ['TOKEN_KEY', 'USER_INFO_KEY', 'LOCK_INFO_KEY']),
  // });
  const appStore = useAppStore();
  console.log('appStore',appStore)
}, 4444);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function storageChange(e: any) {
  console.log(33333333,e);
  const { key, newValue, oldValue } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if ('COMMON__LOCAL__KEY__' === key) {
      Persistent.clearLocal();
    }
    if ('COMMON__SESSION__KEY__' === key) {
      Persistent.clearSession();
    }
  }
}

window.addEventListener('storage', storageChange);

initPersistentMemory();
