const actionTypeNamespace = '@@active'

export const IS_IDLE = `${actionTypeNamespace}/IS_IDLE`
export const IS_ACTIVE = `${actionTypeNamespace}/IS_ACTIVE`

export const createActiveMiddleware = (
  {
    cancelNextMiddleware = false,
    checkMs = 1000,
    customThrottle,
    eventTarget = window,
    eventTypes = [
      'click',
      'focus',
      'keydown',
      'mousemove',
      'resize',
      'scroll',
      'touchmove',
      'wheel',
    ],
    stateSelector = state => state.isActive,
    idleMs = 60000,
    throttleMs = 250,
  } = {}
) => {
  let lastInteraction = +new Date()

  const throttle = customThrottle || require('lodash/throttle')

  const activeMiddleware = ({ dispatch, getState }) => {
    activeMiddleware.interval = setInterval(() => {
      if (
        +new Date() - lastInteraction > idleMs &&
        !stateSelector(getState())
      ) {
        dispatch({ type: IS_IDLE, payload: { idleMs } })
      }
    }, checkMs)

    const onInteraction = throttle(event => {
      lastInteraction = +new Date()
      if (stateSelector(getState())) {
        dispatch({
          type: IS_ACTIVE,
          payload: { idleMs, eventType: event.type },
        })
      }
    }, throttleMs)

    eventTypes.forEach(eventType =>
      eventTarget.addEventListener(eventType, onInteraction, true)
    )

    return next => action => {
      if (![IS_IDLE, IS_ACTIVE].includes(action.type)) {
        return next(action)
      }

      if (!cancelNextMiddleware) {
        next(action)
      }
    }
  }

  return activeMiddleware
}

export const activeReducer = (state = true, action) => {
  switch (action.type) {
    case IS_IDLE:
      return false
    case IS_ACTIVE:
      return true
    default:
      return state
  }
}
