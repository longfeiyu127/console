export default {
  login: {
    method: 'POST',
    url: '/olsc/user/login'
  },
  logout: {
    method: 'POST',
    url: '/olsc/user/logout'
  },
  signup: {
    method: 'POST',
    url: '/ols/app/signup'
  },
  token: {
    url: '/ols/app/token/status'
  },
  setPassWord: {
    method: 'POST',
    url: '/ols/app/accounts/${accountName}/password'
  },
  status: {
    url: '/ols/app/accounts/${accountName}/status'
  },
  isset: {
    url: '/ols/app/accounts/password/isset'
  },
  modifyPassword: {
    method: 'POST',
    url: '/ols/app/accounts/password'
  },
  validation: {
    url: '/ols/app/accounts/${accountName}/validation'
  },
  idTypes: {
    url: '/ols/v2/policy/idTypes'
  },
  isBaseinfo: {
    url: '/ols/app/accounts/baseinfo'
  },
  baseinfo: {
    method: 'POST',
    url: '/ols/app/accounts/baseinfo'
  },
  checkUser: {
    method: 'POST',
    headers: {
      'Content-Type': 'json'
    },
    url: '/ols/mobile/claim/checkUser'
  },
  setMobile: {
    method: 'POST',
    url: '/ols/app/accounts/mobile'
  },
  getVIP: {
    url: '/ols/vip/info'
  },
  clientNo: {
    url: '/ols/app/user/clientNo'
  },
  getWxAccounts: {
    url: '/ols/app/accounts/${openType}'
  },
  delWxAccounts: {
    method: 'DELETE',
    url: '/ols/app/accounts/${openType}'
  },
  // 查询待支付订单
  waitForPay: {
    url: '/ols/order/waitForPay/${pageNum}/${pageSize}'
  },
  // 查询已支付但未生效订单
  paidNoEffect: {
    url: '/ols/order/paidNoEffect/${pageNum}/${pageSize}'
  }
}
