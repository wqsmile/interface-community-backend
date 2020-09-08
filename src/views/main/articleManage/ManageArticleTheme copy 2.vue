<template>
  <div class="manage-article-theme">
    <common-page
      :getData="getData"
      :addData="addData"
      :putData="putData"
      :deleteData="deleteData"
      :addTitle="addTitle"
      :tableColumns="tableColumns"
      :isFullscreen="isFullscreen"
      :addOrEdit="addOrEdit"
      :form="form"
      :isSelectTheme="isSelectTheme"
      :themeOptions="themeOptions"
      :selectThemeId="selectThemeId"
      :isEditMd="isEditMd"
      :isDomTitle="isDomTitle"
      :artTheme="artTheme"
    />
  </div>
</template>

<script>
import api from '@/http/api.js'
import { Message, MessageBox } from 'element-ui'
import CommonPage from '@/components/CommonPage.vue'

export default {
  components: {
    CommonPage
  },
  data() {
    return {
      addTitle: '添加文章主题',
      tableColumns: [
        {
          prop: 'id',
          label: 'ID'
        },
        {
          prop: 'theme_name',
          label: '主题名称'
        },
        {
          prop: 'create_time',
          label: '创建时间'
        },
        {
          prop: 'update_time',
          label: '更改时间'
        }
      ],
      isFullscreen: false,
      addOrEdit: ['添加文章主题', '编辑文章主题'],
      form: {
        id: '',
        name: '',
        description: ''
      },
      isSelectTheme: false,
      themeOptions: [],
      themeData: [],
      selectThemeId: '',
      isEditMd: false,
      isDomTitle: false,
      artTheme: {
        isShow: true,
        title: '文章主题',
        description: '文章描述'
      },

      switchDialog: true,
      editDialogVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 获取数据
    getData() {
      return api.getArtTheme()
    },
    // 增加数据
    addData() {
      return api.addArtTheme()
    },
    // 修改数据
    putData() {
      return api.putArtTheme()
    },
    // 删除数据
    deleteData() {
      return api.delArtTheme()
    },
    // 弹出编辑对话框
    showEditDialog(data) {
      // console.log(data);
      this.switchDialog = false
      this.form.id = data.id
      this.form.name = data.name
      this.editDialogVisible = true
    },
    // 提交编辑
    submitEdit() {
      if (this.form.name === '' || this.form.description === '') {
        alert('主题名称或者描述不能为空')
        return
      }
      if (this.switchDialog) { // 提交添加主题
        // console.log(this.form);
        // api.addTheme(this.form.name, this.form.description).then(res => {
        //   // console.log(res);
        //   if (res.errorCode === 0) {
        //     this.$router.go(0)
        //   } else {
        //     Message.error('添加主题失败')
        //   }
        // })
      } else { // 提交编辑主题
        // api.updateTheme(this.form.id, this.form.name, this.form.description).then(res => {
        //   // console.log(res);
        //   if (res.errorCode === 0) {
        //     this.$router.go(0)
        //   } else {
        //     Message.error('修改主题失败')
        //   }
        // })
      }
      this.editDialogVisible = false
    },
    // 删除主题
    deleteTheme(id) {
      MessageBox.confirm('此操作将永久删除该文章主题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // const res = await api.delTheme(id)
        // if (res.errorCode === 0) {
        //   // Message.success('成功删除');
        //   this.$router.go(0)
        // } else {
        //   Message.error('删除失败')
        // }
      }).catch(() => {
        Message.info('已取消删除');       
      });
    },
    // 弹出添加主题的对话框
    showAddDialog() {
      this.switchDialog = true
      this.clearForm()
      this.editDialogVisible = true
    },
    // 清空表单
    clearForm() {
      for (const item in this.form) {
        this.form[item] = ''
      }
    }
  },
  created() {
    api.getArtTheme().then(res => {
      console.log(res);
      this.themeData = res.data
    })
  }
}
</script>

<style lang="less" scoped>
.manage-article-theme {
  height: 100%;

  .add {
    float: right;
    margin-bottom: 20px
  }
  .edit {
    button {
      margin: 2px 10px;
    }
  }
}

</style>
