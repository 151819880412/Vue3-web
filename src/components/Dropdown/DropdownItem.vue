<template>
  <div class="menu-item" @click="handler">
    <span class="icon">
      <slot> </slot>
    </span>
    <span class="text"> {{ text }}</span>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
 
    action: {
      type: String,
      default: 'hello',
    },
  },

  methods: {
    handler() {
      // this.$emit('click', this.action)
    },
  },
}
</script>

<style>
.menu-item {
  display: flex;
  cursor: pointer;
}

span.icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
}

span.icon svg {
  width: 100%;
  height: 100%;
}
</style>
