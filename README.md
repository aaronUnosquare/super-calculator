# Super Calculator

A beginner-friendly Angular 19 calculator built for teaching purposes.
Two methods (`pressToggleSign` and `pressPercent`) are intentionally left empty
as student exercises.

---

## Requirements

| Tool | Minimum version |
|------|----------------|
| Node.js | 18.x or 20.x |
| npm | 8+ |

> Angular 19 does **not** support Node 22+ yet. Stick to Node 18 or 20.

---

## Install

```bash
# 1. Go into the project folder
cd super-calculator

# 2. Install dependencies (only needed once)
npm install
```

---

## Run

```bash
npm start
```

Then open your browser at **http://localhost:4200**

The page reloads automatically every time you save a file.

---

## Project structure

```
src/
└── app/
    ├── app.component.ts    ← component logic (TypeScript)
    ├── app.component.html  ← template (HTML + Angular bindings)
    └── app.component.css   ← styles scoped to this component
```

---

## Student exercises

Open `src/app/app.component.ts` and look for the two `TODO` methods:

### Exercise 1 — `pressToggleSign()`
Make the `+/-` button flip the sign of the displayed number.

```
 5  →  -5
-3  →   3
```

### Exercise 2 — `pressPercent()`
Make the `%` button convert the displayed number to a percentage.

```
50  →  0.5
200 →  2
```

Both methods already have step-by-step hints in the comments above them.

---

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.
