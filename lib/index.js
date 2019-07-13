const Program = require('./program')

function create_program() {
    return new Program()
}

module.exports = {
    error: require('./error'),
    create_program
}
