<template>
  <div class="manage-document-page">
    <div class="add">
      <el-button type="primary" @click="showAddDialog">添加文档页</el-button>
    </div>
    <el-table :data="themeData" border style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="50px"></el-table-column>
      <el-table-column prop="theme.name" label="主题名称"></el-table-column>
      <el-table-column prop="name" label="文档页名称"></el-table-column>
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
            ></el-button>
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
    <el-dialog :title="switchDialog ? '添加文档页' : '编辑文档页'" :visible.sync="editDialogVisible">
      <el-form :model="form">
        <el-form-item v-if="!switchDialog" label="id" :label-width="formLabelWidth">
          <el-input
            v-model="form.id"
            autocomplete="off"
            :disabled="true"
            :placeholder="form.id"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item v-if="!switchDialog" label="主题名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.theme_name"
            autocomplete="off"
          />
        </el-form-item> -->
        <div class="select-theme">
          <el-form-item label="主题名称" :label-width="formLabelWidth">
            <div class="options">
              <el-select v-model="selectThemeId" placeholder="请选择">
                <el-option
                  v-for="item in themeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>

        <el-form-item label="文档页名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
          <!-- {{ switchDialog ? '' : form.name }}</el-input> -->
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
      themeData: [],
      switchDialog: true,
      editDialogVisible: false,
      form: {
        id: '',
        name: '',
        theme_name: '',
        page_id: '',
        content: ''
      },
      formLabelWidth: '120px',
      themeOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selectThemeId: ''
    }
  },
  methods: {
    // 弹出编辑对话框
    showEditDialog(data) {
      // console.log(data);
      this.getThemeOptions()
      this.selectThemeId = data.theme.id
      this.switchDialog = false
      this.form.id = data.id
      this.form.theme_name = data.theme.name
      this.form.theme_id = data.theme.id
      this.form.name = data.name
      this.editDialogVisible = true
    },
    // 提交编辑
    submitEdit() {

      if (this.switchDialog) { // 提交添加
        if (this.selectThemeId === '' || this.form.name === '') {
          alert('所属主题名称和文档页名称不能为空')
          return
        }
        // console.log(this.form);
        api.addDomPage(this.selectThemeId, this.form.name).then(res => {
          // console.log(res);
          if (res.errorCode === 0) {
            this.$router.go(0)
          } else {
            Message.error('添加文档页失败')
          }
        })
      } else { // 提交编辑
        if (this.form.name === '' || this.form.theme_name === '') {
          alert('主题名称和文档页名称不能为空')
          return
        }
        api.modifyDomPage(this.form.id, this.form.theme_id, this.form.name).then(res => {
          // console.log(res);
          if (res.errorCode === 0) {
            this.$router.go(0)
          } else {
            Message.error('修改文档页失败')
          }
        })
      }
      this.editDialogVisible = false
    },
    // 删除主题
    deleteTheme(id) {
      MessageBox.confirm('此操作将永久删除该文档页, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // console.log(id);
        const res = await api.delDom(id)
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
      this.getThemeOptions()
      this.switchDialog = true
      this.clearForm()
      this.editDialogVisible = true
    },
    // 清空表单
    clearForm() {
      for (const item in this.form) {
        this.form[item] = ''
      }
    },
    // 获取主题名称
    getThemeOptions() {
      api.getTheme().then(res => {
        // console.log(res);
        this.themeOptions = res.data
      })
    }
  },
  created() {
    api.getDomPage().then(res => {
      // console.log(res);
      this.themeData = res.data
    })
  }
}
</script>

<style lang="less" scoped>
.manage-document-page {
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

  .select-theme {
    // display: flex;
    // align-items: center;
    // text-align: center;
    // .options {
    //   .el-select {
    //     max-width: 517.5px;
    //   }
    // }
  }
}

</style>
