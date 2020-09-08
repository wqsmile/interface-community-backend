import axios from 'axios'
import cookie from '@/utils/cookie.js'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://breath.host' : '/api'

axios.interceptors.response.use(res => {
  // console.log(res);
  if (res.status === 200) {
    return res.data
  }

  return res
}, err => {
  if (err.response) {
    console.log('响应时错误');
  } else if (err.request) {
    console.log('请求时错误');
  }
  return Promise.reject(err)
})

axios.interceptors.request.use(req => {
  // console.log(req);
  const administrator = cookie.get('administrator')
  req.headers = {
    ...req.headers,
    administrator
  }

  return req
}, err => {
  return Promise.reject(err)
})

export default axios