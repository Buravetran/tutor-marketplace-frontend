# Tutor Marketplace — Frontend

The React app for Tutor Marketplace — connecting students who need help with tutors who can teach it.

**Live app:** https://tutor-marketplace-frontend.vercel.app
**Backend repo:** https://github.com/Buravetran/tutor-marketplace-backend


<img width="1685" height="775" alt="Screenshot_30-9-2026_16224_tutor-marketplace-frontend vercel app" src="https://github.com/user-attachments/assets/fe82f2c0-8972-408f-ba95-bf536f804383" />
<img width="1685" height="1058" alt="Screenshot_30-9-2026_16317_tutor-marketplace-frontend vercel app" src="https://github.com/user-attachments/assets/1ce3f88d-52e9-4f16-a334-3ada9abedd7f" />
<img width="1685" height="796" alt="Screenshot_30-9-2026_16523_tutor-marketplace-frontend vercel app" src="https://github.com/user-attachments/assets/c119d8a3-589c-417f-9aa5-1e0e9bf28df6" />
<img width="1685" height="775" alt="Screenshot_30-9-2026_16623_tutor-marketplace-frontend vercel app" src="https://github.com/user-attachments/assets/0a4955d0-ca11-4d51-8fe5-3047f66d0179" />


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
