declare module 'redux-active' {
  import { AnyAction, Middleware, Reducer } from 'redux'

  type ActiveAction = '@@active/IS_ACTIVE'
  type IdleAction = '@@active/IS_IDLE'

  type Throttle = (func: Function, wait?: number) => Function
  type Selector<S, R> = (state: S) => R

  type MiddlewareOptions = {
    eventTarget?: EventTarget
    eventThrottleTimeout?: number
    eventTypes?: Array<string>
    idleCheckInterval?: number
    idleTimeout?: number
    stateSelector?: Selector<any, boolean>
    throttle?: Throttle
  }

  export const IS_IDLE: IdleAction
  export const IS_ACTIVE: ActiveAction
  export const activeReducer: Reducer<boolean>
  export function createActiveMiddleware(
    options?: MiddlewareOptions
  ): Middleware
}
