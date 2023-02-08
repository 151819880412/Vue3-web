/**
 * Application configuration
 */
import type { ProjectConfig } from '#/config';
import { PROJ_CFG_KEY } from '@/enums/cacheEnum';
import projectSetting from '@/settings/projectSetting';
import { useAppStore } from '@/piniaStore/modules/app';
import { Persistent } from '@/utils/cache/persistent';
import { deepMerge } from '@/utils';

// Initial project configuration
export function initAppConfigStore() {
  const appStore = useAppStore();
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  appStore.setProjectConfig(projCfg);
}