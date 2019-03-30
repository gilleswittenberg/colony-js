const Expression = require("../../../tree/expressions/Expression")
const Number = require("../../../tree/expressions/scalars/Number")
const Environment = require("../../../tree/expressions/scopes/Environment")

describe("Expression", () => {

  test("constructor", () => {
    const expression = new Expression("Number", new Number(3))
    expect(expression.isEvaluated).toBe(false)
    expect(expression.isEmpty).toBe(false)
    expect(expression.isSingle).toBe(true)
    expect(expression.isPlural).toBe(false)
    expect(expression.expressions.length).toBe(1)
    expect(expression.expressions[0]).toBeInstanceOf(Number)
  })

  describe("properties", () => {

    test("single", () => {
      const expression = new Expression("Number", new Number(6))
      expression.evaluate()
      expect(expression.getProperty("is")).toBe(true)
      expect(expression.getProperty("isPlural")).toBe(false)
    })

    test("plural", () => {
      const expression = new Expression("Numbers", [new Number(7), new Number(8)])
      expression.evaluate()
      expect(expression.getProperty("is")).toBe(true)
      expect(expression.getProperty("isPlural")).toBe(true)
      expect(expression.getProperty("length")()).toBe(2)
    })
  })

  describe("evaluation", () => {

    test("evaluation", () => {
      const expression = new Expression("Number", new Number(4))
      expression.evaluate()
      expect(expression.type).toBe("Number")
      expect(expression.value).toBe(4)
    })

    test("casting", () => {
      const expression = new Expression("Number", new Number(4))
      const environment = new Environment()
      expression.setCastToType(environment.get("String").value)
      expression.evaluate(environment)
      expect(expression.type).toBe("String")
      //expect(expression.value).toBe("4")
    })
  })
})
