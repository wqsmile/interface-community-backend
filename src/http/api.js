import axios from './axios'
import qs from 'querystring'

const fileTheme = '/api/v1/admin/fileTheme'
const filePage = '/api/v1/admin/filePage'
const fileContent = '/api/v1/admin/fileContent'
const talkTheme = '/api/v1/admin/talkTheme'
const talkArticle = '/api/v1/admin/talkArticle'
const manage = '/api/v1/admin/manage'

// 文档主题管理
const api = {
  // 登录
  login: (name, password) => {
    return axios.post('/api/v1/admin/login', qs.stringify({
      name,
      password
    }))
  },
  // 注销
  logout: () => {
    return axios.delete('/api/v1/admin/logout')
  },

  // 文档管理
  // 文档主题
  // 获取主题
  getTheme: () => {
    return axios.get(fileTheme)
  },
  // 添加主题
  addTheme: (name, description) => {
    return axios.post(fileTheme, qs.stringify({
      name,
      description
    }))
  },
  // 修改主题
  updateTheme: (id, name, description) => {
    return axios.put(fileTheme, qs.stringify({
      id,
      name,
      description
    }))
  },
  // 删除主题
  delTheme: id => {
    return axios.delete(fileTheme, {
      params: {
        id
      }
    })
  },

  // 文档页
  // 获取文档页面
  getDomPage: () => {
    return axios.get(filePage)
  },
  // 增加文档页
  addDomPage: (theme_id, name) => {
    return axios.post(filePage, qs.stringify({
      theme_id,
      name
    }))
  },
  // 修改文档页
  modifyDomPage: (id, theme_id, name) => {
    return axios.put(filePage, qs.stringify({
      id,
      theme_id,
      name
    }))
  },
  // 删除文档页
  delDom: id => {
    return axios.delete(filePage, {
      params: {
        id
      }
    })
  },

  // 文档内容
  // 查
  getDomCon: () => {
    return axios.get(fileContent)
  },
  // 删
  delDomCon: id => {
    return axios.delete(fileContent, {
      params: {
        id
      }
    })
  },
  // 增
  addDomCon: (page_id, name, content) => {
    return axios.post(fileContent, qs.stringify({
      page_id,
      name,
      content
    }))
  },
  // 改
  modifyDomCon: (id, page_id, name, content) => {
    return axios.put(fileContent, qs.stringify({
      id,
      page_id,
      name,
      content
    }))
  },

  // 文章管理
  // 文章主题
  // 查
  getArtTheme: () => {
    return axios.get(talkTheme)
  },
  // 增
  addArtTheme: (theme_name, description) => {
    return axios.post(talkTheme, qs.stringify({
      theme_name,
      description
    }))
  },
  // 改
  modifyArtTheme: (id, theme_name, description) => {
    return axios.put(talkTheme, qs.stringify({
      id,
      theme_name,
      description
    }))
  },
  // 删
  delArtTheme: id => {
    return axios.delete(talkTheme, {
      params: {
        id
      }
    })
  },

  // 文章内容管理
  // 查
  getArt: (title = '') => {
    return axios.get(talkArticle, {
      params: {
        title
      }
    })
  },
  // 改
  modifyArt: (id, status) => {
    return axios.put(talkArticle, qs.stringify({
      id,
      status
    }))
  },
  // 删
  delArt: id => {
    return axios.delete(talkArticle, {
      params: {
        id
      }
    })
  },

  // 管理员
  // 查
  getAdmin: () => {
    return axios.get(manage)
  },
  // 增
  addAdmin: (name, password, level) => {
    return axios.post(manage, qs.stringify({
      name,
      password,
      level
    }))
  },
  // 删
  delAdmin: id => {
    return axios.delete(manage, {
      params: {
        id
      }
    })
  },
  // 查
  // getAdmin: () => {
  //   return axios.get(manage)
  // },
}

export default api