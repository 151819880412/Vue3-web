import { Store } from 'vuex';

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store;
    openDialog: (...params)=>void;
    submitSearch: (...params)=>void;
    submitDialog: (...params)=>void;
    initTableData: (...params)=>void;
    editorFieldValue: (...params)=>void;
    searchFormData:object
  }
}