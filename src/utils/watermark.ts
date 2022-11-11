import { getCurrentInstance, onBeforeUnmount, ref, Ref, shallowRef, unref } from 'vue';
import { isDef } from '@/utils/is';

const domSymbol = Symbol('watermark-dom');

export function useWatermark(
  appendEl: Ref<HTMLElement | null> = ref(document.body) as Ref<HTMLElement>,
) {

  const id = domSymbol.toString();
  const watermarkEl = shallowRef<HTMLElement>();

  const clear = () => {
    const domId = unref(watermarkEl);
    watermarkEl.value = undefined;
    const el = unref(appendEl);
    if (!el) return;
    domId && el.removeChild(domId);
  };

  function createBase64(str: string) {
    const can = document.createElement('canvas');
    const width = 300;
    const height = 240;
    Object.assign(can, { width, height });

    const cans = can.getContext('2d');
    if (cans) {
      cans.rotate((-20 * Math.PI) / 120);
      cans.font = '15px Vedana';
      cans.fillStyle = 'rgba(0, 0, 0, 0.15)';
      cans.textAlign = 'left';
      cans.textBaseline = 'middle';
      cans.fillText(str, width / 20, height);
    }
    return can.toDataURL('image/png');
  }

  function updateWatermark(
    options: {
      width?: number | string;
      height?: number | string;
      str?: string;
    } = {},
  ) {
    const el = unref(watermarkEl);
    if (!el) return;
    if (isDef(options.width)) {
      el.style.width = `${options.width}`;
    }
    if (isDef(options.height)) {
      el.style.height = `${options.height}`;
    }
    if (isDef(options.str)) {
      el.style.background = `url(${createBase64(options.str)}) left top repeat`;
    }
  }

  const createWatermark = (str: string) => {
    if (unref(watermarkEl)) {
      updateWatermark({ str });
      return id;
    }
    const div = document.createElement('div');
    watermarkEl.value = div;
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.position = 'absolute';
    div.style.zIndex = '100000';
    div.className = `water-mark`; // 方便自定义展示结果
    const el = unref(appendEl);
    if (!el) return id;
    const { clientHeight: height, clientWidth: width } = el;
    updateWatermark({ str, width:width+'px', height:height+'px' });
    el.appendChild(div);
    createObserver(el);
    return id;
  };

  function setWatermark(str: string) {
    createWatermark(str);
    const instance = getCurrentInstance();
    if (instance) {
      onBeforeUnmount(() => {
        clear();
      });
    }
  }

  // 监听 DOM 变化
  const createObserver = (el: HTMLElement) => {
    const parentElement = el;
    const waterMarkEl = parentElement.querySelector(".water-mark") as Element;
    const observer = new MutationObserver((mutationsList) => {
      if (mutationsList.length) {
        const { removedNodes } = mutationsList[0];
        console.log(removedNodes[0] == waterMarkEl, 22);
        // 证明被删除了
        if (removedNodes[0] === waterMarkEl) {
          observer.disconnect();
          watermarkEl.value = undefined;
          setWatermark('请勿外传');
        } else {
          const width = watermarkEl.value?.style.width;
          const height = watermarkEl.value?.style.height;
          const str = '请勿外传';
          updateWatermark({ width, height, str });
        }
      }
    });

    observer.observe(parentElement, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  };

  return { setWatermark, clear };
}
