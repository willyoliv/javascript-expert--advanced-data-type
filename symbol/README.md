# Symbol in JavaScript

This example explores the use of the `Symbol` primitive type in JavaScript, including how it ensures uniqueness, protects internal properties, and interacts with well-known symbols like iterators and coercion methods.

## 📚 Topics Covered

- Basics of `Symbol` as a unique key
- Use of `Symbol.for` and `Symbol()` distinction
- Accessing symbols with `Object.getOwnPropertySymbols`
- Well-known symbols:
  - `Symbol.iterator`
  - `Symbol.asyncIterator`
  - `Symbol.toPrimitive`
  - `Symbol.toStringTag`

---

## ✅ Assertions

- Symbols create truly unique keys: `Symbol('x') !== Symbol('x')`
- `Object.getOwnPropertySymbols` can retrieve symbol keys from an object
- `Symbol.for(key)` reuses the symbol across code if the same key is used
- Using `Symbol.iterator` allows objects to be iterable
- `Symbol.asyncIterator` enables asynchronous iteration with `for await...of`
- Custom coercion using `Symbol.toPrimitive` allows control over object conversion
- Custom `[Symbol.toStringTag]` changes the result of `Object.prototype.toString.call(...)`

---

## ⚙️ Behavior

- Symbols used as keys do not collide with string keys or with other symbols.
- Objects can define behavior for iteration (`for...of`), async iteration, coercion to primitive values, and how they are stringified.
- A custom class `MyDate` demonstrates:
  - Private storage using a `Symbol` key.
  - Iteration over dates.
  - Async iteration with a simulated delay.
  - Coercion to a localized string of dates.
  - Custom `[object WHAT?]` tag via `Symbol.toStringTag`.

---

## 📝 Summary

Symbols are a powerful feature in JavaScript that allow you to:

- Create truly unique property keys.
- Define internal, non-colliding fields in objects.
- Tap into the language's behavior customization points using *well-known symbols*.
- Implement and control how objects behave in string coercion, iteration, and developer tools.

They are especially useful when building frameworks, libraries, or complex APIs where you need to safely extend or protect object behavior.

---

```bash
node symbol.js
```