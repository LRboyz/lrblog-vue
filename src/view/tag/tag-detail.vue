<template>
  <div class="tag-detail">
    <el-card>
      <div>
        <!-- {{ tagInfo }} -->
        <div class="thumb" :style="`background-image:url(${tagInfo.thumbnail})`"></div>
        <h2 class="fw-bold">{{ tagInfo.tag_name }}</h2>
        <div class="text mt-20 fs-xs">
          <span>{{ tagInfo.article_count }} 篇文章</span>
          <span>{{ tagInfo.view_hits }}浏览</span>
          <span>{{ tagInfo.pub_time }}</span>
        </div>
      </div>
    </el-card>
    <el-card class="mt-20">
      <article-item v-if="articleList.length > 0" :articleList="articleList"></article-item>
      <div v-else class="nofound fs-sm">
        <img src="../../assets/image/blog/nofound.png" alt="暂无文章" srcset="" />
      </div>
    </el-card>
  </div>
</template>

<script>
import ArticleApi from '@/model/article'
import ArticleItem from '@/view/article/articleListItem'

export default {
  name: 'tagDetail',
  components: {
    ArticleItem,
  },
  computed: {
    tag_id() {
      return this.$route.params.id
    },
  },
  data() {
    return {
      tagInfo: {},
      articleList: [],
    }
  },
  created() {
    this.getTagInfo()
    // this.getArticleList()
  },
  methods: {
    async getTagInfo() {
      const res = await ArticleApi.getTagInfo(this.tag_id)
      this.tagInfo = res.data
      await this.getArticleList(this.tagInfo)
    },
    // 根据标签名查找对应文章
    async getArticleList(params) {
      console.log(this.tagInfo)
      const res = await ArticleApi.getArticleList({
        tag_name: params.tag_name,
        page: 0,
        count: 6,
      })
      this.articleList = res.data
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-detail {
  margin: 0 auto;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  min-height: calc(90vh - 200px);
  .thumb {
    background-size: contain;
    width: 100px;
    height: 32px;
    margin: 1rem auto;
    background-color: #fff;
    background-position: 50%;
    background-repeat: no-repeat;
    position: relative;
  }
  .text {
    color: #777777;
    span {
      margin-right: 15px;
    }
  }
  .nofound {
    color: #777777;
  }
}
</style>
