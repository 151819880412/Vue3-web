// src/utils/watchError.ts

import { router } from "@/router";
import { App } from 'vue';


// 错误代码
const errCode = new Map([
  // 本地系统错误
  ['E1001', '系统未知错误'],
  ['E1002', 'vue逻辑错误'],
  ['E1003', 'JavaScript错误'],
  ['E1004', '静态资源加载错误'],
  ['E1005', '请求错误'],
  ['E1006', 'Promise错误']
])
// 开启监听
export const watchError = (app: App) => {
  // vue渲染或者vue处理错误
  app.config.errorHandler = (err: any,vm,info) => {
    console.error('监测到E1002错误');
    console.log(err);
    console.log(err.message);
    console.log(err.stack)
    console.log(vm?.$el,info)
    errorHandler('E1002', err.name + ':' + err.message)
  }
  // 静态资源加载错误 或者 JS错误
  window.addEventListener('error', (error: any) => {
    // 区分是否是js错误
    console.log(111,error)
    if (error.message) {
      console.error('监测到E1003错误');
      errorHandler('E1003', error.message, error.filename)
    } else {
      console.error('监测到E1004错误');
      errorHandler('E1004', error.target.currentSrc, error.filename)
    }
  }, true)
  window.onerror = function(msg, source, line, column, error) {
    console.log('window.onerror---------', msg, source, line, column, error)
}
}
// 错误处理函数
export const errorHandler = (code: string, msg: string, file = 'null') => {
  // 这里处理监听到的错误
  // 保存错误信息
  saveLog({ code: code, type: errCode.get(`$[code]`), msg: msg, router: router.currentRoute.value.fullPath, file: file, createTime: new Date().toLocaleString() })
}
type errorParams = {
  code: string    				// 错误代码
  msg: string	  				// 错误内容
  router: string				// 错误路由地址（根据hash地址‘/#/'切割而来，具体看需求）
  file?: string					// 错误的文件（不一定有）
  createTime: string			// 发现错误的时间
  type?: string					// 错误的类型
}
// localstorage 保存错误信息 最多50条避免爆满
const saveLog = (data: errorParams): void => {
  const nowData = localStorage.getItem('ERROR')
  if (nowData) {
    const allData = JSON.parse(nowData)
    sortArray(allData)
    // 只存50条错误信息
    if (allData.length > 50) {
      // 已存50条
      allData[0] = data
      sortArray(allData)
    } else {
      allData.push(data)
    }
    localStorage.setItem('ERROR', JSON.stringify(allData))
  } else {
    localStorage.setItem('ERROR', JSON.stringify([data]))
  }
}
// 错误日志排序
const sortArray = (allData: string[]) => {
  allData.sort((a: any, b: any) => {
    if (a.createTime > b.createTime) {
      return 1
    }
    return -1
  })
}