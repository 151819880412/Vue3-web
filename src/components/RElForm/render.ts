import { ElForm, ElFormItem, ElInput, ElInputNumber, ElSelect } from "element-plus";
import { Ref, h, ref } from "vue";

export default function () {
  const rElFormRef: Ref<typeof ElForm | null> = ref(null);

  const renderFormItemComponents = (row: any, data: any) => {
    row.formData = data
    if(row.defaultValue){
      data[row.prop] = row.defaultValue
    }
    row.modelValue = data[row.prop]
    row["onUpdate:modelValue"] = (value: string) => {
      data[row.prop] = value;
      return true;
    }

    switch (row.component) {
      case "el-input":
        return [h(ElInput, {
          ...row,
        })];
        
      case "el-input-number":
        return [h(ElInputNumber, {
          ...row,
        })];
        case "el-select":
        return [h(ElSelect, {
          ...row,
        })];
      default:
        return [h(ElInput, {
          ...row,
          formData: data,
          modelValue: data[row.prop],
          "onUpdate:modelValue": (value: string) => {
            data[row.prop] = value;
            return true;
          }
        })];
    }
  };

  const render = (list: any[], data: Record<string, unknown>) => {
    const formItems = list.map(item => {
      // Fragment  不会渲染为标签 -- 等同于空白
      // return h(Fragment, { key: item.prop ,class: "el-col el-col-12"}, [
      return h('div', { key: item.prop, class: `el-col el-col-${item.span}` }, [

        h(ElFormItem, {
          ...item
        }, [
          // h(ElInput, {
          //   ...item,
          //   modelValue: data[item.prop],
          //   "onUpdate:modelValue": (val: string) => {
          //     data[item.prop] = val;
          //   },
          // }, {
          //   suffix: () => h(useIcon('sun')),
          //   prefix: () => h(useIcon('Edit')),
          // }),
          renderFormItemComponents(item, data)
        ]),
      ]);
    });

    return h(ElForm, {
      model: data,
      ref: rElFormRef,
    }, [
      h("div", { class: "el-row" }, formItems),
    ]);
  };

  return {
    render,
    rElFormRef,
  };

}