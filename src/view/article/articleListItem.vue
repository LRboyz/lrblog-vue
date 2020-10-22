<template>
  <div class="article-wrapper">
    <div>
      <!-- <Swiper /> -->
      <div class="swiper">
        <el-carousel trigger="click" height="200px">
          <el-carousel-item>
            <img
              src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce5bd79b739d442ea4d716fcbb301ceb~tplv-k3u1fbpfcp-zoom-1.image"
              alt=""
              srcset=""
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              src="https://user-gold-cdn.xitu.io/2020/6/29/172fdc3497423a51?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1"
              alt=""
              srcset=""
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a76eb16fa094d97a5c40d402cc6dd27~tplv-k3u1fbpfcp-watermark.webp"
              alt=""
              srcset=""
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <skeleton-paragraph v-if="loading" class="content" :lines="20" line-height="1.2em" />
      <div class="mt-20" v-else>
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
// import Swiper from '@/view/article/swiper'
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
  .swiper {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
    .el-carousel__item {
      color: #475669;
      font-size: 14px;
      // opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
  // margin: 0 20px 50px 20px;
  margin-bottom: 50px;
  .article-item {
    // margin: 0px 20px 20px 20px;
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
