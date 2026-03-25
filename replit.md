# Calcolatore RAL → Netto 2025

An Italian salary calculator (RAL to net salary) for 2025, built with React + Vite + shadcn/ui.

## Architecture

- **Pure frontend app** — React 18 with TypeScript, no backend server needed
- **Routing**: React Router v6
- **UI**: shadcn/ui components with Tailwind CSS
- **State**: React hooks with TanStack Query
- **Build**: Vite with @vitejs/plugin-react-swc

## Key Features

- Calculate net salary from gross (RAL) for Italian employees in 2025
- City-based tax calculation (Milan, Bologna, Rome, Naples)
- Breakdown of IRPEF, INPS contributions, regional/municipal taxes
- City comparison view
- Includes 2025 fiscal rules: cuneo fiscale bonus, trattamento integrativo

## Folder Structure

- `src/pages/` — Page components (Index, NotFound)
- `src/components/` — UI components (RalInput, CitySelector, ResultCard, etc.)
- `src/hooks/` — Custom hooks (useCalcolatore, use-toast, use-mobile)
- `src/data/` — City configurations and fiscal data
- `src/utils/` — Calculation utilities and formatters
- `src/types/` — TypeScript types

## Running the App

```bash
npm run dev   # starts on port 5000
npm run build # production build
```

## Notes

- No database — all calculations are done client-side
- Migrated from Lovable to Replit (March 2025)
- Removed Lovable-specific dependencies (lovable-tagger) and Supabase boilerplate (was unused)
