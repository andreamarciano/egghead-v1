# ⚛️ React Recap — Syntax, Hooks & Redux

React is a **JavaScript library** for building **user interfaces** using a **component-based** architecture.

## Key Features

- Reusable **components**
- **Declarative** and **reactive** rendering
- Efficient updates via the **virtual DOM**
- Support for **state management** and **hooks**

---

## 📦 Basic Syntax

### ✅ Component

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
```

### ✅ JSX

JSX lets you write HTML-like code inside JavaScript.

```jsx
const name = "Mario";
return <h2>Hello, {name}!</h2>;
```

### ✅ Props (Component Parameters)

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Welcome name="Anna" />
```

### ✅ Local State (`useState`)

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}
```

---

## Main React Hooks

### 1. `useState()`

Manages local state within a functional component.

```jsx
import { useState } from 'react';

function Toggle() {
  const [isOn, setIsOn] = useState(true);
  
  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
```

---

### 2. `useEffect()`

Performs side effects (fetching data, timers, etc.)

```jsx
import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []); // run only on mount

  return <p>Time: {seconds}s</p>;
}
```

---

### 3. `useContext()`

Accesses data from a **React Context**, like global state.

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button>{theme === "light" ? "☀️" : "🌙"}</button>;
}
```

---

### 4. `useRef()`

Stores a **mutable reference** that persists across renders.

```jsx
import { useRef } from 'react';

function InputFocus() {
  const inputRef = useRef();

  const focus = () => inputRef.current.focus();

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focus}>Focus Input</button>
    </>
  );
}
```

---

### 5. `useReducer()`

Alternative to `useState` for complex logic/state transitions.

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
```

---

### 6. Redux (Global State Management)

Redux is used to manage **global state** across your app. Modern React uses **Redux Toolkit** for easier setup.

#### 🔧 Setup Steps

##### 1. Create a slice

```js
// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

##### 2. Configure the store

```js
// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

##### 3. Wrap your app in `<Provider>`

```jsx
// index.jsx
import { Provider } from 'react-redux';
import { store } from './app/store';

<Provider store={store}>
  <App />
</Provider>
```

##### 4. Use it in components

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './features/counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(increment())}>
      Count: {count}
    </button>
  );
}
```

---

## 📊 Summary Table — Hook Comparison

| Hook         | Purpose                            | Rerenders | Example Use Case               |
| ------------ | ---------------------------------- | ---------- | ------------------------------ |
| `useState`   | Local state                        | ✅          | Form fields, toggles           |
| `useEffect`  | Side effects (fetch, timers, etc.) | ✅          | Fetch data on mount            |
| `useContext` | Global/shared values (via context) | ✅          | Theme, user auth, settings     |
| `useRef`     | Mutable value (no re-render)       | ❌          | DOM access, timers, caches     |
| `useReducer` | Complex state logic                | ✅          | Counters, form state, toggles  |
| Redux        | Global app-wide state (external)   | ✅          | Cart, user session, large apps |
