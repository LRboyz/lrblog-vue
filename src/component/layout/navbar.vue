<template>
  <div class="nav-wrapper">
    <ul class="nav-list">
      <li
        v-for="(cat, index) in categoryList"
        :key="cat.id"
        :class="{ active: category_name == cat.category_name }"
        @click="handleChange(index, cat.category_name)"
      >
        <el-avatar shape="square" size="small" :src="cat.thumbnail" style="margin: 0px 15px 0 20px;"></el-avatar>
        <!-- :href="`/category/${cat.category_name}`" -->
        {{ cat.category_name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    categoryList: {
      type: Array,
    },
  },
  computed: {
    category_name() {
      return this.$route.params.category_name
    },
  },
  data() {
    return {
      isCollapse: true,
      // categoryList: [],
      isActive: -1,
    }
  },
  created() {
    // this.getCategory()
  },
  methods: {
    handleChange(index, catName) {
      // console.log(this.category_name)
      // console.log(this.$route)
      // this.isActive = index
      this.$router.push({
        path: `/index/${catName}`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.nav-wrapper {
  .nav-list {
    width: 130px;
    position: fixed;
    margin: 0;
    padding: 0;
    .active {
      transition: 0.5s;
      color: #3963bc;
      font-weight: bold;
      background-color: #ffffff;
    }
    li {
      cursor: pointer;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 40px;
      border-radius: 8px;
      font-family: $font-family-base;
      font-size: 14px;
      line-height: 40px;
      margin: 4px 0 8px;
      padding: 0 16px 0 0px;
    }
    li:hover {
      background: #ffffff;
      color: $parent-title-color;
      transition: 0.3s ease-in-out;
      transform: scale(1.1);
      font-weight: bold;
    }
  }
  /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
  }
}
</style>
