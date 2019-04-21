import { asyncRoutes, constantRoutes } from '@/routes'
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'

const hasPermission = (roles: any, route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: any, roles: any) => {
  const res: any[] = []

  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export interface IPermissionState {
  routes: Array<any>,
  addRoutes: Array<any>
}

@Module({ dynamic: true, store, name: 'permission' })
class App extends VuexModule implements IPermissionState {
  public routes: any = []
  public addRoutes = []

  @Action({ commit: 'SET_ROUTES' })
  public generateRoutes(roles: any) {
    // console.log("roles", roles)
    // console.log(roles)
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }

  @Mutation
  private SET_ROUTES(routes: any) {
    this.addRoutes = routes
    this.routes = constantRoutes.concat(routes)
  }
}

export const PermissionModule = getModule(App)
