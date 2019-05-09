import router, { addRoutes } from '@/routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to: Route, from: Route, next: any) => {
  NProgress.start()
  if (UserModule.userData.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // If current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      const hasRoles = UserModule.userData.roles && UserModule.userData.roles.length > 0
      console.log(hasRoles)
      if (hasRoles) {
        addRoutes(UserModule.userData.roles)
        next()
      } else {
        await UserModule.ResetToken()
        Message.error('未登录')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
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
