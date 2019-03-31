const Expression = require("../Expression")
const toArray = require("../../../utils/toArray")

const isFunctionExpression = object => object instanceof Function

const properties = {
  apply: expression => args => expression.apply(args)
}

class Function extends Expression {

  constructor (type, scope, environment) {
    super(type, scope, properties)
    this.environment = environment // lexical scope
    this.isEvaluated = true
  }

  apply (args) {
    const argsArray = toArray(args)
    const inputs = this.type != null ? this.type.inputTypes : []
    const argsObject = inputs.reduce((acc, type, index) => {
      acc[type.keys[0]] = argsArray[index]
      return acc
    }, {})
    const environment = this.environment.setArgs(argsObject)
    const expression = this.expressions[0]
    return isFunctionExpression(expression) ? expression : expression.evaluate(environment, args)
  }
}

module.exports = Function