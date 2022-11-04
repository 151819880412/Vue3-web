import type {
  ProjectConfig,
  HeaderSetting,
  MenuSetting,
  TransitionSetting,
  MultiTabsSetting,
} from '#/config';
import type { BeforeMiniState } from '#/store';

import { defineStore } from 'pinia';
import { store } from '@/piniaStore';

import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum';
import { Persistent } from '@/utils/cache/persistent';
// import { darkMode } from '@/settings/designSetting';
import { resetRouter } from '@/router';
import { deepMerge } from '@/utils';
import { useDark, useToggle } from '@vueuse/core';
import { WritableComputedRef } from 'vue';

export interface AppState {
  darkMode: (value?: boolean | undefined) => boolean;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}
// interface a {
//   setDarkMode(): (value?: boolean | undefined) => (value?: boolean | undefined) => boolean
// }
let timeId: TimeoutHandle;
// export const useAppStore :StoreDefinition<"app", AppState,a >= defineStore({
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: ()=>false,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig,
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): (value?: boolean | undefined) => boolean {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || 'light';
    },

    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },

    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDarkMode(): (value?: boolean | undefined) => boolean {
      const isDark: WritableComputedRef<boolean> = useDark({
        // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
        storageKey: APP_DARK_MODE_KEY_,
        // 暗黑class名字
        valueDark: 'dark',
        // 高亮class名字
        valueLight: 'light',
      });
      const darkMode = useToggle(isDark);
      this.darkMode = darkMode
      return darkMode
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },

    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
