import yargs from 'yargs'
import commands from './commands'

yargs.alias('h', 'help')
yargs.alias('v', 'version')
yargs.demandCommand(1).help().argv

const command = process.argv[2]

if (command in commands) {
  commands[command](process.argv.slice(3))
}

// exec('docker', (err, stdout, stderr) => {
//   if (err) return;
//   if (stdout) console.log(stdout);
//   if (stderr) console.log(stderr);
// });
