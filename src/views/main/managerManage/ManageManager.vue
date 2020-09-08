<template>
  <div class="manage-manager">
    <div class="add">
      <el-button type="primary" @click="showAddDialog">添加管理员</el-button>
    </div>
    <el-table :data="themeData" border style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="50px"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="level" label="级别"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="update_time" label="更改时间"></el-table-column>
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
      <el-form :model="form" status-icon :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item v-if="!switchDialog" label="id" :label-width="formLabelWidth">
          <el-input
            v-model="form.id"
            autocomplete="off"
            :disabled="true"
            :placeholder="form.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员名称" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="管理员密码" :label-width="formLabelWidth" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="rePassword">
          <el-input
            type="password"
            v-model="form.rePassword"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="管理员等级" :label-width="formLabelWidth">
          <el-select v-model="adminLevel" placeholder="请选择">
            <el-option
              v-for="item in selectLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
    var validateName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入管理员名称'));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.rePassword !== '') {
          this.$refs.form.validateField('rePassword');
        }
        callback();
      }
    };
    var validateRePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (this.form.rePassword !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
      
    };
    return {
      themeData: [],
      switchDialog: true,
      editDialogVisible: false,
      form: {
        id: '',
        name: '',
        password: '',
        rePassword: ''
      },
      formLabelWidth: '120px',
      adminLevel: 0,
      selectLevel: [
        {
          label: 0,
          value: 0
        },
        {
          label: 1,
          value: 1
        },
        {
          label: 2,
          value: 2
        },
      ],
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        rePassword: [{ validator: validateRePass, trigger: 'blur' }],
        name: [{ validator: validateName, trigger: 'blur' }],
      }
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

      if (this.switchDialog) { // 提交添加主题
        if (this.form.name === '' || this.form.password === '' || this.form.rePassword === '') {
          Message.warning('名称和密码不能为空')
          return
        } else if (this.form.password !== this.form.rePassword) {
          Message.warning('密码不一致')
          return
        }
        console.log(this.form);
        api.addAdmin(this.form.name, this.form.password, this.adminLevel).then(res => {
          console.log(res);
          if (res.errorCode === 0) {
            this.$router.go(0)
          } else {
            Message.error('添加管理员失败')
          }
        })
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
        const res = await api.delAdmin(id)
        // console.log(res);
        if (res.errorCode === 0) {
          // Message.success('成功删除');
          this.$router.go(0)
        } else {
          Message.error('删除失败')
        }
      }).catch(() => {
        Message.info('已取消删除');       
      });
    },
    // 弹出添加主题的对话框
    showAddDialog() {
      this.switchDialog = true
      this.clearForm()
      this.adminLevel = 0
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
    api.getAdmin().then(res => {
      // console.log(res);
      this.themeData = res
    })
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
