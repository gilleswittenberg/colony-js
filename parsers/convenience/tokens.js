const {
  char,
  str
} = require("arcsecond")

// tokens (ASCII)
const space = char(" ")
const tab = char("\t")
const dot = char(".")
const plus = char("+")
const comma = char(",")
const minus = char("-")
const asterisk = char("*")
const slash = char("/")
const colon = char(":")
const semicolon = char(";")
const underscore = char("_")
const quote = char("'")
const doubleQuote = char("\"")
// @TODO: Rename to number
const numberSign = char("#")
const backslash = char("\\")
const leftParens = char("(")
const rightParens = char(")")
const pipe = char("|")

const exclamationMark = char("!")
const questionMark = char("?")
const caret = char("^")
const atSign = char("@")
const dollarSign = char("$")

// multchar tokens
const escapedBackslash = str("\\")
const arrow = str("->")
const rangeDelimiter = str(",,")

module.exports = {
  space,
  tab,
  dot,
  plus,
  comma,
  minus,
  asterisk,
  slash,
  colon,
  semicolon,
  underscore,
  quote,
  doubleQuote,
  numberSign,
  backslash,
  leftParens,
  rightParens,
  pipe,

  exclamationMark,
  questionMark,
  caret,
  atSign,
  dollarSign,

  escapedBackslash,
  arrow,
  rangeDelimiter
}
