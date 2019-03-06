const {
  toValue,
  parse
} = require("arcsecond")
const root = require("../../parsers/root")
const RootScope = require("../../tree/expressions/RootScope")
const Scope = require("../../tree/expressions/Scope")
const Assignment = require("../../tree/expressions/Assignment")
const Expression = require("../../tree/expressions/Expression")
const Number = require("../../tree/expressions/scalars/Number")
const String = require("../../tree/expressions/scalars/String")

test("root scope", () => {
  const content = "key: 5"
  const result = toValue(parse(root)(content))
  expect(result).toBeInstanceOf(RootScope)
  expect(result.expressions.length).toBe(1)
  expect(result.expressions[0]).toBeInstanceOf(Assignment)
  expect(result.expressions[0].keys).toEqual(["key"])
  expect(result.expressions[0].expressions[0]).toBeInstanceOf(Number)
})

test("deep", () => {
  const content = `scope:
  k:
    a: 9
  l: 6
my: 9
`
  const result = toValue(parse(root)(content))
  expect(result.expressions.length).toBe(2)
  expect(result.expressions[0]).toBeInstanceOf(Scope)
  expect(result.expressions[0].keys).toEqual(["scope"])
  expect(result.expressions[0].expressions[0]).toBeInstanceOf(Scope)
  expect(result.expressions[0].expressions[0].keys).toEqual(["k"])
  expect(result.expressions[1]).toBeInstanceOf(Assignment)
})

describe("indention", () => {

  test("invalid", () => {
    const content = `key:
    5`
    expect(() => toValue(parse(root)(content))).toThrow("Invalid indention at line: 2")
  })

  test("empty line", () => {
    const content = `key:
  5

  6
`
    expect(() => toValue(parse(root)(content))).not.toThrow()
  })
})

describe("comment", () => {

  test("closed comment", () => {
    const content = "# text \\# 5"
    const result = toValue(parse(root)(content))
    expect(result).toBeInstanceOf(RootScope)
    expect(result.expressions.length).toBe(1)
    expect(result.expressions[0]).toBeInstanceOf(Number)
    expect(result.expressions[0].value).toBe(5)
  })

  test("closed comment last", () => {
    const content = "6 # text \\#"
    const result = toValue(parse(root)(content))
    expect(result).toBeInstanceOf(RootScope)
    expect(result.expressions.length).toBe(1)
    expect(result.expressions[0]).toBeInstanceOf(Number)
    expect(result.expressions[0].value).toBe(6)
  })

  test("closed comment multi", () => {
    const content = "# text \\#  # text2 \\# 56 # text3 \\#  , 6 # text \\## text2 \\#"
    const result = toValue(parse(root)(content))
    expect(result).toBeInstanceOf(RootScope)
    expect(result.expressions.length).toBe(1)
    expect(result.expressions[0]).toBeInstanceOf(Expression)
    expect(result.expressions[0].isPlural).toBe(true)
    expect(result.expressions[0].expressions.length).toBe(2)
  })

  test("comment eol", () => {
    const content = "22 # Five!"
    const result = toValue(parse(root)(content))
    expect(result).toBeInstanceOf(RootScope)
    expect(result.expressions.length).toBe(1)
    expect(result.expressions[0]).toBeInstanceOf(Number)
    expect(result.expressions[0].value).toBe(22)
  })

  test("comment line", () => {
    const content = "# only comment on line"
    const result = toValue(parse(root)(content))
    expect(result).toBeInstanceOf(RootScope)
    expect(result.expressions.length).toBe(0)
  })

  test("multiline indented comment", () => {
    const content = `# text
  ~giberish@!abc~
"continue"`
    const result = toValue(parse(root)(content))
    expect(result).toBeInstanceOf(RootScope)
    expect(result.expressions.length).toBe(1)
    expect(result.expressions[0]).toBeInstanceOf(String)
    expect(result.expressions[0].value).toBe("continue")
  })

  test("multiline gibberish", () => {
    const content = `# text
~giberish@!abc~
5`
    expect(() => toValue(parse(root)(content))).toThrow("Invalid characters at line: 2")
  })
})