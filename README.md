# CalenBooker MVP Plan

## Purpose and Vision

"CalenBooker MVP" streamlines appointment scheduling for small businesses (e.g., barber shops), allowing owners to sign up, provide business profiles, and schedule client meetings. Key features include minimal signup (email/password), email confirmation, business profile capture, and meeting scheduling. The v1 goal is to generate downloadable `.ics` files for meetings; email notifications are deferred to v2. The system leverages Supabase with Anon Key and RLS for authentication and data storage, hosted on `github.com/fakeneuron/CalenBooker` (branch: `master`).

## Coder Environment

- **Coder**: Novice, using Terminal, VS Code, Node.js v20.18.0, npm v11.1.0, Git on Mac OS.

## Project Coding Overview

### Progress (Completed)

1. **Initialize Project**:

   - Git repository: `github.com/fakeneuron/CalenBooker` (branch: `master`).
   - Project structure:
     - `Calenbooker/frontend`: React app (port 4000) with `react-scripts@5.0.1`.
     - `Calenbooker/backend`: Express app (port 4001, minimal setup for future v2 features).
     - `Calenbooker/supabase/`: Local SQL snippets (source of truth).
     - `Calenbooker/README.md`: Main project documentation (root-level).

2. **Frontend Setup**:

   - Tailwind CSS via CDN (`2.2.19`) in `public/index.html` and local dependency (`3.4.17`).
   - **Structure**:
     - `frontend/src/pages/`:
       - `Home.js`: Landing page for unauthenticated users (`/`).
       - `Signup.js`: Signup screen with login link (`/signup`).
       - `SignupSuccess.js`: Confirmation screen after signup (`/signup-success`).
       - `Login.js`: Login screen with signup link and enhanced unconfirmed user feedback (`/login`).
       - `AuthConfirm.js`: Handles email confirmation redirect to `/dashboard` (`/auth/confirm`).
       - `Dashboard.js`: Dashboard screen, default post-login page (`/dashboard`).
       - `BusinessProfile.js`: Business profile screen (`/business-profile`).
       - `ScheduleMeeting.js`: Scheduling screen (`/schedule-meeting`).
     - `frontend/src/components/`:
       - `Navbar.js`: Navigation bar for protected routes, redirects to `/` on logout.
     - `frontend/src/`:
       - `App.js`: Root component with routing and Supabase auth state management.
       - `index.js`: Entry point rendering `App.js` with routing.
       - `index.css`: Tailwind CSS setup (placeholder for custom styles).
       - `supabaseClient.js`: Supabase client initialization with Anon Key from `.env`.
   - Routing with `react-router-dom@7.2.0`.
   - Dependencies in `frontend/package.json`: `react@19.0.0`, `@supabase/supabase-js@2.49.1`, etc.
   - `frontend/public/index.html`: Includes Tailwind CSS CDN.

3. **Backend Setup**:

   - Minimal Express app in `backend/server.js` with Supabase client (Anon Key from `backend/.env`).
   - Runs on port 4001, responds with a hello message, reserved for v2 features (e.g., email notifications).
   - Dependencies in `backend/package.json`: `express@4.21.2`, `@supabase/supabase-js@2.49.1`, `cors@2.8.5`, `dotenv@16.4.7`.

4. **Supabase SQL Snippets**:
   - Tables: `business_profile`, `meetings`.
   - Views: `users_view` for email checks.
   - RLS policies for secure data access.

### Supabase SQL Snippets

- **Storage**: `Calenbooker/supabase/`—source of truth, duplicated in SQL Editor (sync script pending).
- **Snippets**:
  - **`create_tables.sql`**: Defines `business_profile` and `meetings` tables linked to `auth.users`.
  - **`rls.sql`**: Enables RLS and defines policies for `INSERT`, `UPDATE`, `SELECT` on tables.
  - **`users_view_setup.sql`**: Creates `users_view` and grants Anon Key `SELECT` access for email checks.

### Remaining (v1)

1. **Scheduling Meetings**:

   - Implement `.ics` file generation for scheduled meetings in `ScheduleMeeting.js`.

2. **Domain Hosting**:
   - Confirm HTTPS on `fakeneuron.com` post-DNS propagation.

### v2 Considerations

- Email notifications with MailerSend.
- Real-time password feedback in `Signup.js`.
- Self-scheduling for clients.
- Multi-employee support.
- Analytics dashboard.

### Technical Approach

- **Frontend**:

  - React (`19.0.0`) with `react-router-dom@7.2.0`.
  - Tailwind CSS (`3.4.17` local via `index.css`, `2.2.19` CDN in `index.html`).
  - Supabase client with Anon Key from `.env`.
  - Runs on port 4000.

- **Backend**:
  - Node.js/Express (`4.21.2`).
  - Supabase client with Anon Key.
  - Runs on port 4001 (minimal setup for v2 expansion).

### Action Items and Next Steps

1. **Implement `.ics` File Generation**:

   - Research and integrate into `ScheduleMeeting.js`.

2. **Confirm HTTPS Setup**:

   - Verify `fakeneuron.com` serves HTTPS.

3. **Plan for v2**:
   - Prioritize features based on user feedback.
