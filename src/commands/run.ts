import yargs from 'yargs'
import { exec } from 'child_process'
import dockerNames from 'docker-names'

yargs.command('run', 'Run a new project')

const run = (args: string[]): void | string => {
  const argv = yargs(args).options({
    name: { type: 'string' },
    volume: { type: 'string', alias: 'v' },
    publish: { alias: 'p' },
  }).argv

  // Container name
  const name = argv.name ? `--name ${argv.name}` : ''

  // Volume
  const volume = argv.volume
    ? `-v ${argv.volume}`
    : argv.name
    ? `-v ${process.cwd()}/${argv.name}`
    : ''

  // Publish (ports)
  const publish =
    argv.publish instanceof Array
      ? argv.publish.reduce((acc: string, p: string) => `${acc} -p ${p}`, '')
      : typeof argv.publish === 'string'
      ? `-p ${argv.publish}`
      : '-p 80 -p 3306 -p 8025'

  // Image and tag
  const tag = argv._[0]
  const image = 'wocker/wordpress' + (tag ? `:${tag}` : '')

  // The whole Docker command
  const command = `docker run -d ${name} ${volume} ${publish} ${image}`
    .replace(/\s+/g, ' ')
    .trim()

  exec(command, (err, stdout, stderr) => {
    if (err || stderr) {
      console.log(stderr)
      return
    }
    if (stdout) {
      console.log(stdout)
      exec('docker ps', (err, stdout, stderr) => {
        console.log(stdout)
      })
    }
  })
}

export default run
