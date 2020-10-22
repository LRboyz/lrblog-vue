<template>
  <!-- <div class="nav-wrapper"> -->
  <!-- <el-row class="row-bg" :gutter="20">
      <el-col :xs="24" :md="17" :lg="24"> -->
  <div class="nav-list">
    <div class="go-home">
      <i class="el-icon-menu fs-sm"></i>
      <span class="ml-10 cat_name fs-xs fw-bold">分类列表</span>
    </div>
    <div
      v-for="(cat, index) in categoryList"
      :key="cat.id"
      class="nav-item"
      :class="{ active: category_name == cat.category_name }"
      @click="handleChange(index, cat.category_name)"
    >
      <el-avatar shape="square" size="small" :src="cat.thumbnail" style="margin: 0px 15px 0 20px;"></el-avatar>
      <span class="cat_name fs-xs fw-bold">{{ cat.category_name }}</span>
    </div>
  </div>
  <!-- </el-col>
    </el-row> -->
  <!-- </div> -->
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import CategoryApi from '@/model/category'

export default {
  name: 'Navbar',
  computed: {
    category_name() {
      return this.$route.params.category_name
    },
    // ...mapGetters(['categoryList']),
  },
  data() {
    return {
      isCollapse: true,
      categoryList: [],
      isActive: -1,
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    ...mapMutations({
      set_category_list: 'SET_CATEGORY_LIST',
    }),
    // 获取分类列表
    async getCategory() {
      if (this.categoryList.length > 0) return
      const res = await CategoryApi.getCategorys({
        count: 20,
        page: 0,
      })
      this.categoryList = res.data
      // this.set_category_list(this.categoryList)
      // this.get_category_list(this.categoryList)
    },
    handleChange(index, catName) {
      this.$router.push({
        path: `/index/${catName}`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.nav-list {
  min-width: 110px;
  width: 100%;
  border-radius: 8px;
  padding-bottom: 20px;
  .go-home {
    text-align: left;
    padding: 10px;
    margin-left: 10px;
  }
  .nav-item {
    cursor: pointer;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  .nav-item:hover {
    // border-radius: 8px;
    background: rgba(211, 219, 247, 0.6);
    color: $parent-title-color;
    transition: 0.3s ease-in-out;
    // transform: scale(1.1);
    font-weight: bold;
  }
  .cat_name {
    line-height: 20px;
    text-align: left;
  }
  .active {
    transition: 0.5s;
    color: #3963bc;
    font-weight: bold;
    background: rgba(211, 219, 247, 0.6);
  }
}
@media (max-width: 980px) {
  .nav-list {
    flex-direction: column;
  }
}
</style>
