const actionTypeNamespace = '@@active'

export const IS_IDLE = `${actionTypeNamespace}/IS_IDLE`
export const IS_ACTIVE = `${actionTypeNamespace}/IS_ACTIVE`

export const createActiveMiddleware = (
  {
    cancelNextMiddleware = false,
    eventTarget = window,
    eventThrottleTimeout = 250,
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
    idleCheckInterval = 1e3,
    idleTimeout = 6e4,
    stateSelector = state => state.isActive,
    throttle = require('lodash/throttle'),
  } = {}
) => {
  let lastInteraction = +new Date()

  const activeMiddleware = ({ dispatch, getState }) => {
    if (typeof stateSelector(getState()) === 'undefined') {
      console.error(
        'Error: redux-active has detected a problem with your stateSelector configuration!'
      )
      return next => action => next(action)
    }

    activeMiddleware.interval = setInterval(() => {
      if (
        +new Date() - lastInteraction > idleTimeout &&
        stateSelector(getState())
      ) {
        dispatch({ type: IS_IDLE, payload: { idleTimeout } })
      }
    }, idleCheckInterval)

    const onInteraction = throttle(event => {
      lastInteraction = +new Date()
      if (!stateSelector(getState())) {
        dispatch({
          type: IS_ACTIVE,
          payload: { idleTimeout, eventType: event.type },
        })
      }
    }, eventThrottleTimeout)

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
