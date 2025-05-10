
# Reflect

This module explores the `Reflect` API in JavaScript, which provides methods for interceptable JavaScript operations. It is considered a more secure and semantic alternative to some of the older object manipulation approaches.

## 📘 Concepts Covered

### ✅ Motivation

The `Reflect` object provides a set of static methods that mirror the fundamental operations of JavaScript. These methods are:

- Semantic
- Secure
- Perform better in certain use cases

---

## 🧪 Examples

### 🔹 `Reflect.apply`

Secure way to call functions with a specific context and arguments:

```js
Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]) // 260
```

This avoids issues that can arise when `.apply()` is overridden:

```js
myObj.add.apply = function () { throw new TypeError('Get some data!') }
```

### 🔹 `Reflect.defineProperty`

Safer alternative to `Object.defineProperty`:

```js
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude!' })
```

### 🔹 `Reflect.deleteProperty`

More performant and semantic than using `delete`:

```js
Reflect.deleteProperty(withReflection, 'user')
```

### 🔹 `Reflect.get`

Attempts to get a property, throws if the target is not an object:

```js
Reflect.get(1, 'userName') // Throws TypeError
```

### 🔹 `Reflect.has`

Checks if a property exists:

```js
Reflect.has({ batman: 'Bruce Wayne' }, 'batman') // true
```

### 🔹 `Reflect.ownKeys`

Retrieves all own property keys of an object, including symbols:

```js
Reflect.ownKeys(databaseUser)
```

Equivalent to:

```js
[
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]
```

---

## 📌 Summary

- The `Reflect` API is safer and more robust than older JavaScript object manipulation methods.
- Avoids side effects from method overrides (e.g., `apply`, `delete`).
- Gives consistent and reliable results, especially when working with proxies or meta-programming.

---

