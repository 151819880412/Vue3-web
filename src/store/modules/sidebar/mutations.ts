
import { MutationTree } from 'vuex'
import { SidebarState } from './state'
import { SidebarMutationTypes } from './mutation-types'

export type Mutations<S = SidebarState> = {
  [SidebarMutationTypes.SET_SIDEBAR](state: S): void
}
// 无参
// export type Mutations<S = SidebarState> = {
//   [SidebarMutationTypes.SET_SIDEBAR](state: S): void
// }

export const mutations: MutationTree<SidebarState> & Mutations = {
  [SidebarMutationTypes.SET_SIDEBAR](state: SidebarState) {
    state.isCollapse = !state.isCollapse
  },

  // 无参
  // [SidebarMutationTypes.SET_SIDEBAR](state: SidebarState) {
  // },

}