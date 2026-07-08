# Plan — Revisar y arreglar los tests

## Prompt original
> Crea el plan de trabajo para revisar y arreglar los tests, si no existen debes de crearlo

## Contexto
El proyecto tiene un único archivo de tests, `src/app/app.component.spec.ts`, que
**sí existe** pero está en dos estados problemáticos:

1. **El runner no puede ejecutarse.** `package.json` no tiene script `test` y le
   faltan las devDependencies de Karma/Jasmine (`karma`, `karma-jasmine`,
   `karma-chrome-launcher`, `karma-jasmine-html-reporter`, `karma-coverage`,
   `jasmine-core`). La configuración sí está completa (`karma.conf.js`,
   `tsconfig.spec.json`, y el target `test` en `angular.json`), por lo que hoy
   `ng test` falla con `Cannot find module 'karma'`.
2. **9 tests siguen sin implementar** — son marcadores `pending(...)` con el
   comentario `🎯 YOUR TURN`. Los tests de los Ejercicios 1 y 2 ya se
   completaron; faltan los del "Part 2" de `requirements.md`.

Objetivo: dejar la suite ejecutable de punta a punta (`npm test`) y con los 9
tests implementados y en verde, sin romper los 8 tests ya existentes.

## Alcance acordado
- **Reparar el runner**: añadir devDependencies + script `test` + `npm install`.
- **Completar los 9 tests** `pending()`.
- **Guardar este plan** en `docs/plan-tests.md` (con el prompt).

---

## Paso 1 — Reparar el runner de tests

### 1a. `package.json`
Añadir el script de test:
```json
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test"
}
```
Añadir a `devDependencies` (versiones compatibles con Angular 19, las de
`ng new`):
```json
"jasmine-core": "~5.6.0",
"karma": "~6.4.0",
"karma-chrome-launcher": "~3.2.0",
"karma-coverage": "~2.2.0",
"karma-jasmine": "~5.1.0",
"karma-jasmine-html-reporter": "~2.1.0"
```

### 1b. Instalar
Ejecutar `npm install` para bajar los paquetes y actualizar `package-lock.json`.

---

## Paso 2 — Completar los 9 tests en `src/app/app.component.spec.ts`
Reemplazar cada `pending(...)` por aserciones reales, siguiendo el patrón ya
usado en los tests `✅` (DOM vía `fixture.nativeElement.querySelector('.display__value')`
tras `fixture.detectChanges()`; estado interno vía `component.*`).

| # | Línea | Test | Implementación |
|---|-------|------|----------------|
| 1 | ~63 | multi-dígito | `pressDigit('1'); pressDigit('2'); detectChanges();` display `'12'` |
| 2 | ~69 | punto decimal | `pressDigit('1'); pressDigit('.'); detectChanges();` display contiene `'.'` |
| 3 | ~74 | un solo punto | `pressDigit('1'); pressDigit('.'); pressDigit('.'); detectChanges();` display **no** contiene `'..'` (es `'1.'`) |
| 4 | ~94 | Clear cancela operación | `pressDigit('5'); pressOperator('+'); pressDigit('3'); pressClear();` → `component.firstOperand === null` y `component.operator === null` |
| 5 | ~115 | resta 9−4=5 | patrón addition, operador `'-'`, display `'5'` |
| 6 | ~120 | resultado negativo 3−7 | operador `'-'`, display `'-4'` |
| 7 | ~127 | multiplicación 6×7=42 | operador `'*'`, display `'42'` |
| 8 | ~159 | división no exacta 7÷2 | operador `'/'`, display `'3.5'` |
| 9 | ~180 | encadenar 2+3*4=20 | `pressDigit('2'); pressOperator('+'); pressDigit('3'); pressOperator('*'); pressDigit('4'); pressEquals();` display `'20'` (2+3=5, 5*4=20; sin `=` intermedio) |

Ejemplo (resta, siguiendo el test de suma en la línea 100):
```ts
it('should subtract two numbers correctly', () => {
  component.pressDigit('9');
  component.pressOperator('-');
  component.pressDigit('4');
  component.pressEquals();
  fixture.detectChanges();
  const displayEl = fixture.nativeElement.querySelector('.display__value');
  expect(displayEl.textContent.trim()).toBe('5');
});
```

Notas de comportamiento verificadas contra `app.component.ts`:
- `pressOperator` encadena: si hay operación pendiente y no se espera segundo
  operando, llama a `calculate()` primero (por eso el test #9 da 20).
- `calculate()` formatea con `parseFloat(result.toPrecision(10)).toString()`, así
  que `7/2` → `'3.5'` y `3-7` → `'-4'` sin ruido de coma flotante.

---

## Paso 3 — Guardar el plan en `docs/`
Copiar este plan a **`docs/plan-tests.md`** (mismo patrón que
`docs/plan-ejercicio-1.md`), incluyendo el prompt original de arriba.

---

## Verificación
1. `npm test` → debe arrancar Karma y ejecutar la suite. Para correr una sola vez
   sin watch y sin GUI: `npm test -- --watch=false --browsers=ChromeHeadless`.
   Esperado: **17 tests en verde, 0 pending**.
   - ⚠️ Requiere Chrome/Chromium instalado en la máquina (Karma usa el launcher de
     Chrome). Si el entorno no tiene navegador, la instalación y el código quedan
     correctos pero la ejecución debe hacerse en una máquina con Chrome.
2. `ng build` → sigue compilando sin errores.

## Archivos a modificar / crear
- `package.json` — script `test` + devDependencies de Karma/Jasmine.
- `package-lock.json` — actualizado por `npm install`.
- `src/app/app.component.spec.ts` — completar 9 tests `pending()`.
- `docs/plan-tests.md` — nuevo (copia de este plan).
