# FELDKIT — Service-Wissen (Gerüst v0.2)

Wissens-App für den Maschinen-Service: Maschinen → Störungen, Checklisten,
Vorschlag-/Freigabe-Workflow und Werkzeuge (Umrechner, Drehmoment, Filter-QC).

Eigenständiges React-Projekt (Vite). Unabhängig vom übrigen Repo-Inhalt.

## Starten

```bash
cd feldkit
npm install
npm run dev
```

Dann die angezeigte URL (Standard: http://localhost:5173) im Browser öffnen.

## Build

```bash
npm run build     # erzeugt dist/
npm run preview   # baut nichts, dient nur zur lokalen Vorschau des Builds
```

## Struktur

- `src/App.jsx` — die komplette App (Screens, Seed-Daten, Werkzeuge)
- `src/main.jsx` — Einstiegspunkt
- `index.html` — HTML-Hülle

## Abhängigkeiten

- react / react-dom
- lucide-react (Icons)
- vite + @vitejs/plugin-react (Build/Dev)
