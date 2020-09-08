<template>
  <div class="manage-document-content">
    <div class="add">
      <el-button type="primary" @click="showAddDialog">
        {{ addTitle }}
      </el-button>
    </div>
    <el-table :data="themeData" border style="width: 100%">
      <template
        v-for="item in tableColumns"
      >
        <el-table-column :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
      </template>
      <!-- <el-table-column prop="id" label="ID" min-width="50px"></el-table-column>
      <el-table-column prop="theme_name" label="主题名称"></el-table-column>
      <el-table-column prop="page_name" label="所属文档页"></el-table-column>
      <el-table-column prop="name" label="文档标题"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="update_time" label="更改时间"></el-table-column>
      <el-table-column prop="edit" label="操作"> -->
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
    <el-dialog custom-class="common-dialog" :fullscreen="isFullscreen" :title="switchDialog ? addOrEdit[0] : addOrEdit[1]" :visible.sync="editDialogVisible">
      <el-form :model="form">
        <!-- id -->
        <el-form-item v-if="!switchDialog" label="id" :label-width="formLabelWidth">
          <el-input
            v-model="form.id"
            autocomplete="off"
            :disabled="true"
            :placeholder="form.id"
          ></el-input>
        </el-form-item>
        <!-- 添加文章主题名称 -->
        <el-form-item v-if="artTheme.isShow" :label="artTheme.title" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <!-- 添加文章主题描述 -->
        <el-form-item v-if="artTheme.isShow" :label="artTheme.description" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
          />
        </el-form-item>
        <div class="select-theme" v-if="isSelectTheme">
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
        <div class="select-dom" v-if="isSelectDom">
          <el-form-item label="文档页名称" :label-width="formLabelWidth">
            <div class="options">
              <el-select v-model="selectDomPageId" placeholder="请选择">
                <el-option
                  v-for="item in domOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
        <el-form-item v-if="isDomTitle" label="文档标题" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <!-- 文档内容 -->
        <div class="md" v-if="isEditMd">
          <!-- <el-form-item label="文档内容" :label-width="formLabelWidth" /> -->
          <mavon-editor class="mavon-editor" :class="{'mh': switchDialog}" v-model="domContent" />
        </div>
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
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  props: {
    getData: {
      type: Function
    },
    addData: {
      type: Function
    },
    putData: {
      type: Function
    },
    deleteData: {
      type: Function
    },
    addTitle: {
      type: String,
      required: true
    },
    tableColumns: {
      type: Array,
      required: true
    },
    addOrEdit: {
      type: Array,
      required: true
    },
    isFullscreen: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object
    },
    isSelectTheme: {
      type: Boolean,
      default: false
    },
    selectThemeId: {
      
    },
    themeOptions: {
      type: Array
    },
    isSelectDom: {
      type: Boolean,
      default: false
    },
    selectDomPageId: {

    },
    domOptions: {
      type: Array
    },
    isEditMd: {
      type: Boolean,
      default: false
    },
    isDomTitle: {
      type: Boolean,
      default: false
    },
    artTheme: {
      type: Object
    }
  },
  components: {
    mavonEditor
  },
  data() {
    return {
      themeData: [],
      switchDialog: true,
      editDialogVisible: false,
      // form: {
      //   id: '',
      //   name: '',
      // },
      formLabelWidth: '120px',
      domContent: '',
      // themeOptions: '',
      // domOptions: '',
      // selectDomPageId: ''
    }
  },
  methods: {
    // 弹出编辑对话框
    showEditDialog(data) {
      console.log(data);
      this.getDomName()
      this.switchDialog = false
      this.domContent = data.content
      this.form.id = data.id
      this.selectDomPageId = data.page_id
      this.form.name = data.name
      this.editDialogVisible = true
    },
    // 提交编辑
    submitEdit() {
      // console.log(this.selectDomPageId, this.form.name, this.domContent);
      if (this.selectDomPageId === '' || this.form.name === '' || this.domContent === '') {
        alert('文档页名称和标题和文档内容不能为空')
        return
      }
      if (this.switchDialog) { // 提交添加主题
        api.addDomCon(this.selectDomPageId, this.form.name, this.domContent).then(res => {
          // console.log(res);
          if (res.errorCode === 0) {
            this.$router.go(0)
          } else {
            Message.error('添加主题失败')
          }
        })
      } else { // 提交编辑主题
        api.modifyDomCon(this.form.id, this.selectDomPageId, this.form.name, this.domContent).then(res => {
          console.log(res);
          if (res.errorCode === 0) {
            this.$router.go(0)
          } else {
            Message.error('修改主题失败')
          }
        })
      }
      this.editDialogVisible = false
    },
    // 删除主题
    deleteTheme(id) {
      MessageBox.confirm('此操作将永久删除该文档内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await api.delDomCon(id)
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
    },
    // 获取文档页标题
    getDomName() {
      api.getDomPage().then(res => {
        // console.log(res);
        this.domOptions = res.data
      })
    }
  },
  created() {
    this.getData().then(res => {
      console.log(res);
      this.themeData = res.data
    })
  }
}
</script>

<style lang="less" scoped>
.manage-document-content {
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

  .mavon-editor {
    max-height: 620px;
    min-width: 400px;
  }
  .mh {
    max-height: 680px;
  }

  .el-dialog__wrapper > .el-dialog {
    min-width: 400px;
  }
}

</style>
