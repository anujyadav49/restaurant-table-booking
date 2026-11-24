# Restaurant Reservation System (MERN)

A simple restaurant website where customers register, log in and book tables,
and an admin confirms or cancels bookings.

## Folder structure

```
restaurant-reservation/
├── backend/      Node + Express + MongoDB (API server, port 5000)
└── frontend/     React + React Bootstrap (website, port 5173)
```

## Run the project

You need Node.js (v18+) and MongoDB running on your computer.

```bash
# Terminal 1 - backend
cd backend
npm install
npm run seed      # creates the admin account (run once)
npm run dev       # starts API on http://localhost:5000

# Terminal 2 - frontend
cd frontend
npm install
npm run dev       # opens website on http://localhost:5173
```

Default admin login (change it in `backend/.env` before running `npm run seed`):

- Email: `admin@restaurant.com`
- Password: `admin123`
