
// import { App } from "vue";

// 全局保存 canvas 和 div ，避免重复创建（单例模式）
let globalCanvas: HTMLCanvasElement;
let globalWaterMark: HTMLDivElement;
const id = Symbol.toString();

// watermark 样式
let style = `
display: block;
overflow: hidden;
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-repeat: repeat;
pointer-events: none;`;

type propType = {
  font?: string;
  fillStyle?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  text?: string;
};

const getDataUrl = ({
  font = "16px normal",
  fillStyle = "rgba(180, 180, 180, 0.3)",
  textAlign = 'left',
  textBaseline = 'middle',
  text = "请勿外传",
}: propType) => {
  const rotate = -20;
  const canvas: HTMLCanvasElement = globalCanvas || document.createElement("canvas");
  globalCanvas = canvas;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D; // 获取画布上下文

  ctx.rotate((rotate * Math.PI) / 180);
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.fillText(text, canvas.width / 3, canvas.height / 2);

  return canvas.toDataURL("image/png");
};

const setWaterMark = (el: HTMLElement, binding: propType) => {
  // const { parentElement } = el;
  const parentElement = el.parentElement as HTMLElement;

  // 获取对应的 canvas 画布相关的 base64 url
  const url = getDataUrl(binding);

  // 创建 waterMark 父元素
  const waterMark = globalWaterMark || document.createElement("div");
  globalWaterMark = waterMark;
  waterMark.className = `water-mark`; // 方便自定义展示结果
  style = `${style}background-image: url(${url});`;
  waterMark.setAttribute("style", style);
  waterMark.id = id;


  // 将对应图片的父容器作为定位元素
  parentElement.setAttribute("style", "position: relative;");

  // 将图片元素移动到 waterMark 中
  parentElement.appendChild(waterMark);
};

// 监听 DOM 变化
const createObserver = (el: HTMLElement, binding: propType) => {
  const parentElement = el.parentElement as HTMLElement;
  const waterMarkEl = parentElement.querySelector(".water-mark") as Element;

  const observer = new MutationObserver((mutationsList) => {
    if (mutationsList.length) {
      const { removedNodes, type, target } = mutationsList[0];
      const currStyle = waterMarkEl.getAttribute("style");

      // 证明被删除了
      if (removedNodes[0] === waterMarkEl) {
        observer.disconnect();
        init(el, binding);
      } else if (
        type === "attributes" &&
        target === waterMarkEl &&
        currStyle !== style
      ) {
        waterMarkEl.setAttribute("style", style);
      }
    }
  });

  observer.observe(parentElement, {
    childList: true,
    attributes: true,
    subtree: true,
  });
};

// 初始化
const init = (el?: HTMLElement, binding?: propType) => {
  el = el ?? document.body;
  binding = binding ?? {
    font: "16px normal",
    fillStyle: "rgba(180, 180, 180, 0.3)",
    textAlign: 'left',
    textBaseline: 'middle',
    text: "请勿外传",
  };
  // 设置水印
  setWaterMark(el, binding);
  // 启动监控
  createObserver(el, binding);
};

const clear = ()=>{
//   globalCanvas = null
// globalWaterMark = null
const domId = document.getElementById(id)
console.log(domId)
      // document.body.removeChild(domId);
}

// 定义指令配置项    报错
// const directives: propType = {
//   mounted(el: HTMLElement, binding: propType) {
//     el.onload = init.bind(null, el, binding);
//   },
// };

// export default {
//   name: "watermark",
//   directives,
// };

// export default function installDirective(app: App) {
//   app.directive('watermark', directives);
// } 


// init(document.body,{value:123})

// export const useWatermark = init;
export function useWatermark(){
  return {
    setWatermark:init,
    clear
  }
}