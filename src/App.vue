<template>
  <div id="app">
    <el-container>
      <el-header>
        <breath-header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <breath-aside />
        </el-aside>
        <el-main>
          <breath-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BreathHeader from '@/views/header/BreathHeader.vue'
import BreathAside from '@/views/aside/BreathAside.vue'
import BreathMain from '@/views/main/BreathMain.vue'

export default {
  name: 'app',
  components: {
    BreathHeader,
    BreathAside,
    BreathMain
  }
}
</script>

<style lang="less">
@import '~@/assets/css/reset.less';
@import '~@/assets/css/common.less';

.el-header {
  background-color: @bgColor;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background: @bgColor;
}

</style>
