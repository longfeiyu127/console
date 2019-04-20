import { forEach as _forEach } from '../index'

class InterceptorManager {
  public handlers: any[] = []
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  private use(fulfilled: Function, rejected: Function): number {
    this.handlers.push({ fulfilled, rejected})
    return this.handlers.length - 1
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  private eject(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  public forEach(fn: Function) {
    _forEach(this.handlers, (h: any) => {
      if (h !== null) fn(h)
    })
  }
}

export default InterceptorManager
