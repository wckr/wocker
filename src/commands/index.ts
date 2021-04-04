import run from './run'

type Commands = {
  [name: string]: () => void
}

const hello = (): string => {
  return 'hello'
}

const commands: Commands = { run, hello }

export default commands
