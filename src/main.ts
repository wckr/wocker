import { exec } from 'child_process';

exec('docker', (err, stdout, stderr) => {
  if (err) return;
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
});
