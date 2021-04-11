import yargs from 'yargs'
import { spawn } from 'child_process'
import dockerNames from 'docker-names'
import getPort from 'get-port'

yargs.command('run', 'Run a new project')

const run = async (args: string[]): Promise<void> => {
  const defaults = {
    name: dockerNames.getRandomName(),
    ports: ['80', '3306', '8025'],
    image: 'wocker/wordpress',
  }

  const argv = yargs(args).options({
    name: { type: 'string', default: defaults.name },
    volume: { type: 'string', alias: 'v' },
    publish: { alias: 'p', default: [''] },
  }).argv

  // Image and tag
  const tag = argv._[0]
  const image = defaults.image + (tag ? `:${tag}` : '')

  // Container name
  const name = `--name=${argv.name}`

  // Volume
  argv.volume = argv.volume || `${process.cwd()}/${argv.name}`
  const volume = `-v=${argv.volume}:/var/www/wordpress:rw`

  // Publish (ports)
  if (!(argv.publish instanceof Array)) {
    argv.publish = [`${argv.publish}`]
  }

  const ports = await Promise.all(
    defaults.ports
      .filter((p) => !argv.publish.map((p) => p.split(':').pop()).includes(p))
      .map((p) => `${getPort()}:${p}`),
  )
  argv.publish.push(...ports)

  const publish = argv.publish.filter(Boolean).map((p) => `-p=${p}`)

  // Exec `docker run`
  const docker = spawn('docker', ['run', '-d', name, volume, ...publish, image])

  docker.stdout.on('data', (data) => {
    console.log(data.toString())
  })

  docker.stderr.on('data', (data) => {
    console.log(data.toString())
  })

  docker.on('close', (code) => {
    if (code === 0) {
      console.log('OK')
    }
  })
}

export default run
