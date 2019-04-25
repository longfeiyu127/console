import { Message, MessageBox } from 'element-ui'
import { stringify } from 'qs'
import { getToken } from '@/utils/auth'
import { UserModule } from '@/store/modules/user'

const methods = ['post', 'put', 'patch']

const urlPlaceholder = /\$\{\w+\}/
function format(str: string, obj: any) {
  console.log(obj)
  Object.keys(obj).map((key: string) => {
    str = str.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), obj[key])
  })
  return str
}

export const request = [
  (config: any): Object => {
    let { url, data, method = 'GET' } = config
    if (urlPlaceholder.test(url)) {
      url = format(url, data)
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
    const dataName = method && methods.includes(method.toLowerCase()) ? 'data' : 'params'
    return {
      url,
      [dataName]: data,
      paramsSerializer(params: object) {
        // 对 params 进行任意转换处理
        // console.log(params)
        return stringify(params)
      },
      transformRequest: [(data: any) => {
        // 对 data 进行任意转换处理
        // console.log(data)
        return JSON.stringify(data)
      }],
      method,
      headers
    }
  },
  (error: any) => {
    console.log(error)
    return Promise.reject(error)
  }
]

export const response = [
  (response: any) => {
    // Some example codes here:
    // resCode == 20000: valid
    // resCode == 50008: invalid token
    // resCode == 50012: already login in other place
    // resCode == 50014: token expired
    // resCode == 60204: account or password is incorrect
    // You can change this part for your own usage.
    const res = JSON.parse(response.data)
    // console.log(response)
    // console.log(res)
    // console.log(res.resCode)
    if (res.resCode !== 0 && !response.config.headers.hideMsg) {
      Message({
        message: `error with resCode: ${res.resMsg}`,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.resCode === 401) {
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
      console.log(res.resMsg)
      // new Error(`error with resCode: ${res.resMsg}`)
      // return Promise.reject(`error with resCode: ${res.resMsg}`)
      return res
    } else {
      return res
    }
  },
  (err: any) => {
    console.log('err', err)
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
