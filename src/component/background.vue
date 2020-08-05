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
  opacity: 0.5;
  background: url('../assets/image/blog/background4.jpg') 100% 100% no-repeat;
  // background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  animation: gradientBG 30s ease infinite;

  // background-color: $body-bg;

  // > .background-image {
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   background: url('../assets/image/blog/background3.jpg');
  //   opacity: 0.7;
  //   &.dark {
  //     opacity: 0.2;
  //   }
  // }
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
