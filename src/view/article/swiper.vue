<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="slide-1"><img src="../../assets/image/blog/code6.png" alt="" srcset=""/></swiper-slide>
      <swiper-slide class="slide-2"><img src="../../assets/image/blog/code7.png" alt="" srcset=""/></swiper-slide>
      <swiper-slide class="slide-3"><img src="../../assets/image/blog/code8.png" alt="" srcset=""/></swiper-slide>
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'swiper-example-fade-effect',
  title: 'Fade effect',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  margin-bottom: 20px;
  max-width: 660px;
  height: 220px;
  img {
    width: 100%;
    height: 100%;
  }
}
@media (max-width: 1180px) {
  .swiper {
    display: none;
  }
}
</style>
