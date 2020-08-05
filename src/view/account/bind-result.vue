<template>
  <div>
    <router-link :to="{ path: '/index' }">
      <el-button type="primary">回到首页</el-button>
    </router-link>
    <div class="margin-top-lg">
      <el-alert :title="errorMsg" type="error" v-if="error == true"></el-alert>
      <el-alert :title="errorMsg" type="success" v-else></el-alert>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import User from '@/lin/model/user'
// import { saveTokens } from '@/lin/util/token'

// const axios = require('axios')

export default {
  data() {
    return {
      error: false,
      errorMsg: '',
    }
  },
  created() {
    const loading = Loading.service({
      fullscreen: true,
      text: '绑定中。。。',
      lock: true,
      //  spinner: 'el-icon-loadings'
    })

    const { query } = this.$route
    if (query.code === 'Success') {
      this.errorMsg = query.message
      this.error = false
    } else {
      this.errorMsg = query.message
      this.error = true
    }
    loading.close()
  },
  methods: {
    async getInformation() {
      try {
        const user = await User.getPermissions()
        this.setUserAndState(user)
        this.setUserAuths(user.permissions)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = true
        const url = window.localStorage.getItem('OAUTH_LOGIN_URL')

        window.location.href = url
      }
    },
  },
}
</script>

<style></style>
