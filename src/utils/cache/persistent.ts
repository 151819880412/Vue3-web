// import type { RouteLocationNormalized } from 'vue-router';
// import { ProjectConfig } from '#/config';
import { createLocalStorage, createSessionStorage } from '@/utils/cache';
import { Memory } from './memory';
import { toRaw } from 'vue';
import { UserInfo } from '#/store';
import { pick, omit } from 'lodash-es';
import { APP_LOCAL_CACHE_KEY, APP_SESSION_CACHE_KEY, LOCK_INFO_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';

interface LockInfo {
  pwd?: string | undefined;
  isLock?: boolean;
}

export interface Token {
  token: string,
  refreshToken: string;
}

interface BasicStore {
  [TOKEN_KEY]: Token;
  [USER_INFO_KEY]: UserInfo;
  [LOCK_INFO_KEY]: LockInfo;
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

function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY);
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

export class Persistent {

  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key) as Nullable<T>;
  }
  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys],): void {
    localMemory.set(key, value);
    console.log(key, value, APP_LOCAL_CACHE_KEY, localMemory.getCache);
    ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }
  static removeLocal(key: LocalKeys,): void {
    localMemory.remove(key);
    ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }
  static clearLocal(): void {
    localMemory.clear();
    ls.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key) as Nullable<T>;
  }
  static setSession(key: SessionKeys, value: SessionStore[SessionKeys],): void {
    sessionMemory.set(key, toRaw(value));
    ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }
  static removeSession(key: SessionKeys,): void {
    sessionMemory.remove(key);
    ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }
  static clearSession(): void {
    sessionMemory.clear();
    ss.clear();
  }

  static clearAll() {
    sessionMemory.clear();
    localMemory.clear();
    ls.clear();
    ss.clear();
  }
}

window.addEventListener('beforeunload', function () {
  console.log(22222222222, { ...omit(localMemory.getCache, LOCK_INFO_KEY) });

  // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
  // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
  ls.set(APP_LOCAL_CACHE_KEY, {
    ...omit(localMemory.getCache, LOCK_INFO_KEY),
    ...pick(ls.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
  });
  ss.set(APP_SESSION_CACHE_KEY, {
    ...omit(sessionMemory.getCache, LOCK_INFO_KEY),
    ...pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
  });
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function storageChange(e: any) {
  const { key, newValue, oldValue } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }
  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal();
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession();
    }
  }
}

window.addEventListener('storage', storageChange);

initPersistentMemory();
