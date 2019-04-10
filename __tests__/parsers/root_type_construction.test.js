const {
  toValue,
  parse
} = require("arcsecond")
const root = require("../../parsers/root")
const rootScope = root(true)
const Scope = require("../../tree/expressions/scopes/Scope")
const Type = require("../../tree/types/Type")

describe("root type construction", () => {

  // @TODO
  xtest("single line", () => {
    const content = "OptionalBoolean: Null | Boolean"
    const result = toValue(parse(rootScope)(content))
    expect(result).toBeInstanceOf(Scope)
    expect(result.types.OptionalBoolean).toBeInstanceOf(Type)
    expect(result.types.OptionalBoolean.options.length).toBe(2)
    expect(result.expressions.length).toBe(0)
  })

  test("multiline", () => {
    const content = `Product:
  title: String
  price: Float
`
    const result = toValue(parse(rootScope)(content))
    expect(result.types.Product).toBeInstanceOf(Type)
    expect(result.types.Product.types.length).toBe(2)
    expect(result.expressions.length).toBe(0)
  })

  test("properties", () => {
    const content = `Person:
  name: String
  prop: "a"
`
    const result = toValue(parse(rootScope)(content))
    expect(result.types.Person).toBeInstanceOf(Type)
    expect(result.types.Person.types.length).toBe(1)
    expect(result.types.Person.properties).toEqual({ prop: "a" })
    expect(result.expressions.length).toBe(0)
  })
})
