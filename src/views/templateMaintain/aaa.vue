<template>
  <draggable class="dragArea" tag="ul" :list="nestedDraggableList" :group="{ name: 'g1' }" item-key="title">
    <template #item="{ element }">
      <div>
        <div v-if="element.type=='row'">
          111
          <nested-draggable :nestedDraggableList="element.children" >

          <!-- <DraggableForm :formConfig="element" :formData="formData" ref="dialogMsask" /> -->

          </nested-draggable>
        </div>
        <div v-else>
          333{{ formData }}
          <DraggableForm :formConfig="element" :formData="formData" ref="dialogMask" />
        </div>
      </div>
    </template>
  </draggable>
</template>
<script lang="ts">
import { defineComponent,toRefs, watch } from 'vue';
import draggable from "vuedraggable";
import DraggableForm from "@/components/ElForm/DraggableForm.vue";
import _ from 'lodash';
export default defineComponent({
  name: "nested-draggable",
  props: {
    nestedDraggableList: {
      required: true,
      type: Array
    },
    formData:{
      required: true,
      type: Object,
      default:()=>{
        return {}
      }
    }
  },
  setup(props) {
    const { formData } = toRefs(props);
    const a = _.cloneDeep(formData)

    watch(() => props.formData,(aa,bb)=>{
      console.log(aa,bb,a,3333)
    })

    return{
      a
    }
  },
  components: {
    draggable,
    DraggableForm
  },
})

</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>