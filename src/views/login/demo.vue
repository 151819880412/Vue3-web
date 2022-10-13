<template>
  <div>
    <ElForms :formConfig= "searchFormRule" ref="refDataForm" />
    <button @click="handleQuery">111</button>
    <h1>{{name}}</h1>
    <h1>{{age}}</h1>
    <h1>{{job}}</h1>
    <!-- <h1>{{job.j1}}</h1>
    <h1>{{job.j1.salary}}</h1> -->
    
  </div>
</template>

<script lang="ts">
import { FormInterface, Options, Rules } from "#/form-config";
import ElForms from "@/components/ElForm/ElForms.vue";

import {  defineComponent, Ref, ref, toRefs, reactive, toRef } from "vue";


export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  props: [],
  setup() {

    const refDataForm = ref();
    let configArr:Array<FormInterface<Rules,Options>> = [
      {
        type: "Input",
        title: "注册账号",
        field: "account",
        value: "",
        maxlength: 20,
        required:true,
        callback: (value:string, b:FormInterface<Rules,Options>, c) => {
          console.log(value, b, c);
        },
        rules:[{ message: "请输入端口", required: true, trigger: "blur" }],
      },
      {
        type: "RadioGroup",
        title: "用户性别",
        field: "sex",
        required:false,
        value: "",
        options: [
          { label: "全部", value: "" },
          { label: "示例1", value: "1" },
          { label: "示例2", value: "2" },
        ],
        rules:[],
      },
      {
        type: "Select",
        title: "用户性别",
        field: "sex",
        required:true,
        value: "",
        options: [
          { label: "全部", value: "" },
          { label: "示例1", value: "1" },
          { label: "示例2", value: "2" },
        ],
        rules:[],
      },
      {
        type: "CheckboxGroup",
        title: "用户性别",
        required:true,
        field: "aaa",
        value: [],
        options: [
          { label: "全部", value: "" },
          { label: "示例1", value: "1" },
          { label: "示例2", value: "2" },
        ],
        rules:[],
      },
      {
        type: "DatePicker",
        title: "注册时间",
        field: "createTime",
        required:true,
        value: [],
        props: {
          type: "daterange",
          rangeSeparator: "至",
          format: "YYYY-MM-DD",
          valueFormat: "YYYY-MM-DD",
          startPlaceholder: "开始日期",
          endPlaceholder: "结束日期",
        },
        rules:[],
      },
    ]

    const searchFormRule:Ref<Array<FormInterface<Rules,Options>>>  = ref(configArr);

    // methods
    function handleQuery() {

      // refDataForm.value.neoResetFields()
      // const searchData = searchFormRule.value.reduce(
      //   (sum, v) => ({ ...sum, [v.field]: v.value }),
      //   {}
      // );
      // console.log(searchData);
      // person.job.j1.salary = 11
      // person.job.j1 = {
      //     salary: 11
      //   }
      person.name='1'
      // person.age=1
    }

let person = reactive({
      name: '张珍',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    console.log(person)
    console.log(toRef(person,'name'))
    return {
      handleQuery,
      searchFormRule,
      refDataForm,
      ...toRefs(person),
    };
  },
  components: {
    ElForms,
  },
});
</script>
<style lang="stylus" scoped></style>
