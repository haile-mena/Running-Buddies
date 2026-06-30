# RunBud

A full-stack web app that helps runners find, chat, and meet up with other runners in their area.

## Stack

- **Backend:** Python, FastAPI, SQLAlchemy, SQLite
- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Auth:** bcrypt password hashing, React Context + localStorage session

## Project Structure

```
Running-Buddies/
├── backend/          # FastAPI + SQLite
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   └── requirements.txt
├── frontend/         # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── api.js
│   └── package.json
└── assets/
    ├── images/       # original image assets
    └── legacy/       # original static HTML/CSS files
```

## Setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## Features

- Public landing, About, and FAQ pages
- User registration and sign-in
- First-time vs. returning user distinction via `is_new` flag
- Onboarding placeholder for new users
- SQLite database for users, matches, and messages

## Notes

- The frontend proxies `/api` requests to the backend during development.
- If you change the database schema, delete `backend/runbud.db` and restart the backend to recreate the tables.
- Original static HTML/CSS files are preserved in `assets/legacy/` for reference.

## Contact

- LinkedIn [menahaile](https://www.linkedin.com/in/menahaile/)
- GitHub [@haile-mena](https://github.com/haile-mena)
- Twitter [@menahaile_](https://twitter.com/menahaile_)
