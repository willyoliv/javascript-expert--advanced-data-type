const assert = require('assert')

const arr1 = ["1", "2", "3"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3, ["1", "2", "3", "2", "0", "3"])

const set = new Set()
arr1.forEach((item) => set.add(item))
arr2.forEach((item) => set.add(item))

console.log('Set with add item per item', set) // Set(5) { '1', '2', '3', '0' }
assert.deepStrictEqual(Array.from(set), ["1", "2", "3", "0"])

assert.deepStrictEqual(new Set([...arr1, ...arr2]), set) // Set(5) { '1', '2', '3', '0' }

console.log('set.keys()', set.keys()) // SetIterator { '1', '2', '3', '0' }
console.log('set.values()', set.values()) // SetIterator { '1', '2', '3', '0' }

// how to find some item in set
assert.ok(set.has("3")) // true

// set doesn't have the get method, but you can use has to check if the item is in the set

const users01 = new Set([
  'will',
  'john',
  'maria',
])

const users02 = new Set([
  'joazinho',
  'maria',
  'julio',
])

const intersection = new Set([...users01].filter((user) => users02.has(user)))
assert.deepStrictEqual(intersection, new Set(['maria'])) // Set(1) { 'maria' }

const difference = new Set([...users01].filter((user) => !users02.has(user)))
assert.deepStrictEqual(difference, new Set(['will', 'john'])) // Set(2) { 'will', 'john' }

// WeakSet
// WeakSet is a collection of objects, and it doesn't prevent garbage collection
// WeakSet is not iterable, so you can't use forEach, map, filter, etc. on it

const user = { id: 123 }
const user2 = { id: 456 }
const weakSet = new WeakSet([user])

weakSet.add(user2)
weakSet.delete(user2)
weakSet.has(user) // true
weakSet.has(user2) // false
