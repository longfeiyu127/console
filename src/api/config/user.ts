export default {
  login: {
    options: {
      method: 'POST'
    },
    url: '/ols/app/login'
  },
  logout: {
    options: {
      method: 'POST'
    },
    url: '/ols/app/logout'
  },
  signup: {
    options: {
      method: 'POST'
    },
    url: '/ols/app/signup'
  },
  token: {
    url: '/ols/app/token/status'
  },
  setPassWord: {
    options: {
      method: 'POST'
    },
    url: '/ols/app/accounts/%accountName%/password'
  },
  status: {
    url: '/ols/app/accounts/%accountName%/status'
  },
  isset: {
    url: '/ols/app/accounts/password/isset'
  },
  modifyPassword: {
    options: {
      method: 'POST'
    },
    url: '/ols/app/accounts/password'
  },
  validation: {
    url: '/ols/app/accounts/%accountName%/validation'
  },
  idTypes: {
    url: '/ols/v2/policy/idTypes'
  },
  isBaseinfo: {
    url: '/ols/app/accounts/baseinfo'
  },
  baseinfo: {
    options: {
      method: 'POST'
    },
    url: '/ols/app/accounts/baseinfo'
  },
  checkUser: {
    options: {
      method: 'POST',
      contentType: 'json'
    },
    url: '/ols/mobile/claim/checkUser'
  },
  setMobile: {
    options: {
      method: 'POST'
    },
    url: '/ols/app/accounts/mobile'
  },
  getVIP: {
    url: '/ols/vip/info'
  },
  clientNo: {
    url: '/ols/app/user/clientNo'
  },
  getWxAccounts: {
    url: '/ols/app/accounts/%openType%'
  },
  delWxAccounts: {
    options: {
      method: 'DELETE'
    },
    url: '/ols/app/accounts/%openType%'
  },
  // 查询待支付订单
  waitForPay: {
    url: '/ols/order/waitForPay/%pageNum%/%pageSize%'
  },
  // 查询已支付但未生效订单
  paidNoEffect: {
    url: '/ols/order/paidNoEffect/%pageNum%/%pageSize%'
  }
}