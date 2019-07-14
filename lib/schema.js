const Ajv = require('ajv')

const {InvalidSpec} = require('./error')

const CMD_ARGUMENT = {
    type: 'object',
    additionalProperties: false,
    required: [
        'id',
        'type'
    ],
    properties: {
        id: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        default: {}
    }
}
const CMD_OPTIION = {
    type: 'object',
    additionalProperties: false,
    required: [
        'id'
    ],
    properties: {
        id: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        shortcut: {
            type: 'string',
            minLength: 1,
            maxLength: 1
        },
        default: {}
    }
}
const CMD_SPEC = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        path: {
            type: 'string'
        },
        arguments: {
            type: 'array',
            items: CMD_ARGUMENT
        },
        options: {
            type: 'array',
            items: CMD_OPTIION
        }
    }
}
let ajv = new Ajv()

function verify_command_spec(spec) {
    _verify_json_schema(spec)
    _verify_argument_array(spec)
}

module.exports = {
    verify_command_spec
}

// private members

function _verify_json_schema(spec) {
    let valid = ajv.validate(CMD_SPEC, spec)
    if (!valid) {
        let msg = JSON.stringify(ajv.errors, null, 2)
        throw Error(msg)
    }
}

function _verify_argument_array(spec) {
    if (!spec.arguments) {
        return
    }

    let array_argument_count = 0

    for (let argv_spec of spec.arguments) {
        if (argv_spec.type === 'array') {
            array_argument_count += 1
        }
    }

    if (array_argument_count > 1) {
        throw new InvalidSpec('Too many array arguments')
    }

    switch (array_argument_count) {
        case 0:
            break
        case 1:
            if (spec.arguments.length < 2) {
                break
            }
            let last_arg_spec = spec.arguments[spec.arguments.length - 1]
            if (last_arg_spec.type !== 'array') {
                throw new InvalidSpec('Array argument must be end of argument list')
            }
            break
        default:
            throw new InvalidSpec('Too many array arguments')
    }
}
