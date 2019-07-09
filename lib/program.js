const {error} = require('@trop/gear')

const schema = require('./schema')

class Program {
    constructor() {
        this._cmd_map = new Map()
    }

    command(spec) {
        this._verify_spec(spec)
        if (this._cmd_map.has(spec.path)) {
            throw new error.Conflict('Command path is already existed')
        }

        this._cmd_map.set(spec.path, spec)
    }

    async run() {
        if (process.argv.length < 2) {
            throw Error('Arguments of process is invalid')
        }

        let command = process.argv.splice(2)
        let {link, input} = parse_command()
    }

    // private members

    _verify_spec(spec) {
        schema.verify_command_spec(spec)
    }
}

module.exports = Program
