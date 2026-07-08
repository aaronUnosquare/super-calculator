# Plan — Ejercicio 3: Toggle de tema Claro/Oscuro (`toggleTheme`)

## Objetivo
Permitir que la calculadora alterne entre modo oscuro (por defecto) y modo claro
cada vez que se pulsa el botón `🌙 Dark / ☀️ Light`, cambiando la propiedad
`isLightMode` y aplicando los estilos correspondientes.

## Archivos involucrados
- `src/app/app.component.ts` — método `toggleTheme()` y binding de clase en el host.
- `src/app/app.component.css` — reglas de estilo para el modo claro.

---

## Paso 1 — Implementar `toggleTheme()` en `app.component.ts`
Invertir el valor de `this.isLightMode` con el operador NOT (`!`):

```ts
toggleTheme(): void {
  this.isLightMode = !this.isLightMode;
}
```

## Paso 2 — Aplicar la clase `light` al elemento host
El selector CSS `:host.light` aclara el fondo de **toda la página**, así que la
clase `light` debe vivir en el elemento host (`app-root`), no solo en el
`.calculator`. Se añade un host binding a los metadatos del componente:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Aplica la clase 'light' al host (app-root) cuando isLightMode es true.
  host: { '[class.light]': 'isLightMode' },
})
```

La plantilla ya enlaza `[class.light]="isLightMode"` en el `.calculator`, por lo
que el CSS de los botones/display se actualiza automáticamente al alternar la
propiedad.

## Paso 3 — Rellenar el CSS de modo claro en `app.component.css`
Completar las reglas que traían un `TODO` con colores legibles sobre fondo claro:

| Selector | Propiedad | Valor |
|---|---|---|
| `:host.light` | `background` | `#f0f0f0` |
| `.calculator.light` | `background` | `#ffffff` |
| `.calculator.light .display` | `background` | `#e0e0e0` |
| `.calculator.light .display__value` | `color` | `#1a1a1a` |
| `.calculator.light .btn` | `background` / `color` | `#d4d4d4` / `#1a1a1a` |
| `.calculator.light .btn--utility` | `background` / `color` | `#c0c0c0` / `#333333` |

**Detalle importante:** el color del número mostrado no vive en `.display`, sino
en `.display__value`. Por eso se añadió una regla específica
`.calculator.light .display__value { color: #1a1a1a; }` que no estaba en la
plantilla de `TODO`s original.

Además se añadieron estados interactivos para que los botones se sientan vivos en
modo claro:

```css
.calculator.light .btn:hover    { background: #c8c8c8; }
.calculator.light .btn:active   { background: #bcbcbc; }
.calculator.light .btn--utility:hover { background: #b4b4b4; }
```

---

## Resultado esperado

| `isLightMode` antes | `isLightMode` después | Etiqueta del botón |
|---|---|---|
| `false` | `true`  | `☀️ Light` |
| `true`  | `false` | `🌙 Dark`  |

Al pulsar el botón, toda la página y la calculadora cambian entre el tema oscuro
y el claro, con el display y los botones manteniendo buen contraste.
