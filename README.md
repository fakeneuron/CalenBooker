# CalenBooker MVP Plan

## Purpose and Vision

"CalenBooker MVP" streamlines appointment scheduling for small businesses (e.g., barber shops), allowing owners to sign up, provide business details, and schedule client meetings. Key features include minimal signup (email/password), email confirmation, business details capture, and meeting scheduling. The v1 goal is to generate downloadable `.ics` files for meetings; email notifications are deferred to v2. The system leverages Supabase with Anon Key and RLS for authentication and data storage, hosted on `github.com/fakeneuron/CalenBooker` (branch: `master`).

## Coder Environment

- **Coder**: Novice, using Terminal, VS Code, Node.js v20.18.0, npm v11.1.0, Git on Mac OS.

## Project Coding Overview

### Progress (Completed)

1. **Initialize Project**:

   - Git repository: `github.com/fakeneuron/CalenBooker` (branch: `master`).
   - Project structure:
     - `Calenbooker/frontend`: React app (port 4000) with `react-scripts@5.0.1`.
     - `Calenbooker/backend`: Express app (port 4001, minimal setup for future v2 features).
     - `Calenbooker/.env`: Top-level environment variables (not committed).
     - `Calenbooker/supabase/`: Local SQL snippets (source of truth).

2. **Frontend Setup**:

   - Tailwind CSS via CDN (`2.2.19`) in `public/index.html` and local dependency (`3.4.17`).
   - **Components**:
     - `frontend/src/App.js`: Root component with routing and Supabase auth state management.
     - `frontend/src/components/Signup.js`: Signup with email check via `users_view`, redirects to `/login`.
     - `frontend/src/components/Login.js`: Login with Supabase Auth, redirects to `/business-details`.
     - `frontend/src/components/Navbar.js`: Navigation bar for protected routes.
     - `frontend/src/Dashboard.js`: Placeholder dashboard for authenticated users.
     - `frontend/src/forms/BusinessDetailsForm.js`: Submits/updates business details in `business_details`.
     - `frontend/src/forms/ScheduleMeetingForm.js`: Schedules meetings in `meetings`.
     - `frontend/src/Home.js`: Landing page for unauthenticated users.
     - `frontend/src/LogoutSuccess.js`: Success message after logout.
     - `frontend/src/supabaseClient.js`: Initializes Supabase client with Anon Key from `.env`.
   - Routing with `react-router-dom@7.2.0`.
   - Dependencies in `frontend/package.json`: `react@19.0.0`, `@supabase/supabase-js@2.49.1`, etc.
   - `frontend/public/index.html`: Includes Tailwind CSS CDN.

3. **Backend Setup**:

   - Minimal Express app in `backend/server.js` with Supabase client (Anon Key from `backend/.env`).
   - Runs on port 4001, responds with a hello message, reserved for v2 features (e.g., email notifications).
   - Dependencies in `backend/package.json`: `express@4.21.2`, `@supabase/supabase-js@2.49.1`, `cors@2.8.5`, `dotenv@16.4.7`.

4. **Supabase SQL Snippets**:
   - Tables: `business_details`, `meetings`.
   - Views: `users_view` for email checks.
   - RLS policies for secure data access.

### Supabase SQL Snippets

- **Storage**: `Calenbooker/supabase/`—source of truth, duplicated in SQL Editor (sync script pending).
- **Snippets**:
  - **`create_tables.sql`**: Defines `business_details` and `meetings` tables linked to `auth.users`.
  - **`rls.sql`**: Enables RLS and defines policies for `INSERT`, `UPDATE`, `SELECT` on tables.
  - **`users_view_setup.sql`**: Creates `users_view` and grants Anon Key `SELECT` access for email checks.

### Remaining (v1)

1. **Refine Signup/Confirmation Flow**:

   - Automate redirection after email confirmation to `/business-details`.
   - Improve feedback for unconfirmed users on `/login` (e.g., display a message).

2. **Scheduling Meetings Form**:

   - Implement `.ics` file generation for scheduled meetings.

3. **Domain Hosting**:
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
  - Tailwind CSS (`3.4.17` local, `2.2.19` CDN).
  - Supabase client with Anon Key from `.env`.
  - Runs on port 4000.

- **Backend**:
  - Node.js/Express (`4.21.2`).
  - Supabase client with Anon Key.
  - Runs on port 4001 (minimal setup for v2 expansion).

### Action Items and Next Steps

1. **Frontend Refinements**:

   - Import `Home.js` into `App.js`.
   - Integrate `LogoutSuccess.js` for `/login?logout=true`.
   - Automate post-confirmation redirection.
   - Enhance feedback for unconfirmed users.

2. **Implement `.ics` File Generation**:

   - Research and integrate into `ScheduleMeetingForm.js`.

3. **Confirm HTTPS Setup**:

   - Verify `fakeneuron.com` serves HTTPS.

4. **Plan for v2**:
   - Prioritize features based on user feedback.
