<template>
  <div class="detail-wrapper">
    <i class="des">原创</i>
    <div class="box-card">
      <el-row :gutter="24">
        <el-col :xl="24" :lg="24" :md="13" :sm="24" :xs="24">
          <el-card v-if="detail.title">
            <div class="detail-head">
              <h1 class="title ml-20 fw-bold">{{ detail.title }}</h1>
              <div class="info mt-20">
                <el-breadcrumb separator="/" class="ml-20" style="line-height: 20px;">
                  <el-breadcrumb-item>
                    <i class="el-icon-time fs-xs"></i>
                    <span class="ml-5 fs-xs">{{ detail.pub_time }}</span>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                    <i class="el-icon-chat-line-round"></i>
                    <span class="ml-5">评论: {{ detail.commentsCount }}</span>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                    <i class="el-icon-view"></i>
                    <span class="ml-5">阅读: {{ detail.views }}</span>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>

            <el-divider />

            <div class="detail-body">
              <mavonEditor
                ref="md"
                :subfield="false"
                v-model="detail.content"
                :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :ishljs="true"
                codeStyle="atom-one-dark"
              />
              <el-tabs value="two">
                <el-tab-pane label="作者" name="first">
                  <div class="meta-list">
                    <div class="user-info">
                      <el-avatar :size="50" :src="userinfo.avatar"></el-avatar>
                      <div class="ml-20 fw-bold">
                        <p class="fw-bold">{{ userinfo.nickname }}</p>
                        <p class="fs-xs mt-20">如有疑问或者希望一起交流学习，请按如下方式联系我:</p>
                        <div class="flex">
                          <el-tooltip class="item" effect="dark" content="13549128759" placement="bottom">
                            <div class="icon"><i class="iconfont icon-wechat" style="color: green;"></i></div>
                          </el-tooltip>
                          <div class="icon ml-20"><i class="iconfont icon-github"></i></div>
                          <el-tooltip class="item" effect="dark" content="603552916" placement="bottom">
                            <div class="icon ml-20"><i class="iconfont icon-qq" style="color: #3398dc;"></i></div>
                          </el-tooltip>
                          <el-tooltip class="item" effect="dark" content="No Allow !" placement="bottom">
                            <div class="icon ml-20"><i class="iconfont icon-weibo" style="color: #ff0000;"></i></div>
                          </el-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="评论区" name="two">
                  <!-- 评论区 -->
                  <comment-list
                    :post_id="post_id"
                    :comment_user_id="user.id"
                    @success="getCommentSuccess"
                    @updateComment="updateComment"
                  ></comment-list>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-card>
          <skeleton-paragraph v-else class="content" :lines="20" line-height="1.2em" />
        </el-col>
      </el-row>
      <!-- <transition name="module" mode="out-in"> -->

      <!-- </transition> -->
    </div>
    <!-- <Loading v-else /> -->
    <el-backtop class="lin-back-top"></el-backtop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mavonEditor } from 'mavon-editor'
import CommentList from '@/view/comment/comment-list'
import ArticleApi from '@/model/article'

// import Loading from '@/component/loading'
export default {
  name: 'articleDetail',
  components: {
    mavonEditor,
    // Loading,
    CommentList,
  },
  watch: {
    $route() {
      this.detail = {}
      this.getDetail()
    },
  },
  created() {
    this.getDetail()
  },
  computed: {
    ...mapGetters(['user']),
    post_id() {
      return this.$route.params.id
    },
  },
  data() {
    return {
      detail: {},
      category: [],
      userinfo: {},
    }
  },

  methods: {
    getCommentSuccess(total) {
      console.log(total)
      // this.model.comment_quantity = total
    },
    updateComment() {
      console.log('update Comment !')
    },
    // likeChange({ likes_quantity, is_liked }) {
    //   this.model.likes_quantity += likes_quantity
    //   this.model.is_liked = is_liked
    // },
    async getDetail() {
      const res = await ArticleApi.getArticleDetail(this.$route.params.id)
      this.detail = res.data
      this.userinfo = res.data.author_info
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
  .des {
    background: cornflowerblue;
    color: white;
    font-style: normal;
    font-size: 14px;
    position: absolute;
    padding: 4px 10px 10px 4px;
    border-radius: 0 0 30px 0;
    left: 0;
    top: 0;
  }
  .box-card {
    background-size: 20px 20px;
    background-position: center center;
    /deep/ .el-card__body {
      padding: 0px;
    }
    .detail-head {
      margin-top: 40px;
      text-align: left;
      .info {
        .ml-5 {
          margin-left: 5px;
        }
      }
    }
    .detail-body {
      margin: 10px;
      // margin-bottom: 20px;
      .meta-list {
        text-align: left;
        .user-info {
          display: flex;
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
      /deep/ .el-tabs {
        padding: 20px;
      }
    }
    .content {
      margin-top: 40px;
    }
  }
  .sidebar {
    text-align: left;
    .list {
      color: #555555;
      font-size: 14px;
      line-height: 30px;
      p {
        color: #999999;
      }
    }
  }
  /deep/ .el-tree {
    background: transparent;
  }

  @media (max-width: 600px) {
    * {
      font-size: 12px;
    }
    .detail-wrapper {
      flex-direction: column;
    }
    .box-card {
      min-width: 100%;
    }
    .box-card .el-card__body {
      margin: 10px;
      padding: 0px;
      padding-top: 20px;
    }

    .el-row {
      margin-left: 0px !important;
      margin-right: 0px !important;
    }
    .el-col-xs-24 {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
  }
  @media (min-width: 1200px) {
    .box-card {
      min-width: 660px;
    }
  }
}
</style>
