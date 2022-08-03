import { Module } from 'vuex';
import actions from './actions'
import { StateType } from '@/@types';


export interface SidebarState{
  isCollapse:boolean
}

 const state: SidebarState = {
  isCollapse:false,
}

type SidebarStateType = typeof state;

const sidebar: Module<SidebarStateType, StateType> = { actions, ...state };


export { SidebarStateType, state };
export default sidebar;