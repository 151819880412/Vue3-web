import { useWatermark } from '@/utils/watermark/watermark';

let globSetWatermark: (str: string) => void;
let globClear: () => void;

export const initWatermark = () => {
  const { setWatermark, clear } = useWatermark();
  if (!globSetWatermark) {
    globSetWatermark = setWatermark;
    globClear = clear;
  }

  return {
    globSetWatermark,
    globClear
  };

};