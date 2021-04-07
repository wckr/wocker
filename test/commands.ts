import commands from '../src/commands'
import { exec } from 'child_process'
import dockerNames from 'docker-names'

const cwd = '/Users/test/wocker'
const name = 'foolish_kite'
const docroot = '/var/www/wordpress'
jest.spyOn(process, 'cwd').mockReturnValue(cwd)
jest.spyOn(dockerNames, 'getRandomName').mockReturnValue(name)
jest.mock('child_process')

describe('Test the `run` command', () => {
  test('$ wocker run', () => {
    commands.run([])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name}:${docroot}:rw -p 80 -p 3306 -p 8025 wocker/wordpress`,
      expect.anything(),
    )
  })

  test('$ wocker run --name test', () => {
    commands.run(['--name', 'test'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name test -v ${cwd}/test:${docroot}:rw -p 80 -p 3306 -p 8025 wocker/wordpress`,
      expect.anything(),
    )
  })

  test('$ wocker run -p 80', () => {
    commands.run(['-p', '80'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name}:${docroot}:rw -p 80 -p 3306 -p 8025 wocker/wordpress`,
      expect.anything(),
    )
  })

  test('$ wocker run -p 8888:80', () => {
    commands.run(['-p', '8888:80'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name}:${docroot}:rw -p 8888:80 -p 3306 -p 8025 wocker/wordpress`,
      expect.anything(),
    )
  })

  test('$ wocker run -p 8888:80 -p 8889:3306', () => {
    commands.run(['-p', '8888:80', '-p', '8889:3306'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name}:${docroot}:rw -p 8888:80 -p 8889:3306 -p 8025 wocker/wordpress`,
      expect.anything(),
    )
  })

  test('$ wocker run -p 8888:80 -p 8889:3306 -p 8890:443', () => {
    commands.run(['-p', '8888:80', '-p', '8889:3306', '-p', '8890:443'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name}:${docroot}:rw -p 8888:80 -p 8889:3306 -p 8890:443 -p 8025 wocker/wordpress`,
      expect.anything(),
    )
  })

  test('$ wocker run nginx', () => {
    commands.run(['nginx'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name}:${docroot}:rw -p 80 -p 3306 -p 8025 wocker/wordpress:nginx`,
      expect.anything(),
    )
  })

  test('$ wocker run nginx pwd', () => {
    commands.run(['bash'])
    expect(exec).toHaveBeenCalledWith(
      `docker run -d --name ${name} -v ${cwd}/${name}:${docroot}:rw -p 80 -p 3306 -p 8025 wocker/wordpress:nginx`,
      expect.anything(),
    )
  })
})
