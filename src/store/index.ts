import { createStore, Store } from 'vuex';
import modules from './modules';
import { StateType } from '@/@types';

const store: Store<StateType> = createStore({
  strict: false,
  modules: { ...modules },
});
export default store;
