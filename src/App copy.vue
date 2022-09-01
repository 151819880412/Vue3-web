<template>
    <!-- <router-view id="app"/> -->
    <div id="app">
      <LockPage/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import LockPage from "@/components/LockPage/LockPage.vue";
export default defineComponent({
  setup() {
    return{

    }
  },
  components:{
    LockPage
  }
})
</script>
<style lang="stylus">
#app
  height 100%
  width 100%
</style>
