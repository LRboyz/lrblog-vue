<template>
  <!-- <div class="container"> -->
  <div class="wrapper">
    <el-drawer :visible.sync="drawer" :with-header="false" direction="ltr" size="40%">
      <Navbar />
    </el-drawer>
    <div class="headerWrapper">
      <el-header style="padding: 0; background: rgba(255, 255, 255, 0.6);" class="main-header">
        <div class="header-container">
          <el-menu mode="horizontal" @select="handleSelect" default-active="index">
            <el-menu-item>
              <i @click="drawer = true" class="switch el-icon-s-unfold"></i>
            </el-menu-item>
            <el-menu-item>
              <router-link :to="{ path: '/' }">
                <h2 class="logo-title"><span>LR</span>Blog</h2>
              </router-link>
            </el-menu-item>

            <!-- <el-menu-item index="index" class="block">
              <router-link :to="{ path: '/' }">
                首页
              </router-link>
            </el-menu-item> -->

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
      <el-col
        :xs="{ span: 24, offset: 1 }"
        :md="{ span: 20, offset: 2 }"
        :lg="{ span: 24, offset: 0 }"
        :xl="{ span: 24, offset: 5 }"
      >
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-col>
      <!-- <el-backtop class="lin-back-top"></el-backtop> -->
    </div>
    <div class="footerWrapper">
      <el-footer class="foot-content">
        <p class="copyright fs-sm">Copyright © LRBlog - blog.lrboy.live</p>
        <p class="beian fs-sm">粤ICP备19090103号-1</p>
      </el-footer>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import Navbar from '@/component/layout/navbar'
import CurrentUser from '@/component/layout/user'
import { mixinDevice } from '@/lin/util/mixin'
import LoginRegisterDialog from '@/view/account/login-register-dialog'

export default {
  name: 'Base',
  components: { CurrentUser, LoginRegisterDialog, Navbar },
  mixins: [mixinDevice],
  data() {
    return { activeIndex: '', drawer: false }
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
  color: rgb(92, 91, 91);
  font-weight: bold;
  text-shadow: 4px 4px 10px #ccc;
  span {
    font-weight: bold;
    color: $theme;
  }
}
.logo-title:hover {
  color: #000;
  span {
    color: #2554ba;
  }
}
.wrapper {
  // width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  .headerWrapper {
    background: rgba($color: #ffffff, $alpha: 0.8);
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1501;
    .main-header {
      border-bottom: 1px solid #f1f1f1;
      color: #909090;
      height: 6rem;
      /deep/ .el-menu {
        background: transparent;
        // background: rgba(255, 255, 255, 0.6);
      }
    }
    .header-container {
      margin: auto;
      height: 100%;
      /deep/ .block {
        padding: 0px;
        a {
          display: block;
          font-weight: bold;
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
    // height: calc(100% - 80px);
    // min-height: 100%;
    width: 100%;
    margin-top: 80px;
    padding-left: 0px;
    // min-width: 1050px;
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
    width: 100%;
    padding: 1rem 0;
    background: rgba($color: #ffffff, $alpha: 0.8);
    .foot-content {
      width: 100%;
      margin: 0 auto;
      line-height: 30px;
      text-align: center;
    }
  }
}
.switch {
  display: none;
}
@media (max-width: 680px) {
  .switch {
    font-size: 20px;
    line-height: 60px;
    display: block;
  }
}
</style>
