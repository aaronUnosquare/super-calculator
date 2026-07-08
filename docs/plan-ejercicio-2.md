# Plan — Ejercicio 2: Porcentaje (`pressPercent`)

## Prompt original
> crea el plan para el ejercicio 2. Igual crea el md del plan e incluye el prompt

## Contexto
El `AppComponent` de la calculadora tiene métodos intencionalmente vacíos para
que el estudiante los complete. El Ejercicio 2 es el método `pressPercent()`
(botón `%`), que actualmente solo contiene un `TODO` en
`src/app/app.component.ts:163`. Debe convertir el número mostrado en su
equivalente porcentual (dividir entre 100). Además, en
`src/app/app.component.spec.ts` hay un test marcado `🎯 YOUR TURN` (~línea 232)
que usa `pending()` como marcador y debe completarse tras implementar el método.
Seguimos el mismo patrón usado en los Ejercicios 1 y 3.

## Alcance acordado
Implementar el método **y** completar el test unitario asociado (mismo alcance
que el Ejercicio 1).

---

## Paso 1 — Implementar `pressPercent()` en `src/app/app.component.ts`
Reemplazar el cuerpo con `TODO` (líneas ~163-168) por la lógica de porcentaje,
siguiendo los pasos del enunciado en `requirements.md`:

```ts
pressPercent(): void {
  const value = parseFloat(this.display) / 100; // Pasos 1 y 2
  this.display = value.toString();              // Paso 3
}
```

Comportamiento esperado:

| Display antes | Display después |
|---------------|-----------------|
| `50`          | `0.5`           |
| `200`         | `2`             |
| `1`           | `0.01`          |

## Paso 2 — Completar el test en `src/app/app.component.spec.ts`
Reemplazar la llamada `pending(...)` (~línea 232) por aserciones reales,
siguiendo el patrón de los demás tests del archivo:

```ts
// 50 → % → 0.5
it('should divide the displayed number by 100 when % is pressed', () => {
  component.pressDigit('5');
  component.pressDigit('0');
  component.pressPercent();
  expect(component.display).toBe('0.5');
});
```

## Paso 3 — Guardar el plan en `docs/`
Tras la aprobación, copiar este plan a **`docs/plan-ejercicio-2.md`** (mismo
patrón que `docs/plan-ejercicio-1.md` y `docs/plan-ejercicio-3.md`), incluyendo
el prompt original de arriba.

---

## Verificación
1. `npm test` / `ng test` → el test del Ejercicio 2 debe pasar (ya no `pending`),
   sin romper los tests existentes. Nota: en este entorno `karma` no está
   instalado, así que puede requerir un entorno con las dependencias de test.
2. `ng build` → debe compilar sin errores de TypeScript.
3. Opcional manual: `npm start` → http://localhost:4200, escribir `50` y pulsar
   `%`; el display debe mostrar `0.5`.

## Archivos a modificar / crear
- `src/app/app.component.ts` — implementar `pressPercent()`.
- `src/app/app.component.spec.ts` — completar 1 test del Ejercicio 2.
- `docs/plan-ejercicio-2.md` — nuevo (copia de este plan).
