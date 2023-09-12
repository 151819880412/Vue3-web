<template>
  <div style="height:500px">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
      <el-form-item label="Activity name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="code" prop="code">
        <SearchSelect v-model="ruleForm.code" :options="options" />
      </el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
    </el-form>

    222
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import SearchSelect from '@/components/SelectUser/SelectUser.vue';
import { FormInstance, FormRules } from "element-plus";

export default defineComponent({
  components: { SearchSelect },
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      name: '',
      code: [],
    });
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      code: [
        { required: true, message: '111', trigger: ["blur","change"] },
      ]
    });
    const options = {
      selectType: 0
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid) => {
        console.log(ruleForm)
        if (valid) {
        } else {
        }
      });
    };

    return {
      options,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm
    };
  },
});
</script>
<style lang="stylus" scoped></style>