// import {
//   ProjectConfig,
// } from "#/config";
// import { resetRouter } from "@/router";
// import { Persistent } from "@/utils/cache/persistent";
// import { isObject } from "@/utils/is";
// import { defineStore } from "pinia";
// import { store } from "..";

// // 深度合并
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
//   let key: string;
//   for (key in target) {
//     src[key] = isObject(src[key])
//       ? deepMerge(src[key], target[key])
//       : (src[key] = target[key]);
//   }
//   return src;
// }

// interface AppState {
//   projectConfig: ProjectConfig | null;
// }
// export const useAppStore = defineStore({
//   id: "app",
//   state: (): AppState => ({
//     projectConfig: Persistent.getLocal("COMMON__LOCAL__KEY__"),
//   }),
//   getters: {
//     getProjectConfig(): ProjectConfig {
//       return this.projectConfig || ({} as ProjectConfig);
//     },
//   },
//   actions: {
//     setProjectConfig(config: DeepPartial<ProjectConfig>): void {
//       this.projectConfig = deepMerge(this.projectConfig || {}, config);
//       console.log(this.projectConfig, config,111);
//       Persistent.setLocal("COMMON__LOCAL__KEY__", this.projectConfig);
//     },
//     resetAllState() {
//       resetRouter();
//       Persistent.clearAll();
//     },
//   },
// });

// export function useAppStoreWithOut() {
//   return useAppStore(store);
// }
