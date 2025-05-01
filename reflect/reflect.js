'use strict'

const assert = require('assert')


// Reflect guarantees semantics and object security.

// --- apply ---
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// A problem with the below code is that it can be overridden by the user.
// For example, if the user overrides the apply method, it will not work as expected.
// Function.prototype.apply = () => { throw new Error('Get some data!') }

// The code below is easy to recreate, but it is not secure.
myObj.add.apply = function () { throw new TypeError('Get some data!') } 

assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Get some data!'
  }
)

// --- Using Reflect ---
// --- apply ---
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)

// --- defineProperty ---
function MyDate() {}

// Example without Reflect
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there!' })

// Example with Reflect
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude!' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there!')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude!')

// --- deleteProperty ---
const withDelete = { user: 'ErickWendel' }
// The code below is not performatic
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

// The code below is performatic
const withReflection = { user: 'ErickWendel' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// --- get ---
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// --- has ---
assert.ok('superman' in { superman: 'Clark Kent' })
assert.ok(Reflect.has({ batman: 'Bruce Wayne' }, 'batman'))

// --- ownKeys ---
const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'ErickWendel',
}

const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// with reflection
const reflectionKeys = Reflect.ownKeys(databaseUser)
assert.deepStrictEqual(reflectionKeys, ['id', Symbol.for('password'), user])