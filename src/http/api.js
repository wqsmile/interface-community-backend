import axios from './axios'
import qs from 'querystring'

// 文档主题管理
const api = {
  // 获取主题
  getTheme: () => {
    return axios.get('/api/v1/admin/fileTheme')
  },
  // 添加主题
  addTheme: (name, description) => {
    return axios.post('/api/v1/admin/fileTheme', qs.stringify({
      name,
      description
    }))
  },
  // 修改主题
  updateTheme: (id, name, description) => {
    return axios.put('/api/v1/admin/fileTheme', qs.stringify({
      id,
      name,
      description
    }))
  },
  // 删除主题
  delTheme: id => {
    return axios.delete('/api/v1/admin/fileTheme', {
      params: {
        id
      }
    })
  }
}

export default api