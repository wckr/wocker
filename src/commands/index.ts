import run from './run'

type Commands = {
  [name: string]: (args: string[]) => void
}

const commands: Commands = { run }

export default commands
