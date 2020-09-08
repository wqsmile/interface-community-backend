<template>
  <div class="breath-aside">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio :label="false" border>展开</el-radio>
      <br :class="{'isBr': !isCollapse}"> 
      <el-radio border :label="true">收起</el-radio>
    </el-radio-group> -->
    <el-button class="aside-btn iconfont" :class="{'icon-shouqi' : isCollapse, 'icon-zhankai': !isCollapse}" size="medium"  @click="isCollapse = !isCollapse"></el-button>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <el-submenu index="manageTheme">
        <template slot="title">
          <i class="iconfont icon-wendangguanli"></i>
          <span slot="title">文档管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="manageTheme" >主题管理</el-menu-item>
          <el-menu-item index="manageDocumentPage">文档页管理</el-menu-item>
          <el-menu-item index="manageDocumentContent">文档内容管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="manageArticleTheme">
        <template slot="title">
          <i class="iconfont icon-wenzhangguanli"></i>
          <span slot="title">文章管理 </span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="manageArticleTheme">文章主题管理</el-menu-item>
          <el-menu-item index="manageArticle">文章管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="manageManager">
        <i class="iconfont icon-guanliyuan"></i>
        <span slot="title">管理员管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import '@/assets/css/font.css'

export default {
  data() {
    return {
      isCollapse: false,
      isCollapseContent: ['展开', '收起']
    };
  },
  methods: {
    // toManageTheme() {
    //   console.log(123);
    //   this.$router.push('/manageTheme')
    // },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      this.$router.replace(`/${key}`).catch(err => {
        // console.log(err);
      })
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/common.less";

.breath-aside {
  .iconfont {
    margin-right: 5px;
  }

  .aside-btn {
    width: 65px;
    text-align: center;
  }

}
</style>
