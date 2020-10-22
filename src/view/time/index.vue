<template>
  <div class="time">
    <div class="top">
      <h1 class="title fw-bold fs-xl">
        <i class="el-icon-video-camera-solid"></i>
        时光的河入海流
      </h1>
      <i class="desc"></i>
      <span><i class="fs-sm iconfont icon-user"></i> LRboy </span>
      <span><i class="fs-sm iconfont icon-eye"></i> 1233 </span>
      <span><i class="fs-xs iconfont icon-clock"></i> 2020-10-06 12:50</span>
    </div>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top" :color="color">
        <el-card class="card">
          <h4>今天去了西藏， 看到了可爱的小野马，真的很可爱</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top" :color="color">
        <el-card class="card">
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top" :color="color">
        <el-card class="card">
          <h4>LRblog 第一个版本上线</h4>
          <p>LRboy 提交于 2020/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#3963BC',
    }
  },
}
</script>

<style lang="scss" scoped>
.time {
  width: 80%;
  opacity: 0.9;
  text-align: left;
  .top {
    margin-bottom: 30px;
    .title {
      color: #000;
      padding: 10px 0;
    }
    .desc {
      display: block;
      width: 100%;
      height: 1px;
      background: #ccc;
      margin-bottom: 10px;
    }
    span {
      font-size: 12px;
      margin-right: 20px;
    }
  }
  .card {
    line-height: 20px;
    p {
      margin-top: 20px;
      color: rgb(167, 167, 167);
    }
  }
}
/deep/ .el-timeline-item__tail {
  border-left: 2px solid rgb(124, 209, 235);
}
</style>
