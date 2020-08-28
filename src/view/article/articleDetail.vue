<template>
  <div class="detail-wrapper">
    <!-- <el-row :gutter="24"> -->
    <!-- <el-row :gutter="24"> -->
    <!-- <el-col :xl="18" :lg="18" :md="24" :sm="24" :xs="24"> -->
    <el-card class="box-card">
      <div class="detail-head">
        <h1 class="title fs-l fw-bold">{{ detail.title }}</h1>
        <div class="info mt-20">
          <el-tag size="small">原创</el-tag>
          <el-breadcrumb separator="/" class="ml-20">
            <el-breadcrumb-item>Admin</el-breadcrumb-item>
            <el-breadcrumb-item>
              <i class="el-icon-time fs-xs"></i>
              <span class="ml-5 fs-xs">{{ detail.pub_time }}</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <i class="el-icon-chat-line-round"></i>
              <span class="ml-5">{{ detail.commentsCount }}</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <i class="el-icon-view"></i>
              <span class="ml-5">{{ detail.views }}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>

      <el-divider />

      <div class="detail-body">
        <mavonEditor
          ref="md"
          :subfield="false"
          v-model="detail.content"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :ishljs="true"
          codeStyle="atom-one-dark"
        />
        <el-tabs value="first">
          <el-tab-pane label="作者" name="first">
            <div class="meta-list">
              <div class="user-info">
                <el-avatar :size="50" :src="user.avatar"></el-avatar>
                <div class="ml-20 fw-bold">
                  <p class="fw-bold">{{ user.nickname }}</p>
                  <p class="fs-xs mt-20">如有疑问或者希望一起交流学习，请按如下方式联系我:</p>
                  <div class="flex">
                    <el-tooltip class="item" effect="dark" content="13549128759" placement="bottom">
                      <div class="icon"><i class="iconfont icon-wechat" style="color: green;"></i></div>
                    </el-tooltip>
                    <div class="icon ml-20"><i class="iconfont icon-github"></i></div>
                    <el-tooltip class="item" effect="dark" content="603552916" placement="bottom">
                      <div class="icon ml-20"><i class="iconfont icon-qq" style="color: #3398dc;"></i></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="No Allow !" placement="bottom">
                      <div class="icon ml-20"><i class="iconfont icon-weibo" style="color: #ff0000;"></i></div>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评论区" name="two">
            评论区留言
          </el-tab-pane>
          <!-- <div class="tag-category mt-20">
            <span class="fw-bold theme">标签:</span>
            <div v-for="tag in detail.tags" :key="tag">
              <el-button size="small" round class="ml-20">{{ tag }}</el-button>
            </div>
          </div>
          <div class="tag-category mt-20">
            <span class="fw-bold theme">分类:</span>
            <el-button size="small" round class="ml-20">{{ detail.category }}</el-button>
          </div> -->
        </el-tabs>
      </div>
    </el-card>
    <!-- </el-col> -->
    <!-- <el-col :xl="6" :lg="6" :md="24" :sm="24" :xs="24" class="sidebar">
        <div>
          <el-card shadow="never">
            <div slot="header" style="text-align: left;">
              <span class="fw-bold fs-sm">
                <i class="iconfont icon-like fs-sm" style="color: red;"></i>
                猜你喜欢</span
              >
            </div>
            <div>
              <ul v-for="item in archive" :key="item + item.title" class="list">
                <li>
                  <router-link :to="`/article/${item._id}`" target="_blank"
                    >{{ item.title | filterTitle(30) }}
                  </router-link>
                  <p class="fs-xs">
                    <span> {{ item.pub_time }} </span>
                    <span class="ml-20"> 浏览:{{ item.views }} </span>
                  </p>
                </li>
              </ul>
            </div>
          </el-card>
          <div class="mt-20">
            <span class="fw-bold ml-20">分类专栏</span>
            <el-tree :data="category" @node-click="handleNodeClick" class="mt-20"></el-tree>
          </div>
        </div>
      </el-col> -->

    <!-- <el-col :xs="21" :md="7"> -->
    <!-- </el-row> -->
    <el-backtop class="lin-back-top"></el-backtop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mavonEditor } from 'mavon-editor'
import ArticleApi from '@/model/article'

export default {
  name: 'articleDetail',
  components: {
    mavonEditor,
  },

  created() {
    this.getDetail()
  },
  computed: {
    ...mapGetters(['user']),
  },
  data() {
    return {
      detail: {},
      archive: [],
      category: [],
    }
  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async getDetail() {
      const res = await ArticleApi.getArticleDetail(this.$route.params.id)
      // console.log(res)
      const sidebar = await ArticleApi.getArticleArchive()
      // eslint-disable-next-line
      this.detail = res.data[0]
      this.archive = sidebar.archive
      for (const cat in sidebar.cat_number) {
        this.category.push({
          label: `${cat} (${sidebar.cat_number[cat]})`,
        })
        // console.log(cat, sidebar.cat_number[cat])
      }
      // console.log(this.archive)
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-wrapper {
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
  // max-width: 1200px;
  // width: 100%;
  // flex-direction: row;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  .box-card {
    // max-width: 700px;
    // min-width: 800px;
    background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%),
      linear-gradient(360deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);
    background-size: 20px 20px;
    background-position: center center;
    .detail-head {
      text-align: left;
      .info {
        display: flex;
        align-items: center;
        .ml-5 {
          margin-left: 5px;
        }
      }
    }
    .detail-body {
      // margin-bottom: 20px;
      .meta-list {
        text-align: left;
        .user-info {
          display: flex;
          .icon {
            cursor: pointer;
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            border: 1px solid #eee;
          }
          .icon:hover {
            transition: 0.5s;
            transform: rotate(360deg);
            background: #eee;
          }
        }
      }
      // > .tag-category {
      //   text-align: left;
      //   display: flex;
      //   align-items: center;
      // }
    }
  }
  .sidebar {
    text-align: left;
    .list {
      color: #555555;
      font-size: 14px;
      line-height: 30px;
      p {
        color: #999999;
      }
    }
  }
  /deep/ .el-tree {
    background: transparent;
  }

  @media (max-width: 600px) {
    .detail-wrapper {
      flex-direction: column;
    }
    .box-card .el-card__body {
      margin: 10px;
      padding: 0px;
      padding-top: 20px;
    }

    .el-row {
      margin-left: 0px !important;
      margin-right: 0px !important;
    }
    .el-col-xs-24 {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
  }
}
</style>
