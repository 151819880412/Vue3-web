import type { ErrorLogInfo } from '#/store';
import { defineStore } from 'pinia';
import { store } from '@/piniaStore';


import { ErrorTypeEnum } from '@/enums/exceptionEnum';
import { Formt } from '@/utils/DateFormt';
import errorLogServiceImpl from '@/api/errorLog';
// import { ErrorlogPageModel } from '@/api/errorLog/service/model/errorLogModel';

export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>;
  errorLogListCount: number;
}

export const useErrorLogStore = defineStore({
  id: 'app-error-log',
  state: (): ErrorLogState => ({
    errorLogInfoList: null,
    errorLogListCount: 0,
  }),
  getters: {
    getErrorLogInfoList(): ErrorLogInfo[] {
      return this.errorLogInfoList || [];
    },
    getErrorLogListCount(): number {
      return this.errorLogListCount;
    },
  },
  actions: {
     addErrorLogInfo(info: ErrorLogInfo) {
      const item = {
        ...info,
        time: Formt('yyyy-MM-dd HH:mm:ss'),
      };
      this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])];
      // this.errorLogListCount += 1;
      errorLogServiceImpl.add(item).then((err)=>{
        console.log(err,111)
      }).catch((err=>{
        console.log(err,2222)
      }))
      // errorLogServiceImpl.add(item)
    },

    setErrorLogListCount(count: number): void {
      this.errorLogListCount = count;
    },

    /**
     * ajax请求错误后触发
     * @param error
     * @returns
     */
    addAjaxErrorInfo(error) {
      const errInfo: Partial<ErrorLogInfo> = {
        message: error.message,
        type: ErrorTypeEnum.AJAX,
      };
      if (error.response) {
        const {
          config: { url = '', data: params = '', method = 'get', headers = {} } = {},
          data = {},
        } = error.response;
        errInfo.url = url;
        errInfo.name = 'Ajax Error!';
        errInfo.file = '-';
        errInfo.stack = JSON.stringify(data);
        errInfo.detail = JSON.stringify({ params, method, headers });
      }
      this.addErrorLogInfo(errInfo as ErrorLogInfo);
    },
  },
});

// 需要在设置外使用
export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store);
}
