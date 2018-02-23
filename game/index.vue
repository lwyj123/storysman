<template>
  <div>
    <p>vue 测试</p>
    <p>访问了{{city}}</p>
    <button v-on:click="visit">访问</button>
  </div>
</template>

<script>
export default {
  init(state, global) {
    state.city = state.city + 1 || 1;
  },
  visit(state, global) {
    state.city++;
  }
}
</script>

<style lang="scss" scoped>
  body, footer {
    background: #222;
    color: #eee;
  }
</style>



---
init: !!js/function |
  function(state, global) {
    state.city = state.city + 1 || 1;
  }
method: 
  visit: !!js/function |
    function(state, global) {
      state.city++;
    }
---

这是一个scene操纵module的例子

你已经来过 {{city}} 次了.
[暂停](@pause)
[播放](@play)
[上一首](@prevSong)
[下一首](@nextSong)
[设置下一首歌的url](@setUrl)

Go [back](index).