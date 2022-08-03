
import { LoadingStateType } from '@/store/modules/loading/state';
import { UserStateType } from '@/store/modules/user/state';
import { SidebarStateType } from '@/store/modules/sidebar/state';

// vuex state 的模块的类型
type ModuleType = {
  loading: LoadingStateType,
  user: UserStateType,
  sidebar: SidebarStateType,
};

// 所有的StateType
export type StateType = ModuleType;

/** http请求响应格式  */
export declare interface ApiResponse {
  code?: number;
  message?: string;
  data?: any;
}