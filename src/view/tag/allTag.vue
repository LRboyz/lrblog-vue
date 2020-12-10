<template>
  <div class="tag-list">
    <!-- <div class="title">全部标签</div> -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部标签" name="first">
        <div v-if="tagList.length > 0" class="pane">
          <el-card class="pane-item" v-for="(item, index) in tagList" :key="index">
            <div class="icon" :style="`background-image:url(${item.thumbnail})`" />
            <div class="theme fw-bold">{{ item.tag_name }}</div>
            <div class="desc mt-20 fs-xs">
              <span>{{ item.article_count }}篇文章</span>
              <!-- <span>? 关注</span> -->
              <span>{{ item.view_hits }} 浏览</span>
            </div>
            <router-link :to="{ path: `/tag/${item._id}` }">
              <el-button class="mt-20" @click="tagClick(item)">
                查看
              </el-button>
            </router-link>
          </el-card>
        </div>
        <skeleton-paragraph v-else class="content" :lines="5" line-height="1.2em" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ArticleApi from '@/model/article'

export default {
  name: 'Tag',
  data() {
    return {
      activeName: 'first',
      tagList: [],
      isActive: true,
    }
  },
  created() {
    this.getTagList()
  },
  methods: {
    // 获取Tag标签列表
    async getTagList() {
      const tag_list = await ArticleApi.getAllTagList({
        // count: 10,
        // page: 0,
      })
      this.tagList = tag_list.data
      console.log(this.tagList)
    },
    async tagClick(tag) {
      // console.log(tag)
      const res = await ArticleApi.clickTag(tag._id)
      console.log(res)
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-list {
  margin: 0 auto;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  min-height: calc(90vh - 200px);
  .pane {
    display: flex;
    flex-direction: row;
    // max-width: 920px;
    flex-wrap: wrap;
    .pane-item {
      display: flex;
      justify-content: center;
      width: 25%;
      padding: 1.5rem 1.2rem;
      align-items: flex-start;
      margin-right: 20px;
      margin-top: 20px;

      .icon {
        background-size: contain;
        width: 100%;
        height: 32px;
        margin: 1rem auto;
        background-color: #fff;
        background-position: 50%;
        background-repeat: no-repeat;
        position: relative;
      }
      .desc {
        line-height: 20px;
        span {
          color: #8a9aa9;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
