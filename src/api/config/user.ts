export default {
  login: {
    method: 'POST',
    url: '/olsc/user/access/login'
  },
  logout: {
    method: 'POST',
    url: '/olsc/user/access/logout'
  },
  getUsers: {
    url: '/olsc/user'
  },
  updateUser: {
    method: 'POST',
    url: '/olsc/user/update'
  }
}
