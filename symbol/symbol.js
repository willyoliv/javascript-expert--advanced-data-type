const assert = require('assert')

// --- keys ---
const uniqueKey = Symbol('uniqueKey')
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKey] = 'value for Symbol'

// console.log('getting normal Objects', user.userName)
// // always unique in level of memory
// console.log('getting normal Objects', user[Symbol("userName")]) // undefined
// console.log('getting Symbol', user[uniqueKey]) // value for Symbol

assert.deepStrictEqual(user.userName, 'value for normal Objects')

assert.deepStrictEqual(user[Symbol("userName")], undefined)

assert.deepStrictEqual(user[uniqueKey], 'value for Symbol')

console.log('symbols', Object.getOwnPropertySymbols(user)) // [ Symbol(uniqueKey) ]

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - bad practice
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
// --- end keys ---

// Well known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // pop removes the last element of the array and returns it
        value: this.items.pop()
      }
    }
  })
}

assert.deepStrictEqual([...obj], ['a', 'b', 'c']) // [ 'a', 'b', 'c' ]

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg))
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()
    
    const itens = this[kItems].map((item) => 
        new Intl
          .DateTimeFormat('pt-BR', {month: 'long', day: '2-digit', year: 'numeric'})
          .format(item))
    
    return new Intl.ListFormat('pt-BR', {style: 'long', type: 'conjunction'}).format(itens)
  }

  * [Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async * [Symbol.asyncIterator]() {
    const timeout = ms => new Promise((resolve) => setTimeout(resolve, ms))

    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }

  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }
}

const myDate = new MyDate([2020, 3, 1], [2018, 2, 2])

const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2018, 2, 2)
]

console.log('myDate', myDate)

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
assert.throws(() => myDate + 1, TypeError)


assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

// implements iterator
assert.deepStrictEqual([...myDate], expectedDates)

// ;(async () => {
//   for await (const item of myDate) {
//     console.log('async iterator', item)
//   }
// })()

;(async () => {
  const dates = await Promise.all([...myDate])
  assert.deepStrictEqual(dates, expectedDates)
})()
