<template>
  <div class="mt-20 community-wrapper">
    <el-card style="min-height: 300px;">
      <div slot="header" class="header flex">
        <i class="theme el-icon-chat-dot-round"></i>
        <span style="margin-left: 5px;" class="fw-bold">社区</span>
      </div>
      <div class="body">
        <img src="../../assets/image/blog/wxqun.png" alt="微信群" />
        <img src="../../assets/image/blog/qqun.png" alt="" srcset="" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'community',
}
</script>

<style scoped lang="scss">
.community-wrapper {
  margin-top: 20px;
  .header {
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
