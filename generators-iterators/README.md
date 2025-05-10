# Generators & Iterators

This module demonstrates how **generator functions** and **iterators** work in JavaScript — including both synchronous and asynchronous patterns. It's a practical exploration of how to pause function execution, yield values on demand, and iterate over complex data sources, including file system operations.

## 📘 Concepts Covered

### ✅ Generator Functions
Generator functions are declared using `function*` syntax and can pause execution with `yield`. They return an iterator object, which can be stepped through manually using `.next()`.

```js
function* main() {
  yield 'Hello'
  yield '-'
  yield 'World'
}
```

### ✅ Yield Delegation
You can delegate to another generator using `yield*` to yield its values in sequence.

```js
function* calculation(a, b) {
  yield a * b
}

function* main() {
  yield* calculation(10, 20) // yields 200
}
```

### ✅ Iterating Generators
You can consume generator output using:

- `next()` manually
- `Array.from(...)`
- Spread operator `[...generator]`

Assertions confirm generator behavior:
```js
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200])
```

### ✅ Async Generators
With async `function*`, you can yield asynchronous operations and consume them using `for await...of`.

```js
async function* systemInfo() {
  yield await readFile(__filename)
  yield await stat(__filename)
}
```

### ✅ Yielding Promises
Even a regular generator can yield Promises, which you can collect using `Promise.all([...generator])`.

```js
function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude')
}
```

## 🧪 Running the Code
To execute the example and observe async iteration output:

```bash
node generators-iterators.js
```

## 📁 Output Example
Sample output from the `systemInfo` async generator:

```css
systemInfo { file: '...file content...' }
systemInfo { size: 1024 }
systemInfo { dir: ['file1.js', 'file2.js', ...] }
```

## 📌 Summary
Generators and iterators offer powerful control over flow and resource management:

- Pause and resume function execution
- Integrate with async/await
- Abstract complex iteration logic
- Yield values (or Promises) lazily