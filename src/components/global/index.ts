import type { Component, App } from 'vue';
import MainTable from './MainTable/MainTable.vue';
import DialogMask from './DialogMask/DialogMask.vue';
 
const components: {
  [propName: string]: Component;
} = {
  MainTable,
  DialogMask
};
 
export default {
  install: (app: App) => {
    for (const key in components) {
      app.component(key, components[key]);
    }
  }
};