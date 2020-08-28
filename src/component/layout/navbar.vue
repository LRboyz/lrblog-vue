<template>
  <div class="nav-wrapper">
    <el-row class="row-bg" :gutter="20">
      <el-col :xs="24" :md="17" :lg="24">
        <ul class="nav-list ml-10" v-for="(cat, index) in categoryList" :key="cat.id">
          <li :class="{ active: category_name == cat.category_name }" @click="handleChange(index, cat.category_name)">
            <el-avatar shape="square" size="small" :src="cat.thumbnail" style="margin: 0px 15px 0 20px;"></el-avatar>
            {{ cat.category_name }}
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    category_name() {
      return this.$route.params.category_name
    },
    ...mapGetters(['categoryList']),
  },
  data() {
    return {
      isCollapse: true,
      // categoryList: [],
      isActive: -1,
    }
  },
  created() {},
  methods: {
    handleChange(index, catName) {
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
    display: flex;
    flex-direction: column;
    background: transparent;
    .active {
      transition: 0.5s;
      color: #3963bc;
      font-weight: bold;
      background-color: #ffffff;
    }
    li {
      width: 100px;
      cursor: pointer;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      height: 40px;
      font-weight: bold;
      border-radius: 8px;
      font-family: $font-family-base;
      font-size: 12px;
      line-height: 40px;
      margin: 4px 0 8px;
      padding: 0 16px 0 0px;
    }
    li:hover {
      background: #ffffff;
      color: $parent-title-color;
      transition: 0.3s ease-in-out;
      // transform: scale(1.1);
      font-weight: bold;
    }
  }
}
</style>
