# Plan — Ejercicio 1: Toggle de Signo (`pressToggleSign`)

## Prompt original
> Crea el plan para resolver el ejercicio 1. Recuerda que cada plan aprobado se
> debe guardar dentro de la carpeta docs como se hizo con el plan del ejercicio 3.
> Incluye este prompt.

## Contexto
El `AppComponent` de la calculadora tiene tres ejercicios con métodos
intencionalmente vacíos para que el estudiante los complete. El Ejercicio 1 es el
método `pressToggleSign()` (botón `+/-`), que actualmente solo contiene un `TODO`
en `src/app/app.component.ts:150`. Además, en `src/app/app.component.spec.ts` hay
dos tests unitarios marcados `🎯 YOUR TURN` que usan `pending()` como marcador y
deben completarse una vez implementado el método. El objetivo es que el botón
`+/-` invierta el signo del número mostrado, manejando el caso borde del `0`.

## Alcance acordado
Implementar el método **y** completar los 2 tests unitarios asociados.

---

## Paso 1 — Implementar `pressToggleSign()` en `src/app/app.component.ts`
Reemplazar el cuerpo con `TODO` (líneas ~150-155) por la lógica de inversión de
signo, siguiendo los pasos del enunciado en `requirements.md`:

```ts
pressToggleSign(): void {
  const value = parseFloat(this.display) * -1;   // Pasos 1 y 2
  this.display = value === 0 ? '0' : value.toString(); // Paso 3 + caso borde (evita '-0')
}
```

Comportamiento esperado:

| Display antes | Display después |
|---------------|-----------------|
| `5`           | `-5`            |
| `-3`          | `3`             |
| `0`           | `0` (sin cambio)|

El caso borde `value === 0` evita que aparezca `-0` en pantalla.

## Paso 2 — Completar los 2 tests en `src/app/app.component.spec.ts`
Reemplazar las llamadas `pending(...)` (líneas ~200 y ~206) por aserciones reales,
siguiendo el patrón de los demás tests del archivo (`pressDigit` / `pressToggleSign`):

```ts
// positivo → negativo
it('should change a positive number to negative when +/- is pressed', () => {
  component.pressDigit('5');
  component.pressToggleSign();
  expect(component.display).toBe('-5');
});

// negativo → positivo (doble toggle)
it('should change a negative number to positive when +/- is pressed', () => {
  component.pressDigit('5');
  component.pressToggleSign();
  component.pressToggleSign();
  expect(component.display).toBe('5');
});
```

## Paso 3 — Guardar el plan en `docs/`
Tras la aprobación, copiar este plan a **`docs/plan-ejercicio-1.md`** (mismo patrón
que `docs/plan-ejercicio-3.md`), incluyendo el prompt original de arriba.

---

## Verificación
1. `npm test` → los 2 tests del Ejercicio 1 deben pasar (ya no `pending`), sin
   romper los tests existentes.
2. Opcional manual: `npm start` → http://localhost:4200, escribir un número y
   pulsar `+/-`; el signo debe alternar y `0` debe permanecer como `0`.

## Archivos a modificar / crear
- `src/app/app.component.ts` — implementar `pressToggleSign()`.
- `src/app/app.component.spec.ts` — completar 2 tests del Ejercicio 1.
- `docs/plan-ejercicio-1.md` — nuevo (copia de este plan).
