import InterceptorManager from './InterceptorManager'

class Fetch {
  constructor(instanceConfig: Object) {
    this.defaults = instanceConfig
  }
  public defaults = {}
  public interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };

  public async request(url: string, config: any = {}) {
    if(!config.method){
      config.method = 'GET'
    }

    this.interceptors.request.forEach((cb: Function) => config = cb(config))
    //发起fetch请求，fetch请求的形参是接收上层函数的形参

    return new Promise((resolve, reject) => {
      this.interceptors.request.forEach((cb: Function) => config = cb(config))
      //发起fetch请求，fetch请求的形参是接收上层函数的形参
      fetch(url, config).then(res => {
        this.interceptors.response.forEach((cb: Function) => res = cb(res))
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })

  }
}

export default Fetch
