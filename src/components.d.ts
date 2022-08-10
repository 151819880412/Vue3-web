import MainTable from '@/components/MainTable/MainTable.vue';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MainTable: typeof MainTable;
  }
}