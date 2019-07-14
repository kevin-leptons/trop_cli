class InvalidTokens extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class InvalidSpec extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

module.exports = {
    InvalidTokens,
    InvalidSpec
}
