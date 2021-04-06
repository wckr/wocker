import commands from '../src/commands'
import { exec } from 'child_process'
import dockerNames from 'docker-names'

const cwd = '/Users/test/wocker'
const name = 'foolish_kite'
jest.spyOn(process, 'cwd').mockReturnValue(cwd)
jest.spyOn(dockerNames, 'getRandomName').mockReturnValue(name)
jest.mock('child_process')

describe('Test the `run` command', () => {
  test('$ wocker run', () => {
    commands.run([])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name} -p 80 -p 3306 -p 8025 wocker/wordpress`,
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

  test('$ wocker run -p 80:80', () => {
    commands.run(['-p', '80:80'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name} -p 80:80 wocker/wordpress`,
      expect.anything(),
    )
  })

  test('$ wocker run -p 80:80 -p 3306:3306 -p 8025:8025', () => {
    commands.run(['-p', '80:80', '-p', '3306:3306', '-p', '8025:8025'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name} -p 80:80 -p 3306:3306 -p 8025:8025 wocker/wordpress`,
      expect.anything(),
    )
  })

  test('$ wocker run nginx', () => {
    commands.run(['nginx'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name} -p 80 -p 3306 -p 8025 wocker/wordpress:nginx`,
      expect.anything(),
    )
  })

  test('$ wocker run nginx pwd', () => {
    commands.run(['bash'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name} -p 80 -p 3306 -p 8025 wocker/wordpress:nginx`,
      expect.anything(),
    )
  })
})
