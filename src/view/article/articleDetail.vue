<template>
  <div class="detail-wrapper">
    <i class="top-left">原创</i>
    <div class="box-card">
      <el-row :gutter="24">
        <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <el-card>
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
              <!-- 内容区域 -->
              <mavonEditor
                ref="md"
                :subfield="false"
                v-model="detail.content"
                :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :ishljs="true"
                codeStyle="atom-one-dark"
              />
              <div class="category mt-20">
                <p class="theme fw-bold fs-sm">
                  分类: <el-tag class="ml-10" type="warning">{{ detail.category }} </el-tag>
                </p>
              </div>
              <div class="tag">
                <p class="theme fw-bold fs-sm">
                  标签:
                  <span v-randomColor v-for="tag in detail.tags" :key="tag.id"> {{ tag }} </span>
                </p>
              </div>
              <!-- 评论区 -->
              <comment-list :detail="detail"></comment-list>
              <!-- </el-tab-pane>
              </el-tabs> -->
            </div>
          </el-card>
        </el-col>
      </el-row>
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
    CommentList,
  },
  watch: {
    $route() {
      this.detail = {}
      this.getDetail()
    },
  },
  async created() {
    await this.getDetail()
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
      comment_total: '',
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

    async getDetail() {
      const res = await ArticleApi.getArticleDetail(this.$route.params.id)
      this.detail = res.data
      this.userinfo = res.data.author_info
    },
    // async likeArticle() {
    //   if (this.isLikedPage) {
    //     return false
    //   }
    //   const res = await ArticleApi.likeArticle(this.$route.params.id)
    //   console.log(res)
    //   console.log('LIke Article!')
    // },
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
  .top-left {
    background: cornflowerblue;
    color: white;
    font-style: normal;
    font-size: 14px;
    position: absolute;
    padding: 4px 10px 10px 4px;
    border-radius: 0 0 30px 0;
    left: 0;
    top: 0;
    z-index: 99;
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
      .category {
        text-align: left;
        padding: 10px;
      }
      .tag {
        padding: 10px;
        text-align: left;
        span {
          border: 1px solid transparent;
          border-radius: 20px;
          padding: 2px 10px;
          margin-left: 10px;
          cursor: pointer;
          background: rgb(248, 248, 250);
        }
        span:hover {
          // font-weight: bold;
          background: rgb(231, 230, 230);
        }
      }
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
