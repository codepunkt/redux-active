import throttle from 'lodash/throttle'
import { injectThrottle } from './redux-active'

export { activeReducer, IS_ACTIVE, IS_IDLE } from './redux-active'
export const createActiveMiddleware = injectThrottle(throttle)
