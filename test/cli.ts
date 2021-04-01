import commands from '../src/commands'

test('wocker run', () => {
  expect(commands.run()).toBe('test')
})
