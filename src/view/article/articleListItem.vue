<template>
  <div class="article-wrapper">
    <div>
      <skeleton-paragraph v-if="loading" class="content" :lines="20" line-height="1.2em" />
      <div v-else>
        <div class="article-item" v-for="articleItem in articleList" :key="articleItem.id + articleItem.title">
          <el-card style="margin-bottom: 10px;">
            <h3 slot="header" class="title">
              <router-link :to="`/article/${articleItem.id}`">{{ articleItem.title }}</router-link>
            </h3>
            <div class="content">
              <div class="cont-left">
                <router-link :to="`/article/${articleItem.id}`">
                  <img :src="articleItem.banner" alt="" class="banner" />
                </router-link>
              </div>
              <div class="cont-right">
                <p class="fs-xs" style="min-height: 63px; color: #888888;">
                  {{ articleItem.introduction }}
                </p>
              </div>
            </div>
            <div class="item-meta fs-sm">
              <div class="date">
                <router-link :to="`/article/${articleItem.id}`">
                  <i class="iconfont icon-clock"></i>{{ articleItem.pub_time }}</router-link
                >
              </div>
              <div class="views">
                <router-link :to="`/article/${articleItem.id}`">
                  <i class="iconfont icon-eye"></i>{{ articleItem.views || 0 }}</router-link
                >
              </div>
              <div class="comments">
                <router-link :to="`/article/${articleItem.id}`">
                  <i class="iconfont icon-comment"></i>{{ articleItem.commentsCount || 0 }}</router-link
                >
              </div>
              <div class="likes">
                <router-link :to="`/article/${articleItem.id}`">
                  <i :class="isLiked(articleItem.id) ? 'isLiked' : ''" class="iconfont icon-like"></i>
                  {{ articleItem.likes || 0 }}
                </router-link>
              </div>
              <div class="category">
                <router-link :to="`/article/${articleItem.id}`">
                  <i class="el-icon-price-tag" style="transform: rotate(-50deg);"></i>
                  {{ articleItem.category }}</router-link
                >
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getJSONStorageReader } from '@/lin/util/localStorage'

const localLikesHistory = getJSONStorageReader('user_like_history')

export default {
  name: 'ArticleList',
  props: {
    loading: {
      type: Boolean,
    },
    articleList: {
      type: Array,
    },
  },
  components: {
    // Swiper,
    // Loading,
  },
  data() {
    return {
      // isLiked: false,
    }
  },
  mounted() {
    this.isLiked()
    // this.isLiked = localLikesHistory.get().pages.includes(this.article.id)
  },
  methods: {
    isLiked(id) {
      // console.log(localLikesHistory.get())
      if (localLikesHistory.get()) {
        const historyLikes = localLikesHistory.get().pages.includes(id)
        return historyLikes
      }
    },
  },
}
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.article-wrapper {
  margin-bottom: 50px;
  .article-item {
    text-align: left;
    .title {
      transition: margin 0.25s;
      a {
        line-height: 20px;
        font-weight: bold;
      }
    }
    .title:hover {
      margin-left: 10px;
      text-decoration: underline;
    }
    .content {
      display: flex;
      .cont-left {
        .banner {
          width: 120px;
          height: 70px;
          border-radius: 8px;
          flex: 0 0 auto;
          box-shadow: 3px 4px 12px 0 rgba(0, 0, 0, 0.2);
          // margin: 0 30px 0 2rem;
        }
      }
      > .cont-right {
        margin-left: 20px;
        flex: 1 1 auto;
        text-align: left;
        line-height: 20px;
      }
      @media (max-width: 680px) {
        .banner {
          display: none;
        }
        .cont-right {
          margin-left: 0px;
        }
      }
    }
    .item-meta {
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;
      // display: flex;
      a {
        line-height: 20px;
        font-size: 13px;
        margin-right: 30px;
        color: #777;
      }
      a:hover {
        text-decoration: underline;
      }
      i {
        font-size: 13px;
        margin-right: 5px;
      }
    }
  }
  .article-item:hover /deep/ .el-card {
    background: rgba(233, 233, 233, 0.7);
  }
}
.isLiked {
  color: orangered;
}
@media (min-width: 1200px) {
  .article-wrapper {
    min-width: 660px;
  }
}
</style>
