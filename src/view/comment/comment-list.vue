<template>
  <div>
    <!-- 打赏区域 -->
    <div class="praise">
      <span class="p-item">{{ detail.commentsCount }} 条看法</span>
      <span class="p-item p-item2" @click.prevent="likeArticle">
        <i :class="isLikedPage ? 'is_LikedPage' : ''" class="iconfont icon-like fs-sm"></i>

        {{ detail.likes }} 个人觉得这篇文章很赞
      </span>
      <span class="p-item" @click.prevent="good">
        <i class="iconfont icon-zan fs-sm"></i>
        写的不错！</span
      >
      <el-dialog title="打赏一个呗～" :visible.sync="isShow">
        <div class="dialog">
          <img src="../../assets/image/blog/zfb.png" alt="" srcset="" />
          <img src="../../assets/image/blog/wxzs.png" alt="" srcset="" />
        </div>
      </el-dialog>
    </div>
    <!-- 评论区域 -->
    <comment-input @success="sendComment" />
    <div v-for="(item, i) in comments" :key="i" class="author-title reply-father">
      <div class="top-comment">
        <el-avatar class="header-img" :size="40" :src="item.reply_from.avatar"></el-avatar>
        <div class="author-info">
          <span class="author-name">{{ item.reply_from.nickname }}</span>
        </div>

        <div class="talk-box">
          <div>
            <span class="content" :class="item.status == true ? '' : 'gray-text'">
              {{ item.status === true ? item.text : '该评论已被管理员删除!' }}</span
            >
          </div>
          <div v-if="item.status == true">
            <div class="icon-btn" @click.prevent="handleLike(item, i)">
              <i :class="getCommentLiked(item.comment_id) ? 'is_Liked' : ''" class="iconfont icon-zan ml-10"></i>
              <span class="fs-xs" v-show="item.votes > 0">{{ item.votes }}</span>
            </div>
            <div class="desc"></div>
            <p class="reply" @click.prevent="replyBtn(item, i)">{{ replyText }}</p>
            <div class="desc"></div>
            <p class="author-time fs-sm ml-10">{{ item.create_time | formatTime }}</p>
          </div>
        </div>
        <div class="reply-box" v-show="item.visitable">
          <comment-input @success="sendReplyComment(arguments, item)" />
        </div>
      </div>
      <reply-item
        :otherComments="item.otherComments"
        @replyLiked="handleLike"
        @replyOtherComment="sendOtherComment(arguments, item)"
      ></reply-item>
    </div>
    <transition name="fade-transform" mode="out-in">
      <login-register-dialog ref="loginRegister"></login-register-dialog>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import commentApi from '@/model/comment'
import ArticleApi from '@/model/article'
import CommentInput from './comment-input'
import LoginRegisterDialog from '@/view/account/login-register-dialog'
import ReplyItem from './reply-item'
import userLike from '@/model/user-like'
import { getJSONStorageReader } from '@/lin/util/localStorage'
import { log } from 'util'
const localLikesHistory = getJSONStorageReader('user_like_history')

export default {
  name: 'ArticleComment',
  components: {
    CommentInput,
    ReplyItem,
    LoginRegisterDialog,
  },
  props: {
    detail: {
      type: Object,
    },
  },
  created() {
    this.initUserLike()
    this.getComments()
    // console.log(this.getCommentLiked())
  },
  data() {
    return {
      // 用户历史数据
      historyLikes: {
        pages: [],
        comments: [],
      },
      btnShow: false,
      index: '0',
      myName: 'Lana Del Rey',
      isShow: false,
      myId: 19870621,
      to: '',
      toId: -1,
      comments: [],
    }
  },
  computed: {
    post_id() {
      return this.$route.params.id
    },
    replyText() {
      return this.visitable == true ? '取消回复' : '回复'
    },
    isLikedPage() {
      return this.historyLikes.pages.includes(this.post_id)
    },
    ...mapGetters(['user']),
  },
  methods: {
    // 初始化本地用户即本地用户的点赞历史
    initUserLike() {
      const historyLikes = localLikesHistory.get()
      if (historyLikes) {
        this.historyLikes = historyLikes
      }
    },
    async getComments() {
      const commentList = await commentApi.getPublicComments({
        post_id: this.post_id,
      })
      commentList.data.forEach(item => {
        item.visitable = false
        if (item.otherComments.length > 0) {
          item.otherComments.forEach(reply => {
            reply.visitable = false
          })
        }
      })
      this.comments = commentList.data
    },
    good() {
      this.isShow = !this.isShow
      console.log('写得不错！')
    },
    replyBtn(item, index) {
      this.comments[index].visitable = !item.visitable
    },
    // 喜欢文章
    likeArticle() {
      if (this.isLikedPage) {
        this.$notify({
          title: '温馨提示',
          message: '您已经点赞过这篇文章了呢！',
          type: 'warning',
          position: 'top-right',
        })
        return false
      } else {
        ArticleApi.likeArticle(this.$route.params.id).then(res => {
          this.$message.success(`${res.msg}`)
          this.detail.likes += 1
          this.historyLikes.pages.push(this.post_id)
          localLikesHistory.set(this.historyLikes)
        })
      }
    },
    // 点赞评论
    handleLike(item, index) {
      console.log(item, index)
      if (this.getCommentLiked(item.comment_id)) {
        this.comments[index].is_Liked = true
        this.$notify.info({
          title: '温馨提示',
          message: '您已经点过赞了哦 ～',
          position: 'top-left',
        })
        return false
      } else {
        this.comments[index].is_Liked = false
      }
      userLike
        .likeOrCancel({
          comment_id: item.comment_id,
        })
        .then(res => {
          this.$message.success(`${res.msg}`)
          this.comments[index].is_Liked = true
          this.comments[index].votes += 1
          this.historyLikes.comments.push(item.comment_id)
          localLikesHistory.set(this.historyLikes)
        })
        .catch(error => {
          console.warn('评论点赞失败', error)
          alert('点赞失败！')
        })
      // console.log(this.hisoryLikes)
    },
    // 获取某条评论是否被点赞
    getCommentLiked(comment_id) {
      // console.log(comment_id)
      return this.historyLikes.comments.includes(comment_id)
    },
    _inputShow(i) {
      return this.comments[i].inputShow
    },
    sendComment(replyComment) {
      if (this.user) {
        commentApi
          .addComment({
            post_id: this.post_id,
            text: replyComment,
          })
          .then(res => {
            console.log(res.data)
            this.$message.success(`${res.msg}`)
            this.replyComment = ''
            this.getComments()
          })
          .catch(error => {
            console.warn('评论发布失败', error)
          })
      } else {
        console.log('未登录！！无法操作')
        this.$refs.loginRegister.show()
      }
    },
    sendReplyComment(reply_text, item) {
      commentApi
        .addReplyComment(item.comment_id, {
          text: reply_text[0],
          reply_user_id: item.reply_from._id,
        })
        .then(res => {
          console.log(res.data)
          this.$message.success(`${res.msg}`)
          this.replyComment = ''
          this.getComments()
        })
        .catch(error => {
          console.warn('回复评论失败', error)
        })
    },
    async sendOtherComment(other_comment, item) {
      if (this.user) {
        commentApi
          .addReplyComment(item.comment_id, {
            text: other_comment[0],
            reply_user_id: other_comment[1].reply_from._id,
          })
          .then(res => {
            console.log(res.data)
            this.$message.success(`${res.msg}`)
            this.replyComment = ''
            this.getComments()
          })
          .catch(error => {
            console.warn('回复评论失败', error)
          })
      } else {
        console.log('未登录！！无法操作')
        this.$refs.loginRegister.show()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.praise {
  text-align: left;
  margin: 20px 0;
  .p-item {
    border-radius: 14px;
    font-size: 10px;
    font-weight: bold;
    margin-right: 10px;
    width: 100%;
    padding: 5px 10px;
    background: #eaf0f5;
    color: #555555;
  }
  .p-item:nth-child(3) {
    color: white;
    animation: good 3s infinite;
  }
  .p-item:hover {
    transition: 0.5s;
    cursor: pointer;
    color: white;
    background: $theme;
  }
  .p-item2:hover {
    transition: 0.5s;
    cursor: pointer;
    color: white;
    background: rgb(89, 168, 238);
  }
  .dialog {
    display: flex;
    justify-content: space-evenly;
    img {
      width: 120px; // height: 150px;
    }
  }
  @keyframes good {
    0% {
      background: rgb(138, 189, 36);
    }
    100% {
      background: rgb(4, 163, 221);
    }
  }
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}

.author-title {
  padding: 10px;
  .top-comment {
    text-align: left; // margin: 0;
  }
  .header-img {
    display: inline-block;
    vertical-align: top;
  }
  .author-info {
    text-align: left;
    display: inline-block;
    margin-left: 10px; // width: 60%;
    height: 40px;
    line-height: 30px;
    > span {
      display: block;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .author-name {
      color: $theme; // font-size: 18px;
      font-weight: bold;
    }
  }
  > span {
    cursor: pointer;
  }
  .iconfont {
    margin: 0 5px;
  }
  .talk-box {
    margin: 0 50px;
    .gray-text {
      color: #ccc;
    }
    .content {
      font-size: 14px;
      line-height: 25px;
    }
    .desc {
      border-radius: 50%;
      display: inline-block;
      width: 3px;
      margin: 3px 3px;
      height: 3px;
      background: #ccc;
    }
    .icon-btn {
      color: rgb(99, 97, 97);
      margin: 10px 5px 0 -5px;
      cursor: pointer;
      display: inline-block;
      padding: 0 !important;
      @media screen and (max-width: 1200px) {
        width: 20%;
        padding: 7px;
      }
    }
    .icon-btn:hover {
      color: $theme;
    }
    .author-time {
      color: rgb(99, 97, 97);
      display: inline-block;
    }
    .reply {
      padding: 5px;
      color: rgb(99, 97, 97); // padding: 0 10px;
      display: inline-block;
      font-size: 14px;
    }
    .reply:hover {
      cursor: pointer;
      color: $theme;
    }
  }
  .reply-box {
    text-align: left;
    margin: 10px 0 0 50px;
    background-color: #eaf0f5;
  }
}

.is_Liked {
  color: $theme;
}

.is_LikedPage {
  color: orangered;
}
</style>
