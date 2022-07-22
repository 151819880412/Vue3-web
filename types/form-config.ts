export interface ElFormConfig<R,O> {
  type:string,
  title:string,
  field:string,
  value:any,
  maxlength?:number,
  required:boolean,
  callback?:Function,
  rules:Array<R>,
  options?:Array<O>,
  props?:any,
  on:Array<string>,
}
export interface Rules {
  message:string,
  required:boolean,
  trigger:string,
  pattern?:string,
  validator?:Function,
}
export interface Options {
  label:string,
  value:string|number,
}