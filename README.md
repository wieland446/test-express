# Chemtrailblazed — Interactive Periodic Table

A full-stack web application for exploring all 118 chemical elements with interactive filtering, detail modals, and atom animations.

---

## Tech Stack

| Layer         | Technology                            |
| ------------- | ------------------------------------- |
| Frontend      | Vue.js 3, Axios                       |
| Backend       | Node.js, Express 4, TypeScript 5      |
| Database      | PostgreSQL 15                         |                         
| Deployment    | Docker Compose, nginx                 |

---

## Features

- **Full periodic table** — all 118 elements laid out in the standard 18-group / 7-period grid, with lanthanides and actinides displayed in a separate row below
- **Real-time search** — filter by element name, symbol, or atomic number as you type
- **Category filtering** — narrow by element type (alkali metals, halogens, noble gases, lanthanides, actinides, and more)
- **Element detail modal** — click any element to see its full properties; closes with ESC
- **Atom animation** — animated component for visual flair
- **Loading screen** — shown during initial data fetch
- **REST API** — paginated element listing and name-based lookup with input validation and 1-hour HTTP cache headers
- **Health endpoint** — `/health` for Docker orchestration

## Security

- Helmet security headers
- CORS restricted to configurable origin
- Rate limiting — 100 requests / 15 minutes
- Parameterized SQL queries (no injection risk)
- Environment variable validation on startup
- Graceful shutdown with connection pool cleanup

---

## Project Structure

```
├── backend/          # Express + TypeScript API
│   └── src/
│       ├── controllers/
│       ├── repositories/
│       ├── models/
│       ├── routes/
│       ├── databases/
│       ├── middlewares/
│       └── helpers/
├── frontend/         # Vue.js SPA
│   └── src/
│       ├── components/   # ElementModal, FilterPanel, AtomAnimation, LoadingScreen
│       └── App.vue
├── db/
│   └── init/
│       ├── 01-tables.sql # Schema with constraints and indexes
│       └── 02-seed.sql   # All 118 elements pre-seeded
└── docker-compose.yml
```

---

## Getting Started

Copy the environment template and fill in your values:

```
cp .env.example .env
```

Then start all services with Docker:

```
docker compose up
```

Visit [http://localhost:8080](http://localhost:8080).

### Rebuild after code changes

```
docker compose down
docker compose build --no-cache
docker compose up
```
