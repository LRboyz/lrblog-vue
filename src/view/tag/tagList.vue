<template>
  <div class="tag-wrapper">
    <el-card style="min-height: 300px;">
      <div slot="header" class="header">
        <i class="icon el-icon-discount" style="margin-right: 5px;"></i>
        热门标签
      </div>
      <div class="tag-list">
        <el-tag v-for="tag in tagList" v-bind:key="tag.id" :hit="false" effect="light" type="info">
          <router-link :to="{ path: '/tag/' + `${tag.id}` }" target="_blank">
            <div alt="黑客派" class="tag-image" :style="`background-image: url('${tag.thumbnail}');`"></div>
            {{ tag.tag_name }} ({{ tag.article_count }})
          </router-link>
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'tagList',
  props: {
    tagList: {
      type: Array,
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
