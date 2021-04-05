import commands from '../src/commands'
import { exec } from 'child_process'

const cwd = '/Users/test/wocker'
jest.mock('child_process')
jest.spyOn(process, 'cwd').mockReturnValue(cwd)

test('$ wocker run', () => {
  commands.run([])
  expect(exec).toHaveBeenCalledWith(
    'docker run -d -p 80 -p 3306 -p 8025 wocker/wordpress',
    expect.anything(),
  )
})

test('$ wocker run --name test', () => {
  commands.run(['--name', 'test'])
  expect(exec).toHaveBeenCalledWith(
    `docker run -d --name test -v ${cwd}/test -p 80 -p 3306 -p 8025 wocker/wordpress`,
    expect.anything(),
  )
})

test('$ wocker run -p 80:80 -p 3306:3306 -p 8025:8025', () => {
  commands.run(['-p', '80:80', '-p', '3306:3306', '-p', '8025:8025'])
  expect(exec).toHaveBeenCalledWith(
    `docker run -d -p 80:80 -p 3306:3306 -p 8025:8025 wocker/wordpress`,
    expect.anything(),
  )
})

test('$ wocker run -p 80:80 -p 3306:3306 -p 8025:8025', () => {
  commands.run(['-p', '80:80', '-p', '3306:3306', '-p', '8025:8025'])
  expect(exec).toHaveBeenCalledWith(
    `docker run -d -p 80:80 -p 3306:3306 -p 8025:8025 wocker/wordpress`,
    expect.anything(),
  )
})

test('$ wocker run nginx', () => {
  commands.run(['nginx'])
  expect(exec).toHaveBeenCalledWith(
    'docker run -d -p 80 -p 3306 -p 8025 wocker/wordpress:nginx',
    expect.anything(),
  )
})
