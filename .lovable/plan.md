

## Piano: Rimuovere il numero di telefono dall'Easter Egg

### Modifica

**File:** `src/components/EasterEgg.tsx`

Rimuovere il link telefonico "333 443 5111" dal footer del modal. Il footer mostrera solo il nome "Luca Versilia", centrato o allineato a sinistra.

### Dettaglio tecnico

Sostituire il `div` footer (righe 53-62) che contiene il layout flex con nome e telefono, con una versione che mostra solo il nome:

```tsx
// Da:
<div className="flex items-center justify-between ...">
  <span>Luca Versilia</span>
  <a href="tel:3334435111">333 443 5111</a>
</div>

// A:
<div className="text-sm text-muted-foreground border-t border-border pt-4">
  <span className="font-medium text-foreground">Luca Versilia</span>
</div>
```

### Cosa NON viene toccato
- Nessun altro file
- Nessun componente di calcolo o dashboard

