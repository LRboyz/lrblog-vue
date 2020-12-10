/* eslint-disable */
import Vue from 'vue'

Vue.directive('randomColor', {
  bind(el, binding, vnode) {
    el.style.color =
      '#' +
      Math.random()
        .toString(16)
        .slice(2, 8)
  },
})

export default Vue.directive('randomColor')
