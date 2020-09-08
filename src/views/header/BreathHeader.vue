<template>
  <div class="breath-header">
    <h1>breath 后台管理系统</h1>
    <div class="logout" @click="logout">注销</div>
  </div>
</template>

<script>
import api from '@/http/api.js'
import cookie from '@/utils/cookie.js'
import { MessageBox, Message } from 'element-ui'

export default {
  methods: {
    logout() {
      MessageBox.confirm('此操作将注销本次登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Message.success({
            message: '注销成功!'
          });
          api.logout().then(res => {
          console.log(res);
          if (res.errorCode === 0) {
            cookie.remove('administrator')
            localStorage.removeItem('administrator')
            this.$router.push('/login')
          }
      })
        }).catch(() => {
          Message.info({
            message: '已取消注销'
          });          
        });

    }
  }  
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';

.breath-header {
  display: flex;
  justify-content: space-between;

  .logout {
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}

</style>
