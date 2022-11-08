import type { UserInfo } from '#/store';
import { defineStore } from 'pinia';
import { store } from '@/piniaStore';
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { Persistent, Token } from '@/utils/cache/persistent';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token: Token | null;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // 用户信息
    userInfo: null,
    // token
    token: null,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || Persistent.getLocal(USER_INFO_KEY);
    },
    getToken(): Token {
      return this.token || Persistent.getLocal<Token>(TOKEN_KEY);
    },
  },
  actions: {
    setToken(info: Token | null) {
      this.token = info;
      Persistent.setLocal(TOKEN_KEY, info);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      Persistent.setLocal(USER_INFO_KEY, info);
    },

    resetState() {
      this.userInfo = null;
      this.token = {
        token: "",
        refreshToken: "",
      };
    },

  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
