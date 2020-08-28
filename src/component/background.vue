<template>
  <div id="background">
    <div class="background-image"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Background',
})
</script>

<style lang="scss" scoped>
#background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.3;
  background: url('../assets/image/blog/background6.jpg') 100% 100%;
  animation: gradientBG 120s ease infinite;
}
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
