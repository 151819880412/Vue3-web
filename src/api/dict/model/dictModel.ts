import { BaseModel } from '../../baseModel';

export interface DictPageModel extends BaseModel {
  dictId: string;
  cnName: string;
  enName: string;
  systemDict: number;
  dictType: string;
  dictValue: number;
}
