import { exec } from 'child_process'
import yargs from 'yargs'
import commands from './commands'

yargs.alias('h', 'help')
yargs.alias('v', 'version')
yargs.demandCommand(1).help().argv

const command = process.argv[2]
const argv = process.argv.slice(3)

if (command in commands) {
  commands[command](argv)
} else {
  exec(`docker ${command} ${argv.join(' ')}`, (err, stdout, stderr) => {
    if (err || stderr) {
      console.log(stderr)
      return
    }
    if (stdout) {
      console.log(stdout)
    }
  })
}
