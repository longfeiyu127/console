import router from '@/routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to: Route, from: Route, next: any) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // If current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      const hasRoles = UserModule.roles && UserModule.roles.length > 0
      // console.log(hasRoles)
      if (hasRoles) {
        next()
      } else {
        // UserModule.GetUserInfo().then(() => {
        //   next()
        // })
        // .catch(err => {
        //   UserModule.FedLogOut().then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          await UserModule.GetUserInfo()
          const roles = UserModule.roles
          // console.log(roles)
          // generate accessible routes map based on roles
          const accessRoutes: any = await PermissionModule.generateRoutes(roles)
          // console.log(accessRoutes)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // console.log(router)
          // console.log(JSON.stringify(accessRoutes))
          // console.log(to.path)
          // console.log(to)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await UserModule.ResetToken()
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // Redirect to login page
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
