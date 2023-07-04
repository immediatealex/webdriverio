import type { RunCommandArguments } from '../types.js'

class Launcher {

    constructor(
        private configFilePath: string,
        private args: Partial<RunCommandArguments> = {},
        private isWatchMode = false
    ) {}

    /**
     * run sequence
     * @return  {Promise}  that only gets resolved with either an exitCode or an error
    */
    async run(): Promise<undefined | number> {
        const EsmLauncher = await import('../launcher.js').then(module => module.default)
        const wdio = new EsmLauncher(this.configFilePath, this.args, this.isWatchMode)
        return wdio.run()
    }
}

async function run(): Promise<false | void> {
    const { run } = await import('../index.js')
    return run()
}

module.exports = { Launcher, run }
