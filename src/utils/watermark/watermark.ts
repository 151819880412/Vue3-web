import { getCurrentInstance, onBeforeUnmount,  ref, Ref, shallowRef, unref } from 'vue';
import { isDef } from '@/utils/is';
import { useDebounceFn } from '@vueuse/core';

const domSymbol = Symbol('watermark-dom');

export function useWatermark(
  appendEl: Ref<HTMLElement | null> = ref(document.body) as Ref<HTMLElement>,
) {

  const id = domSymbol.toString();
  const watermarkEl = shallowRef<HTMLElement>();
  let globResize = false
  let globInit = false

  const resize = () => {
    if(globResize){
      const width = window.innerWidth + 'px';
      const height = window.innerHeight + 'px';
      const str = '请勿外传';
      updateWatermark({ width, height, str });
    }
  };
  // 防抖
  const debounce = useDebounceFn(resize, 1000)

  const clear = () => {
    window.removeEventListener('resize',debounce)
    
    globResize = false
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

  const updateWatermark = (
    options: {
      width?: number | string;
      height?: number | string;
      str?: string;
    } = {},
  ) => {
    // if (!appStore.getProjectConfig.showWatermark) return;
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
  };

  const createWatermark = (str: string) => {
    if (unref(watermarkEl)) {
      updateWatermark({ str });
      return id;
    }
    // if (!appStore.getProjectConfig.showWatermark) return;
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
    // const { clientHeight: height, clientWidth: width } = el;
    updateWatermark({ str, width: document.body.clientWidth + 'px', height: document.body.clientHeight + 'px' });
    el.appendChild(div);
    createObserver(el);
    listeners()
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
        // 证明被删除了
        if (removedNodes[0] === waterMarkEl&&globResize) {
          watermarkEl.value = undefined;
          setWatermark('请勿外传');
          observer.disconnect();
        } else {
          // const width = watermarkEl.value?.style.width;
          // const height = watermarkEl.value?.style.height;
          // const str = '请勿外传';
          // updateWatermark({ width, height, str });
        }
      }
    });

    observer.observe(parentElement, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  };

  const listeners = () => {
    globResize = true
    if(globResize&&!globInit){
      // window.addEventListener('resize', useDebounceFn(resize, 500));
      window.addEventListener('resize', debounce);
      globInit = true
    }

  };


  return { setWatermark, clear };
}
