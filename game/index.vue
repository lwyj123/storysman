<template>
  <div>
    <p>vue 测试</p>
    <p>访问了{{city}}</p>
    <button v-on:click="visit">访问</button>
  </div>
</template>

<script>
import component from './component.vue'
export default {
  init(state, global) {
    state.city = state.city + 1 || 1;
  },
  visit(state, global) {
    state.city++;
  },
  componentTest() {
    component.test()
  }
}
</script>

<style lang="scss" scoped>
  body, footer {
    background: #222;
    color: #eee;
  }
</style>