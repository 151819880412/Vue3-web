<template>
  <div class="header">
    <div class="navbar">
      <Navbar/>
    </div>
    <div class="tags">
      <Tags/>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from './Navbar.vue'
import Tags from './Tags.vue'
import { defineComponent } from 'vue'
export default defineComponent({
   name: '',
   props: [],
   setup() {
   },
   components:{
    Navbar,
    Tags,
   }
})
</script>
<style scoped>
.header{
  height: 90px;
}
.navbar{
  height:50px;
  line-height: 50px;
}
.tags{
  height: 34px;
  line-height: 34px;
}
</style>