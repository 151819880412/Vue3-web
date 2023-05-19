import * as Icons from "@element-plus/icons-vue";
import { createVNode } from "vue";
import SvgIcon from '@/components/Icon/SvgIcon.vue';

// 导入本地 SVG 图标
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

// 使用本地 SVG 图标的方法
function useLocalSvgIcon(iconName: string) {
  // return `<svg class="icon" aria-hidden="true">
  //           <use xlink:href="#${iconName}"></use>
  //         </svg>`;
  return createVNode(SvgIcon, {
    iconClass: iconName,
    name: iconName,
    className: iconName,
    height: '1em',
    width: '1em',
  });

}

// 使用 Element Plus SVG 图标的方法
function useElementPlusIcon(iconName: string) {
  // return `<${ElIcon} name="${iconName}"></${ElIcon}>`;
  return createVNode(Icons[iconName], {
    height: '1em',
    width: '1em',
  });
}

// 统一的图标使用方法
function useIcon(iconName: string, isLocalSvg = true) {
  if(Icons[iconName]){
    return useElementPlusIcon(iconName);
  }else if (isLocalSvg) {
    return useLocalSvgIcon(iconName);
  } else {
    return useElementPlusIcon(iconName);
  }
}

export { useIcon };
