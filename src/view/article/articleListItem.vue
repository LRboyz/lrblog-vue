<template>
  <div class="article-wrapper">
    <div class="article-item">
      <el-card shadow="hover">
        <h3 slot="header" class="title">
          <router-link :to="`/article/${articleItem.id}`">{{ articleItem.title }}</router-link>
        </h3>
        <div class="content">
          <div class="cont-left">
            <p class="fs-sm" style="min-height: 63px;">
              {{ articleItem.introduction }}
            </p>
            <div class="item-meta fs-sm">
              <div class="date">
                <i class="iconfont icon-clock"></i>
                <span>{{ articleItem.pub_time }}</span>
              </div>
              <div class="views r">
                <i class="iconfont icon-eye"></i>
                <span>{{ articleItem.views || 0 }}</span>
              </div>
              <div class="comments">
                <i class="iconfont icon-comment"></i>
                <span>{{ articleItem.commentsCount || 0 }}</span>
              </div>
              <div class="likes">
                <i class="iconfont icon-like"></i>
                <span>{{ articleItem.likes || 0 }}</span>
              </div>
              <div class="category">
                <i class="iconfont icon-code"></i>
                <span> {{ articleItem.category }}</span>
              </div>
            </div>
          </div>
          <div class="cont-right">
            <router-link :to="`/article/${articleItem.id}`">
              <img :src="articleItem.banner" alt="" class="banner" />
            </router-link>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    articleItem: {
      type: Object,
    },
    // loading: {
    //   type: Boolean,
    // },
    // isCanLoadMore: {
    //   type: Boolean,
    // },
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.article-wrapper {
  margin-bottom: 50px;
  .article-item {
    margin-bottom: 20px;
    text-align: left;
    .title {
      // margin-bottom: 20px;
      transition: margin 0.25s;
      a {
        font-weight: bold;
      }
    }
    .title:hover {
      margin-left: 10px;
      text-decoration: underline;
    }
    .content {
      display: flex;
      > .cont-left {
        flex: 1 1 auto;
        text-align: left;
        line-height: 20px;
        .item-meta {
          margin-top: 15px;
          display: flex;
          span {
            font-size: 13px;
            margin-right: 30px;
            color: #777;
          }
          i {
            font-size: 13px;
            margin-right: 5px;
          }
        }
      }
      > .cont-right {
        margin-left: 10px;
        // background: red;
        .banner {
          width: 150px;
          height: 100px;
          border-radius: 8px;
          flex: 0 0 auto;
          // margin: 0 30px 0 2rem;
        }
      }
    }
  }

  .article-item:hover /deep/ .el-card {
    background: rgba(233, 233, 233, 0.5);
  }
}
</style>
