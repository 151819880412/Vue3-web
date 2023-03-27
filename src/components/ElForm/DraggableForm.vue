<template>
  <div ref="ElForms"></div>
</template>

<script lang="ts">
import { h, toRefs, reactive, defineComponent } from "vue";
import {
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTimePicker,
  ElCascader,
  ElButton,
  ElForm,
  ElFormItem,
  ElRadioGroup,
  ElRadio,
  ElCheckboxGroup,
  ElCheckbox,
  ElSwitch,
  ElSlider,
  ElRate,
  ElRow,
} from "element-plus";
import { FormInterface, Options, Rules } from "#/form-config";
import { RawSlots } from "element-plus/es/utils";

export default defineComponent({
  name: "ElForms",
  props: {
    formData: {
      type: Object
    },
    formConfig: {
      type: Object as () => FormInterface<Rules, Options>,
      required: true
    }
  },
  setup(props) {
    const compA = {
      input: ElInput,
      textarea: ElInput,
      inputNumber: ElInputNumber,
      select: ElSelect,
      datePicker: ElDatePicker,
      timePicker: ElTimePicker,
      cascader: ElCascader,
      radioGroup: ElRadioGroup,
      checkboxGroup: ElCheckboxGroup,
      switch: ElSwitch,
      slider: ElSlider,
      rate: ElRate,
    };
    const comB = {
      option: ElOption,
      button: ElButton,
      form: ElForm,
      formItem: ElFormItem,
      radio: ElRadio,
      checkbox: ElCheckbox,
      row: ElRow,
    };
    const components = { ...compA, ...comB };
    // 将 props 参数转换为响应式
    const { formConfig } = toRefs(props);
    // let rules = reactive(formConfig || {}) as Ref<FormInterface<Rules, Options>>;
    let componentConig = reactive(formConfig.value || {}) as FormInterface<Rules, Options>;



    // rules.value.forEach((item, index) => {
    //   item._index = index;
    //   if (item.required) {
    //     const placeholder = ["input"].includes(item.type)
    //       ? `请输入${item.title ?? ""}`
    //       : `请选择${item.title ?? ""}`;
    //     if (item.rules) {
    //       item.rules.push({
    //         message: placeholder,
    //         required: true,
    //         trigger: ["input"].includes(item.type) ? "blur" : "change",
    //       });
    //     } else {
    //       item.rules = [{
    //         message: placeholder,
    //         required: true,
    //         trigger: ["input"].includes(item.type) ? "blur" : "change",
    //       }];
    //     }
    //   }
    // });


    // 渲染前后缀
    const renderTemplate = (item) => {
      const obj:any = {}
      if(item.prepend){
        obj.prepend = () =>h('div',  item.prepend)
      }
      if(item.append){
        obj.append = () =>h('div',  item.append)
      }
      if(Object.keys(obj).length===0){
        return null as unknown as RawSlots
      }
      return obj as RawSlots
    };

    const renderConponents = () => {
      if (compA[componentConig.type]) {
        const SelectFun = (item: FormInterface<Rules, Options>) => {
          const events = {};
          if (item.on) {
            Object.keys(item.on).forEach((eventName) => {
              const newName = eventName.slice(0, 1).toUpperCase() + eventName.slice(1);
              events[`on${newName}`] = item.on?.[eventName];
              // 当全部事件由后端返回成字符串的时候使用这段代码
              // events[`on${newName}`] = Pctx.proxy![(item.on?.[eventName] as unknown as string)]
            });
          }
          const placeholder = item?.props?.disabled ? "" : (["input"].includes(item.type)
            ? `请输入${item.title ?? ""}`
            : `请选择${item.title ?? ""}`);

          switch (item.type) {
            case "select":
              return [
                h(
                  components.select,
                  {
                    placeholder,
                    ...item.props,
                    modelValue: props.formData![item.field],
                    "onUpdate:modelValue": (value) => {
                      return (props.formData![item.field] = value), item?.callback?.(value, item, this);
                    },
                    ...events,
                    class: "icm-w-search",
                  },
                  {
                    default: () =>
                      (item.options || []).map((v) =>
                        h(components.option, {
                          label: v[item?.queryOptionsFn?.label || 1] || v.label,
                          value: v[item?.queryOptionsFn?.value || 1] || v.value,
                          key: v[item?.queryOptionsFn?.value || 1] || v.value,
                        })
                      ),
                  }
                ),
              ];
            case "radioGroup":
              return [
                h(
                  components.radioGroup,
                  {
                    ...item.props,
                    modelValue: props.formData![item.field],
                    "onUpdate:modelValue": (value) => {
                      return (props.formData![item.field] = value), item?.callback?.(value, item, this);
                    },
                    ...events,
                  },
                  {
                    default: () =>
                      (item.options || []).map((v) =>
                        h(
                          components.radio,
                          {
                            label: v[item?.queryOptionsFn?.label || 1] || v.label,
                            key: v[item?.queryOptionsFn?.value || 1] || v.value,
                          },
                          {
                            default: () => v.label,
                          }
                        )
                      ),
                  }
                ),
              ];
            case "checkboxGroup":
              return [
                h(
                  components.checkboxGroup,
                  {
                    ...item.props,
                    ...events,
                    ...item,
                    modelValue: props.formData![item.field],
                    "onUpdate:modelValue": (value) => {
                      return (props.formData![item.field] = value), item?.callback?.(value, item, this);
                    },
                  },
                  () =>
                    item?.options?.map((v) =>
                      h(
                        components.checkbox,
                        {
                          label: v[item?.queryOptionsFn?.label || 1] || v.label,
                          key: v[item?.queryOptionsFn?.value || 1] || v.value,
                        },
                        () => [v.label]
                      )
                    )
                ),
              ];
            default:
              return [
                h(components[item.type], {
                  placeholder,
                  ...item,
                  ...item.props,
                  autocomplete: "new-password",
                  modelValue: props.formData![item.field],
                  "onUpdate:modelValue": (value) => {
                    return (props.formData![item.field] = value), item?.callback?.(value, item, this);
                  },
                  ...events,
                  class: "icm-w-search",
                },
                  renderTemplate(item)
                ),
              ];
          }
        };
        let formItem: object = components.formItem;

        let classArr = ["el-col"];
        for (const key in componentConig?.col) {
          if (key == "span") {
            classArr.push(`el-col-${componentConig.col[key]}`);
          } else {
            classArr.push(`el-col-${key}-${componentConig.col[key]}`);
          }
        }

        return h(
          "div",
          {
            // class: classArr,
          },
          {
            default: () => {
              return componentConig.isShow?  [
                h(
                  formItem,
                  {
                    label: componentConig.title,
                    // prop: `dataForm.${item._index}.value`,
                    prop: componentConig.field,
                    rules: componentConig.rules,
                    key: componentConig.field,
                    labelWidth: componentConig.labelWidth,
                    ...componentConig
                  },
                  {
                    default: () => SelectFun(componentConig),
                  }
                ),
              ]:null;
            },
          }
        );
      } else {
        return h(
          "div",
          { class: "el-row aaaaa" },
        );
      }
      // return null;
    };

    return renderConponents;
  },
});
</script>
<style lang="stylus" scoped>
.icm-w-search{
  width:100%
}
/deep/.el-form-item__label{
  // 禁止点击label的时候聚焦到输入框上
  pointer-events: none;
}
/deep/.el-input-group__append{
  padding:0 20px !important
}
</style>
