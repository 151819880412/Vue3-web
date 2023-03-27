import { CEInput } from './CEInput';
import { CEFormButton } from './CEButton';
import { CECascader } from './CECascader';
import { CECheckbox } from './CECheckbox';
import { CECheckboxGroup } from './CECheckboxGroup';
import { CEColorPicker } from './CEColorPicker';
import { CEDateTimePicker } from './CEDateTimePicker';
import { CEFormImage } from './CEImage';
import { CEInputNumber } from './CEInputNumber';
import { CERadio } from './CERadio';
import { CERadioGroup } from './CERadioGroup';
import { CERate } from './CERate';
import { CESelect } from './CESelect';
import { CESlider } from './CESlider';
import { CESwitch } from './CESwitch';
import { CETransfer } from './CETransfer';
import { CEUpload } from './CEUpload';

export type CEtypes = CEFormButton | CECascader | CECheckbox | CECheckboxGroup | CEColorPicker | CEDateTimePicker | CEFormImage
  | CEInput | CEInputNumber | CERadio | CERadioGroup | CERate | CESelect | CESlider | CESwitch | CETransfer | CEUpload;

export const CEIndex = {
  CEFormButton, CECascader, CECheckbox, CECheckboxGroup, CEColorPicker, CEDateTimePicker, CEFormImage
  , CEInput, CEInputNumber, CERadio, CERadioGroup, CERate, CESelect, CESlider, CESwitch, CETransfer, CEUpload
};

export const CEComponent = (data: CEtypes): CEtypes => {
  switch (data.component) {
    case 'el-input':
      return new CEInput(data as CEInput);
    case 'el-input-number':
      return new CEInputNumber(data as CEInputNumber);
    case 'el-select':
      return new CESelect(data as CESelect);
    case 'el-cascader':
      return new CECascader(data as CECascader);
    case 'el-radio-group':
      return new CERadioGroup(data as CERadioGroup);
    case 'el-checkbox-group':
      return new CECheckboxGroup(data as CECheckboxGroup);
    case 'el-slider':
      return new CESlider(data as CESlider);
    case 'el-switch':
      return new CESwitch(data as CESwitch);
    case 'el-date-picker"':
      return new CEDateTimePicker(data as CEDateTimePicker);
    case 'el-rate':
      return new CERate(data as CERate);
    case 'el-color-picker':
      return new CEColorPicker(data as CEColorPicker);
    case 'el-upload':
      return new CEUpload(data as CEUpload);
    case 'el-transfer':
      return new CETransfer(data as CETransfer);

    default:
      return new CEInput(data as CEInput);
  }
};

export const CEComponents = (arr: CEtypes[]): CEtypes[] => {
  const componentList:CEtypes[] = []
  arr.forEach(item=>{
    componentList.push(CEComponent(item))
  })
  return componentList
};