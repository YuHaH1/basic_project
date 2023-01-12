const { spawn } = require('child_process');
const packageInfo = process.env.npm_config_user_agent.split(' ')//'pnpm/7.11.0 npm/? node/v16.15.1 win32 x64',

const [userPackage, packageVersion] = packageInfo[0].split('/')

function executeCommand(command,options={ shell: true },cb) {
    return new Promise((resolve) => {
        const sp = spawn(command, options)
        sp.stdout.on('data', data => {
            console.log(data.toString());
        })
        sp.stderr.on('data', data => {
            resolve()
            console.log(data.toString())
        })
        sp.on('exit', () => { 
            typeof cb === 'function' && cb()
            resolve()
        })
    })
}
async function main() {
    if (!userPackage.startsWith('pnpm')) {
        console.log(`please use pnpm install,you are using ${userPackage}.
        The project will help you install packages to use pnpm`)
        await executeCommand('pnpm install')
        await executeCommand('pnpm dev',{ shell: true },()=>process.exit(1))
    }
}
main()

