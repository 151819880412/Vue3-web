import { FormInterface, Rules, Options } from "#/form-config";
import { tableConfigType } from "@/components/MainTable/MainTable";

export default interface BaseInterface<T> {
  tableData: tableConfigType<T>;
  openDialog: () => void;
  dialogFormConfig: Array<FormInterface<Rules, Options>>;
  queryFormConfig?: Array<FormInterface<Rules, Options>>;
  queryFormData?: any;
}
