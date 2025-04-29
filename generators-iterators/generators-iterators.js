const assert = require('assert')

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function *main() {
  yield 'Hello'
  yield '-'
  yield 'World'
  yield* calculation(20, 10) // 20 * 10 = 200
}

const generator = main()
// console.log(generator.next()) // { value: 'Helloa', done: false }
// console.log(generator.next()) // { value: '-', done: false }
// console.log(generator.next()) // { value: 'World', done: false }
// console.log(generator.next()) // { value: 200, done: false }
// console.log(generator.next()) // { value: undefined, done: true }

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '-', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200])
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200])

// ------ async iterators ------
const { readFile, stat, readdir } = require('fs/promises')

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude')
}

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

// Promise.all([...promisified()]).then((result) => console.log('promisified', result)) // promisified [ <Buffer 2f 2f 20 50 61 74 68 3a 20 67 65 6e 65 72 61 74 6f 72 ...>, 'Hey Dude' ]

// ;(async () => {
//   for await (const item of promisified()) {
//     console.log('for await', item.toString())
//   }
// })()

;(async () => {
  for await (const item of systemInfo()) {
    console.log('systemInfo', item)
  }
})()