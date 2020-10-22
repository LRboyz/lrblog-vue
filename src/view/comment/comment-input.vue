<template>
  <div v-clickoutside="hideReplyBtn" class="my-reply">
    <!-- <el-avatar class="header-img" :size="40" :src="user.avatar"></el-avatar> -->
    <div class="reply-info">
      <el-input
        type="textarea"
        v-model="replyComment"
        id="replyInput"
        placeholder="撰写评论..."
        class="reply-input"
        clearable
        @focus="showReplyBtn"
      ></el-input>
    </div>
    <div class="reply-btn-box" v-show="btnShow">
      <el-button class="reply-btn" size="medium" @click.prevent="sendComment" type="primary">
        发表评论
      </el-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import commentApi from '@/model/comment'

const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside)
    delete el.vueClickOutside
  },
}

export default {
  name: 'CommentInput',
  directives: { clickoutside },
  data() {
    return {
      disabled: true,
      replyComment: '',
      btnShow: false,
    }
  },
  created() {},
  computed: {
    post_id() {
      return this.$route.params.id
    },
    ...mapGetters(['user']),
  },
  methods: {
    hideReplyBtn() {
      this.btnShow = false
    },
    sendComment() {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空',
        })
        return false
      } else {
        this.$emit('success', this.replyComment)
      }
    },
    showReplyBtn() {
      this.btnShow = true
    },
  },
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 1px !important;
  /deep/ .el-form-item__content {
    line-height: 20px;
    margin-bottom: 10px;
  }
}

.my-reply {
  // display: flex;
  padding: 10px;
  background-color: #eaf0f5;

  .header-img {
    display: nline-block;
    vertical-align: top;
  }
  .reply-info {
    display: inline-block;
    margin-left: 5px;
    width: 90%;
    @media screen and (max-width: 1200px) {
      width: 80%;
    }
    .reply-input {
      // min-height: 20px;
      line-height: 22px;
      padding: 10px 5px;
      color: #45526b;
      background-color: #fff;
      border-radius: 5px;
      &:empty:before {
        content: attr(placeholder);
      }
      &:focus:before {
        content: none;
      }
      &:focus {
        padding: 8px 8px;
        border: 1px solid $theme;
        box-shadow: none;
        outline: none;
      }
    }
  }
  .reply-btn-box {
    height: 25px;
    margin: 10px 0;
  }
  .reply-btn {
    position: relative;
    float: right;
    margin-right: 15px;
  }
}
</style>
