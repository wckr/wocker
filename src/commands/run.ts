import yargs from 'yargs'
import { exec } from 'child_process'
import dockerNames from 'docker-names'

yargs.command('run', 'Run a new project')

const run = (args: string[]): void | string => {
  const defaults = {
    name: dockerNames.getRandomName(),
    ports: ['80', '3306', '8025'],
    image: 'wocker/wordpress',
  }

  const argv = yargs(args).options({
    name: { type: 'string', default: defaults.name },
    volume: { type: 'string', alias: 'v' },
    publish: { alias: 'p', default: defaults.ports },
  }).argv

  // Container name
  const name = `--name ${argv.name}`

  // Volume
  argv.volume = argv.volume || `${process.cwd()}/${argv.name}`
  const volume = `-v ${argv.volume}:/var/www/wordpress:rw`

  // Publish (ports)
  if (!(argv.publish instanceof Array)) {
    argv.publish = [`${argv.publish}`]
  }

  const ports = argv.publish.map((p) => p.split(':').pop())

  argv.publish.push(...defaults.ports.filter((p) => !ports.includes(p)))

  const publish = argv.publish.reduce((acc: string, p: string) => {
    return `${acc} -p ${p}`
  }, '')

  // Image and tag
  const tag = argv._[0]
  const image = defaults.image + (tag ? `:${tag}` : '')

  // The whole Docker command
  const command = `docker run -d ${name} ${volume} ${publish} ${image}`
    .replace(/\s+/g, ' ')
    .trim()

  exec(command, (err, stdout, stderr) => {
    if (err || stderr) {
      console.log(stderr)
      return
    }

    console.log(stdout)

    exec(`docker port ${stdout}`, (err, stdout, stderr) => {
      if (err || stderr) {
        console.log(stderr)
        return
      }

      console.log(stdout)
    })
  })
}

export default run
