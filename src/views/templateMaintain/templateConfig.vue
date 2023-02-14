<template>
  <div class='templateConfig'>
    <div class="left-board">
      <div v-for="item in templateList" :key="item.title" style="margin-bottom:20px">
        <div class="components-title">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          {{ item.title }}
        </div>
        <draggable :list="item.children" :group="{ name: 'people', pull: 'clone', put: false }" item-key="name"
          :move="onMove">
          <template #item="{ element }">
            <div class="components-item">
              <div class="components-body">
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                {{ element.title }}
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div class="center-board">
      <draggable class="list-group" :list="centerList" group="people" item-key="name">
        <template #item="{ element }">
          <div class="list-group-item">
            {{ element.title }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="right-board">
      right-board
    </div>
  </div>
</template>

<script lang='ts'>
interface templateType {
  title: string;
  icon: string;
  children?: templateType[];
}
interface TemplateConfig {
  templateList: templateType[];
  centerList: templateType[];
  onMove: (e) => boolean;
}
import { reactive, toRefs, defineComponent, ToRefs } from 'vue';
import draggable from "vuedraggable";

// import templateMaintainImpl from '@/api/templateMaintain/index';
export default defineComponent({
  name: 'TemplateConfig',
  props: [],
  setup() {

    const initState = (): TemplateConfig => {
      return {
        templateList: [
          {
            title: "输入型组件",
            icon: "Fold",
            children: [
              {
                title: "单行文本",
                icon: "ArrowLeft"
              },
              {
                title: "多行文本",
                icon: "ArrowLeft"
              },
              {
                title: "密码",
                icon: "ArrowLeft"
              },
              {
                title: "计数器",
                icon: "ArrowLeft"
              },
              {
                title: "编辑器",
                icon: "ArrowLeft"
              },
            ]
          },
          {
            title: "选择型组件",
            icon: "Fold",
            children: [
              {
                title: "下拉选择",
                icon: "ArrowLeft"
              },
              {
                title: "级联选择",
                icon: "ArrowLeft"
              },
              {
                title: "单选框组",
                icon: "ArrowLeft"
              },
              {
                title: "多选框组",
                icon: "ArrowLeft"
              },
              {
                title: "开关",
                icon: "ArrowLeft"
              },
              {
                title: "滑块",
                icon: "ArrowLeft"
              },
              {
                title: "时间选择",
                icon: "ArrowLeft"
              },
              {
                title: "时间范围",
                icon: "ArrowLeft"
              },
              {
                title: "日期选择",
                icon: "ArrowLeft"
              },
              {
                title: "日期范围",
                icon: "ArrowLeft"
              },
              {
                title: "评分",
                icon: "ArrowLeft"
              },
              {
                title: "颜色选择",
                icon: "ArrowLeft"
              },
              {
                title: "上传",
                icon: "ArrowLeft"
              },
            ]
          },
          {
            title: "布局型组件",
            icon: "Fold",
            children: [
              {
                title: "行容器",
                icon: "ArrowLeft"
              },
              {
                title: "按钮",
                icon: "ArrowLeft"
              },
            ]
          }
        ],
        centerList: [],
        onMove: (e) => {
          if (e.to.className === 'list-group') return true;
          return false;
        }
      };
    };
    const model: TemplateConfig = reactive(initState());
    let data: ToRefs<TemplateConfig> = toRefs(model);
    return {
      ...data
    };
  },
  components: {
    draggable
  }
});
</script>
<style lang='stylus' scoped>
.templateConfig{
  position: relative;
  padding:8px 8px 0 8px
}
.left-board{
  width: 260px
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  padding:8px
}
.components-title{
  font-size: 14px;
  color: #222;
  margin: 6px 2px;
}
.center-board{
  height: calc(100vh - 8px);
  width: auto;
  margin: 0 350px 0 260px;  
}
.list-group{
  height:100%  
}
.right-board{
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;  
}
.components-item {
    display: inline-block;
    width: 48%;
    margin: 1%;
    -webkit-transition: -webkit-transform 0ms!important;
    transition: -webkit-transform 0ms!important;
    transition: transform 0ms!important;
    transition: transform 0ms,-webkit-transform 0ms!important;
}
.components-body{
  padding: 8px 10px;
  background: #f6f7ff;
  font-size: 12px;
  cursor: move;
  border: 1px dashed #f6f7ff;
  border-radius: 3px;  
}
.components-body:hover {
  border: 1px dashed #787be8;
  color: #787be8;
}
</style>