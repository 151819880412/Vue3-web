// import { FormInterface, Rules, Options } from "#/form-config";
import { tableConfigType } from "@/components/MainTable/MainTable";
import { CEtypes } from './CEForm/CEIndex';

// export default interface BaseInterface<T> {
//   tableData: tableConfigType<T>;
//   openDialog: () => void;
//   dialogFormConfig: Array<FormInterface<Rules, Options>>;
//   queryFormConfig?: Array<FormInterface<Rules, Options>>;
//   queryFormData?: any;
// }

export default interface BaseInterface<T> {
  tableData: tableConfigType<T>;
  openDialog: () => void;
  dialogFormConfig: CEtypes[];
  queryFormConfig?: CEtypes[];
  queryFormData?: any;
}
