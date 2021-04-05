import commands from '../src/commands'

const exec = jest.fn((cmd) => {
  return cmd
})

test('wocker run', () => {
  expect(commands.run()).toBe('test')
})

// describe('wocker cli', () => {
//   it('wocker run', () => {
//     commands.run()
//     const
//   })
// })
