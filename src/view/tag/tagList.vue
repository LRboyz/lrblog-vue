<template>
  <div class="tag-wrapper">
    <el-card style="min-height: 300px;">
      <div slot="header" class="header flex">
        <i class="icon el-icon-discount"></i>
        <span class="fw-bold" style="margin-left: 8px;">热门标签</span>
        <span style="flex: 1;"></span>
        <router-link :to="{ path: '/tag' }" target="_blank">
          <span class="theme">查看更多</span>
          <i class="theme el-icon-caret-right"></i>
        </router-link>
      </div>
      <div v-if="tagList.length > 0" class="tag-list">
        <el-tag v-for="tag in tagList" v-bind:key="tag.id" :hit="false" effect="light" type="info">
          <router-link :to="{ path: '/tag/' + `${tag.id}` }" target="_blank">
            <div alt="黑客派" class="tag-image" :style="`background-image: url('${tag.thumbnail}');`"></div>
            {{ tag.tag_name }} ({{ tag.article_count }})
          </router-link>
        </el-tag>
      </div>
      <skeleton-paragraph v-else class="content" :lines="5" line-height="1.2em" />
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import ArticleApi from '@/model/article'

export default {
  name: 'tagList',
  data() {
    return {
      tagList: [],
    }
  },
  created() {
    this.getTagList()
  },
  methods: {
    // 获取Tag标签列表
    async getTagList() {
      const tag_list = await ArticleApi.getTagList({
        count: 10,
        page: 0,
      })
      this.tagList = tag_list.data
    },
  },
}
</script>

<style scoped lang="scss">
.tag-wrapper {
  margin-top: 20px;
  .header {
    font-size: 14px;
    font-weight: bold;
    > .icon {
      color: blue;
      transform: rotate(-140deg);
    }
  }
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    // justify-content: flex-start;
    .tag-image {
      border-radius: 2px 2px 2px 2px;
      height: 16px;
      width: 16px;
      float: left;
      margin: 2px 3px 0 0;
      background-color: rgba(0, 0, 0, 0.02);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
    }

    .el-tag {
      background: rgba(255, 255, 255, 0.899);
      margin-right: 7px;
      margin-bottom: 10px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
