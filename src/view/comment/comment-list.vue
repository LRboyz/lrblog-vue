<template>
  <div>
    <el-card class="margin-top-xs" v-if="commentable == false">
      <section>
        <h4 style="line-height: 32px;">评论已关闭</h4>

        <div>
          <el-button type="primary" plain style="float: right;" @click="() => updateCommentable(true)"
            >开启评论</el-button
          >
        </div>
      </section>
    </el-card>
    <div v-else>
      <el-card shadow="never" :body-style="{ 'padding-bottom': '0px' }" style="margin-bottom: 20px; margin-top: 20px;">
        <comment-input
          @success="getComments"
          :form="{
            post_id: post_id,
            comment_user_id: comment_user_id,
            reply_user_id: form.reply_user_id,
          }"
        ></comment-input>
      </el-card>
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <span>全部评论</span>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="你确认要关闭评论"
            @onConfirm="() => updateCommentable(false)"
          >
            <el-button slot="reference" style="float: right; padding: 3px 0;" type="text">关闭评论</el-button>
          </el-popconfirm>
        </div>

        <comment-item
          v-for="(comment, index) in comments"
          :key="comment._id"
          :avatar="comment.user.avatar"
          :author="comment.user"
          :content="comment.text"
          :time="comment.create_time"
          @addReply="handleAddReply(comment, index)"
          @handleclickAvatar="handleClickAvatar(comment)"
          @handleclickAuthor="handleClickAuthor(comment)"
          @handleaddReply="handleAddReply(comment, index)"
          @handledeleteReply="handleDeleteReply(comment, index)"
          @clickTool="item => handleClickTool(item, comment, index)"
          :tools="[
            {
              text: comment.votes,
              title: '点赞',
              icon: 'iconfont icon-zan',
              status: comment.status,
              is_Liked: getCommentLiked(comment._id),
            },
          ]"
        >
          <comment-input
            slot="comment-input"
            @success="() => getOtherComments(comment._id, index)"
            :form="{
              post_id: post_id,
              comment_user_id: comment_user_id,
              reply_user_id: reply_user_id,
            }"
          ></comment-input>
          <reply-item
            slot="reply-list"
            v-for="(reply, i) in comment.other_comments"
            :key="reply._id"
            :author="reply"
            :resp_user_info="reply"
            :content="reply.text"
            :time="reply.create_time"
            @clickTool="($event, item) => handleClickReplyTool(item, reply, index, i)"
            @addReply="handleAddCommentReply(reply, index, i)"
            @deleteReply="handleDeleteCommentReply(reply, index, i)"
            :replyVisible="reply.replyVisible"
            :tools="[
              {
                text: reply.votes,
                title: '点赞',
                name: 'like',
                icon: 'iconfont icon-' + (reply.is_Liked ? 'like-fill' : 'like'),
              },
            ]"
          >
            <comment-input
              slot="reply-item-input"
              @success="() => getOtherComments(reply_user_id, index)"
              :form="{
                post_id: post_id,
                comment_user_id: comment_user_id,
                reply_user_id: reply_user_id,
              }"
            ></comment-input>
          </reply-item>
        </comment-item>
      </el-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import commentApi from '@/model/comment'
import CommentItem from '@/view/comment/comment-item'
import ReplyItem from '@/view/comment/reply-item'
import userLike from '@/model/user-like'
import CommentInput from '@/view/comment/comment-input'
import { getJSONStorageReader } from '@/lin/util/localStorage'
// import InfiniteLoading from 'vue-infinite-loading'

const localLikesHistory = getJSONStorageReader('user_like_history')

export default {
  name: 'CommentList',
  components: { CommentItem, ReplyItem, CommentInput },
  data() {
    return {
      comments: [],
      form: {
        reply_user_id: null,
        comment_user_id: null,
        post_id: null,
      },
      // 用户历史数据
      historyLikes: {
        pages: [],
        comments: [],
      },
      pagination: {
        currentPage: 0,
        pageSize: 10,
        pageTotal: 0,
      },
      any: 'any' + new Date(),
    }
  },
  props: {
    post_id: {
      type: String,
    },
    commentable: {
      type: Boolean,
      default: true,
    },
    comment_user_id: {
      type: [String, Number],
    },
    reply_user_id: {
      type: [String, Number],
    },
  },
  created() {
    this.initUserLike()
    this.getComments()
  },
  computed: {},
  methods: {
    // 初始化本地用户即本地用户的点赞历史
    initUserLike() {
      const historyLikes = localLikesHistory.get()
      if (historyLikes) {
        this.historyLikes = historyLikes
      }
    },
    async getComments() {
      this.pagination.currentPage = 0
      this.any = new Date()
      const commentList = await commentApi.getPublicComments({
        post_id: this.post_id,
      })
      this.comments = commentList.data
    },
    async handleClickTool(item, comment, index) {
      // console.log(item, comment, index)
      await this.handleLike(comment, index)
    },
    handleLike(comment, index) {
      console.log(comment)
      if (this.getCommentLiked(comment._id)) {
        this.comments[index].is_Liked = true
        return false
      } else {
        this.comments[index].is_Liked = false
      }
      userLike
        .likeOrCancel({
          comment_id: comment._id,
        })
        .then(res => {
          this.$message.success(`${res.msg}`)
          this.comments[index].is_Liked = true
          this.comments[index].votes += 1
          this.historyLikes.comments.push(comment._id)
          localLikesHistory.set(this.historyLikes)
        })
        .catch(error => {
          console.warn('评论点赞失败', error)
          alert('点赞失败！')
        })
    },
    // 获取某条评论是否被点赞
    getCommentLiked(comment_id) {
      return this.historyLikes.comments.includes(comment_id)
    },
    handleAddReply(comment, index) {
      console.log('点击了回复按钮', comment, index)
      this.comments[index].replyVisible = !comment.replyVisible
    },
  },
  async getOtherComments(repky_user_id, index) {
    console.log(reply_user_id, index)
    // let res = await commentApi.getPublicComments({
    //   subject_id: this.subject_id,
    //   root_comment_id: root_comment_id,
    // })
    // res.items.forEach(item => {
    //   item.replyVisible = false
    // })
    // this.comments[index].top_comment = res.items
    // this.comments[index].replyVisible = false
    // this.$emit('success', res.total)
  },

  // handleAddCommentReply(reply, index, i) {
  //   this.comments[index].top_comment[i].replyVisible = !reply.replyVisible
  // },
  // async handleDeleteReply(comment, index) {
  //   await commentApi.delectComment(comment.id)
  //   this.getComments()
  // },
  // async handleDeleteCommentReply(reply, index, i) {
  //   let res = await commentApi.delectComment(reply.id)
  //   this.$message.success(`${res.message}`)
  //   await this.getTopComments(reply.root_comment_id, index)
  // },

  // async handleClickReplyTool(item, reply, index, i) {
  //   if (item.name == 'like') {
  //     await this.handleReplyLike(reply, index, i)
  //   }
  // },

  // async handleReplyLike(reply, index, i) {
  //   let res = await userLike.likeOrCancel({
  //     subject_id: reply.id,
  //     subject_type: 2,
  //   })
  //   this.$message.success(`${res.message}`)
  //   if (this.comments[index].top_comment[i].is_liked) {
  //     this.comments[index].top_comment[i].is_liked = false
  //     this.comments[index].top_comment[i].likes_quantity -= 1
  //   } else {
  //     this.comments[index].top_comment[i].is_liked = true
  //     this.comments[index].top_comment[i].likes_quantity += 1
  //   }
  // },
  // updateCommentable(commentable) {
  //   this.$emit('updateCommentable', commentable)
  // },
  // },
}
</script>

<style lang="scss" scoped>
.icon-zan-fill {
  color: red;
}
</style>
