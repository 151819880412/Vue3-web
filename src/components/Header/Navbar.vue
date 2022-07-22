<template>
  <div class="navbar">
    <div class="navbarIcon">
      <svg
        :class="{ 'is-active': isActive }"
        class="hamburger"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path
          d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
        />
      </svg>
    </div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in levelList" :key="item.name">
          <span v-if="item.redirect === 'noRedirect'" class="no-redirect">{{
            item.name
          }}</span>
          <span v-else>{{ item.name }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div style="float: right">
      <div style="display: flex; align-items: center;height:50px">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-78e17ca8=""
          width="20"
          @click.stop="click"
          height="20"
        >
          <path
            fill="currentColor"
            d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
          ></path>
        </svg>
        <el-select
          ref="headerSearchSelect"
          v-model="search"
          filterable
          default-first-option
          remote
          placeholder="Search"
          class="header-search-select"
          :class="{ 'header-search-select-width': show }"
        >
          <el-option
            v-for="item in options"
            :key="item.path"
            :value="item.path"
            :label="item.name"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, ref, Ref, watch } from "vue";
export default defineComponent({
  name: "Navbar",
  props: [],
  setup() {
    const search = reactive({ a: 1, b: 2 });
    const options = reactive([
      {
        path: "/a",
        name: "A",
      },
      {
        path: "/b",
        name: "B",
        redirect: "noRedirect",
      },
    ]);
    const isActive: Ref<boolean> = ref(false);
    const show: Ref<boolean> = ref(false);
    const levelList = reactive([
      {
        path: "/a",
        name: "A",
      },
      {
        path: "/b",
        name: "B",
        redirect: "noRedirect",
      },
    ]);
    let headerSearchSelect = ref<HTMLElement | null>();

    const click = () => {
      show.value = !show.value;
      if (show.value) {
        headerSearchSelect.value && headerSearchSelect.value.focus();
      }
    };

    watch(show, (newValue) => {
      if (newValue) {
        document.body.addEventListener("click", click);
      } else {
        document.body.removeEventListener("click", click);
      }
    });

    return {
      search,
      options,
      levelList,
      isActive,
      show,
      click,
      headerSearchSelect,
    };
  },
});
</script>
<style lang="stylus" scoped>
.navbar
  line-height: 50px
  .navbarIcon
    width: 50px
    height: 50px
    display: inline-block
    float: left
    text-align: center
    line-height: 60px
    .is-active
      transform: rotate(180deg);
  .breadcrumb
    padding-left:20px
    height: 50px
    float: left
    display: inline-block
    line-height: 50px
.no-redirect {
  color: #97a8be;
  cursor: text;
}
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  .header-search-select-width {
      width: 210px;
      margin-left: 10px;
    }
</style>
