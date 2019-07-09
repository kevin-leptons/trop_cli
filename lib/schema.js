const Ajv = require('ajv')

const CMD_ARGUMENT = {
    type: 'object',
    additionalProperties: false,
    required: [
        'name',
        'type'
    ],
    properties: {
        name: {
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
        'name'
    ],
    properties: {
        name: {
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
    required: [
        'link'
    ],
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
        },
        link: {}
    }
}
let ajv = new Ajv()

function verify_command_spec(spec) {
    let valid = ajv.validate(CMD_SPEC, spec)
    if (!valid) {
        let msg = JSON.stringify(ajv.errors, null, 2)
        throw Error(msg)
    }

    if (typeof spec.link !== 'function') {
        throw Error('Link must be a function')
    }
}

module.exports = {
    verify_command_spec
}

// private members
