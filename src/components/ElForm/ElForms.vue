<template>
  <div ref="ElForms"></div>
</template>

<script lang="ts">
import _ from 'lodash'
import { ref, toRefs, h , PropType,} from "vue";
import {
  ElInput,
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
} from "element-plus";
import { ElFormConfig, Options, Rules } from "#/form-config";

export default {
  name: "ElForms",
  props: {
    rule: {
      type: Array as PropType<ElFormConfig<Rules, Options>[]>,
    },
  },
  // setup(props: Readonly<{ rule: ElFormConfig<Rules, Options>[]|undefined; }>, { expose }: any) {
  setup(props, { expose }: any) {
    const compA = {
      Input: ElInput,
      Select: ElSelect,
      DatePicker: ElDatePicker,
      TimePicker: ElTimePicker,
      Cascader: ElCascader,
      RadioGroup: ElRadioGroup,
      CheckboxGroup: ElCheckboxGroup,
    };
    const comB = {
      Option: ElOption,
      Button: ElButton,
      Form: ElForm,
      FormItem: ElFormItem,
      Radio: ElRadio,
      Checkbox: ElCheckbox,
    };
    const components = { ...compA, ...comB };
    const { rule } = toRefs(props);
    const rules: Array<ElFormConfig<Rules, Options>> = rule.value as Array<
      ElFormConfig<Rules, Options>
    >;

    rules.forEach((item) => {
      if (item.required) {
        const placeholder = ["Input"].includes(item.type)
          ? `请输入${item.title ?? ""}`
          : `请选择${item.title ?? ""}`;
        item.rules.unshift({
          message: placeholder,
          required: true,
          trigger: ["Input"].includes(item.type) ? "blur" : "change",
        });
      }
      
    });



    const refDataForm = ref();

    /**
     * 验证全部字段
     * @date 2022-07-20
     * @param {any} callback:Function
     * @returns {any}
     */
    const validate = (callback:Function):void => {
      refDataForm.value?.validate?.((valid:boolean):void => {
        if (valid) {
          const obj = rules.reduce(
            (sum, v) => ({ ...sum, [v.field]: v.value }),
            {}
          );
          return callback(_.pickBy(obj), valid);
        }
        // return callback({},valid);
      });
    };

    /**
     * 重置表单
     * @date 2022-07-20
     * @returns {any}
     */
    const neoResetFields = ():void => {
      refDataForm.value?.resetFields?.();
      // refDataForm.value?.clearValidate?.();
    };

    /**
     * 验证单个字段
     * dataForm.0.value
     * @date 2022-07-19
     * @param {any} field:string
     * @returns {any}
     */
    const validateField = (field: string):void => {
      refDataForm.value!.validateField?.(field);
    };

    expose({
      validate,
      neoResetFields,
      validateField,
    });

    return () => {
      if (rules.filter((item) => compA[item.type]).length) {
        const SelectFun = (item: ElFormConfig<Rules, Options>) => {
          // console.log(item)
          const events = {};
          if (item.on) {
            Object.keys(item.on).forEach((eventName) => {
              const newName = eventName.slice(0, 1).toUpperCase() + eventName.slice(1);
              events[`on${newName}`] = item.on?.[eventName];
            });
          }
          const placeholder = ["Input"].includes(item.type)
            ? `请输入${item.title ?? ""}`
            : `请选择${item.title ?? ""}`;

          switch (item.type) {
            case "Select":
              return [
                h(
                  components.Select,
                  {
                    placeholder,
                    ...item.props,
                    modelValue: item.value,
                    "onUpdate:modelValue": (value) => (item.value = value),
                    ...events,
                    class: "icm-w-search",
                  },
                  {
                    default: () =>
                      (item.options || []).map((v) =>
                        h(components.Option, {
                          label: v.label,
                          value: v.value,
                          key: v.value,
                        })
                      ),
                  }
                ),
              ];
            case "RadioGroup":
              return [
                h(
                  components.RadioGroup,
                  {
                    ...item.props,
                    modelValue: item.value,
                    "onUpdate:modelValue": (value) => (item.value = value),
                    ...events,
                  },
                  {
                    default: () =>
                      (item.options || []).map((v) =>
                        h(
                          components.Radio,
                          {
                            label: v.value,
                            key: v.value,
                          },
                          {
                            default: () => v.label,
                          }
                        )
                      ),
                  }
                ),
              ];
            case "CheckboxGroup":
              return [
                h(
                  components.CheckboxGroup,
                  {
                    ...item.props,
                    ...events,
                    ...item,
                    modelValue: item.value,
                    "onUpdate:modelValue": (value) => (item.value = value),
                  },
                  () =>
                    item?.options?.map((o) =>
                      h(
                        components.Checkbox,
                        {
                          label: o.value,
                          key: o.value,
                        },
                        () => [o.label]
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
                  modelValue: item.value,
                  "onUpdate:modelValue": (value) => (
                    (item.value = value), item?.callback?.(value, item, this)
                  ),
                  ...events,
                  class: "icm-w-search",
                }),
              ];
          }
        };
        return h(
          components.Form,
          {
            ref: refDataForm,
            size: "default",
            labelWidth: 110,
            labelSuffix: "：",
            inline: false,
            model: { dataForm: rules },
          },
          {
            default: () =>
              rules
                .filter((item) => compA[item.type])
                .map((item, inx) =>
                  h(
                    components.FormItem,
                    {
                      label: item.title,
                      prop: `dataForm.${inx}.value`,
                      rules: item.rules,
                      key: item.field,
                    },
                    {
                      default: () => SelectFun(item),
                    }
                  )
                ),
          }
        );
      }
      return null;
    };
  },
};
</script>
<style lang="stylus" scoped></style>
