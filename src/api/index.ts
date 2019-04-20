import request from './request'

export interface ApiConfig {
  options: {
    method?: string
  },
  url: string
}

function crearApi(config: ApiConfig) {
  // console.log(config)
  return async (data: any) => request({ ...config, data})
}


const modules = {}
const modulesConfig = {}
let req = require.context('./config/', true, /^(.*\.(js$))[^.]*$/im)
req.keys().map(key => {
  const _moduleName = key.replace('./', '').replace('.js', '')
  const obj = req(key).default
  const API = new Proxy(obj, {
    get(target, property) {
      if (property in target) {
        return crearApi(target[property])
      } else {
        throw new ReferenceError(`crearApi: ${property.toString()} does not include ${property.toString()}`);
      }
    }
  });
  return {
    [_moduleName]: API
  }
})
// req.keys().forEach(function (key) {
//   let _moduleName = key.replace('./', '').replace('.js', '')
//   let obj = req(key).default
//   let API = {}
//   let APIconfig = {}
//   Object.keys(obj).forEach(key => {
//     API[key] = crearApi(obj[key])
//     APIconfig[key] = obj[key]
//   })
//   modules[_moduleName] = API
//   modulesConfig[_moduleName] = APIconfig
// })
// export { modulesConfig }
// // console.log(modulesConfig)
// // console.log(modules)
export default modules