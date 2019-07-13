const assert = require('assert')

const {error} = require('../lib')
const {_parse_input} = require('../lib/parser')

let spec = {
    arguments: [
        {
            id: 'argument_one',
            type: 'string'
        },
        {
            id: 'argument_two',
            type: 'number'
        }
    ],
    options: [
        {
            id: 'option_one',
            type: 'boolean'
        },
        {
            id: 'option_two',
            type: 'string'
        }
    ]
}

describe('parse_input()', () => {
    it('with empty tokens', () => {
        let tokens = []

        assert.throws(() => {
            _parse_input(spec, tokens)
        }, {
            name: 'InvalidTokens',
            message: `Missing argument ${spec.arguments[0].id}`
        })
    })

    it('with valid arguments', () => {
        let tokens = ['data 1', 'data 2']
        let input = _parse_input(spec, tokens)

        assert.equal(input['argument_one'], tokens[0])
        assert.equal(input['argument_two'], tokens[1])
    })
})
