const Scalar = require("./Scalar")

class Number extends Scalar {

  constructor (value, literal) {
    super("Number", value, literal)
  }

  parse (literal) {
    const num = parseFloat(literal.replace(/_/g, ""))
    return isNaN(num) ? 0 : num
  }
}

module.exports = Number