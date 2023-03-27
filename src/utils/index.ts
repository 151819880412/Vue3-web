import { APP_DARK_MODE_KEY_ } from "@/enums/cacheEnum";
import { isObject } from "./is";

export interface ArrrToTreeOptions {
  root?: string | number;
  pidKey?: string;
  idKey?: string;
  childKey?: string;
}

export function arrToTree(source: Array<object>, { root = 0, pidKey = 'parentId', idKey = 'id', childKey = 'children' }: ArrrToTreeOptions) {
  function getNode(id: string | number) {
    const node: Array<object> = [];
    for (let i = 0, len = source.length; i < len; i++) {
      if (source[i][pidKey] === id) {
        const children = getNode(source[i][idKey]);
        if (children.length > 0) source[i][childKey] = children;
        node.push(source[i]);
      }
    }
    return node;
  }
  return getNode(root);
}


export function flatten(arr: Array<any>) {
  return [].concat(...arr.map(item => {
    if (item.children) {
      const arrs = [].concat(item, ...flatten(item.children));
      delete item.children;
      return arrs;
    }
    return [].concat(item);
  }
  ));
}

// 获取 uuid
export const getUuid = function ():string {
  return (
    new Date().getTime().toString(36).substring(2, 12) +
    Math.ceil(Math.random() * 100000000).toString(36)
  )
}

export function setThemeColor(color) {
  const el = document.documentElement;
  const body = document.querySelector("body");
  // const nprogress = document.querySelector("#nprogress .bar");
  // console.log(nprogress)
  el.style.setProperty("--el-color-primary", color);
  body!.style.setProperty("--van-primary-color", color);
  // nprogress.style.setProperty("background", color);
  // 此行判断是否为白天/暗夜模式，可根据自身业务调整代码
  const mixColor = localStorage.getItem(APP_DARK_MODE_KEY_) === "dark" ? "#000000" : "#ffffff"; 
  // 此行判断是否为白天/暗夜模式，可根据自身业务调整代码
  for (let i = 1; i < 10; i++) {
    el.style.setProperty(`--el-color-primary-light-${i}`, colourBlend(color, mixColor, i / 10));
    el.style.setProperty(`--el-color-primary-dark-${i}`, colourBlend(color, mixColor, i / 10));
  }
  el.style.setProperty(`--el-color-primary-dark-2`, colourBlend(color, mixColor, 0.2));

}

export function colourBlend(c1, c2, ratio) {
  ratio = Math.max(Math.min(Number(ratio), 1), 0)
  const r1 = parseInt(c1.substring(1, 3), 16)
  const g1 = parseInt(c1.substring(3, 5), 16)
  const b1 = parseInt(c1.substring(5, 7), 16)
  const r2 = parseInt(c2.substring(1, 3), 16)
  const g2 = parseInt(c2.substring(3, 5), 16)
  const b2 = parseInt(c2.substring(5, 7), 16)
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio)
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio)
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio)
  const r3 = ('0' + (r || 0).toString(16)).slice(-2)
  const g3 = ('0' + (g || 0).toString(16)).slice(-2)
  const b3 = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + r3 + g3 + b3
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}


/**
 * 查询子节点的所有父节点
 * @date 2022-11-29
 * @param {any} cascader
 * @param {any} id
 * @returns {any}
 */
export function getCascaderFullValue<T>(cascader:Array<T>, path:string|number) {
  const cascaderFullValue = [path];
  _getParentId(cascaderFullValue, cascader, cascader, path);

  return cascaderFullValue;


  function _getParentId(cascaderFullValue, cascader, _cascader, _id) {
    if (!Array.isArray(cascader)) return;

    for (const cascaderItem of cascader) {
      if (!Array.isArray(cascaderItem.children)) continue;

      const index = cascaderItem.children.findIndex(
        (item) => item.path === _id
      ); //找到返回该元素的位置 有值为0 没有值返回-1
      if (index >= 0) {
        cascaderFullValue.unshift(cascaderItem.path); // 在数组开头添加元素
        if (
          _cascader.findIndex((item) => item.path === cascaderItem.path) <
          0
        )
          _getParentId(
            cascaderFullValue,
            _cascader,
            _cascader,
            cascaderItem.path
          );
      } else {
        _getParentId(
          cascaderFullValue,
          cascaderItem.children,
          _cascader,
          _id
        );
      }
    }
  }
}

export function deepClone(target) {
  const map = new WeakMap();
  function isObject(target) {
    return (typeof target === 'object' && target) || typeof target === 'function';
  }
  function clone(data) {
    if (!isObject(data)) {
      return data;
    }
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }
    const exist = map.get(data);
    if (exist) {
      return exist;
    }
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach(val => {
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }
    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data);
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result);
    keys.forEach(key => {
      const val = data[key];
      if (isObject(val)) {
        result[key] = clone(val);
      } else {
        if (!(key in Object)) {
          result[key] = val;
        }
      }
    });
    if (typeof data === 'function') {
      return new Function('return ' + data.toString()).bind(clone(target))();
    }
    return result;
  }
  return clone(target);
}