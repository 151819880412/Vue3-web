import { defineComponent } from 'vue';
import renderHooks from "./render";

export default defineComponent({
  props: {
    formData: {
      type: Object, // 根据实际数据类型进行定义
      required: true // 如果需要强制要求父组件传递该值，可以添加 required: true
    }
  },
  setup(props, { slots, expose }) {

    let arr: any = [
      {
        label: "单行文本",
        prop: "aaa",
        component: "el-input",
        placeholder: "请输入内容",
        disabled: false,
        clearable: true,
        readonly: false,
        autofocus: false,
        required: true,
        class: "inputName",
        span:12,
        rules: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
        resize: "none",
        type: "text",
        defaultlValue: "123",
      },
      {
        label: "密码",
        prop: "bbb",
        component: "el-input",
        placeholder: "请输入内容",
        disabled: false,
        clearable: true,
        readonly: false,
        autofocus: false,
        required: true,
        class: "inputName",
        span:12,
        rules: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
        resize: "none",
        type: "password",
        defaultlValue: "123",
        showPassword:true
      },
      {
        label: "多行文本",
        prop: "ccc",
        component: "el-input",
        placeholder: "请输入内容",
        disabled: false,
        clearable: true,
        readonly: false,
        autofocus: false,
        required: true,
        class: "inputName",
        span:12,
        rules: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
        resize: "none",
        type: "textarea",
        defaultlValue: "123",
        rows:4
      },
      {
        label: "数字输入框",
        prop: "ddd",
        component: "el-input-number",
        placeholder: "请输入内容",
        disabled: false,
        clearable: true,
        readonly: false,
        autofocus: false,
        required: true,
        class: "inputName",
        span:12,
        rules: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
        resize: "none",
        type: "text",
        defaultlValue: "123",
      },
    ];

    console.log(props.formData, slots);

    const {
      render,
      rElFormRef,
    } = renderHooks();

    // 暴露方法
    expose({
      rElFormRef,
    });

    return () => render(arr, props.formData);
  }
});
