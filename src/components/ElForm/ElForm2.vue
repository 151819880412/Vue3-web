<template>
  <el-form ref="elForm" :model="formData" :rules="rules" label-position="right" size="default">
    <el-row :gutter="20">
      <el-col v-bind="attrs" v-for="(item, index) in columns" :key="index">
        <el-form-item :label="item.label" :prop="item.prop" v-if="item.show" :label-width="item.labelWidth">
           <!-- eslint-disable-next-line vue/require-component-is eslint-disable-next-line vue/no-mutating-props-->
          <component v-model.trim="formData[item.prop]" v-bind:is="item.is" v-bind="componentAttrs(item)"></component>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { h,resolveComponent  ,toRefs} from "vue";
import { kebabCase } from 'lodash'
import { ElCheckbox, ElOption, ElSelect,ElCheckboxGroup } from "element-plus";
function identity(value) {
  return value;
}
    let that = this

export default {
  name: 'Form',
  props:{
    formData: {
      type: Object,
    },
    config: {
      type: Object,
    },
  },
  data(){
    const { columns = [], data = {} } =  this.config || {}
that = this;
    return {

      TYPE: {
        select: {
          is: 'selectBar',
          clearable: false,
        },
        text: {
          is: 'el-input',
          clearable: false,
        },
        switch: {
          is: 'el-switch',
        },
        checkbox: {
          is: 'checkbox',
          clearable: false,
        },
        checkboxGroup: {
          is: 'checkboxGroup',
          clearable: false,
        },
        radioGroup: {
          is: 'radioGroup',
          clearable: false,
        },
        daterange: {
          is: 'el-date-picker',
          type: 'daterange',
          valueFormat: 'yyyy-MM-dd',
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          editable: false,  //文本框是否可输入，默认为true可输入
        },
        date: {
          is: 'el-date-picker',
          type: "date",
          valueFormat: 'yyyy-MM-dd',
          editable: false,
        },
        auto: {
          is: 'el-autocomplete'
        }
      },
      attributes: {
        lg: 12,
        md: 12,
        xs: 24,
      },
      // rules: this.config.columns.reduce((r, c) => ({...r, [c.prop]: c.rules ? c.rules : []}), {}),
      // columns,
    }
  },
  created() {},
  mounted() {

  },
  computed: {
    attrs(){
      const { attrs = this.attributes } =  this.config || {};
      return attrs
    },
    columns(){
      return this.config.columns
    },
    rules(){
      return this.config.columns.reduce((r, c) => ({...r, [c.prop]: c.rules ? c.rules : []}), {})
    }
  },
  methods: {
    componentAttrs(item) {
      const {is = 'text', label} = item, attrs = Object.fromEntries(Object.entries(item).filter(n => !/^(prop|is|rules)/.test(n[0]))),
        placeholder = (/^(select|el-date-picker)/.test(is) ? '选择' : '输入/搜索') + label;
        // console.log({...attrs, ...this.TYPE[is],placeholder:""})
      return {...attrs, ...this.TYPE[is],placeholder:""}
      // return {...attrs, ...this.TYPE[is], placeholder}
    },
    cleanForm(){
      if(this.$refs.elForm){
        try {
          this.$refs.elForm.clearValidate()
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  watch: {},
  components: {
    // eslint-disable-next-line vue/no-unused-components
    




    selectBar: {
      functional: true,
      props: {value: String|Number, list: Array, callback: Function},   //callback为传过来的回调函数，可以方便在切换时处理一些业务逻辑
      render({value = '', list = [], callback = identity,$attrs= {},$emit = identity}, ctx){ 
        let shwoList = list.filter(item=>item.show)
        const FormComponent = resolveComponent(kebabCase('el-select'))
        return h(FormComponent, {class: 'width100', props: {value, ...$attrs}, onChange(v) {console.log(v);$emit(v); callback(v)},}, 
            ()=>shwoList.map(o => h(ElOption, {...o, key: o.value}))
        )
      }
    },
    // eslint-disable-next-line vue/no-unused-components
    // checkbox: {
    //   functional: true,
    //   props: {value: Boolean, label: String|Number, list: Array, callback: Function },
    //   render(props, ctx){
    //     console.log(props)
    //     let {value = '', list = [], callback = identity,$attrs= {},$emit = identity} = props
    //     const FormComponent = resolveComponent(kebabCase('el-checkbox'))
    //     return h(FormComponent, {class: 'width100', props: {value, ...$attrs}, onChange(v) {console.log(v)},}, 
    //         // label
    //     )

    //     // return h('el-checkbox', {props: {value, ...attrs}, on: {change(v) {input(v)}}}, label)
    //   }
    // },
    // eslint-disable-next-line vue/no-unused-components
    checkboxGroup: {
      functional: true,
      props: {value: Array, list: Array, callback: Function,modelValue:Array},
      render(props, context){
        // let {value = '', list = [], callback = identity,$attrs= {},$emit = identity} = props
        console.log(props,that)
        const FormComponent = resolveComponent(kebabCase('el-checkbox-group'))
              return [ h(
                  FormComponent,
                  {
                    ...props,
                    // ...events,
                    modelValue:that.formData.love,
                    onChange(v) {
                      console.log(v, this);
                      (that.formData.love = v)
                    },
                    "onUpdate:modelValue": (value) => {
                      console.log(value, this,props);
                      (that.formData.love = value)
                    },
                  },
                  () =>
                    props.list.map((o) =>
                      h(
                        ElCheckbox,
                        {
                          ...o,
                          label: o.label,
                          key: o.value,
                        },
                        () => [o.label]
                      )
                    )
                )]
      }




    //   render(props, context){ 
    //     let {value = '', list = [], callback = identity,$attrs= {},$emit = identity} = props
    //     console.log(props,this,context,props,value,)
    //     // const FormComponent = resolveComponent(kebabCase('el-checkbox-group'))
    //     //像el-checkbox-group和el-radio-group这种组合级别的组件在绑定选中事件时不能像el-select组件（el-select组件是这样触发的on: {change(v) {input(v)}}）那样使用change，只能使用类似el-input组件的input方法来触发选中
    //     // return h(ElCheckboxGroup, {modelValue: props.modelValue,'onUpdate:modelValue': value => this.$emit('change', value),props: {value, ...$attrs}, nativeOn: {onChange(v) {console.log(123123);input(v)}}}, 
    //     // ()=>list.map(o => h(ElCheckbox, {...o, key: o.value}, 
    //     // ()=>[o.label]
    //     // )))
    //     const FormComponent = resolveComponent(kebabCase('el-checkbox-group'))
    //      return h(FormComponent, 
    //      {
    //       class: 'width100', props: {value, ...$attrs}, onChange(v) {console.log(v,this,value);return props.update('change', v)},
    //         props: 'love',
    //         prop: 'love',
    // //      modelValue: this.modelValue,
    // 'onUpdate:modelValue': value => {
    //   console.log(value,this.modelValue)
    //   return this.$emit('change', value)
    // }
         
    //      }, 
    //         ()=>list.map(o => h(ElCheckbox, {...o, key: o.value,
    //         props: {value, ...$attrs},
    //       class: 'width100', props: {value, ...$attrs}, onChange(v) {console.log(v,value,this,props);return $emit('update:modelValue', value)},
            
    //         props: 'love',
    //         prop: 'love',
    // 'onUpdate:modelValue': value => {
    //   console.log(value,this)
    //   return props.$emit('update:modelValue', value)
    // }
    // }, 
    //     ()=>[o.label]
    //     ))
    //     )
    //   }
    },
    checkboxGroup2: {
      functional: true,
      props: {value: Array, list: Array},
      render(h, {props: {value = [], list = []}, data: {attrs = {}}, listeners: {input = identity}}){
        //像el-checkbox-group和el-radio-group这种组合级别的组件在绑定选中事件时不能像el-select组件（el-select组件是这样触发的on: {change(v) {input(v)}}）那样使用change，只能使用类似el-input组件的input方法来触发选中
        return h('el-checkbox-group', {props: {value, ...attrs}, on: {input(v) {input(v)}}}, list.map(o => h('el-checkbox', {props: {...o, label: o.value, key: o.value}}, [o.label])))
      }
    },
    // eslint-disable-next-line vue/no-unused-components
    radioGroup: {
      functional: true,
      props: {value: String|Number, list: Array },
      render(h, {props: {value = '', list = []}, data: {attrs = {}}, listeners: {input = identity}}){
        return h('el-radio-group', {props: {value, ...attrs}, on: {input(v) {input(v)}}}, list.map(o => h('el-radio', {props: {...o, key: o.label}}, [o.value])))
      }
    },
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.width100{
  width:100%
}
</style>