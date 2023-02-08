import type { ProjectConfig } from '#/config';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '@/enums/appEnum';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // 锁屏时间
  lockTime: 0,
  // 主题色
  themeColor: '#0084f4',
  // 展示面包屑
  showBreadCrumb: true,
  // 展示面包屑图标
  showBreadCrumbIcon: true,

  // logo
  showLogo: true,
  // 页脚
  showFooter: true,
  // 水印
  showWatermark: false,
  // menuTabs
  menuTabs: [{
    title: '首页',
    path: '/home',
  }],
  //pageLayout是否启用keep-alive
  openKeepAlive: true,


  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum,
  // 是否显示配置按钮
  showSettingButton: true,
  // 是否显示主题切换按钮
  showDarkModeToggle: true,
  // 配置按钮的显示位置
  settingButtonPosition: SettingButtonPositionEnum,
  // 权限模式
  permissionMode: PermissionModeEnum,
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum,
  // Website gray mode, open for possible mourning dates
  grayMode: true,
  // Whether to turn on the color weak mode
  colorWeak: true,
  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: true,
  // content width
  contentMode: ContentEnum,
  // Use error-handler-plugin
  useErrorHandle: true,
  // Whether to open back to top
  useOpenBackTop: true,
  // Is it possible to embed iframe pages
  canEmbedIFramePage: true,
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: true,
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: true,
  // 顶栏
  headerSetting: {
    show: true,
    fixed: true,
    theme: ThemeEnum,
    // 打开全屏
    showFullScreen: true,
    // 是否显示锁屏
    useLockPage: true,
    // 显示文档按钮
    showDoc: true,
    // 显示消息中心按钮
    showNotice: true,
    // 显示搜索按钮
    showSearch: true,
  },

  // Menu configuration
  menuSetting: {
    // 是否折叠
    collapsed: false,
    // 默认展示页面
    defaultActive: '/home',
  },

  // 标签页设置
  multiTabsSetting: {
    // 标签页
    show: true,
    // 标签页快捷按钮
    showQuick: true,
  },

  // Transition Setting
  transitionSetting: {
    //  是否打开页面切换动画
    enable: true,
    // 路由基本切换动画
    basicTransition: RouterTransitionEnum,
    // 是否打开页面切换加载
    openPageLoading: true,
    // 是否打开顶部进度条
    openNProgress: true,
  },

}

export default setting;
