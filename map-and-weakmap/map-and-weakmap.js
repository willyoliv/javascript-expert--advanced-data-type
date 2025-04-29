const assert = require('assert')

const myMap = new Map()

// can have any type as a key
myMap
  .set(1, 'one')
  .set('Erick', { text: 'two' })
  .set(true, () => 'hello')

const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
])

// console.log(myMap) // { '1': 'one', 'Erick': { text: 'two' }, true: [Function] }

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// In object the keys can be only strings or symbols (numbers are converted to strings)
const onlyRefencesWorks = { id: 1 }
myMap.set(onlyRefencesWorks, { name: 'ErickWendel' })

console.log('get', myMap.get({ id: 1})) // undefined because the object is different reference
console.log('get', myMap.get(onlyRefencesWorks)) // { name: 'ErickWendel' }

assert.deepStrictEqual(myMap.get({ id: 1}), undefined) // undefined because the object is different reference
assert.deepStrictEqual(myMap.get(onlyRefencesWorks), { name: 'ErickWendel' }) // { name: 'ErickWendel' }

// utilities
// - In the Object will be Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4) // 4

// for check if a item exists in the map
assert.ok(myMap.has(onlyRefencesWorks)) // true

// for delete an item in the map
assert.ok(myMap.delete(onlyRefencesWorks)) // true

// it's not possible to iterate over the map with forEach, but you can use for..of
assert.deepStrictEqual(JSON.stringify([ ... myMap]), JSON. stringify([[1,"one"], ["Erick", {"text":"two"}], [true, () => {}]]))

// map already implements the iterable protocol, so you can use for..of
for (const [key, value] of myMap) {
  console.log(key, value)
}

// Object is insecure, because depending on the key, it can override some standard behavior
// ({}).toString = '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey'

// any key can match the object's inherited properties, such as constructor, toString, valueOf and etc.

const actor = {
  name: 'Actor',
  toString: 'Some string'
}

myMap.set(actor)

assert.ok(myMap.has(actor)) // true
assert.throws(() => myMap.get(actor).toString, TypeError)

// To clear the map, you can use the clear method
myMap.clear()

assert.deepStrictEqual(myMap.size, 0) // 0

// --- WeakMap ---
// WeakMap is a collection of key-value pairs where the keys are objects and the values can be any type
// WeakMap is not iterable, so you can't use for..of or forEach to iterate over it
// The keys in a WeakMap are weakly referenced, meaning that if there are no other references to the key, it can be garbage collected

const weakMap = new WeakMap()
const hero = { name: 'Hero' }

weakMap.set(hero)
weakMap.get(hero) // { name: 'Hero' }
weakMap.delete(hero) // true
weakMap.has(hero) // false