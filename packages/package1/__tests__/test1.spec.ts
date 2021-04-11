import { test, expect } from '@jest/globals'

test('test1', async () => {
  expect({ a: 1 }).toMatchObject({ a: 1 })
  expect(true).toBeTruthy()
})
