
# Proxy

This module demonstrates how the `Proxy` object can intercept and redefine fundamental operations in JavaScript. It also integrates Node.js asynchronous functions (`setTimeout`, `setInterval`, `setImmediate`, `process.nextTick`) and the `EventEmitter` module to create a reactive system that responds to changes in an object's properties.

## 📘 Concepts Covered

### ✅ `Proxy` Basics

A `Proxy` allows you to define custom behavior for fundamental operations on objects, such as:

- Reading properties (`get`)
- Writing properties (`set`)

```js
const proxy = new Proxy(target, handler)
```

### ✅ Example Use Case

We monitor a `counter` property using a proxy:

```js
const proxy = new Proxy(myCounter, {
  set: (target, key, value) => {
    event.emit('counter', { newValue: value, key: target[key] })
    target[key] = value
    return true
  },
  get: (target, key) => target[key]
})
```

Every time `proxy.counter` is changed, an event is emitted using Node.js's `EventEmitter`.

### ✅ EventEmitter Integration

We use `EventEmitter` to notify changes:

```js
const Event = require('events')
const event = new Event()

event.on('counter', msg => console.log('counter updated', msg))
```

### ✅ Asynchronous Execution Order

We test different asynchronous timing functions to observe when the proxy gets triggered:

```js
process.nextTick(() => {
  proxy.counter = 2
  console.log('[0]: nextTick')
})

setImmediate(() => {
  console.log('[1]: setImmediate')
})

setTimeout(() => {
  proxy.counter = 4
  console.log('[2]: setTimeout')
}, 100)

setInterval(function () {
  proxy.counter++
  console.log('[3]: setInterval')
  if (proxy.counter === 10) clearInterval(this)
}, 200)
```

#### Execution Order (likely):

1. `process.nextTick`
2. `setImmediate`
3. `setTimeout`
4. `setInterval` (runs repeatedly)

## 🧪 Running the Code

To execute the script:

```bash
node proxy.js
```

You’ll see output like:

```
counter updated { newValue: 2, key: 0 }
[0]: nextTick
[1]: setImmediate
counter updated { newValue: 4, key: 2 }
[2]: setTimeout
counter updated { newValue: 5, key: 4 }
[3]: setInterval
...
```

## 📌 Summary

- The `Proxy` object enables interception of property reads and writes.
- Combined with `EventEmitter`, it creates a simple **reactive system**.
- Shows how JavaScript handles **event loop timing** using `nextTick`, `setImmediate`, and others.
