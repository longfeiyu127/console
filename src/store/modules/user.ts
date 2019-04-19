import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'
import { resetRouter } from '@/routes'

export interface IUserState {
  token: string
  name: string
  avatar: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = ''
  public name = ''
  public avatar = ''
  public roles = []

  @Action({ commit: 'SET_TOKEN' })
  public async Login(userInfo: { username: string; password: string }) {
    const username = userInfo.username.trim()
    const { data } = await login(username, userInfo.password)
    setToken(data.token)
    return data.token
  }

  @Action({ commit: 'SET_TOKEN' })
  public async FedLogOut() {
    removeToken()
    return ''
  }

  // @Action({ commit: 'SET_TOKEN' })
  // public async ResetToken({ commit }: any) {
  //   return new Promise(resolve => {
  //     commit('SET_TOKEN', '')
  //     commit('SET_ROLES', [])
  //     removeToken()
  //     resolve()
  //   })
  // }

  @MutationAction({ mutate: ['roles', 'token'] })
  public async ResetToken() {
    removeToken()
    return {
      roles: [],
      token: ''
    }
  }

  @MutationAction({ mutate: ['roles', 'name', 'avatar'] })
  public async GetUserInfo() {
    const token = getToken()
    if (token === undefined) {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo(token)
    if (data.roles && data.roles.length > 0) {
      console.log(data)
      return {
        roles: data.roles,
        name: data.name,
        avatar: data.avatar
      }
    } else {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
  }

  @MutationAction({ mutate: ['token', 'roles'] })
  public async LogOut() {
    if (getToken() === undefined) {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()
    return {
      token: '',
      roles: []
    }
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }
  @Mutation
  private SET_ROLES(roles: never[]) {
    this.roles = roles
  }
}

export const UserModule = getModule(User)
