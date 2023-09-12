<template>
  <div ref="ElForms"></div>
</template>

<script lang="ts">
import { ref, h, PropType, toRefs, reactive, Ref, inject, ComponentInternalInstance } from "vue";
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
} from "element-plus";
import { FormInterface, Options, Rules } from "#/form-config";
import { preProcessData } from "@/utils/objFilter";
import { Generate } from "#/Generate";
import { RawSlots } from "element-plus/es/utils";

export default {
  name: "ElForms",
  props: {
    formConfig: {
      type: Array as PropType<FormInterface<Rules, Options>[]>,
    },
    formData: {
      type: Object
    }
  },
  // setup(props: Readonly<{ formConfig: FormInterface<Rules, Options>[]|undefined; }>, { expose }: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, { expose }: any) {
    let Pctx = inject("Pctx") as ComponentInternalInstance;
    // console.log('传给ElForms组件的实例', Pctx);
    Pctx;
    const compA = {
      input: ElInput,
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
    };
    const components = { ...compA, ...comB };
    // 将 props 参数转换为响应式
    const { formConfig } = toRefs(props);
    let rules = reactive(formConfig || []) as Ref<FormInterface<Rules, Options>[]>;
    // let rules: Array<FormInterface<Rules, Options>> = formConfig.value as Array<
    //   FormInterface<Rules, Options>
    // >;

    // const {formData} = toRefs(props);
    // let formDatas = reactive(formData||{})
    // console.log(formDatas)


    rules.value.forEach((item, index) => {
      item._index = index;
      if (item.required) {
        const placeholder = ["input"].includes(item.type)
          ? `请输入${item.title ?? ""}`
          : `请选择${item.title ?? ""}`;
        if (item.rules) {
          item.rules.push({
            message: placeholder,
            required: true,
            trigger: ["input"].includes(item.type) ? "blur" : "change",
          });
        } else {
          item.rules = [{
            message: placeholder,
            required: true,
            trigger: ["input"].includes(item.type) ? "blur" : "change",
          }];
        }
      }
    });
    const refDataForm = ref();


    /**
     * 验证全部字段
     * @date 2022-07-20
     * @param {any} callback:Function
     * @returns {any}
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    const validate = (callback: Function): void => {
      refDataForm.value?.validate?.((valid: boolean): void => {
        if (valid) {
          const objType = rules.value.reduce((sum, v) => ({ ...sum, [v.field]: v.value }), {});
          const obj: Generate<typeof objType> = rules.value.reduce((sum, v) => ({ ...sum, [v.field]: v.value }), {});
          // return callback(_.omitBy(obj), valid);
          // return callback(preProcessData(Object.assign({}, props.formData, obj)), valid);
          return callback(preProcessData(Object.assign({}, obj, props.formData)), valid);
        }
        // return callback({},valid);
      });
    };

    /**
     * 重置表单
     * @date 2022-07-20
     * @returns {any}
     */
    const neoResetFields = (): void => {
      refDataForm.value?.resetFields?.();
      // refDataForm.value?.clearValidate?.();
    };

    /**
     * 验证单个字段
     * @date 2022-07-19
     * @param {any} field:string
     * @returns {any}
     */
    const validateField = (field: string): void => {
      refDataForm.value.validateField?.(field);
    };

    /**
     * 查询表单数据
     * @date 2023-02-01
     * @returns {any}
     */
    const queryFormData = () => {
      const objType = rules.value.reduce((sum, v) => ({ ...sum, [v.field]: v.value }), {});
      const obj: Generate<typeof objType> = rules.value.reduce((sum, v) => ({ ...sum, [v.field]: v.value }), {});
      return preProcessData(Object.assign({}, props.formData, obj));
    };

    const rType = () => {
      const obj = rules.value.reduce((sum, v) => ({ ...sum, [v.field]: v.value }), {});
      return obj;
    };

    let lastHideList: string[] = [];

    // 暴露方法
    expose({
      validate,
      neoResetFields,
      validateField,
      rType,
      queryFormData,
    });

    // 渲染前后缀
    const renderTemplate = (item) => {
      const obj: any = {};
      if (item.prepend) {
        obj.prepend = () => h('div', { class: 'pointer' ,...sloatsOn}, item.prepend);
      }
      if (item.append) {
        obj.append = () => h('div', { class: 'pointer',...sloatsOn }, item.append);
      }
      if (Object.keys(obj).length === 0) {
        return null as unknown as RawSlots;
      }
      return obj as RawSlots;
    };
    const sloatsOn = {}

    const renderConponents = () => {
      if (rules.value.filter((item) => compA[item.type]).length) {
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
          if (item.sloatsOn) {
            Object.keys(item.sloatsOn).forEach((eventName) => {
              const newName = eventName.slice(0, 1).toUpperCase() + eventName.slice(1);
              sloatsOn[`on${newName}`] = item.sloatsOn?.[eventName];
              // 当全部事件由后端返回成字符串的时候使用这段代码
              // sloatsOn[`on${newName}`] = Pctx.proxy![(item.on?.[eventName] as unknown as string)]
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
                      // 控制显示隐藏
                      if (lastHideList.length > 0) {
                        rules.value.forEach(items => {
                          if (lastHideList.includes(items.field)) {
                            items.isShow = true;
                            items.value = '';
                          }
                        });
                      }
                      let isHideRow: string[] | undefined = item.options?.filter(item3 => item3.value == value)[0].hide;
                      if (isHideRow) {
                        lastHideList = JSON.parse(JSON.stringify(isHideRow));
                        rules.value.forEach(items => {
                          if (lastHideList.includes(items.field)) {
                            items.isShow = false;
                            items.value = '';
                          }
                        });
                      }
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
                      // 控制显示隐藏
                      if (lastHideList.length > 0) {
                        rules.value.forEach(items => {
                          if (lastHideList.includes(items.field)) {
                            items.isShow = true;
                            items.value = '';
                          }
                        });
                      }
                      let isHideRow: string[] | undefined = item.options?.filter(item3 => item3.value == value)[0].hide;
                      if (isHideRow) {
                        lastHideList = JSON.parse(JSON.stringify(isHideRow));
                        rules.value.forEach(items => {
                          if (lastHideList.includes(items.field)) {
                            items.isShow = false;
                            items.value = '';
                          }
                        });
                      }
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
                      // 控制显示隐藏
                      if (lastHideList.length > 0) {
                        rules.value.forEach(items => {
                          if (lastHideList.includes(items.field)) {
                            items.isShow = true;
                            items.value = '';
                          }
                        });
                      }
                      let isHideRow: string[] | undefined = item.options?.filter(item3 => item3.value == value)[0].hide;
                      if (isHideRow) {
                        lastHideList = JSON.parse(JSON.stringify(isHideRow));
                        rules.value.forEach(items => {
                          if (lastHideList.includes(items.field)) {
                            items.isShow = false;
                            items.value = '';
                          }
                        });
                      }
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
                    // 控制显示隐藏
                    if (lastHideList.length > 0) {
                      rules.value.forEach(items => {
                        if (lastHideList.includes(items.field)) {
                          items.isShow = true;
                          items.value = '';
                        }
                      });
                    }
                    let isHideRow: string[] | undefined = item.options?.filter(item3 => item3.value == value)[0].hide;
                    if (isHideRow) {
                      lastHideList = JSON.parse(JSON.stringify(isHideRow));
                      rules.value.forEach(items => {
                        if (lastHideList.includes(items.field)) {
                          items.isShow = false;
                          items.value = '';
                        }
                      });
                    }
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

        return h(
          components.form,
          {
            ref: refDataForm,
            size: "default",
            labelWidth: 110,
            labelSuffix: "：",
            inline: false,
            // model: { dataForm: rules.value },
            model: props.formData,
            // "label-position":'left',
          },
          h(
            "div",
            { class: "el-row" },
            {
              default: () =>
                rules.value
                  // 动态显示隐藏 会有卡顿 待优化
                  .filter((item) => compA[item.type] && item.isShow)
                  .map((item) => {
                    let classArr = ["el-col"];
                    for (const key in item?.col) {
                      if (key == "span") {
                        classArr.push(`el-col-${item.col[key]}`);
                      } else {
                        classArr.push(`el-col-${key}-${item.col[key]}`);
                      }
                    }
                    return h(
                      "div",
                      {
                        // class: "el-col el-col-12 el-col-offset-0 el-col-xs-8 el-col-sm-6 el-col-md-4 el-col-lg-3 el-col-xl-1",
                        class: classArr,
                      },
                      {
                        default: () => {
                          return [
                            h(
                              formItem,
                              {
                                label: item.title,
                                // prop: `dataForm.${item._index}.value`,
                                prop: item.field,
                                rules: item.rules,
                                key: item.field,
                                labelWidth: item.labelWidth,
                              },
                              {
                                default: () => SelectFun(item),
                              }
                            ),
                          ];
                        },
                      }
                    );
                  }),
            }
          )
        );
      }
      return null;
    };

    return renderConponents;
  },
};
</script>
<style lang="stylus" scoped>
.icm-w-search{
  width:100%
}
/deep/.el-form-item__label{
  // 禁止点击label的时候聚焦到输入框上
  pointer-events: none;
}

</style>
