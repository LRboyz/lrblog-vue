<template>
  <div>
    <el-row class="row-bg" :gutter="24">
      <el-col :xs="24" :md="3">
        <div class="nav"><Navbar :categoryList="categoryList" /></div>
      </el-col>
      <el-col :xs="22" :md="14">
        <div class="main-content">
          <transition name="fade">
            <router-view></router-view>
          </transition>
          <!-- <Loading v-else /> -->
          <!--  加载更多 -->
          <div v-show="$route.path === '/index'">
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
      </el-col>
      <el-backtop class="lin-back-top"></el-backtop>
      <!-- 右侧侧边栏 -->
      <el-col :xs="22" :md="7">
        <div class="aside">
          <user-card />
          <div class="is_fixed">
            <hot-article-list :hotArticleList="hotArticleList" class="mt-20" />
            <tag-list :tagList="tagList" />
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
import CategoryApi from '@/model/category'
import HotArticleList from '@/view/article/hotArticleList'
import TagList from '@/view/tag/tagList'
import UserCard from '@/view/user/index'

export default {
  components: {
    Navbar,
    HotArticleList,
    TagList,
    UserCard,
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
      aside: 0,
      scroll: 0,
      loading: false,
      isCanLoadMore: true,
      categoryList: [],
      articleList: [],
      hotArticleList: [],
      tagList: [],
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
    this.$nextTick(function() {
      window.addEventListener('scroll', this.dataScroll, true)
    })
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
      this.any = new Date()
      await this.initData()
    },
    // 获取分类列表
    async getCategory() {
      if (this.categoryList.length > 0) return
      const res = await CategoryApi.getCategorys({
        count: 20,
        page: 0,
      })
      this.categoryList = res.data
      this.get_category_list(this.categoryList)
    },
    // 获取热门文章列表
    async gethotArticleList() {
      const hot_list = await ArticleApi.gethotArticleList()
      this.hotArticleList = hot_list.data
      // console.log(this.hot_list)
    },
    // 获取Tag标签列表
    async getTagList() {
      const tag_list = await ArticleApi.getTagList({
        page: 15,
        page: 0,
      })
      this.tagList = tag_list.data
      // console.log(this.tagList)
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
        this.get_article_list(this.articleList)
        this.pagination.pageTotal = res.current_total

        // console.log(this.articleList.length, this.pagination.pageTotal)
        if (this.articleList.length == this.pagination.pageTotal) {
          this.isCanLoadMore = false
        }
        // console.log(this.articleList)
      } else {
        // console.log('不是加载更多了')
        this.articleList = res.data
        this.get_article_list(this.articleList)
      }
    },
    // 初始化数据
    async initData() {
      console.log(this.$route)
      await this.getCategory()
      if (this.articleList.length == 0 && this.$route.name == 'articleList') {
        await this.getArticleList(this.pagination)
      }
      if (this.hotArticleList.length == 0) {
        await this.gethotArticleList()
      }
      if (this.tagList.length == 0) {
        await this.getTagList()
      }
    },
    dataScroll: function() {
      try {
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop
        // console.log(this.scroll)
        this.aside =
          document.documentElement.scrollTop || document.body.scrollTop || document.querySelector('.is_fixed').scrollTop
        // console.log(this.aside)
      } catch (ex) {
        console.error(ex)
      }
    },
    // 加载更多
    loadmoreArticle() {
      this.pagination.currentPage += 1
      this.getArticleList(this.pagination)
    },
    ...mapMutations({
      get_category_list: 'GET_CATEGORY_LIST',
      get_article_list: 'SET_ARTICLE_LIST',
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
      border: 2px solid rgba(255, 255, 255, 0.3);
      padding: 10px 30px;
      color: rgba(255, 255, 255, 0.5);
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
        color: rgb(202, 107, 107);
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
      background: rgba(255, 255, 255, 0.3);
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
      padding: 1.1em 2em;
      border-radius: 3px;
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
  @media (max-width: 980px) {
    .nav {
      display: none;
    }
  }
}
</style>
