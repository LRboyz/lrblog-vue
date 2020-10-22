<template>
  <div class="wrapper">
    <el-row class="row-bg" :gutter="24">
      <el-col :xs="22" :md="3" :lg="3">
        <div class="nav"><Navbar /></div>
      </el-col>
      <el-col :xs="22" :md="14" :lg="14">
        <div class="main-content">
          <transition name="fade">
            <router-view :isFetching="loading" :articleList="articleList"></router-view>
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
import { mapMutations } from 'vuex'
import Navbar from '@/component/layout/navbar'
import ArticleApi from '@/model/article'
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
  },
  data() {
    return {
      // drawer: false,
      pagination: {
        currentPage: 0,
        pageSize: 10,
        pageTotal: 0,
        category_name: null,
        tag_name: null,
      },
      value: new Date(),
      aside: 0,
      scroll: 0,
      loading: false,
      isCanLoadMore: true,
      articleList: [],
      // hotArticleList: [],
      // tagList: [],
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
  mounted() {
    // this.$nextTick(function () {
    //   window.addEventListener('scroll', this.dataScroll, true)
    // })
  },
  computed: {
    category_name() {
      return this.$route.params.category_name
    },
  },
  created() {
    this.refresh()
    // console.log(this.$route.path)
  },
  methods: {
    async refresh() {
      this.pagination.currentPage = 0
      // this.any = new Date()
      await this.initData()
    },

    // 获取文章列表
    async getArticleList(params) {
      this.loading = true
      const isRestart = !params.currentPage || params.currentPage == 0
      const isLoadMore = params.currentPage && params.currentPage > 0
      const res = await ArticleApi.getArticleList({
        count: params.pageSize,
        page: params.currentPage,
        category_name: this.category_name,
      })
      this.loading = false
      if (isLoadMore) {
        // console.log('加载更多...')
        this.articleList = this.articleList.concat([...res.data])
        // this.get_article_list(this.articleList)
        this.pagination.pageTotal = res.current_total
        // console.log(this.articleList.length, this.pagination.pageTotal)
        if (this.articleList.length == this.pagination.pageTotal) {
          this.isCanLoadMore = false
        }
        console.log(this.articleList)
      } else {
        // console.log('不是加载更多了')
        this.articleList = res.data
        // console.log(this.articleList)
        // this.set_article_list(this.articleList)
      }
    },
    // 初始化数据
    async initData() {
      // await this.getCategory()
      // if (this.articleList.length == 0 && this.$route.name == 'articleList') {
      await this.getArticleList(this.pagination)
      // }
    },
    // dataScroll: function () {
    //   try {
    //     this.scroll = document.documentElement.scrollTop || document.body.scrollTop
    //     // console.log(this.scroll)
    //     this.aside =
    //       document.documentElement.scrollTop || document.body.scrollTop || document.querySelector('.is_fixed').scrollTop
    //     // console.log(this.aside)
    //   } catch (ex) {
    //     console.error(ex)
    //   }
    // },
    // 加载更多
    loadmoreArticle() {
      console.log('demo')
      this.pagination.currentPage += 1
      this.getArticleList(this.pagination)
    },
    ...mapMutations({
      set_article_list: 'SET_ARTICLE_LIST',
    }),
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .main-content {
    margin-bottom: 20px;
    flex: 1;
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
      background: rgba(152, 134, 250, 0.639);
      opacity: 0;
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
