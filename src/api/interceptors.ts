import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { UserModule } from '@/store/modules/user'

export const request = [
  (config: any) => {
    let { url, data } = config
    let urlArr = url.split('%')
    if (urlArr.length > 1) {
      let urlRes = urlArr.map((item: string, index: number) => index % 2 === 0 ? item : (item = data[item] || ''))
      url = urlRes.join('')
    }
    let headers = {
      'X-Session-Mode': 'header',
      'X-Session-Id': sessionStorage.getItem('X-Session-Id') || null,
      'Authorization': 'Bearer ' + sessionStorage.getItem('Authorization') || null,
      ...config.headers
    }
    // Add X-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
]

export const response = [
  (response: any) => {
    // Some example codes here:
    // code == 20000: valid
    // code == 50008: invalid token
    // code == 50012: already login in other place
    // code == 50014: token expired
    // code == 60204: account or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          UserModule.FedLogOut().then(() => {
            location.reload() // To prevent bugs from vue-router
          })
        })
      }
      return Promise.reject(new Error('error with code: ' + res.code))
    } else {
      return response.data
    }
  },
  (err: any) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权，请登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break
        case 405:
          err.message = '请求被禁止'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    Message({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
]