import { masque } from '../../src/'

test('should throw an error when not passed an object', () => {
  const nullPassed = () => masque(null)

  expect(nullPassed)
    .toThrowError(TypeError)
})

test('should throw an error when no exposed methods are found', () => {
  const noExposedFns = () => masque({ _test: () => {} })

  expect(noExposedFns)
    .toThrowError(Error)
})

test('should return a facade based on key array', () => {
  const objToFacade = {
      testFunc() { return 1 },
      testFuncTwo() { return 2 },
    },
    keysToExpose = ['testFunc'],
    facade = masque(objToFacade, keysToExpose)

  expect(Object.keys(facade))
    .toEqual(keysToExpose)
  expect(facade.testFunc())
    .toEqual(1)
})

test('should return a facade based on underscore notations', () => {
  const objToFacade = {
      _testFunc() { return 1 },
      testFuncTwo() { return 2 },
    },
    facade = masque(objToFacade)

  expect(Object.keys(facade))
    .toEqual(['testFuncTwo'])
  expect(facade.testFuncTwo())
    .toEqual(2)
})

test('should still be able to call internal funcs from exposed funcs', () => {
  const objToFacade = {
      _testFunc() { return 500 },
      testFuncTwo() { return this._testFunc() }
    },
    facade = masque(objToFacade)

  expect(facade.testFuncTwo())
    .toEqual(500)
})

test('should still be able to access internal vars from exposed funcs', () => {
  const objToFacade = {
      _testVar: 'Some value',
      testFunc() { return this._testVar }
    },
    facade = masque(objToFacade)

  expect(facade.testFunc())
    .toEqual(objToFacade._testVar)
})

test('should still be able to access other exposed funcs', () => {
  const objToFacade = {
      testFunc() { return 500 },
      testFuncTwo() { return this.testFunc() }
    },
    facade = masque(objToFacade)

  expect(facade.testFunc())
    .toEqual(500)
  expect(facade.testFuncTwo())
    .toEqual(500)
})
