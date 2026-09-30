# Tutor Marketplace — Frontend (Step 1: Setup + Auth)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the env file (the default already points at the live backend, so you can leave it as is):
   ```
   copy .env.example .env
   ```

3. Start the dev server:
   ```
   npm run dev
   ```

4. Open the URL it prints (usually `http://localhost:5173`).

## What's working

- Sign up as a learner or tutor
- Log in
- Session persists on refresh (stored in localStorage)
- Top nav shows different links depending on whether you're logged in, and your role

## What's next

- Browse/search tutors page
- Tutor profile view + booking request
- My bookings page (accept/decline/complete)
- Tutor profile edit page
- Reviews
