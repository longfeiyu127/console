import { UserModule } from '@/store/modules/user'

export default {
  inserted(el: Element, { value = ['visitor'] }) {
    const { roles } = UserModule.userData

    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = roles.some((role: string) => {
        return value.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','visitor']"`)
    }
  }
}
