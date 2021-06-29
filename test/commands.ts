import commands from '../src/commands'
import { spawn } from 'child_process'
import dockerNames from 'docker-names'

const defaults = {
  name: 'foolish_kite',
  port: '55555',
  image: 'wocker/wordpress',
}

const cwd = '/Users/test/wocker'
const docroot = '/var/www/wordpress'
const publish = [
  `-p=${defaults.port}:80`,
  `-p=${defaults.port}:3306`,
  `-p=${defaults.port}:8025`,
]

jest.spyOn(process, 'cwd').mockReturnValue(cwd)
jest.spyOn(dockerNames, 'getRandomName').mockReturnValue(defaults.name)
jest.mock('get-port', () => {
  return jest.fn(() => defaults.port)
})
jest.mock('child_process')

describe('Test the `run` command', () => {
  test('$ wocker run', async () => {
    await commands.run([])
    expect(spawn).toHaveBeenCalledWith('docker', [
      'run',
      '-d',
      `--name=${defaults.name}`,
      `-v=${cwd}/${defaults.name}:${docroot}:rw`,
      ...publish,
      defaults.image,
    ])
  })

  test('$ wocker run --name test', async () => {
    await commands.run(['--name', 'test'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name test -v ${cwd}/test:${docroot}:rw ${publish} ${defaults.image}`,
      expect.anything(),
    )
  })

  test('$ wocker run --name=test', async () => {
    await commands.run(['--name=test'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name test -v ${cwd}/test:${docroot}:rw ${publish} ${defaults.image}`,
      expect.anything(),
    )
  })

  test('$ wocker run --volume /Users/test/wordpress', async () => {
    await commands.run(['--volume', '/Users/test/wordpress'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name ${defaults.name} -v /Users/test/wordpress:${docroot}:rw ${publish} ${defaults.image}`,
      expect.anything(),
    )
  })

  test('$ wocker run -v /Users/test/wordpress', async () => {
    await commands.run(['-v', '/Users/test/wordpress'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name ${defaults.name} -v /Users/test/wordpress:${docroot}:rw ${publish} ${defaults.image}`,
      expect.anything(),
    )
  })

  test('$ wocker run -p 80', async () => {
    await commands.run(['-p', '80'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name ${defaults.name} -v ${cwd}/${defaults.name}:${docroot}:rw -p 80 -p ${defaults.port}:3306 -p ${defaults.port}:8025 ${defaults.image}`,
      expect.anything(),
    )
  })

  test('$ wocker run -p 8888:80', async () => {
    await commands.run(['-p', '8888:80'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name ${defaults.name} -v ${cwd}/${defaults.name}:${docroot}:rw -p 8888:80 -p ${defaults.port}:3306 -p ${defaults.port}:8025 ${defaults.image}`,
      expect.anything(),
    )
  })

  test('$ wocker run -p 8888:80 --publish=8889:3306', async () => {
    await commands.run(['-p', '8888:80', '--publish=8889:3306'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name ${defaults.name} -v ${cwd}/${defaults.name}:${docroot}:rw -p 8888:80 -p 8889:3306 -p ${defaults.port}:8025 ${defaults.image}`,
      expect.anything(),
    )
  })

  test('$ wocker run -p 8888:80 -p 8889:3306 -p 8890:443', async () => {
    await commands.run(['-p', '8888:80', '-p', '8889:3306', '-p', '8890:443'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name ${defaults.name} -v ${cwd}/${defaults.name}:${docroot}:rw -p 8888:80 -p 8889:3306 -p 8890:443 -p ${defaults.port}:8025 ${defaults.image}`,
      expect.anything(),
    )
  })

  test('$ wocker run nginx', async () => {
    await commands.run(['nginx'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name ${defaults.name} -v ${cwd}/${defaults.name}:${docroot}:rw ${publish} ${defaults.image}:nginx`,
      expect.anything(),
    )
  })

  test('$ wocker run nginx pwd', async () => {
    await commands.run(['bash'])
    expect(spawn).toHaveBeenCalledWith(
      `docker run -d --name ${defaults.name} -v ${cwd}/${defaults.name}:${docroot}:rw ${publish} ${defaults.image}:nginx`,
      expect.anything(),
    )
  })
})
