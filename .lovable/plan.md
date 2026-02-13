

## Piano: Rimuovere il link dalla parola "Forfettino" nel primo bullet

### Modifica

**File:** `src/components/EasterEgg.tsx`

Nel primo elemento della lista, la parola "Forfettino" e attualmente un link (`<a>` tag) che punta a `https://forfettino.lovable.app`. Verra trasformata in testo semplice in grassetto, mantenendo lo stile viola.

Da:
```tsx
<a target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-600 ..." href="...">Forfettino</a>
```

A:
```tsx
<span className="font-semibold text-purple-600">Forfettino</span>
```

Il link in basso ("provami") verso `forfettino.it` resta invariato.

