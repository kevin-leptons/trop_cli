const child_process = require('child_process')
const path = require('path')


const P1_FILE = path.join(__dirname, 'bin', 'p1.js')

describe('p1', () => {
    it('with no arguments', () => {
        let stdout = child_process.execFileSync(P1_FILE)
        console.log(stdout.toString())
    })

    it('with a command', () => {
        let stdout = child_process.execFileSync(P1_FILE, ['cp'])
        console.log(stdout.toString())
    })

    it('with a command', () => {
        let stdout = child_process.execFileSync(P1_FILE, ['rm'])
        console.log(stdout.toString())
    })
})
