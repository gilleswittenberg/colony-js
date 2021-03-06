const {
  toValue,
  parse
} = require("arcsecond")
const parser = require("../../parsers/assignment")
const Assignment = require("../../tree/expressions/Assignment")
const Number = require("../../tree/expressions/scalars/Number")
const Operation = require("../../tree/expressions/operations/Operation")
const Application = require("../../tree/expressions/scopes/Application")
const FunctionType = require("../../tree/types/FunctionType")

describe("assignment", () => {

  test("plural", () => {
    const result = toValue(parse(parser)("key: a: 6, b: 7"))
    expect(result).toBeInstanceOf(Assignment)
    expect(result.keys[0].name).toBe("key")
    expect(result.expressions[0].expressions.length).toBe(2)
    expect(result.expressions[0].expressions[0]).toBeInstanceOf(Assignment)
    expect(result.expressions[0].expressions[0].keys[0].name).toBe("a")
    expect(result.expressions[0].expressions[1]).toBeInstanceOf(Assignment)
    expect(result.expressions[0].expressions[1].keys[0].name).toBe("b")
  })

  test("function", () => {
    const result = toValue(parse(parser)("f: n: Number, m: Number -> Number m + n"))
    expect(result).toBeInstanceOf(Assignment)
    expect(result.keys[0].name).toBe("f")
    expect(result.expressions[0]).toBeInstanceOf(Application)
    expect(result.expressions[0].expressions[0].inputs[0].expressions.length).toBe(2)
    expect(result.expressions[0].arguments.length).toBe(1)
  })
})

describe("function", () => {

  test("operation", () => {
    const result = toValue(parse(parser)("onePlusTwo: 1 + 2"))
    expect(result).toBeInstanceOf(Assignment)
    expect(result.keys[0].name).toBe("onePlusTwo")
    expect(result.expressions.length).toBe(1)
    expect(result.expressions[0]).toBeInstanceOf(Operation)
  })

  test("function type", () => {
    const result = toValue(parse(parser)("addOne: n: Number -> Number n + 1"))
    expect(result).toBeInstanceOf(Assignment)
    expect(result.keys[0].name).toBe("addOne")
    expect(result.expressions.length).toBe(1)
    expect(result.expressions[0]).toBeInstanceOf(Application)
    expect(result.expressions[0].expressions[0]).toBeInstanceOf(FunctionType)
    expect(result.expressions[0].arguments[0]).toBeInstanceOf(Operation)
  })
})

describe("aliases", () => {

  test("alias", () => {
    const result = toValue(parse(parser)("kk: alias:: 8"))
    expect(result).toBeInstanceOf(Assignment)
    expect(result.keys[0].name).toBe("kk")
    expect(result.keys[1].name).toBe("alias")
    expect(result.expressions.length).toBe(1)
    expect(result.expressions[0]).toBeInstanceOf(Number)
  })

  test("plural alias", () => {
    const result = toValue(parse(parser)("kkk: alias: aliasSnd:: 9"))
    expect(result).toBeInstanceOf(Assignment)
    expect(result.keys[0].name).toBe("kkk")
    expect(result.keys[1].name).toBe("alias")
    expect(result.keys[2].name).toBe("aliasSnd")
    expect(result.expressions.length).toBe(1)
    expect(result.expressions[0]).toBeInstanceOf(Number)
  })
})
