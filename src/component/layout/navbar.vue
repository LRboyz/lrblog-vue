<template>
  <!-- <div class="nav-wrapper"> -->
  <!-- <el-row class="row-bg" :gutter="20">
      <el-col :xs="24" :md="17" :lg="24"> -->
  <div class="nav-list">
    <div
      v-for="(cat, index) in categoryList"
      :key="cat.id"
      class="nav-item"
      :class="{ active: category_name == cat.category_name }"
      @click="handleChange(index, cat.category_name)"
    >
      <el-avatar shape="square" size="small" :src="cat.thumbnail" style="margin: 0px 15px 0 20px;"></el-avatar>
      <span class="fs-xs fw-bold">{{ cat.category_name }}</span>
    </div>
  </div>
  <!-- </el-col>
    </el-row> -->
  <!-- </div> -->
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
.nav-list {
  min-width: 110px;
  width: 100%;
  border-radius: 8px;
  // border: 2px solid rgb(134, 160, 245);

  padding-bottom: 20px;
  // display: flex;
  // position: fixed;
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
