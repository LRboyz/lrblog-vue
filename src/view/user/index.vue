<template>
  <div class="user">
    <div style="background: #fff; padding-bottom: 20px;">
      <div class="user-card-bg"></div>
      <div class="level">
        <div class="avatar">
          <el-avatar :size="70" :src="user.avatar"></el-avatar>
        </div>
        <div class="user-info">
          <h1 class="fw-bold">@ {{ user.nickname }}</h1>
          <div class="fs-xs mt-20">梦想有一天成为全栈工程师</div>
        </div>
      </div>
      <div class="level-bottom">
        <div>
          <p class="fs-sm">文章</p>
          <p class="number">{{ user.article_count }}</p>
        </div>
        <div>
          <p class="fs-sm">分类</p>
          <p class="number">{{ user.category_count }}</p>
        </div>
        <div>
          <p class="fs-sm">标签</p>
          <p class="number">{{ user.tag_count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user-card',
  data() {
    return {
      activeName: '',
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
  },
}
</script>

<style scoped lang="scss">
.user {
  margin-bottom: 20px;
  .user-card-bg {
    width: 100%;
    height: 90px;
    background-image: url('../../assets/image/blog/card-bg.jpeg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
  }
  .level {
    width: 100%;
    display: flex;
    align-items: center;
    .avatar {
      margin-top: -30px;
      flex-basis: 100px;
    }
    .user-info {
      margin-top: 10px;
      flex: 1;
      text-align: left;
      // margin-left: 20px;
      h1 {
        font-size: 16px;
      }
    }
  }
  .level-bottom {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    .number {
      color: $theme;
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
    }
  }
}
</style>
