<template>
  <div class="manage-manager">
    <div class="add">
      <el-button type="primary" @click="showAddDialog">添加管理员</el-button>
    </div>
    <el-table :data="themeData" border style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="50px"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="edit" label="操作">
        <template v-slot="scope">
          <el-row class="edit">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            >找回密码</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteTheme(scope.row.id)"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑主题的对话框 -->
    <el-dialog :title="switchDialog ? '添加管理员' : '找回管理员密码'" :visible.sync="editDialogVisible">
      <el-form :model="form">
        <el-form-item v-if="!switchDialog" label="id" :label-width="formLabelWidth">
          <el-input
            v-model="form.id"
            autocomplete="off"
            :disabled="true"
            :placeholder="form.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
          >{{ switchDialog ? '' : form.name }}</el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/http/api.js'
import { Message, MessageBox } from 'element-ui'

export default {
  data() {
    return {
      themeData: [
        {
          id: 1,
          name: 'wq',
          create_time: '2020-08-10',
        }
      ],
      switchDialog: true,
      editDialogVisible: false,
      form: {
        id: '',
        name: '',
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
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
      MessageBox.confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
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
    // api.getTheme().then(res => {
    //   // console.log(res);
    //   this.themeData = res.data
    // })
  }
}
</script>

<style lang="less" scoped>
.manage-manager {
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
