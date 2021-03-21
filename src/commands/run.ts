import yargs from 'yargs'
import { exec } from 'child_process'

const run = (): void => {
  const argv = yargs(process.argv.slice(3)).options({
    name: { type: 'string' },
    publish: { alias: 'p' },
  }).argv

  const name = argv.name ? `--name ${argv.name}` : ''
  const publish = argv.publish ? `-p ${argv.publish}` : ''
  let image = argv._.join(' ')
  image = `wocker/wordpress${image ? `:${image}` : ''}`

  const cmd = `docker run -d ${name} ${publish} ${image}`

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr)
    }
    if (stdout) {
      console.log(stdout)
    }
  })
}

export default run
