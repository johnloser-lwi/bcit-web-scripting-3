# Assignment 2 Plan — Video Games Collection App

## Context
Build a full-stack web app (Express + React + MySQL) for a video games collection. Users can browse games filtered by genre, view a single game's details, and perform full CRUD (add, edit, delete) with image uploads for game covers. Due March 23 at 11:59 PM.

Follows patterns established in `week-07/mdia_4294_w08_start/` (best reference).

---

## Directory Structure
```
assignment-02/
├── api/                    # Express backend
│   ├── server.js
│   ├── db.js
│   ├── storage.js
│   ├── package.json
│   ├── exported-db.sql
│   ├── public/
│   │   └── images/         # Uploaded cover images served statically
│   └── routers/
│       ├── games.js        # All game CRUD routes
│       └── genres.js       # Genre listing route
└── web/                    # React frontend (Vite)
    ├── vite.config.js
    ├── package.json
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── pages/
        │   ├── AllGames.jsx      # Archive/listing page
        │   └── SingleGame.jsx    # Detail page for one game
        └── components/
            ├── Header.jsx
            ├── GenreFilter.jsx   # Filter games by genre dropdown
            ├── GameCard.jsx      # Short card used in AllGames listing
            ├── AddGameForm.jsx   # Modal form for adding a game
            └── EditGameForm.jsx  # Modal form for editing a game
```

---

## Database Schema (database named with initials, e.g. `jd_games`)

### `genres` table (secondary)
| Column | Type         | Notes           |
|--------|--------------|-----------------|
| id     | INT PK AI    |                 |
| name   | VARCHAR(100) | e.g. RPG, FPS   |

### `games` table (primary)
| Column       | Type         | Notes                      |
|--------------|--------------|----------------------------|
| id           | INT PK AI    |                            |
| title        | VARCHAR(255) |                            |
| developer    | VARCHAR(255) |                            |
| release_year | YEAR         |                            |
| description  | TEXT         |                            |
| cover_image  | VARCHAR(255) | filename of uploaded image |
| genre_id     | INT FK       | references genres(id)      |

---

## Express Backend (api/)

### Dependencies
```json
{
  "express": "^4.21.2",
  "cors": "^2.8.6",
  "mysql2": "^3.18.0",
  "multer": "^2.1.0",
  "nodemon": "^3.1.9" (devDependency)
}
```

### server.js
- `express.static('public')` — serve uploaded images
- `cors()` — allow React app requests
- `express.json()` — parse JSON bodies
- Mount routers: `/games`, `/genres`

### db.js
- `mysql2.createConnection()` with local DB credentials
- Export connection for use in routers

### storage.js
- `multer.diskStorage` — save to `public/images/`, filename = `Date.now() + originalname`
- Export `upload` middleware

### routers/genres.js
- `GET /genres` — return all genres (for filter dropdown and form select)

### routers/games.js
- `GET /games` — return all games joined with genre name; support optional `?genre_id=` query param for filtering
- `GET /games/:id` — return single game with genre name
- `POST /games` — create game with `upload.single('cover_image')`
- `PUT /games/:id` — update game; handle optional new image upload
- `DELETE /games/:id` — delete game by id

---

## React Frontend (web/)

### Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "vite": "^6.0.5",
  "@vitejs/plugin-react": "^4.3.4"
}
```
No React Router needed — use `useState` to toggle between list and single-item views.

### App.jsx
- State: `currentPage` (`'all'` | `'single'`), `selectedGameId`
- Renders `<AllGames>` or `<SingleGame>` based on `currentPage`

### pages/AllGames.jsx
- Fetches all games on mount via `useEffect`
- Renders `<GenreFilter>` + grid of `<GameCard>` components
- Has "Add Game" button that opens `<AddGameForm>` modal
- On card click → navigate to single view

### pages/SingleGame.jsx
- Fetches single game by id
- Displays full details + cover image
- Has Edit button (opens `<EditGameForm>`) and Delete button
- Back button → return to AllGames

### components/GenreFilter.jsx
- Fetches genres from `/genres`
- `<select>` dropdown including "All Genres" option
- On change → updates filter state in `AllGames`

### components/GameCard.jsx
- Displays cover image (`http://localhost:3000/images/<filename>`), title, developer, genre, year
- Clickable to navigate to SingleGame

### components/AddGameForm.jsx
- Modal with fields: title, developer, release_year, description, genre (select), cover_image (file input)
- Submits as `FormData` via `POST /games`
- On success → close modal, refresh game list

### components/EditGameForm.jsx
- Same fields pre-populated with existing game data
- Submits as `FormData` via `PUT /games/:id`
- On success → close modal, refresh single view

---

## Implementation Order
1. **Database** — create SQL schema, seed genres, seed sample games
2. **api/ setup** — init npm, install deps, create server.js, db.js, storage.js
3. **api/routers/genres.js** — GET all genres
4. **api/routers/games.js** — all 5 routes
5. **web/ setup** — `npm create vite@latest`, install deps
6. **React: AllGames + GameCard + GenreFilter** — list, filter
7. **React: SingleGame** — detail view + delete
8. **React: AddGameForm** — create
9. **React: EditGameForm** — edit
10. **Comments + cleanup** — add detailed in-own-words comments to all files
11. **Export DB** — export `.sql` file to `api/exported-db.sql`

---

## Verification Checklist
- [ ] `GET /games` returns all games with genre name
- [ ] `GET /games?genre_id=1` returns filtered games
- [ ] `GET /games/:id` returns single game
- [ ] `POST /games` with FormData creates new game + saves image to `public/images/`
- [ ] `PUT /games/:id` updates game data
- [ ] `DELETE /games/:id` removes game
- [ ] React: all games listing renders with images
- [ ] React: genre filter updates displayed games
- [ ] React: clicking a game shows the detail view
- [ ] React: Add form submits and list refreshes
- [ ] React: Edit form pre-populates and saves
- [ ] React: Delete button removes game and returns to list
- [ ] `public/images/` accessible as static files from Express
- [ ] No node_modules in submission zip
- [ ] `exported-db.sql` present in api/ folder
- [ ] Database named with initials
