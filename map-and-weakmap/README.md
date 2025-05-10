
# Map & WeakMap

This module demonstrates the usage and differences between `Map` and `WeakMap` in JavaScript. These collections offer powerful alternatives to regular objects when working with key-value data structures — especially when object references and memory efficiency are important.

## 📘 Concepts Covered

### ✅ `Map`

- A `Map` can use **any value (including objects)** as keys.
- Preserves the **insertion order** of keys.
- Offers utilities not available in plain objects (`.set()`, `.get()`, `.has()`, `.delete()`, `.clear()`).

#### Key Differences from Objects

| Feature                 | Object                | Map                          |
|------------------------|-----------------------|------------------------------|
| Key Types              | String or Symbol only | Any value (object, number…)  |
| Iteration              | `for...in`, `Object.keys` | `for...of`, spread operator  |
| Performance            | Generally slower for frequent additions/removals | Optimized for dynamic key usage |
| Inherited Keys Problem | Yes                   | No                           |

#### Example:

```js
const myMap = new Map()
myMap.set(1, 'one')
myMap.set(true, () => 'hello')

const ref = { id: 1 }
myMap.set(ref, { name: 'ErickWendel' })
console.log(myMap.get(ref)) // { name: 'ErickWendel' }
```

> ⚠️ Keys based on object references must match *exactly*; deep equality won't work:
>
> ```js
> myMap.get({ id: 1 }) // undefined — different reference!
> ```

#### Utilities

- `.size` returns the number of entries
- `.has(key)` checks existence
- `.delete(key)` removes an entry
- `.clear()` removes all entries
- Maps are **iterable**, so you can use `for...of` or `[...map]`.

```js
for (const [key, value] of myMap) {
  console.log(key, value)
}
```

### ⚠️ Objects Are Insecure for Arbitrary Keys

Using an object as a dictionary can override critical properties:

```js
const unsafe = { toString: 'bad' }
console.log(unsafe.toString) // might break behavior
```

### ✅ `WeakMap`

- Keys **must be objects** (no primitives).
- Keys are **weakly held**, allowing garbage collection if no other references exist.
- **Not iterable** — designed for internal/private data storage.

#### Example:

```js
const wm = new WeakMap()
const obj = { name: 'Hero' }

wm.set(obj, { power: 100 })
console.log(wm.get(obj)) // { power: 100 }

wm.delete(obj)
wm.has(obj) // false
```

> ✅ Use `WeakMap` when you need to associate data with an object **without preventing it from being garbage collected**.

## 🧪 Running the Code

```bash
node map-and-weak-map.js
```

You'll see assertion tests pass silently and some key differences logged in the terminal.

## 📌 Summary

- Use `Map` when you need a flexible, iterable key-value structure with object keys.
- Use `WeakMap` for memory-sensitive data tied to object lifetimes.
- Avoid using plain objects as dictionaries when keys can conflict with prototype properties.
