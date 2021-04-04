import commands from '../src/commands'

test('hello', () => {
  expect(commands.hello()).toBe('hello')
})

// test('wocker run', () => {
//   expect(commands.run).toBe('test')
// })
