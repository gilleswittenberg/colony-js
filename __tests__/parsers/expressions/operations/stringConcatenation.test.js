const {
  toValue,
  parse
} = require("arcsecond")
const stringConcatenation = require("../../../../parsers/expressions/operations/stringConcatenation")

test("string concatination", () => {
  /* eslint-disable quotes */
  expect(toValue(parse(stringConcatenation)(`"Abc" + "def"`)).evaluate()).toBe("Abcdef")
  expect(toValue(parse(stringConcatenation)(`"ABc" + "Def" + "GHI"`)).evaluate()).toBe("ABcDefGHI")
  /* eslint-enable */
})
