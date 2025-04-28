import { test as testBase } from 'vitest'
import { worker } from '../mocks/browser.js'

export const test = testBase.extend({
  worker: [
    async ({}, use) => {
      await worker.start()

      await use(worker)

      worker.stop()
    },
    {
      auto: true
    }
  ]
})
