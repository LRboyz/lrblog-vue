<template>
  <div class="user" v-if="user">
    <div style="background: #fff; padding-bottom: 20px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
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
      <div class="contact flex">
        <el-tooltip class="item" effect="dark" content="13549128759" placement="bottom">
          <div class="icon"><i class="iconfont icon-wechat" style="color: green;"></i></div>
        </el-tooltip>
        <div class="icon ml-20"><i class="iconfont icon-github"></i></div>
        <el-tooltip class="item" effect="dark" content="603552916" placement="bottom">
          <div class="icon ml-20"><i class="iconfont icon-qq" style="color: #3398dc;"></i></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="LRboyzZ" placement="bottom">
          <div class="icon ml-20"><i class="iconfont icon-weibo" style="color: #ff0000;"></i></div>
        </el-tooltip>
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
      animation: rotate 3s infinite;
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
  .contact {
    margin: 20px;
    justify-content: center;
    .icon {
      cursor: pointer;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #eee;
    }
    .icon:hover {
      transition: 0.5s;
      transform: rotate(360deg);
      background: #eee;
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  // 50% {
  //   transform: rotate(180deg);
  // }
  100% {
    transform: rotate(360deg);
  }
}
</style>
