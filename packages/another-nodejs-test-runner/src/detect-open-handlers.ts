// Inspired by https://github.com/facebook/jest/blob/711b60262a13fedb75a5eb1b37b36056e66da617/packages/jest-core/src/collectHandles.ts
// Extracted as Jest does not provide a npm-package for this (yet)

import * as asyncHooks from 'async_hooks'
import { ErrorWithStack } from 'jest-util'

function stackIsFromUser(stack: string): boolean {
  if (stack.includes('bb')) {
    return true
  }
  if (stack.includes('Runtime.requireModule')) {
    // Either the test file, or something required by it
    return true
  }

  // jest-jasmine it or describe call
  if (stack.includes('asyncJestTest') || stack.includes('asyncJestLifecycle')) {
    return true
  }

  // An async function call from within circus
  if (stack.includes('callAsyncCircusFn')) {
    // jest-circus it or describe call
    return stack.includes('_callCircusTest') || stack.includes('_callCircusHook')
  }

  return false
}

const alwaysActive = (): boolean => true

// Inspired by https://github.com/mafintosh/why-is-node-running/blob/master/index.js
// Extracted as we want to format the result ourselves
export function collectHandles(): () => ReadonlyArray<Error> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const activeHandles: ReadonlyMap<number, { readonly error: Error; readonly isActive: () => boolean }> = new Map()
  const hook = asyncHooks.createHook({
    destroy(asyncId) {
      // @ts-ignore
      activeHandles.delete(asyncId)
    },
    init: function initHook(asyncId, type, _triggerAsyncId, resource: {} | NodeJS.Timeout) {
      if (type === 'PROMISE' || type === 'TIMERWRAP' || type === 'ELDHISTOGRAM' || type === 'PerformanceObserver') {
        return
      }
      const error = new ErrorWithStack(type, initHook)

      if (stackIsFromUser(error.stack || '')) {
        // eslint-disable-next-line functional/no-let
        let isActive: () => boolean

        if (type === 'Timeout' || type === 'Immediate') {
          if ('hasRef' in resource) {
            // Timer that supports hasRef (Node v11+)
            isActive = resource.hasRef.bind(resource)
          } else {
            // Timer that doesn't support hasRef
            isActive = alwaysActive
          }
        } else {
          // Any other async resource
          isActive = alwaysActive
        }
        // @ts-ignore
        activeHandles.set(asyncId, { error, isActive })
      }
    },
  })

  hook.enable()

  return (): ReadonlyArray<Error> => {
    hook.disable()

    // Get errors for every async resource still referenced at this moment
    const result = Array.from(activeHandles.values())
      .filter(({ isActive }) => isActive())
      .map(({ error }) => error)

    // @ts-ignore
    activeHandles.clear()
    return result
  }
}
