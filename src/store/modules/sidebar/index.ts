
import {
  Module
} from 'vuex';

import { StateType } from '@/@types';

import { state } from './state';
import { mutations } from './mutations';
import actions from './actions';
import type { SidebarState } from './state';

export { SidebarState };

export const sidebar: Module<SidebarState, StateType> = {
  state,
  mutations,
  actions
};