# Set and WeakSet in JavaScript

This module demonstrates how to use `Set` and `WeakSet` in JavaScript, including operations like union, intersection, and difference.

## 📘 Overview

### 🔹 Set

A `Set` is a built-in JavaScript object that stores **unique values**. It supports several methods for managing collections without duplicates.

#### Example: Combining Arrays with Unique Values

```js
const arr1 = ["1", "2", "3"]
const arr2 = ["2", "0", "3"]
const set = new Set([...arr1, ...arr2])
console.log(set) // Set(4) { '1', '2', '3', '0' }
```

#### Key Methods
- `set.add(value)`: Adds a new value.
- `set.has(value)`: Checks for existence.
- `set.delete(value)`: Removes a value.
- `set.size`: Returns the number of items.
- `Array.from(set)`: Converts to an array.

#### Iteration
```js
for (const item of set) {
  console.log(item)
}
```

Or using `.keys()` / `.values()`:

```js
console.log(set.keys())   // SetIterator
console.log(set.values()) // SetIterator
```

#### Set Operations
##### Interserction:
```js
const intersection = new Set([...set1].filter(x => set2.has(x)))
```

##### Difference:
```js
const difference = new Set([...set1].filter(x => !set2.has(x)))
```

### 🔹 WeakSet
A `WeakSet` is similar to a `Set`, but it only accepts objects as values and does not prevent garbage collection.

#### Characteristics
- Only stores objects.
- Not iterable (no `.forEach`, `.map`, etc.).
- Useful for keeping a list of objects without preventing their cleanup.

Exemple
```js
const user = { id: 1 }
const weakSet = new WeakSet([user])

weakSet.has(user) // true
weakSet.delete(user) // true
```

## ✅ Assertions & Behavior

The script uses `assert` to validate the expected behavior of Set and WeakSet:

- Validates that concatenating arrays produces duplicated values:
```js
  assert.deepStrictEqual(arr3, ["1", "2", "3", "2", "0", "3"])
```

## 📌 Summary

| Feature     | Set                      | WeakSet                  |
|-------------|---------------------------|---------------------------|
| Iterable    | ✅ Yes                    | ❌ No                     |
| Stores      | ✅ Any value              | ✅ Objects only           |
| Duplicates  | ❌ Not allowed            | ❌ Not allowed            |
| Garbage Collected | ❌ No               | ✅ Yes                    |
| Use Case    | Lists of unique values    | Tracking object references without preventing GC |
