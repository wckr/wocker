// import { exec } from 'child_process';
import yargs from 'yargs';
import commands from './commands';

const argv = yargs(process.argv.slice(2)).argv;
// console.log(argv);

// const commands = [
//   'run',
// ];

const command = process.argv[2];

console.log(command in commands);


if (command in commands) {
  commands[command]({
    name: 'test',
  });
}

// yargs.help("h").alias("h", "help").argv;

// const args = process.argv;

// console.log(args);

// exec('docker', (err, stdout, stderr) => {
//   if (err) return;
//   if (stdout) console.log(stdout);
//   if (stderr) console.log(stderr);
// });
