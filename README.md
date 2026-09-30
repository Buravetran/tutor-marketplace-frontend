# Tutor Marketplace — Frontend

The React app for Tutor Marketplace — connecting students who need help with tutors who can teach it.

**Live app:** https://tutor-marketplace-frontend.vercel.app
**Backend repo:** https://github.com/Buravetran/tutor-marketplace-backend

<!--
Add screenshots here once you've taken them. In GitHub, drag an image directly into
the README editor and it uploads and links itself automatically. Good ones to add:
- The "Find a tutor" browse/search page
- A tutor's profile with reviews
- The "My bookings" page
-->![alt text](Screenshot_30-9-2026_16213_tutor-marketplace-frontend.vercel.app.jpeg) ![alt text](Screenshot_30-9-2026_16623_tutor-marketplace-frontend.vercel.app.jpeg) ![alt text](Screenshot_30-9-2026_16523_tutor-marketplace-frontend.vercel.app.jpeg) ![alt text](Screenshot_30-9-2026_16317_tutor-marketplace-frontend.vercel.app.jpeg) ![alt text](Screenshot_30-9-2026_16224_tutor-marketplace-frontend.vercel.app.jpeg)

## Features

- Sign up and log in as a learner or tutor, with the session persisting on refresh
- Browse and search tutors by subject, sorted by rating
- View a tutor's profile, subjects, price/availability, and reviews
- Request a booking as a learner
- Accept, decline, or complete bookings as a tutor (or complete as a learner)
- Leave a review after a completed session
- Tutors can create and edit their own profile

## Tech Stack

- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Hosting:** Vercel

## Running Locally

```bash
npm install
cp .env.example .env   # points at the live backend by default
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## What's Next

- Curated learning resources per subject
- In-app messaging between learner and tutor

---

Built by [Biruk Girma (Bura)](https://github.com/Buravetran)
