/*
  Idle Service
  this service manages when a user has gone idle (not interacting with the page).
*/

let _timeoutId
let _idleCallback = null
let _notIdleEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart' ]
let _IDLE_TIME_IN_MS = 30 * 60 * 1000 // min * sec * millisec

const IdleService = {
  setIdleCallback(idleCallback) {
    /* store a callback to call when the user goes idle */
    _idleCallback = idleCallback
  },
  /* called when a user interacts with the page */
  resetIdleTimer(ev) {
    console.info('event:', ev.type)
    /* remove any timeouts as the user just interacted */
    clearTimeout(_timeoutId)
    /* queue the callback to happen 5 minutes from now */
    _timeoutId = setTimeout(_idleCallback, _IDLE_TIME_IN_MS)
  },
  regiserIdleTimerResets() {
    /* register the resetIdleTimer for events when a user interacts with page */
    _notIdleEvents.forEach(event =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    )
  },
  unRegisterIdleResets() {
    /* remove any queued callbacks and events that will queue callbacks */
    clearTimeout(_timeoutId)
    _notIdleEvents.forEach(event =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    )
  },
}

export default IdleService