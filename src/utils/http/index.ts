// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动

import type { AxiosInstance, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '@/../types/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { isString } from '@/utils/is';
import { formatRequestDate } from './helper';

import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import app from '@/main';
import { LoadingType } from '@/@types/loading';
import { router } from '@/router';
import { useUserStoreWithOut } from '@/piniaStore/modules/user';
import { AxiosRetry } from './axiosRetry';
import { useErrorLogStoreWithOut } from '@/piniaStore/modules/errorLog';
import { ErrorTypeEnum } from '@/enums/exceptionEnum';
import { ErrorLogInfo } from '#/store';
// import { errorHandler } from '../watchError';

export const globSetting = {
  title: 1,
  apiUrl: process.env.VUE_APP_SERVER_URL,
  shortName: 1,
  urlPrefix: '/api',
  uploadUrl: 1,
};
const urlPrefix = globSetting.urlPrefix;
const loadingInstance: LoadingType = app?.$Loading;
let TokenInvalid = false;

let globErrApiList: ErrorLogInfo[] = [];

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回

    const { data } = res;
    // if (!data) {
    //   // 没有返回值
    //   throw new Error('data数据为null');
    // }
    //  这里 code，data，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, message, type } = data;

    // 不返回code，根据统一处理
    // 服务器返回成功code 200 / 20000 都是成功
    const hasSuccess =
      data && Reflect.has(data, 'code') && ((code === ResultEnum.SUCCESS || code === 20000) || type == 'success');
    if (hasSuccess) {
      return data;
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = '2';
        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    // if (options.errorMessageMode === 'modal') {
    // } else if (options.errorMessageMode === 'message') {
    // }

    throw new Error(timeoutMsg);
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    console.log(apiUrl)
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {});
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        // 为了同时存在params和query参数，暂时将query参数放入data中
        config.params = data ? data : undefined;
        // config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = '123';
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    loadingInstance?.showLoading();
    NProgress.start();
    // 请求之前处理config
    const userStore = useUserStoreWithOut();
    const { token, refreshToken } = userStore.getToken;

    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config!.headers!.token = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config!.headers!.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;



      // config.headers.accessToken = options.authenticationScheme
      //   ? `${options.authenticationScheme} ${token}`
      //   : token;
      // config.headers.refreshToken = options.authenticationScheme
      // ? `${options.authenticationScheme} ${token}`
      // : token;

    }
    if (refreshToken && (config as Recordable)?.requestOptions?.withToken !== false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config!.headers!.refreshToken = options.authenticationScheme
        ? `${options.authenticationScheme} ${refreshToken}`
        : refreshToken;
    }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    // console.log('响应拦截器处理', res);
    const { code, type } = res.data;
    const hasSuccess = (code === ResultEnum.SUCCESS || code === 20000) || (type === 'success');
    if (code == 30001) {
      TokenInvalid = true;
      router.push({
        path: '/login'
      });
    }
    if (code !== 20000) {
      ElMessage.error(res.data.message);
    }
    loadingInstance?.hideLoading();
    NProgress.done();
    if (TokenInvalid) return res;
    if (hasSuccess) {
      globErrApiList = [];
      return res;
    }
    throw new Error(res.data.message);
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    // console.log('响应错误拦截器', error, error.response);
    // errorHandler('E1005', `请求地址：${error.config.method}：${error.config.url}`);
    loadingInstance?.hideLoading();
    NProgress.done();


    const response = error.response || {};
    const { code, message } = error || {};
    // // 超时重新请求
    // // 全局的请求次数,请求的间隙
    // const [RETRY_COUNT, RETRY_DELAY] = [config?.requestOptions?.retrtyCount, config?.requestOptions?.retrtyDelay];
    // if (config && RETRY_COUNT) {
    //   // 设置用于跟踪重试计数的变量
    //   config.__retryCount = config.__retryCount || 0;
    //   // 检查是否已经把重试的总数用完
    //   if (config.__retryCount >= RETRY_COUNT) {
    //     return Promise.reject(response || { message: error.message });
    //   }
    //   // 增加重试计数
    //   config.__retryCount++;
    //   // 创造新的Promise来处理指数后退
    //   const backoff = new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(1);
    //     }, RETRY_DELAY || 1);
    //   });
    //   // instance重试请求的Promise
    //   await backoff;
    //   return await defHttp.axiosInstance(config);
    // }

    const retryRequest = new AxiosRetry();
    retryRequest.retry(axiosInstance, error).catch(() => {
      // 重复请求的失败，防止多次调用新增错误日志的接口
    });

    // const { response, code, message, config } = error || {};
    // const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    // const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    if(response&&response.data&&response.data.code == 40001){
      ElMessage.error('参数异常');
      throw new Error('参数异常');
    }


    // try {
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      errMessage = '请求超时';
    }
    if (err?.includes('Network Error')) {
      errMessage = '网络异常';
    }
    if (message.indexOf('404') !== -1) {
      errMessage = '找不到接口';
    }
    if (message.indexOf('400') !== -1) {
      errMessage = '接口参数异常';
    }
    if (response.data && typeof response.data === "string" && response.data.indexOf('Proxy error: Could not proxy request') !== -1) {
      errMessage = '服务器连接异常';
    }

    if (errMessage) {
      // if (errorMessageMode === 'modal') {
      // } else if (errorMessageMode === 'message') {
      // }
      ElMessage.error(errMessage);
      const errorLogStore = useErrorLogStoreWithOut();
      console.log(error, response, code, message, globErrApiList);
      const errorObj = {
        type: ErrorTypeEnum.AJAX,
        name: error.name,
        file: '',
        detail: error?.config?.data || error.message,
        url: error?.config?.url || '',
        stack: 'ajax error!',
        message: message,
      };
      if (globErrApiList.length == 0) {
        globErrApiList.push(errorObj);
        errorLogStore.addErrorLogInfo(errorObj);
      } else {
        if (globErrApiList[globErrApiList.length - 1].url !== error.config.url) {
          globErrApiList.push(errorObj);
          errorLogStore.addErrorLogInfo(errorObj);
        }
      }
    }
    // } catch (error) {
    //   throw new Error('error');
    // }

    // setTimeout(()=>{
    //   throw error
    // })



    // return Promise.reject(error);
    throw new Error(error);


  },
};

function createAxios(_opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    {
      // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
      // authentication schemes，e.g: Bearer
      // authenticationScheme: 'Bearer',
      authenticationScheme: '',
      timeout: 3 * 1000,
      // 基础接口地址
      baseURL: globSetting.apiUrl,

      headers: { 'Content-Type': ContentTypeEnum.JSON },
      // 如果是form-data格式
      // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
      // 数据处理方式
      transform,
      // 配置项，下面的选项都可以在独立的接口请求中覆盖
      requestOptions: {
        // 失败重复请求次数
        retrtyCount: 0,
        // 失败重复请求时间
        retrtyDelay: 1000,
        // 默认将prefix 添加到url
        joinPrefix: true,
        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        isReturnNativeResponse: false,
        // 需要对返回数据进行处理
        isTransformResponse: true,
        // post请求的时候添加参数到url
        joinParamsToUrl: false,
        // 格式化提交参数时间
        formatDate: true,
        // 消息提示类型
        errorMessageMode: 'message',
        // 接口地址
        apiUrl: globSetting.apiUrl,
        // 接口拼接地址
        urlPrefix: urlPrefix,
        // 是否加入时间戳
        joinTime: false,
        // 忽略重复请求
        ignoreCancelToken: true,
        // 是否携带token
        withToken: true,
        // 是否携带refreshToken
        withRefreshToken: true,
      },
    }
  );
}
export const defHttp = createAxios();
// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
