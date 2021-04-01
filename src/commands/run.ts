import yargs from 'yargs'
import { exec } from 'child_process'

const run = (): void => {
  const argv = yargs(process.argv.slice(3)).options({
    name: { type: 'string' },
    volume: { type: 'string', alias: 'v' },
    publish: { alias: 'p' },
  }).argv

  const name = argv.name ? `--name ${argv.name}` : ''
  const volume = argv.volume
    ? `-v ${argv.volume}`
    : argv.name
    ? `-v ${process.cwd()}/${argv.name}`
    : ''
  const publish = argv.publish ? `-p ${argv.publish}` : ''

  let image = argv._.join(' ')
  image = `wocker/wordpress${image ? `:${image}` : ''}`

  const cmd = `docker run -d ${name} ${volume} ${publish} ${image}`

  // console.log(argv)
  console.log('test')

  // exec(cmd, (err, stdout, stderr) => {
  //   if (err || stderr) {
  //     console.log(stderr)
  //     return
  //   }
  //   if (stdout) {
  //     console.log(stdout)
  //   }
  // })
}

export default run
