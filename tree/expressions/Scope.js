const Expression = require("./Expression")
const Assignment = require("./Assignment")

const isScope = object => object instanceof Scope
const isAssignment = object => object instanceof Assignment
const isScopeOrAssignment = object => isScope(object) || isAssignment(object)

class Scope extends Expression {

  constructor (keys = [], expressions = []) {
    const expressionsArray = Array.isArray(expressions) ? expressions : [expressions]
    super("Scope", expressionsArray)
    this.keys = Array.isArray(keys) ? keys : [keys]
    this.isRoot = false
  }

  evaluate (asData = false) {

    if (this.isEmpty) return null
    if (asData) {
      const key = this.keys != null ? this.keys[0] : null
      const value = this.evaluateDataScope()
      return key != null ? { [key]: value } : value
    }
    return null
    //return this.evaluateFunctionScope()
  }

  evaluateDataScope () {

    this.expressions.forEach(expression => expression.evaluate(true))

    const evaluateToMap = this.expressions.every(isScopeOrAssignment)

    // create map e.g. ({ k: 5, l: 6 })
    if (evaluateToMap) {
      return this.expressions.reduce((acc, expression) => {
        // @TODO: multiple keys (aliases)
        acc[expression.keys[0]] = expression.value
        return acc
      }, {})
    }

    // create array e.g. ([5, 6, { k: 7 }])
    return this.expressions.map(expression => {
      // @TODO: multiple keys (aliases)
      if (isScopeOrAssignment(expression)) return { [expression.keys[0]]: expression.value }
      return expression.value
    })
  }

  /*
  evaluateFunctionScope () {

    const isLast = (index, arr) => arr.length - 1 === index

    const initialScope = { hasReturned: false, returnValue: null, keys: {} }

    const evaluatedScope = this.expressions.reduce((scope, expression, index, arr) => {
      if (scope.hasReturned) return scope
      expression.evaluate()
      if (expression instanceof Assignment) {
        expression.keys.forEach(key => scope.keys[key] = expression.expressions)
      }
      if (expression instanceof Statement || isLast(index, arr)) {
        scope.returnValue = expression.values()
        scope.hasReturned = true
      }
      return scope
    }, initialScope)

    return evaluatedScope.returnValue
  }
  */
}

module.exports = Scope