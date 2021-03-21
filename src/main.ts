import commands from './commands'

const command = process.argv[2]

if (command in commands) {
  commands[command]()
}

// yargs.help("h").alias("h", "help").argv;

// const args = process.argv;

// console.log(args);

// exec('docker', (err, stdout, stderr) => {
//   if (err) return;
//   if (stdout) console.log(stdout);
//   if (stderr) console.log(stderr);
// });
