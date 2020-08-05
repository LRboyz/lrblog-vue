<template>
  <div>
    <div class="headerWrapper">
      <el-header style="padding: 0; background: rgba(255, 255, 255, 0.6);" class="main-header">
        <div class="header-container">
          <el-menu mode="horizontal" @select="handleSelect">
            <el-menu-item>
              <router-link :to="{ path: '/index' }">
                <h2 class="logo-title"><span>LR</span>Blog</h2>
                <!-- <img src="@/assets/image/blog/blog-logo.png" alt="logo" style="margin-top: 10px;" /> -->
              </router-link>
            </el-menu-item>
            <el-menu-item index="/index" class="block">
              <router-link :to="{ path: '/index' }">
                首页
                <!-- <img src="@/assets/image/blog-logo.png" alt="logo" class="logo" /> -->
              </router-link>
            </el-menu-item>
            <el-menu-item v-if="logined" index="/subscribe" class="block">
              <router-link :to="{ path: '/subscribe' }"> <i class="el-icon-c-scale-to-original"></i>关注 </router-link>
            </el-menu-item>
            <el-menu-item v-if="logined" index="/notification/userComment" class="block">
              <router-link :to="{ path: '/notification/userComment' }"> <i class="el-icon-bell"></i>消息 </router-link>
            </el-menu-item>
            <template>
              <el-menu-item index="login" v-show="!logined" style="float: right;">
                <el-link>登录</el-link>
              </el-menu-item>
              <el-menu-item index="register" v-show="!logined" style="float: right;">
                <el-link>注册</el-link>
              </el-menu-item>
              <el-menu-item v-if="logined" style="float: right;">
                <current-user class="current-user"></current-user>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </el-header>
      <login-register-dialog ref="loginRegister"></login-register-dialog>
    </div>
    <div class="mainWrapper" :class="device">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
      <!-- <el-backtop class="lin-back-top"></el-backtop> -->
    </div>
    <div class="footerWrapper">
      <div class="foot-content">
        <p class="copyright fs-sm">Copyright © LRBlog - blog.lrboy.live</p>
        <p class="beian fs-sm">粤ICP备19090103号-1</p>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentUser from '@/component/layout/user'
import { mixinDevice } from '@/lin/util/mixin'
import LoginRegisterDialog from '@/view/account/login-register-dialog'

export default {
  name: 'Base',
  components: { CurrentUser, LoginRegisterDialog },
  mixins: [mixinDevice],
  data() {
    return { activeIndex: '' }
  },
  computed: {
    logined() {
      return this.$store.state.logined
    },
  },
  watch: {
    $route() {
      this.activeIndex = this.$router.path
    },
  },
  created() {
    this.activeIndex = this.$route.path
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key === 'login' || key === 'register') {
        this.activeIndex = key
        this.$refs.loginRegister.show(key)
        return
      }
      // eslint-disable-next-line
      switch (key) {
        case '/home/index':
          break
      }
    },
    // eslint-disable-next-line
    flushCom: function() {
      this.$router.go(0)
    },
  },
}
</script>
<style lang="scss" scoped>
.logo-title {
  font-size: 24px;
  font-weight: bold;
  text-shadow: 4px 4px 10px #ccc;
  span {
    font-weight: bold;
    color: #1989fa;
  }
}
.headerWrapper {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1501;
  .main-header {
    background: rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid #f1f1f1;
    color: #909090;
    height: 6rem;
    /deep/ .el-menu {
      background: transparent;
      // background: rgba(255, 255, 255, 0.6);
    }
  }
  .header-container {
    min-width: 1050px;
    max-width: 1150px;
    margin: auto;
    height: 100%;
    /deep/ .block {
      padding: 0px;
      a {
        display: block;
        padding: 0 20px;
      }
      a:hover {
        color: #3963bc;
      }
    }
    .current-user {
      height: 60px;
      /deep/ .el-dropdown {
        top: 10px;
        left: 5px;
      }
    }
  }
}
.mainWrapper {
  height: calc(100% - 80px);
  margin-top: 80px;
  padding-left: 0px;
  min-width: 1050px;
  max-width: 1150px;
  margin: 100px auto;
  // width: ;
  padding-right: 0px;
  .lin-backtop {
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }
}
.footerWrapper {
  padding: 1rem 0;
  background: rgba($color: #ffffff, $alpha: 0.8);
  .foot-content {
    width: 1250px;
    margin: 0 auto;
    line-height: 30px;
    text-align: center;
  }
}
</style>
