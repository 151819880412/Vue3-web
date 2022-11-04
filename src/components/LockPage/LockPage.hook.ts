import { reactive, toRefs } from 'vue';
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';
import { Formt, GetWeekDay } from '@/utils/DateFormt';

export function LockPageHooks(immediate = true) {
  let timer: IntervalHandle;

  const state = reactive({
    year: '',
    month: '',
    day: "",
    week: '',
    hour: '',
    minute: '',
    second: '',
  });

  const update = () => {

    const h = Formt('HH');
    const m = Formt('mm');
    const s = Formt('ss');

    state.year = Formt('yyyy');
    state.month = Formt('MM');
    state.day = Formt('dd');
    state.week = GetWeekDay();

    state.hour = h;
    state.minute = m;
    state.second = s;

  };

  function start() {
    update();
    clearInterval(timer);
    timer = setInterval(() => update(), 1000);
  }

  function stop() {
    clearInterval(timer);
  }

  tryOnMounted(() => {
    immediate && start();
  });

  tryOnUnmounted(() => {
    stop();
  });

  return {
    ...toRefs(state),
    start,
    stop,
  };
}
