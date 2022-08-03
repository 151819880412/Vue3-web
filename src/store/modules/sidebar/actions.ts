// https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

import { ActionTree, ActionContext } from "vuex";
import { SidebarState } from "./state";

import { Mutations } from "./mutations";
import { SidebarMutationTypes } from "./mutation-types";
import { SidebarActionTypes } from "./action-types";
import { StateType } from "@/@types";

type AugmentedActionContext = {
  // Parameters<T> 的作用是用于获得函数的参数类型组成的元组类型。(获取 Mutations.SidebarActionTypes.ACTION_LOGI 的参数类型组成的元组)
  //ReturnType<T> 的作用是用于获取函数 T 的返回类型。(返回值类型是 Mutations.SidebarActionTypes.ACTION_LOGI 函数的返回值类型)
  // K 继承 Mutations 的所有 key(K只能和Mutations的key同名->SidebarActionTypes.ACTION_SIDEBAR)
  commit<K extends keyof Mutations>(
    key: K,
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<SidebarState, StateType>, "commit">; //Omit<Type, Keys> 通过从中选取所有属性Type然后删除Keys（字符串文字或字符串文字的并集）来构造类型

// 无参数的
// type NoAugmentedActionContext = {
//   commit<K extends keyof Mutations>(
//     key: K,
//   ): ReturnType<Mutations[K]>;
// } & Omit<ActionContext<SidebarState, StateType>, 'commit'>;

export interface Actions {
  // 有参
  [SidebarActionTypes.ACTION_SIDEBAR](
    { commit }: AugmentedActionContext,
  ): void;
  // 无参
  // [SidebarActionTypes.ACTION_SIDEBAR]({ commit }: NoAugmentedActionContext): void;

}

export const actions: ActionTree<SidebarState, StateType> & Actions = {
  [SidebarActionTypes.ACTION_SIDEBAR](
    { commit }: AugmentedActionContext,
  ) {
    console.log(111)
    commit(SidebarMutationTypes.SET_SIDEBAR);
  },
  // 无参
  // [SidebarActionTypes.ACTION_SIDEBAR]({ commit }) {
  //   commit(SidebarMutationTypes.SET_SIDEBAR);
  // },
};

export default actions