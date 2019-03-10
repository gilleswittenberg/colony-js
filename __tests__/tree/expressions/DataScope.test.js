const DataScope = require("../../../tree/expressions/DataScope")
const Number = require("../../../tree/expressions/scalars/Number")
const Assignment = require("../../../tree/expressions/Assignment")

describe("data scope", () => {

  test("empty", () => {
    const scope = new DataScope()
    expect(scope.keys).toEqual([])
    expect(scope.expressions).toEqual([])
    expect(scope.evaluate(true)).toEqual(null)
  })

  test("expression", () => {
    const expression = new Number(5)
    const scope = new DataScope(null, [expression])
    expect(scope.evaluate(true)).toEqual([5])
  })

  test("expressions", () => {
    const expression = new Number(6)
    const expression1 = new Number(7)
    const scope = new DataScope(null, [expression, expression1])
    expect(scope.evaluate(true)).toEqual([6, 7])
  })

  test("expressions, assignments", () => {
    const expression = new Number(8)
    const expression1 = new Number(9)
    const assignment = new Assignment(["k"], [expression1])
    const scope = new DataScope(null, [expression, assignment])
    expect(scope.evaluate(true)).toEqual([8, { k: 9 }])
  })

  test("expressions, alias", () => {
    const expression = new Number(10)
    const expression1 = new Number(11)
    const assignment = new Assignment(["e", "elias"], [expression1])
    const scope = new DataScope(null, [expression, assignment])
    expect(scope.evaluate(true)).toEqual([10, { e: 11, elias: 11 }])
  })

  test("assignments", () => {
    const expression = new Number(8)
    const expression1 = new Number(9)
    const assignment = new Assignment(["kOne"], [expression])
    const assignment1 = new Assignment(["kTwo"], [expression1])
    const scope = new DataScope(null, [assignment, assignment1])
    expect(scope.evaluate(true)).toEqual({ kOne: 8, kTwo: 9 })
  })

  test("assignments alias", () => {
    const expression = new Number(9)
    const assignment = new Assignment(["key", "alias"], expression)
    const scope = new DataScope(null, assignment)
    expect(scope.evaluate(true)).toEqual({ key: 9, alias: 9 })
  })
})