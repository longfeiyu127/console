import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
import roleAPI from './role/index'
import { param2Obj } from './utils'

// User
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/info/, 'get', userAPI.getUserInfo)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list)

Mock.mock(/\/ols\/mobile/, 'post', tableAPI.list)

Mock.mock(/\/article\/list/, 'get', tableAPI.article)

const mocks = [
  // ...userAPI,
  // ...tableAPI
  ...roleAPI
]

// export function mockXHR() {
//   // mock patch
//   // https://github.com/nuysoft/Mock/issues/300
//   Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
//   Mock.XHR.prototype.send = function() {
//     if (this.custom.xhr) {
//       this.custom.xhr.withCredentials = this.withCredentials || false

//       if (this.responseType) {
//         this.custom.xhr.responseType = this.responseType
//       }
//     }
//     this.proxy_send(...arguments)
//   }

//   function XHR2ExpressReqWrap(respond: any) {
//     return function(options: any) {
//       let result = null
//       if (respond instanceof Function) {
//         const { body, type, url } = options
//         // https://expressjs.com/en/4x/api.html#req
//         result = respond({
//           method: type,
//           body: JSON.parse(body),
//           query: param2Obj(url)
//         })
//       } else {
//         result = respond
//       }
//       return Mock.mock(result)
//     }
//   }

//   for (const i of mocks) {
//     console.log(i)
//     Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
//   }
// }

// for mock server
const responseFake = (url: string, type = 'get', respond: any) => {
  const res = {
    url: new RegExp(`${url}`),
    type: type || 'get',
    response: respond
  }
  // console.log(res.url)
  Mock.mock(res.url, res.type || 'get', res.response)
  return res
}

mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})

// export default mocks.map(route => {
//   return responseFake(route.url, route.type, route.response)
// })