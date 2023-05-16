import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';

import { CacheTypeEnum } from '/@/enums/cacheEnum';

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface tabsType {
  path: string;
  name: string;
}

export interface MenuSetting {
  // 是否折叠
  collapsed: boolean;
  // 默认展示页面
  defaultActive: string;
  // bgColor: string;
  // fixed: boolean;
  // canDrag: boolean;
  // show: boolean;
  // hidden: boolean;
  // split: boolean;
  // menuWidth: number;
  // mode: MenuModeEnum;
  // type: MenuTypeEnum;
  // theme: ThemeEnum;
  // topMenuAlign: 'start' | 'center' | 'end';
  // trigger: TriggerEnum;
  // accordion: boolean;
  // closeMixSidebarOnChange: boolean;
  // collapsedShowTitle: boolean;
  // mixSideTrigger: MixSidebarTriggerEnum;
  // mixSideFixed: boolean;
}

export interface MultiTabsSetting {
  // 标签页
  show: boolean;
  // 标签页快捷按钮
  showQuick: boolean;
  // cache: boolean;
  // canDrag: boolean;
  // showRedo: boolean;
  // showFold: boolean;
}

export interface HeaderSetting {
  // 顶栏
  show: boolean;
  // bgColor: string;
  fixed: boolean;
  theme: ThemeEnum;
  // 打开全屏
  showFullScreen: boolean;
  // 是否显示锁屏
  useLockPage: boolean;
  // 显示文档按钮
  showDoc: boolean;
  // 显示消息中心按钮
  showNotice: boolean;
  // 显示搜索按钮
  showSearch: boolean;
}

export interface LocaleSetting {
  showPicker: boolean;
  // 当前语言
  locale: LocaleType;
  // 默认语言
  fallback: LocaleType;
  // 可用地区
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  //  是否打开页面切换动画
  enable: boolean;
  // 路由基本切换动画
  basicTransition: RouterTransitionEnum;
  // 是否打开页面切换加载
  openPageLoading: boolean;
  // 是否打开顶部进度条
  openNProgress: boolean;
}

export interface ProjectConfig {
  // 锁屏时间
  lockTime: number;
  // 主题色
  themeColor: string;
  // 菜单设置
  menuSetting: MenuSetting;
  // 展示面包屑
  showBreadCrumb: boolean;
  // 展示面包屑图标
  showBreadCrumbIcon: boolean;
  // 标签页设置
  multiTabsSetting: MultiTabsSetting;
  // 顶栏
  headerSetting: HeaderSetting;
  // logo
  showLogo: boolean;
  // 页脚
  showFooter: boolean;
  // 水印
  showWatermark: boolean;
  // menuTabs
  menuTabs: tabsType<>;
  //pageLayout是否启用keep-alive
  openKeepAlive: boolean;


  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum;
  // 是否显示配置按钮
  showSettingButton: boolean;
  // 是否显示主题切换按钮
  showDarkModeToggle: boolean;
  // 配置按钮的显示位置
  settingButtonPosition: SettingButtonPositionEnum;
  // 权限模式
  permissionMode: PermissionModeEnum;
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // Website gray mode, open for possible mourning dates
  grayMode: boolean;
  // Whether to turn on the color weak mode
  colorWeak: boolean;
  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: boolean;
  // content width
  contentMode: ContentEnum;
  // Animation configuration
  transitionSetting: TransitionSetting;
  // Use error-handler-plugin
  useErrorHandle: boolean;
  // Whether to open back to top
  useOpenBackTop: boolean;
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean;
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean;
}

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}
export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}
