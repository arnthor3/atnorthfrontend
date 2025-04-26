type SimulateWaitArgs = {
  /**
   * A number between 0 and 100 tested against a random number to simulate a bad server experience
   */
  chancesOfError?: number
  /**
   * Set the error message to be sent back if the chances of error is triggered
   */
  errorMessage?: string
  /**
   * The wait period in ms, total time will be between low + random fraction of range
   */
  waitRange?: [number, number]
}

/**
 * Simulates an asynchronous operation like a server request, introducing a
 * variable delay and potentially throwing an error based on configured chances.
 * Useful for mocking network latency and server failures.
 *
 * @param {SimulateWaitArgs} options - Configuration object for the simulation.
 * @param {number} [options.chancesOfError=0] - Percentage chance (0-100) of the simulation throwing an error.
 * @param {string} [options.errorMessage=""] - The message for the Error object if an error is thrown.
 * @param {[number, number]} [options.waitRange=[500, 1000]] - Tuple defining the minimum (inclusive) and maximum (exclusive) wait time in milliseconds. If `low > high`, the range defaults to `[0, low]`.
 * @returns {Promise<void>} A promise that resolves with no value after the simulated delay if no error occurs.
 * @throws {Error} Rejects with an `Error` object containing the `errorMessage` if the simulation triggers an error based on `chancesOfError`.
 */
export const simulateWait = async ({
  chancesOfError = 0,
  errorMessage = '',
  waitRange = [500, 1000]
}: SimulateWaitArgs): Promise<void> => {
  let [low, high] = waitRange
  // Handle faulty range
  if (low > high) {
    console.warn('wrong params set in options for simulate wait, correcting')
    high = low
    low = 0
  }

  const waitMs = Math.floor(Math.random() * (high - low)) + low
  const willThrow = Math.random() * 100 < chancesOfError
  await new Promise((res, rej) => {
    setTimeout(() => {
      if (willThrow) {
        rej(new Error(errorMessage))
      }
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
