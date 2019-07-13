const {Queue, error} = require('@trop/gear')

const {InvalidTokens} = require('./error')

function parse_simple_command(spec, tokens) {
    return _parse_input(spec, tokens)
}

function parse_complex_command(spec, token) {

}

// private members

function _parse_input(spec, tokens) {
    let token_queue = new Queue(tokens)
    let input = {}

    _parse_argument(spec, token_queue, input)
    _parse_option(spec, token_queue, input)
    return input
}

function _parse_argument(spec, tokens, input) {
    for (arg_spec of spec.arguments) {
        let token

        try {
            token = tokens.pop()
        } catch (e) {
            if (e instanceof error.NotFound) {
                throw new InvalidTokens(`Missing argument ${arg_spec.id}`)
            }
            throw e
        }

        input[arg_spec.id] = token
    }
}

function _parse_option(spec, tokens, input) {

}

module.exports = {
    parse_simple_command,
    _parse_input
}
