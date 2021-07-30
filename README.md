# React Hooks

> React Hooks - Tips only the pros know

## References

### Rules

**Basic**

- Can only be used in functional components
- start with use (useForms, useAuth)

---

# useState()

- returns stateful values
- useState returns tuples
- a setState method can be used inside of, but not defined inside of `useEffect()`

```tsx
const [myState, setMyState] = useState(null)
// Can be used with callbacks instead of static values when function return values (like calculations) are needed
const [person, setPerson] = useState(() => initialPerson)
setPerson((state) => ({...state, firstName, e.target.value}))
if (newPerson.firstname === "Ford") {
  setPerson((person) => ({
    ...person,
    surname: "Perfect",
    address: "Outer Space",
    email: "",
    phone: "",
  }))
}
```

---

# useEffect()

- Used for side effects
- Empty array is used to add 'dependancies'
- Returns:
  - undefined (or)
  - a cleanup function
  - Never return a promise
  - With no dependancies ([]), will fire only when the component is mounted
    - Will also fire when the component is unmounted if there is a cleanup function
  - With dependancies ([person]), will fire every time any of the dependancies update
- Functions can be created and called within `useEffect` to get async data

```tsx
useEffect(() => {
  const getPerson = async () => {
    const person = await localforage.getItem<Person>("person")
    setPerson(person ?? initialPerson)
  }
  getPerson()
}, [])
```

### With Dependancies

- With dependancies ([person]), will fire every time any of the dependancies update

```tsx
useEffect(() => {
  savePerson(person)
}, [person])
```

### Side effect with cleanup

```tsx
useEffect(() => {
  const handle = setInterval(() => {
    // Do something every second
    clearInterval(handle)
  })
}, [])
```

---

# useContext()

> Accepts **a context object** and returns its current value

### Creating a context

```tsx
export const themeContext = createContext<ThemeContext>({
  style: undefined,
  setStyle: () => void null,
})

export function ThemeProvider({ children }: Props): ReactElement {
  const [style, setStyle] = useState<CSSProperties>()

  return (
    <themeContext.Provider value={{ style, setStyle }}>
      {children}
    </themeContext.Provider>
  )
}
```

### Using the context

```tsx
export function App(): ReactElement {
  const {style} = useContext(themeContext)

  return (
    <div className="container" style={style}>
      <BrowserRouter>
        <AppNavbar />
        <Routes />
      </BrowserRouter>
  )
}
```

---

# Custom Hooks

- Used to make component code reusable
- Great for extracting code from components
  - (even when reuse is not the goal)
- Custom hooks can use other React hooks as needed

## Creating a `usePerson()` hook

```tsx
import { useState, useEffect } from "react"
import localforage from "localforage"

import type { Person } from "../types/person"

function savePerson(person: Person | null): void {
  console.log("Saving", person)
}

export function usePerson(initialPerson: Person) {
  const [person, setPerson] = useState<Person | null>(null)

  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person")
      setPerson(person ?? initialPerson)
    }

    getPerson()
  }, [initialPerson])

  useEffect(() => {
    savePerson(person)
  }, [person])

  return [person, setPerson] as const
}
```
