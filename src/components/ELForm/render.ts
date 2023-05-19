import { ElInput } from "element-plus";
import { h } from "vue";
import { useIcon } from "@/assets/icons";

export default function () {

  const render = (data: Record<string, unknown>) => {
    return h(ElInput, { ...data }, {
      suffix: () => h(useIcon('sun')),
      prefix: () => h(useIcon('Edit')),
    });
  };

  return {
    render
  };

}