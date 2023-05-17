import { defineStore } from "pinia";
import { store } from "@/store";
import { TOKEN_KEY, USER_INFO_KEY } from "@/enums/cacheEnum";
import { Persistent, Token } from "@/utils/cache/persistent";
import { UserInfo } from "@/types/store";

interface UserState {
  userInfo: Nullable<UserInfo>;
  token: Token;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    // 用户信息
    userInfo: Persistent.getLocal(USER_INFO_KEY) || {
      userId: "",
      username: "",
      avatar: "",
      desc: "",
      homePath: "",
      roles: [],
      auth: [],
      password: "",
    },
    // token
    token: Persistent.getLocal<Token>(TOKEN_KEY) || {
      token: "",
      refreshToken: "",
    },
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo as UserInfo;
    },
    getToken(): Token {
      return this.token;
    },
  },
  actions: {
    setToken(info: Token) {
      this.token = info;
      Persistent.setLocal(TOKEN_KEY, info, true);
    },
    setUserInfo(info: UserInfo ) {
      this.userInfo = info;
      Persistent.setLocal(USER_INFO_KEY, info, true);
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
