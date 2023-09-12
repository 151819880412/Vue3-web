<template>
  <div v-for="item in selectedUser" :key="item.userId">
    <div class="selected-item" @mouseenter="item['showDelete'] = true" @mouseleave="item['showDelete'] = false">
      <span>{{ item.label }}</span>
      <!-- 删除标志 -->
      <!-- <i  v-if="item['showDelete']" class="el-icon-close del-user" @click="removeSelectedUser(item)"></i> -->
      <el-icon v-if="item['showDelete']" class="el-icon-close del-user" @click="removeSelectedUser(item)">
        <close />
      </el-icon>
    </div>
  </div>
  <div style="position:relative">
    <el-button @click="showSelect" class="select-button">弹出人员选择器</el-button>
    <div ref="selectUserRef" class="search-select-wrapper" v-if="isShowSelect" :style="selectWrapperStyle">
      <div class="search-select">
        <div class="search-box">
          <el-input v-model="searchText" placeholder="请输入内容"></el-input>
        </div>
        <div class="option-list">
          <div class="option-item" v-for="item in filteredOptions" :key="item.userId"
            :class="{ selected: isSelected(item) }" @click="toggleSelected(item)">
            {{ item.label }}
            <span class="check-icon" v-if="isSelected(item)">&#10003;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
interface SelectUser {
  isShowSelect: boolean;
  searchText: string;
  selectWrapperStyle: any;
  selectedUser: Option[];
  selectedUserIdList: string[];
  isSelected: (option: Option) => boolean;
  toggleSelected: (option: Option) => void;
  showSelect: (event: MouseEvent) => void;
}
interface Option {
  label: string;
  userId: string;
}

interface SelectUserOption {
  // 0-->id  1-->人
  selectType: number;
}

import { reactive, toRefs, getCurrentInstance, defineComponent, ComponentInternalInstance, ToRefs, computed, onMounted, ref, onUnmounted } from 'vue';
export default defineComponent({
  name: 'SelectUser',
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    options: {
      type: Object as () => SelectUserOption,
      required: true,
      default: () => {
        return {
          selectType: 0
        };
      }
    },
  },
  setup(props, { emit }) {

    const options = [
      { label: "张三", userId: "1" },
      { label: "李四", userId: "2" },
      { label: "王五", userId: "3" },
      { label: "赵六", userId: "4" },
      { label: "钱七", userId: "5" },
    ];
    const selectUserRef = ref();
    const filteredOptions = computed(() =>
      options.filter(item =>
        item.label.toLowerCase().includes(model.searchText.toLowerCase())
      )
    );

    const ctx: ComponentInternalInstance | null = getCurrentInstance();
    console.log(ctx);
    const initState = (): SelectUser => {
      return {
        selectWrapperStyle: { display: "block", position: 'absolute', width: "350px", height: "330px" },
        isShowSelect: false,
        searchText: "",
        selectedUser: props.modelValue as Option[] || [],
        selectedUserIdList: props.modelValue as string[] || [],
        isSelected: (option: Option) => {
          return model.selectedUser.includes(option);
        },
        toggleSelected: (option: Option) => {
          const index = model.selectedUser.findIndex(
            selectedOption => selectedOption.userId === option.userId
          );
          if (index === -1) {
            model.selectedUser.push(option);
            model.selectedUserIdList.push(option.userId);
          } else {
            model.selectedUser.splice(index, 1);
            model.selectedUserIdList.splice(index, 1);
          }
          if (props.options.selectType == 0) {
            emit('update:modelValue', model.selectedUserIdList);
          } else {
            emit('update:modelValue', model.selectedUser);
          }
          console.log(props);
        },
        showSelect: (event: MouseEvent) => {
          event;
          model.isShowSelect = true;

        },
      };
    };
    const model: SelectUser = reactive(initState());
    let data: ToRefs<SelectUser> = toRefs(model);
    let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
    };

    const hideSelect = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (selectUserRef.value && !selectUserRef.value.contains(target) && target !== document.getElementsByClassName('select-button')[0] && target.parentNode !== document.getElementsByClassName('select-button')[0]) {
        resetState();
      }
    };

    onMounted(() => {
      document.addEventListener('click', hideSelect);
    });
    onUnmounted(() => {
      document.addEventListener('click', hideSelect);
    });

    const removeSelectedUser = (item: Option) => {
      const index = model.selectedUser.indexOf(item);
      if (index !== -1) {
        model.selectedUser.splice(index, 1);
      }
    };


    return {
      ...data,
      resetState,
      filteredOptions,
      selectUserRef,
      removeSelectedUser
    };
  }
});
</script>
<style lang="stylus" scoped>
.search-select {
  display: flex;
  flex-direction: column;
}
.search-box {
  margin-bottom: 1rem;
}
.option-list {
  display: flex;
  flex-direction: column;
}
.option-item {
  cursor: pointer;
  padding: 0.5rem;
}
.option-item:hover {
  background-color: #eee;
}
.check-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  font-size: 1.2em;
}
.selected .check-icon {
  color: #007bff;
}
.search-select-wrapper {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 16px;
  margin-top: 12px
}
.selected-item{
  margin-right: 12px
  position: relative
}
.selected-item :hover{
  cursor: pointer;
  color: var(--van-primary-color)
}
.del-user{
  position: absolute
  left: 0
  top:0  
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: red;
}
.del-user::before,
.del-user::after {
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 1px;
  background-color: #fff;
}
.del-user::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.del-user::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>