<template>
  <div class="reply-box mt-20">
    <div v-for="(reply, j) in otherComments" :key="j" class="author-title">
      <el-avatar class="header-img" :size="40" :src="reply.reply_from.avatar"></el-avatar>
      <div class="author-info">
        <span class="author-name">{{ reply.reply_from.nickname }}</span>
      </div>
      <div class="talk-box">
        <div>
          <span class="fs-sm fw-bold" style="color: #3963bc;">@ </span>
          <span class="fw-bold">{{ reply.reply_to.nickname }}:</span>
          <span class="fs-sm ml-10" style="line-height: 20px;">{{ reply.text }}</span>
        </div>
        <!-- @click.prevent="replyLiked(reply, j)" -->
        <div class="icon-btn fs-xs">
          <i class="el-icon-s-promotion"></i>
          <!-- <span v-show="reply.votes > 0">{ reply.votes }} </span> -->
        </div>
        <div class="desc"></div>
        <span class="reply fs-sm" @click.prevent="replyItem(reply, j)">回复</span>
        <div class="desc"></div>
        <p class="author-time fs-sm ml-10">{{ reply.create_time | formatTime }}</p>
      </div>
      <div class="reply-box" v-show="reply.visitable">
        <comment-input @success="sendOtherComments(arguments, reply)" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentInput from './comment-input'

export default {
  name: 'ReplyItem',
  components: {
    CommentInput,
  },
  props: {
    otherComments: {
      type: Array,
      // eslint-disable-next-line
      default: [],
    },
  },
  created() {
    // console.log(this.otherComments)
  },
  data() {
    return {
      myHeader: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
    }
  },
  methods: {
    replyItem(reply, j) {
      this.otherComments[j].visitable = !reply.visitable
    },
    // 子评论的点赞功能暂时放着
    // replyLiked(item, index) {
    //   this.$emit('replyLiked', item, index)
    // },
    sendOtherComments(other_comment, item) {
      this.$emit('replyOtherComment', other_comment[0], item)
      // console.log(other_comment[0], item)
    },
  },
}
</script>

<style lang="scss" scpoed>
.author-title {
  padding: 10px;
  .top-comment {
    text-align: left;
    // margin: 0;
  }
  .header-img {
    display: inline-block;
    vertical-align: top;
  }
  .author-info {
    text-align: left;
    display: inline-block;
    margin-left: 10px;
    // width: 60%;
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
      color: $theme;
      // font-size: 18px;
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
      padding: 0 !important ;
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
      color: rgb(99, 97, 97);
      // padding: 0 10px;
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
</style>
