<template>
  <div class="elTables"></div>
</template>

<script lang="ts">
import { ElTable, ElTableColumn } from "element-plus";
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "ElTables",
  props: {},
  setup() {
    return () => {
      return h(
        ElTable,
        {
          style: {
            width: "100%",
          },
          staticClass: "aaaaaaaaaa",
          props: {
            border: true,
          },
        },
        {
          default: () => {
            return [h(
              ElTableColumn,
              {
                style: {
                  width: "100%",
                  height:'100px'
                },
                staticClass: "aaaaaaaaaa",
                props: {
                  border: true,
                },
              }
            )];
          },
        }
        // {
        //   default: () => {
        //     return [
        //       h(ElTableColumn, {
        //         props: {
        //           align: "center",
        //           label: "用户3",
        //           prop: "e",
        //         },
        //       }),
        //     ];
        //   },
        // }
        // [
        //   h(ElTableColumn, {
        //         props: {
        //           align: "center",
        //           label: "用户3",
        //           prop: "e",
        //         },
        //       }),
        // ]
      );
    };
  },
  // setup() {
  //   return () => {
  //     return h(
  //       "el-table",
  //       {
  //         style: "height:200px",
  //         staticClass: "aaaaaaaaaa",
  //         props: {
  //           border: true,
  //         },
  //       },
  //       [
  //         h(ElTableColumn, {
  //           props: {
  //             align: "center",
  //             label: "用户1",
  //             prop: "auditRoleStr",
  //           },
  //           scopedSlots: {
  //             default: (scope) => {
  //               console.log(scope);
  //               return h(
  //                 "ElFormItem",
  //                 {
  //                   style: "height:100px",
  //                   props: {
  //                     label: "审批人",
  //                     prop: "auditTable." + scope.$index + ".auditRoleStr",
  //                     rules: {
  //                       required: true,
  //                       message: "检验报告类型不能为空",
  //                       trigger: "blur",
  //                     },
  //                     labelWidth: "110px",
  //                   },
  //                 },
  //                 [
  //                   h("ElInput", {
  //                     props: {
  //                       value: scope.row.auditRoleStr,
  //                     },
  //                     attrs: {
  //                       placeholder: "审批人1",
  //                     },
  //                     on: {
  //                       input: (value) => {
  //                         console.log(value);
  //                       },
  //                     },
  //                   }),
  //                 ]
  //               );
  //             },
  //           },
  //         }),
  //         h(ElTableColumn, {
  //           props: {
  //             align: "center",
  //             label: "用户2",
  //             prop: "changeState",
  //           },
  //           scopedSlots: {
  //             default: (scope) => {
  //               console.log(scope);
  //               return h(
  //                 "ElFormItem",
  //                 {
  //                   style: "height:100px",
  //                   props: {
  //                     label: "审批人2",
  //                     prop: "auditTable." + scope.$index + ".conclusion",
  //                     rules: {
  //                       required: true,
  //                       message: "检验报告类型不能为空",
  //                       trigger: "change",
  //                     },
  //                     labelWidth: "110px",
  //                   },
  //                 },
  //                 [
  //                   h(
  //                     "ElSelect",
  //                     {
  //                       props: {
  //                         value: scope.row.conclusion,
  //                       },
  //                       attrs: {
  //                         placeholder: "审批人2",
  //                       },
  //                       on: {
  //                         change: (value) => {
  //                           console.log(value);
  //                         },
  //                       },
  //                     },
  //                     [
  //                       h("ElOption", {
  //                         props: {
  //                           label: "新增-启用",
  //                           value: 1,
  //                         },
  //                       }),
  //                       h("ElOption", {
  //                         props: {
  //                           label: "启用-新增",
  //                           value: 3,
  //                         },
  //                       }),
  //                     ]
  //                   ),
  //                 ]
  //               );
  //             },
  //           },
  //         }),
  //         h(ElTableColumn, {
  //           props: {
  //             align: "center",
  //             label: "用户3",
  //             prop: "e",
  //           },
  //         }),
  //       ]
  //     );
  //   };
  // },
  components: {},
});
</script>
<style lang="stylus" scoped></style>
