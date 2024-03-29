import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { RequestOptions, Result, UploadFileParams } from '@/../types/axios';
import type { CreateAxiosOptions } from './axiosTransform';
import axios from 'axios';
import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { isFunction } from '@/utils/is';
// import { cloneDeep, omit } from 'lodash-es';
import { omit } from 'lodash-es';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { RequestEnum } from '@/enums/httpEnum';
import { globSetting } from '.';

export * from './axiosTransform';

/**
 * @description:  axios module
 */
export class VAxios {
  public axiosInstance: AxiosInstance;
  private options: CreateAxiosOptions;


  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description: 创建axios实例
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description: 重新配置axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: 设置总标题
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description: 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    // 请求侦听器配置处理
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // 如果启用了“取消重复请求”，则禁止取消重复请求
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { ignoreCancelToken } = config.requestOptions;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;
      ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    // 请求拦截器错误捕获
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      // console.log('响应结果拦截器处理',res)
      // return Promise.resolve(res);
      return res;
    }, undefined);

    // 响应结果拦截器错误捕获
    this.axiosInstance.interceptors.response.use(undefined, (err) => {
      if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
        err = responseInterceptorsCatch(this.axiosInstance,err);
      }
      // console.log('响应错误拦截器处理',err)
      //  return Promise.reject(err);
      return err;
    });
  }

  /**
   * @description:  File Upload
   */
  async uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams): Promise<T> {
    const formData = new FormData();

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        if (!params.data) return;
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data[key]);
      });
    }
    // formData.append(params.name || 'file', params.file, params.filename);
    formData.append("file", new Blob([params.file], {type:'multipart/form-data; charset=utf-8',}),params.filename);
    const customParams = omit(params, 'file', 'filename', 'file');

    Object.keys(customParams).forEach(() => {
      // formData.append(key, customParams[key]);
    });

    return (await this.axiosInstance.request<T>({
      ...config,
      url: globSetting.urlPrefix + config.url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data; charset=utf-8',
        'Accept': 'multipart/form-data; charset=utf-8',
        ignoreCancelToken: true,
      },
    })).data;
  }

  // 支持表单数据
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    // let conf: CreateAxiosOptions = cloneDeep(config);
    let conf: CreateAxiosOptions = JSON.parse(JSON.stringify(config));

    const transform = this.getTransform();

    const { requestOptions } = this.options;


    const opt: RequestOptions = JSON.parse(JSON.stringify(Object.assign({}, requestOptions, options)));
    this.options.requestOptions = JSON.parse(JSON.stringify(opt));

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // 在此处重写来自axios的错误消息
          }
          reject(e);
        });
    });
  }
}
