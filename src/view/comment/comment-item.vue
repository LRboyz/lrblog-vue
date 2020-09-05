<template>
  <div class="comments-item">
    <div class="pull-left">
      <el-avatar
        :size="40"
        class="ml-10"
        :src="author.avatar || defaultAvatar"
        alt="default"
        @click="handleClickAvatar"
      />
    </div>
    <div class="comments-box">
      <div class="comments-trigger ml-20">
        <div class="pull-right comments-option"></div>
        <strong>
          <!-- <router-link :to="{ path: `/user/${author.id}/article` }" target="_blank" @click="handleClickAuthor">{{
            author.nickname || '匿名用户'
          }}</router-link> -->
          <a class="nickname" @click="handleClickAuthor">{{ author.nickname || '匿名用户' }}</a>
        </strong>
      </div>
      <div class="comments-content ml-20">
        <p v-html="commentContent"></p>
      </div>
      <p class="comments-ops ml-20">
        <span class="comments-reply-btn ml15" @click="handleAddReply">
          <a
            href="javascript:void(0)"
            :class="{ liked: item.is_Liked }"
            class="ml-10"
            data-placement="top"
            v-for="item in tools"
            :key="item.name"
            @click.stop.prevent="handleClickTool(item)"
          >
            <!-- <a :class="{ liked: item.is_Liked }"> -->
            <i class="zan" :class="item.icon" v-if="item.icon"></i>
            <span v-if="item.text">({{ item.text }})</span>
          </a>
          <!-- <i class="iconfont icon-comment"></i> -->
          <span class="replyText" @click.stop.prevent="handleAddReply">{{ replyText }}</span>
          <span style="color: #6c757d;"> · {{ time | formatTime }}</span>
        </span>

        <el-popconfirm
          :title="hasReply ? '删除评论后，评论下的所有回复都会被删除!' : '确认删除此评论'"
          @onConfirm="handleDeleteReply"
          v-show="user != null && author.id == user.id"
        >
          <span class="comments-reply-btn ml15" slot="reference">
            <i class="iconfont icon-delete"></i>
            删除
          </span>
        </el-popconfirm>
      </p>
      <div class="comment-input" v-show="replyVisible">
        <slot name="comment-input"></slot>
      </div>
      <div class="reply-list" v-show="hasReply">
        <slot name="reply-list"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '@/lin/util/util'
import defaultAvatar from '@/assets/image/user/user.png'

export default {
  name: 'CommentItem',
  props: {
    avatar: String,
    author: {
      type: Object,
    },
    content: String,
    tools: Array,
    time: [String, Number],
    hasReply: Boolean,
    replyVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // replyVisible: false
      defaultAvatar,
    }
  },
  computed: {
    replyText() {
      return this.replyVisible === true ? '取消回复' : '回复'
    },
    commentContent() {
      return Utils.formatHtml(Utils.formatHyperLink(this.content))
    },
  },
  methods: {
    handleClickAvatar() {
      this.$emit('clickAvatar', this)
    },
    handleClickTool(tool) {
      // console.log(tool)
      this.$emit('clickTool', tool)
    },
    handleClickAuthor() {
      this.$notify({
        title: '警告',
        message: '该用户已被系统删除·',
        type: 'warning',
      })
      this.$emit('clickAuthor', this)
    },
    handleAddReply() {
      console.log('回复按钮')
      this.$emit('addReply', this)
    },
    handleDeleteReply() {
      this.$emit('deleteReply', this)
    },
  },
  filters: {},
}
</script>

<style lang="scss" scoped>
.liked {
  color: $theme;
}
img {
  border: 0;
  vertical-align: middle;
}
.ml10 {
  margin-left: 10px !important;
}
.ml15 {
  margin-left: 15px !important;
}
.comments-item {
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  font-size: 14px;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
.nickname:hover {
  color: #666;
}
.avatar-32 {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.avatar-32:hover {
  cursor: pointer;
}
.comments-item a {
  margin-right: 10px;
  // color: #fe744a;
  text-decoration: none;
  background: transparent;
}
.comments-item a:hover,
.comments-item a:active,
.comments-item a:focus {
  outline: 0;
}
.comments-box {
  padding-left: 47px;
}
.comments-box strong {
  font-weight: bold;
}
.comments-trigger {
  text-align: left;
  line-height: 20px;
  margin-bottom: 10px;
  color: #999;
  font-size: 13px;
}
.comments-ops {
  .coments-ops-item,
  .comments-reply-btn {
    .replyText:hover {
      cursor: pointer;
      color: $theme;
    }
    .zan:hover {
      transform: scale(2);
      transition: 0.5s;
      color: $theme;
    }
  }
}
.comments-content {
  text-align: left;
  line-height: 1.6;
  word-wrap: break-word;
  margin-bottom: 10px !important;
}
.comments-content::before,
.comments-content::after {
  display: table;
}
.comments-content::after {
  content: '';
  clear: both;
}
.comments-ops {
  text-align: left;
  line-height: 20px;
  margin: 0;
  color: #999;
  font-size: 13px;
}
.comments-reply-btn {
  cursor: pointer;
}
.comment-input {
  margin-top: 1.083rem;
  position: relative;
  padding: 1rem 1rem 0rem 1rem;
  background-color: #fafbfc;
  border-radius: 3px;
}
.reply-list {
  margin-top: 10px;
  font-size: 13px;
  background-color: #fafafa;
  padding: 0 10px;
  color: #666;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}
.reply-item--ops {
  border-bottom: none;
}
.reply-item {
  padding-bottom: 10px;
  padding-top: 10px;
  word-break: break-word;
}
</style>
