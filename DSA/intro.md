# Data Structures in Python

Data structures are ways to store and organize data so they can be accessed effectively.

---

## Table of Contents

1. [Built-in Data Structures](#-built-in-data-structures)
   - [List](#1-list)
   - [Tuple](#2-tuple)
   - [Dictionary](#3-dictionary)
   - [Set](#4-set)

---

## Built-in Data Structures

### 1. List

- **Definition:** Ordered, mutable, dynamic collection that can store different data types.
- **Examples:**

  ```python
  l1 = [1, 2, 3, 4]
  l2 = [1, 4.5, "Hello", True]   # Mixed types
  l3 = [1, 2, [4, 5], 6, 7]      # Nested list

  ```

### 2. Tuple

- **Definition**: Ordered, immutable collection.

- **Examples**:

  ```python
  t1 = (1, 2, 3, 4, 5)
  t2 = (1, 4.5, "Hello", True)   # Mixed types
  t3 = (1, 2, (4, 5), 6, 7)      # Nested tuple
  ```

Immutable (cannot modify after creation)

Ordered (supports indexing)

Faster than lists (memory & performance benefits)

### 3. Dictionary

- **Definition**: Mutable collection of key–value pairs (insertion-ordered since Python 3.7+).

- **Examples**:

```python
d1 = {
    "name": "John Doe",
    "age": 23
}
d2 = dict()
```

Keys must be unique & immutable (e.g., str, int, tuple)

Values can be of any type

Access using keys → d1["name"] # John Doe

Supports nesting

### 4. Set

- **Definition**: Mutable, unordered collection of unique elements.

- **Examples**:

```python
s1 = set()               # Empty set
s2 = set("hello")        # {'h', 'e', 'l', 'o'}
s3 = {1, 3, 4, 5}
```

No duplicates

Unordered (no indexing)

Elements must be immutable

Useful for membership tests (in operator) and set operations (union, intersection)
