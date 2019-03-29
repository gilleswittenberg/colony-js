const Application = require("../../../../tree/expressions/scopes/Application")
const Number = require("../../../../tree/expressions/scalars/Number")
const FunctionScope = require("../../../../tree/expressions/scopes/FunctionScope")
const Identity = require("../../../../tree/expressions/Identity")
const Environment = require("../../../../tree/expressions/scopes/Environment")
const Type = require("../../../../tree/types/Type")

describe("Application", () => {

  describe("Type cast", () => {

    test("String", () => {
      const number = new Number(5)
      const string = new Type("String")
      const application = new Application(string, number)
      const environment = new Environment()
      expect(application.evaluate(environment)).toBe("5")
    })
  })

  describe("FunctionScope", () => {

    test("scalar", () => {
      const number = new Number(5)
      const scope = new FunctionScope(null, number)
      const application = new Application(scope)
      expect(application.evaluate()).toBe(5)
    })

    test("Identity", () => {
      const number = new Number(6)
      const scope = new FunctionScope(null, number)
      const identity = new Identity("scope", scope)
      const application = new Application(identity)
      const environment = new Environment()
      environment.set("scope", scope)
      expect(application.evaluate(environment)).toBe(6)
    })

    test("Identity deep", () => {
      // { { n } }()(n)
      const n = new Number(13)
      const identity = new Identity("n")
      const scope = new FunctionScope(null, identity)
      const scopeOuter = new FunctionScope(null, scope)
      const application = new Application(scopeOuter)
      const applicationOuter = new Application(application)
      const environment = new Environment()
      environment.set("n", n)
      expect(applicationOuter.evaluate(environment)).toEqual(13)
    })

    test("Identity deep 2", () => {
      // { { n }() }(n)
      const n = new Number(14)
      const identity = new Identity("n")
      const scope = new FunctionScope(null, identity)
      const application = new Application(scope)
      const scopeOuter = new FunctionScope(null, application)
      const applicationOuter = new Application(scopeOuter)
      const environment = new Environment()
      environment.set("n", n)
      expect(applicationOuter.evaluate(environment)).toEqual(14)
    })
  })
})
