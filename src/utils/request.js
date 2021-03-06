import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
import { getAdminToken, getAdminUserId } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 接口地址
  // withCredentials: true, // 跨域请求时发送Cookie
  timeout: 60000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 发送请求之前
    if (store.getters.adminToken) {
      // 让每个请求头部带上AdminToken、AdminUserId
      config.headers['AdminToken'] = getAdminToken()
      config.headers['AdminUserId'] = getAdminUserId()
    }
    return config
  },
  error => {
    // 请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 通过接口返回码确定返回状态
   * 还可以通过HTTP状态代码来判断请求状态
   */
  response => {
    // 响应数据
    const res = response.data

    // 返回码200：成功
    if (res.code === 200) {
      return res
    } else {
      // 返回码401：AdminToken无效
      if (res.code === 401) {
        MessageBox.confirm(res.msg, '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetAdminToken').then(() => {
            location.reload()
          })
        }).catch(() => {})
      } else {
        Message({
          showClose: true,
          message: res.msg || 'Server error',
          type: 'error',
          duration: 5000
        })
      }
      return Promise.reject(new Error(res.msg || 'Server error'))
    }
  },
  error => {
    // 响应错误
    Message({
      showClose: true,
      message: error.message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
