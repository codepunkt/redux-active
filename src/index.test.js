import { activeReducer, IS_ACTIVE, IS_IDLE } from './index'

describe('active reducer', () => {
  it('should return the initial state', () => {
    expect(activeReducer(undefined, {})).toEqual(true)
  })

  it('should handle IS_ACTIVE', () => {
    expect(activeReducer(false, { type: IS_ACTIVE })).toEqual(true)
    expect(activeReducer(true, { type: IS_ACTIVE })).toEqual(true)
  })

  it('should handle IS_IDLE', () => {
    expect(activeReducer(false, { type: IS_IDLE })).toEqual(false)
    expect(activeReducer(true, { type: IS_IDLE })).toEqual(false)
  })
})
