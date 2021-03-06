const Assignment = require("../Assignment")
const Scope = require("./Scope")
const Environment = require("./Environment")

const isScope = object => object instanceof DataScope
const isAssignment = object => object instanceof Assignment
const isScopeOrAssignment = object => isScope(object) || isAssignment(object)

class DataScope extends Scope {

  evaluate (env) {
    if (this.isEmpty) return null
    const environment = env != null ? env.clone() : new Environment()
    this.value = this.evaluateDataScope(environment)
    this.isEvaluated = true
    const key = this.keys != null ? this.keys[0] : null
    return key != null ? { [key]: this.value } : this.value
  }

  evaluateDataScope (env) {

    this.expressions.forEach(expression => expression.evaluate(env))

    const evaluateToMap = this.expressions.every(isScopeOrAssignment)

    // create map e.g. ({ k: 5, l: 6 })
    if (evaluateToMap) {
      return this.expressions.reduce((acc, expression) => {
        expression.keys.forEach(key => acc[key] = expression.value)
        return acc
      }, {})
    }

    // create array e.g. ([5, 6, { k: 7 }])
    return this.expressions.map(expression => {
      if (isScopeOrAssignment(expression)) {
        return expression.keys.reduce((acc, key) => {
          acc[key] = expression.value
          return acc
        }, {})
      }
      return expression.value
    })
  }
}

module.exports = DataScope
