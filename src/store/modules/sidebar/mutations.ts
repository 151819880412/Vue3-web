
import { MutationTree } from 'vuex';
import { SidebarState } from './state';
import { SidebarMutationTypes } from './mutation-types';

export type Mutations<S = SidebarState> = {
  [SidebarMutationTypes.SET_SIDEBAR](state: S): void;
  [SidebarMutationTypes.DEFAULT_ACTIVE](state: S, defaultActive: string): void;
};

export const mutations: MutationTree<SidebarState> & Mutations = {
  
  // 无参
  [SidebarMutationTypes.SET_SIDEBAR](state: SidebarState) {
    state.isCollapse = !state.isCollapse;
  },

  // 有参
  [SidebarMutationTypes.DEFAULT_ACTIVE](state: SidebarState, defaultActive: string) {
    state.defaultActive = defaultActive;
  },

};