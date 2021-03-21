import run from './run'

type Commands = {
  [name: string]: (args: any) => void
}

const commands: Commands = { run }

export default commands
