import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { Message } from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'
import { resetRouter } from '@/routes'
import $http from '@/api'

export interface UserData {
  token: string
  name: string
  company: string
  roles: string[]
}
export interface IUserState {
  userData: UserData
  avatar: string
}

const persistUser = {
  setUser(data: UserData) {
    sessionStorage.setItem('persistUser', JSON.stringify(data))
  },
  getUser(): UserData {
    return (
      JSON.parse(sessionStorage.getItem('persistUser') || 'null') ||
      this.getDefaultUser()
    )
  },
  getDefaultUser(): UserData {
    return {
      token: '',
      name: '',
      company: '',
      roles: []
    }
  },
  removeUser() {
    sessionStorage.removeItem('persistUser')
  }
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public userData = persistUser.getUser()
  public avatar =
    'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

  @Action({ commit: 'SET_USER_DATA' })
  public async FedLogOut() {
    removeToken()
    return persistUser.getDefaultUser()
  }

  @Action({ commit: 'SET_USER_DATA' })
  public async ResetToken() {
    removeToken()
    return persistUser.getDefaultUser()
  }

  @Action({ commit: 'SET_USER_DATA' })
  public async Login(userInfo: {
    username: string
    password: string
    userType: string
  }) {
    const data = await $http.user.login(userInfo)
    console.log(data)
    const { resCode, resData } = data
    if (resCode === 0) {
      console.log(resData)
      setToken(resData.token)
      const userData = {
        token: resData.token,
        // roles: resData.roles || ['user'],
        roles: ['admin'],
        name: resData.infoDTO.userName,
        company: resData.infoDTO.company
      }
      return userData
    } else {
      return persistUser.getDefaultUser()
    }
  }

  @Action({ commit: 'SET_USER_DATA' })
  public async LogOut() {
    console.log('登录')
    // if (getToken() === undefined) {
    //   throw Error('LogOut: token is undefined!')
    // }
    await $http.user.logout({ token: this.userData.token })
    removeToken()
    resetRouter()
    return persistUser.getDefaultUser()
  }

  @Mutation
  private SET_USER_DATA(userData: UserData) {
    persistUser.setUser(userData)
    this.userData = userData
  }
}

export const UserModule = getModule(User)
