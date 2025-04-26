export const simulateWait = async (
  waitRange: [number, number]
): Promise<void> => {
  let [low, high] = waitRange
  // Handle faulty range
  if (low > high) {
    console.warn('wrong params set in options for simulate wait, correcting')
    high = low
    low = 0
  }

  const waitMs = Math.floor(Math.random() * (high - low)) + low

  await new Promise((res) => {
    setTimeout(() => {
      res(null)
    }, waitMs)
  })
}

/**
 * Generates a pseudo-random session ID string, stores it in localStorage, and returns it.
 * The generated id is stored in localStorage.
 *
 * @returns {string} The generated pseudo-random session ID string.
 * @sideEffects Modifies `localStorage` by setting the 'sessionId' item.
 */
export const generateSessionId = (): string => {
  const sessionId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  localStorage.setItem('sessionId', sessionId)
  return sessionId
}

/**
 * Will probably not be used, because on log out we will have to clean up MSW localstorage as well to have conflicting
 * sessions
 */
export const clearSessionId = (): void => {
  localStorage.removeItem('sessionId')
}

/**
 * Small util function that validates the browser session with the localstorage or the 'server' one
 * @param {string} incomingSessionId the 'cookie' coming from the browser
 * @returns boolean true if the session is active
 */
export const validateSession = (incomingSessionId: string): boolean => {
  const sessionId = localStorage.getItem('sessionId')
  if (!sessionId || !incomingSessionId) {
    return false
  }
  return sessionId === incomingSessionId
}
