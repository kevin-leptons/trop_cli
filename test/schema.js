let assert = require('assert')

const {verify_command_spec} = require('../lib/schema')

describe('verify_command_spec', () => {
    it('with no input', () => {
        let spec = {}

        verify_command_spec(spec)
    })

    it('with an string argument', () => {
        let spec = {
            arguments: [
                {
                    id: 'argument_one',
                    type: 'string'
                }
            ]
        }

        verify_command_spec(spec)
    })

    it('with an array argument', () => {
        let spec = {
            arguments: [
                {
                    id: 'argument_one',
                    type: 'array'
                }
            ]
        }

        verify_command_spec(spec)
    })

    it('with an array argument at the end of argument list', () => {
        let spec = {
            arguments: [
                {
                    id: 'argument_one',
                    type: 'string'
                },
                {
                    id: 'argument_two',
                    type: 'number'
                },
                {
                    id: 'argument_three',
                    type: 'array'
                }
            ]
        }

        verify_command_spec(spec)
    })

    it('with an array argument at the begin of argument list', () => {
        let spec = {
            arguments: [
                {
                    id: 'argument_one',
                    type: 'array'
                },
                {
                    id: 'argument_two',
                    type: 'string'
                },
                {
                    id: 'argument_three',
                    type: 'number'
                }
            ]
        }

        assert.throws(() => {
            verify_command_spec(spec)
        }, {
            name: 'InvalidSpec',
            message: 'Array argument must be end of argument list'
        })
    })

    it('with an array argument at the middle of argument list', () => {
        let spec = {
            arguments: [
                {
                    id: 'argument_one',
                    type: 'string'
                },
                {
                    id: 'argument_two',
                    type: 'array'
                },
                {
                    id: 'argument_three',
                    type: 'number'
                }
            ]
        }

        assert.throws(() => {
            verify_command_spec(spec)
        }, {
            name: 'InvalidSpec',
            message: 'Array argument must be end of argument list'
        })
    })

    it('with two array argument', () => {
        let spec = {
            arguments: [
                {
                    id: 'argument_one',
                    type: 'array'
                },
                {
                    id: 'argument_two',
                    type: 'array'
                }
            ]
        }

        assert.throws(() => {
            verify_command_spec(spec)
        }, {
            name: 'InvalidSpec',
            message: 'Too many array arguments'
        })
    })
})
