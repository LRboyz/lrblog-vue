<template>
  <div class="wrapper">
    <el-row class="row-bg" :gutter="24">
      <el-col :xs="24" :md="3" :lg="3">
        <div><Navbar /></div>
      </el-col>
      <el-col :xs="22" :md="14" :lg="14">
        <div class="main-content">
          <div v-show="$route.path == '/index'" class="swiper">
            <el-carousel trigger="click" height="200px">
              <el-carousel-item>
                <img
                  src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce5bd79b739d442ea4d716fcbb301ceb~tplv-k3u1fbpfcp-zoom-1.image"
                  alt=""
                  srcset=""
                />
              </el-carousel-item>
              <!-- <el-carousel-item>
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
              </el-carousel-item> -->
            </el-carousel>
          </div>
          <transition name="fade">
            <router-view v-if="articleList.length > 0 && !loading" :isFetching="loading" :articleList="articleList">
            </router-view>
            <div class="fs-sm" v-if="!loading && articleList.length == 0" style="color: #777777;">
              <img src="../../assets/image/blog/nofound.png" alt="暂无文章" srcset="" />
            </div>
          </transition>
          <!-- <Loading v-else /> -->
          <!--  加载更多 -->
          <div v-show="$route.path === '/index' && !loading">
            <el-button
              class="handan-btn hover-target"
              :disabled="loading || !isCanLoadMore"
              @click="loadmoreArticle"
              :loading="loading"
            >
              <span v-if="isCanLoadMore">加载更多</span>
              <span v-else>我也是有底线的～</span>
            </el-button>
          </div>
        </div>
        <skeleton-paragraph v-show="loading" class="content" :lines="25" line-height="1.2em" />
      </el-col>
      <el-backtop class="lin-back-top"></el-backtop>
      <!-- 右侧侧边栏 -->
      <el-col :xs="22" :md="7" :lg="7">
        <div class="aside">
          <user-card />
          <div class="is_fixed">
            <hot-article-list />
            <tag-list />
            <Community />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { mapGetters } from 'vuex'
import Navbar from '@/component/layout/navbar'
import ArticleApi from '@/model/article'
import ArticleListItem from '@/view/article/articleListItem'
import HotArticleList from '@/view/article/hotArticleList'
import TagList from '@/view/tag/tagList'
import UserCard from '@/view/user/index'
import Community from '@/view/community/index'

export default {
  components: {
    Navbar,
    HotArticleList,
    TagList,
    UserCard,
    Community,
    ArticleListItem,
  },
  data() {
    return {
      pagination: {
        currentPage: 0,
        pageSize: 10,
        pageTotal: 0,
        category_name: null,
        tag_name: null,
      },
      articleList: [],
      value: new Date(),
      aside: 0,
      scroll: 0,
      loading: false,
      isCanLoadMore: true,
    }
  },
  watch: {
    $route(v) {
      // console.log(v);
      this.articleList = []
      this.isCanLoadMore = true
      this.refresh()
    },
  },
  computed: {
    category_name() {
      return this.$route.params.category_name
    },
  },
  created() {
    this.refresh()
    console.log(this.articleList)
  },
  methods: {
    async refresh() {
      this.pagination.currentPage = 0
      await this.initData()
    },

    // 获取文章列表
    async getArticleList(params, keyword) {
      this.loading = true
      const isRestart = !params.currentPage || params.currentPage == 0
      const isLoadMore = params.currentPage && params.currentPage > 0
      const res = await ArticleApi.getArticleList({
        count: params.pageSize,
        page: params.currentPage,
        category_name: this.category_name,
        keyword,
      })
      this.loading = false
      // console.log(this.$route)
      if (isLoadMore) {
        // console.log('加载更多...')
        this.articleList = this.articleList.concat([...res.data])
        // this.get_article_list(this.articleList)
        this.pagination.pageTotal = res.current_total
        // console.log(this.articleList.length, this.pagination.pageTotal)
        if (this.articleList.length == this.pagination.pageTotal) {
          this.isCanLoadMore = false
        }
      } else {
        // console.log('不是加载更多了')
        this.articleList = res.data
        // console.log(this.articleList)
      }
    },
    // 初始化数据
    async initData() {
      await this.getArticleList(this.pagination, this.$route.query.keyword)
    },
    // 加载更多
    loadmoreArticle() {
      console.log('demo')
      this.pagination.currentPage += 1
      this.getArticleList(this.pagination)
    },
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  overflow: hidden;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .nav {
    // position: fixed;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .main-content {
    margin-bottom: 20px;
    flex: 1;
    .swiper {
      margin-bottom: 20px;
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
    .handan-btn {
      border: 1px solid rgba(152, 134, 250, 0.639);
      padding: 5px 20px;
      border-radius: 30px;
      -webkit-transition: all 0.25s ease-in-out;
      -o-transition: all 0.25s ease-in-out;
      transition: all 0.25s ease-in-out;
      background-color: transparent;
      display: inline-block;
      text-align: center;
      -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      -o-transform: translate(0, 0);
      transform: translate(0, 0);
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      span {
        color: $theme;
        font-weight: bold;
      }
    }
    .handan-btn:after {
      content: '';
      position: absolute;
      z-index: -1;
      -webkit-transition: all 0.25s ease-in-out;
      -o-transition: all 0.25s ease-in-out;
      transition: all 0.25s ease-in-out;
      width: 100%;
      height: 0;
      top: 50%;
      left: 50%;
      background: rgba(69, 95, 242, 0.639);

      -webkit-transform: translateX(-50%) translateY(-50%) rotate(60deg);
      -ms-transform: translateX(-50%) translateY(-50%) rotate(60deg);
      -o-transform: translateX(-50%) translateY(-50%) rotate(60deg);
      transform: translateX(-50%) translateY(-50%) rotate(60deg);
    }
    .handan-btn:hover:after {
      height: 400%;
      opacity: 1;
    }
    .handan-btn {
      display: inline-block;
      padding: 0.9em 1.5em;
      border-radius: 30px;
      font-weight: bold;
      font-size: 0.8rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      -webkit-transition: all 250ms ease;
      transition: all 250ms ease;
    }
    .handan-btn:hover {
      color: white;
    }
    .handan-btn:hover:after {
      -webkit-animation-name: bgin;
      animation-name: bgin;
      -webkit-transform: skew(-45deg) translate(-50%);
      transform: skew(-45deg) translate(-50%);
    }
    .handan-btn:after {
      content: '';
      z-index: -1;
      width: 150%;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      -webkit-animation-name: bgout;
      animation-name: bgout;
      -webkit-animation-duration: 400ms;
      animation-duration: 400ms;
      -webkit-transform: skew(-45deg) translate(-150%);
      transform: skew(-45deg) translate(-150%);
    }
    @-webkit-keyframes bgin {
      from {
        -webkit-transform: skew(-45deg) translate(-150%);
        transform: skew(-45deg) translate(-150%);
      }
      to {
        -webkit-transform: skew(-45deg) translate(-50%);
        transform: skew(-45deg) translate(-50%);
      }
    }
    @keyframes bgin {
      from {
        -webkit-transform: skew(-45deg) translate(-150%);
        transform: skew(-45deg) translate(-150%);
      }
      to {
        -webkit-transform: skew(-45deg) translate(-50%);
        transform: skew(-45deg) translate(-50%);
      }
    }
    @-webkit-keyframes bgout {
      from {
        -webkit-transform: skew(-45deg) translate(-50%);
        transform: skew(-45deg) translate(-50%);
      }
      to {
        -webkit-transform: skew(-45deg) translate(50%);
        transform: skew(-45deg) translate(50%);
      }
    }
    @keyframes bgout {
      from {
        -webkit-transform: skew(-45deg) translate(-50%);
        transform: skew(-45deg) translate(-50%);
      }
      to {
        -webkit-transform: skew(-45deg) translate(50%);
        transform: skew(-45deg) translate(50%);
      }
    }
  }
  > .aside {
    margin-left: 20px;
    // width: 220px;
  }
  @media (max-width: 1100px) {
    .nav {
      display: none;
    }
  }
}
</style>
