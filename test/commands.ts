import commands from '../src/commands'
import { exec } from 'child_process'

const cwd = '/Users/test/wocker'
jest.mock('child_process')
jest.spyOn(process, 'cwd').mockReturnValue(cwd)

test('wocker run', () => {
  commands.run([])
  expect(exec).toHaveBeenCalledWith(
    'docker run -d wocker/wordpress',
    expect.anything(),
  )
})

test('wocker run --name test', () => {
  commands.run(['--name', 'test'])
  expect(exec).toHaveBeenCalledWith(
    `docker run -d --name test -v ${cwd}/test wocker/wordpress`,
    expect.anything(),
  )
})
