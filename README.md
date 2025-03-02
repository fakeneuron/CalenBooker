# CalenBooker MVP Plan

## Purpose and Vision

"CalenBooker MVP" streamlines appointment scheduling for small businesses (e.g., barber shops), allowing owners to sign up, provide business profiles, and schedule client meetings with client notifications. Key features include minimal signup (email/password), email confirmation, business profile capture, and meeting scheduling with a shareable webpage displaying meeting details and calendar integration options (e.g., `.ics`, Google Calendar, Outlook); full email notifications are deferred to v2. The system leverages Supabase with Anon Key and RLS for authentication and data storage, hosted on `github.com/fakeneuron/CalenBooker` (branch: `master`).

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
       - `Login.js`: Login screen with signup link (`/login`).
       - `AuthConfirm.js`: Handles email confirmation redirect to `/dashboard` (`/auth/confirm`).
       - `Dashboard.js`: Dashboard screen with meetings table, default post-login page (`/dashboard`).
       - `BusinessProfile.js`: Business profile screen (`/business-profile`).
       - `ScheduleMeeting.js`: Scheduling screen with meeting URL generation (`/schedule-meeting`).
       - `MeetingConfirmation.js`: Client-facing meeting confirmation page (`/meeting-confirmation/:id`).
     - `frontend/src/components/`:
       - `Navbar.js`: Navigation bar for protected routes, redirects to `/` on logout.
       - `MeetingsTable.js`: Reusable table displaying user’s meetings.
     - `frontend/src/`:
       - `App.js`: Root component with routing and Supabase auth state management.
       - `index.js`: Entry point rendering `App.js` with routing.
       - `index.css`: Tailwind CSS setup (placeholder for custom styles).
       - `supabaseClient.js`: Supabase client initialization with Anon Key from `.env`.
   - Routing with `react-router-dom@7.2.0`.
   - Dependencies in `frontend/package.json`: `react@19.0.0`, `@supabase/supabase-js@2.49.1`, etc.
   - `frontend/public/index.html`: Includes Tailwind CSS CDN.
   - Added `frontend/public/_redirects` to handle SPA routing on Netlify (`/* /index.html 200`).

3. **Backend Setup**:

   - Minimal Express app in `backend/server.js` with Supabase client (Anon Key from `backend/.env`).
   - Runs on port 4001, responds with a hello message, reserved for v2 features (e.g., email notifications).
   - Dependencies in `backend/package.json`: `express@4.21.2`, `@supabase/supabase-js@2.49.1`, `cors@2.8.5`, `dotenv@16.4.7`.

4. **Supabase SQL Snippets**:

   - Tables: `business_profile`, `meetings`.
   - Views: `users_view` for email checks.
   - RLS policies for secure data access.

5. **Client Meeting Notification System**:

   - URL generation added to `ScheduleMeeting.js` (e.g., `/meeting-confirmation/<id>`).
   - `MeetingConfirmation.js` displays meeting and business details with calendar integration (`.ics`, Google Calendar, Outlook) using manual `.ics` file generation, removing dependency on `ics` library to resolve `runes` error.
   - Removed unused `ics` and `runes` dependencies from `frontend/package.json`.

6. **Deployment**:
   - Built and deployed frontend to Netlify, redirected to https://fakeneuron.com with HTTPS enabled.
   - Added `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` to Netlify environment variables for secure configuration, keeping `.env` out of GitHub with `.gitignore`.

### Supabase SQL Snippets

- **Storage**: `Calenbooker/supabase/`—source of truth, duplicated in SQL Editor (sync script pending).
- **Snippets**:
  - **`create_tables.sql`**: Defines `business_profile` and `meetings` tables linked to `auth.users`.
  - **`rls.sql`**: Enables RLS and defines policies for `INSERT`, `UPDATE`, `SELECT` on tables.
  - **`users_view_setup.sql`**: Creates `users_view` and grants Anon Key `SELECT` access for email checks.

### Remaining (v1)

1. **Client Meeting Notification System**:
   - **Purpose**: Enable businesses to schedule meetings and automatically generate a client-facing notification with appointment details and calendar integration options (e.g., `.ics` download, Google Calendar link, Outlook integration).
   - **Progress**:
     - URL generation added to `ScheduleMeeting.js` (e.g., `/meeting-confirmation/<id>`).
     - `MeetingConfirmation.js` displays meeting and business details (public access for v1) with `.ics`, Google Calendar, and Outlook integration completed.
   - **To-Do**:
     - Require a completed `business_profile` before allowing meeting scheduling in `ScheduleMeeting.js`.
2. **Domain Hosting**:
   - Confirm HTTPS on `fakeneuron.com` post-DNS propagation (verified via Netlify deployment).

### v2 Considerations

- Automate client notification emails with MailerSend integration.
- Real-time password feedback in `Signup.js`.
- Self-scheduling for clients.
- Multi-employee support.
- Analytics dashboard.
- **Move sensitive operations (e.g., email notifications, data writes) to the backend with a Supabase Service Key** to reduce Anon Key exposure in the frontend.
- **Add server-side input validation in the backend** to sanitize data before it hits Supabase, enhancing security beyond frontend checks.
- **Implement rate limiting or CAPTCHA** on signup/login endpoints to prevent abuse or spam.
- **Use Supabase edge functions** for lightweight backend logic (e.g., rate limiting, notifications) if avoiding a full backend expansion.

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

1. **Client Meeting Notification System**:

   - Update `ScheduleMeeting.js` to require a completed `business_profile` before submission.
   - Add auto-populate buttons to `BusinessProfile.js` and `ScheduleMeeting.js` forms for testing purposes (already implemented).

2. **Confirm HTTPS Setup**:

   - Verify `fakeneuron.com` serves HTTPS (completed via Netlify deployment).

3. **Plan for v2**:
   - Prioritize features based on user feedback.
