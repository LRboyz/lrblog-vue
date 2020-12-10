<template>
  <div>
    <el-dialog
      width="318px"
      class="lin-dialog"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
    >
      <span slot="title">{{ activeIndex == 'login' ? '登录' : '注册' }}</span>
      <el-form :model="form" label-position="top" ref="form">
        <template v-if="activeIndex == 'login'">
          <el-form-item prop="username" :rules="[{ required: true, message: '请输入用户名或邮件', trigger: 'blur' }]">
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user"
              autocomplete="off"
              placeholder="请输入用户名或邮件"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
            <el-input
              v-model="form.password"
              prefix-icon="el-icon-lock"
              autocomplete="off"
              placeholder="请输入密码"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="dialog-footer lin-form-item">
            <el-button type="primary" @click="submitForm">登录</el-button>
          </el-form-item>
          <el-form-item class="lin-form-item">
            没有账号？
            <el-link type="primary" @click="activeIndex = 'register'">注册</el-link>
            <el-link href="/reset-password" style="float: right;">忘记密码</el-link>
          </el-form-item>
        </template>
        <template v-else-if="activeIndex == 'register'">
          <el-form-item prop="nickname" :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]">
            <el-input
              v-model="form.nickname"
              prefix-icon="el-icon-user"
              autocomplete="off"
              placeholder="请输入昵称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="username"
            :rules="[{ required: true, message: '请输入邮箱账户或用户名', trigger: 'blur' }]"
          >
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user"
              autocomplete="off"
              placeholder="请输入邮箱账户或用户名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
            <el-input
              v-model="form.password"
              prefix-icon="el-icon-lock"
              autocomplete="off"
              placeholder="请输入密码"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirm_password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
            <el-input
              v-model="form.confirm_password"
              prefix-icon="el-icon-lock"
              autocomplete="off"
              placeholder="请确认密码"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="dialog-footer lin-form-item">
            <el-button type="primary" @click="submitForm">注册</el-button>
          </el-form-item>
          <el-form-item class="lin-form-item to-login">
            <el-link type="primary" @click="activeIndex = 'login'">已有账号,去登录</el-link>
          </el-form-item>
        </template>

        <el-form-item label="第三方账号登录" class="oauth lin-form-item">
          <!-- <el-avatar icon="iconfont icon-QQ" title="qq登录" size="large"></el-avatar> -->
          <a href="javascript:void(0);" @click="() => signin('GitHub')">
            <el-avatar class="margin-left-xs" icon="iconfont icon-github" title="github登录" size="large"></el-avatar>
          </a>
          <a href="javascript:void(0);" @click="() => signin('QQ')">
            <el-avatar class="margin-left-xs" icon="iconfont icon-qq" title="qq登录" size="large"></el-avatar>
          </a>
          <a href="javascript:void(0);" @click="() => signin('Gitee')">
            <el-avatar class="margin-left-xs" icon="iconfont icon-wechat" title="码云登录" size="large"></el-avatar>
          </a>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */

import { mapActions, mapMutations } from 'vuex'
import User from '@/lin/model/user'
import Utils from '@/lin/util/util'

export default {
  name: 'LoginRegisterDialog',
  data() {
    return {
      dialogTableVisible: false,
      form: {
        username: '',
        password: '',
        confirm_password: '',
      },
      activeIndex: '',
      formLabelWidth: '120px',
      loading: false,
      externalProviders: [],
    }
  },
  async created() {
    // this.externalProviders = await oauth2.getExternalProviders()
  },
  methods: {
    ...mapActions(['setUserAndState']),
    show(key) {
      this.dialogTableVisible = true
      if (key) {
        this.activeIndex = key
      } else {
        this.activeIndex = 'login'
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.activeIndex === 'login') {
            this.login()
          } else {
            this.register()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login() {
      try {
        this.loading = true
        await User.getToken(this.form.username, this.form.password)
        this.dialogTableVisible = false
        await this.getInformation()
        this.loading = false
        // this.$router.push("/index");
        const redirect = decodeURIComponent(this.$route.query.redirect || this.$route.path)
        // eslint-disable-next-line
        this.$router.push(redirect + '?d=' + Utils.getRandomStr())

        this.$message.success('登录成功')
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    async register() {
      this.loading = true
      try {
        await User.register({
          nickname: this.form.nickname,
          password: this.form.password,
          username: this.form.username,
          confirm_password: this.form.confirm_password,
        }).finally(() => {
          this.loading = false
        })
        // this.form.username = this.form.email
        this.$message.success('注册成功')
        await this.login()
      } catch (error) {
        this.$notify.error({
          title: '错误！',
          message: '😢 注册失败！' + error.data.msg,
        })

        console.log(error.data)
      }
    },
    async getInformation() {
      try {
        // 尝试获取当前用户信息
        const user = await User.getPermissions()
        this.setUserAndState(user)
      } catch (e) {
        console.log(e)
      }
    },

    // signin(provider) {
    //   window.localStorage.setItem('OAUTH_LOGIN_URL', window.location.href)
    //   window.open(
    //     `${process.env.VUE_APP_BASE_URL}cms/oauth2/signin?provider=${provider}&redirectUrl=${process.env.VUE_APP_CURRENT_URL}`,
    //   )
    // },
  },
}
</script>

<style lang="scss" scoped>
.lin-dialog {
  z-index: 2005;
  span {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .el-form-item {
    margin-bottom: 0px !important;
    a {
      margin-right: 20px;
    }
  }
  .lin-form-item /deep/ .el-form-item__content {
    margin-bottom: 0px !important;
  }
  .to-login {
    text-align: center;
  }
  .dialog-footer {
    text-align: center;

    .el-button {
      width: 270px;
    }
  }
  .oauth .el-form-item__content {
    .el-avatar /deep/ i {
      font-size: 27px !important;
      &:hover {
        cursor: pointer !important;
      }
    }
  }
}
</style>
