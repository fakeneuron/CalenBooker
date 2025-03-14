# CalenBooker MVP Plan

## Purpose and Vision

"CalenBooker MVP" streamlines appointment scheduling for small businesses (e.g., barber shops), allowing owners to sign up, provide business profiles, and schedule client appointments with client notifications. Key features include minimal signup (email/password) with terms agreement, email confirmation with autologin, business profile capture, and appointment scheduling with a shareable webpage displaying appointment details and calendar integration options (e.g., `.ics`, Google Calendar, Outlook); full email notifications are deferred to v2. The system leverages Supabase with Anon Key and RLS for authentication and data storage, hosted on `github.com/fakeneuron/CalenBooker` (branch: `master`).

## Coder Environment

- **Coder**: Novice, using Terminal, VS Code, Node.js v20.18.0, npm v11.1.0, Git on Mac OS.

## Project Setup

To run the project locally:

- **Clone the Repo**: `git clone https://github.com/fakeneuron/CalenBooker.git`
- **Frontend**:
  - Navigate: `cd frontend`
  - Install: `npm install`
  - Create `frontend/.env` with:
    ```
    REACT_APP_SUPABASE_URL=https://your-project.supabase.co
    REACT_APP_SUPABASE_ANON_KEY=your-anon-key
    REACT_APP_AUTH_REDIRECT=http://localhost:4000/auth/confirm
    ```
  - Run: `npm start` (opens `http://localhost:4000`)
- **Dependencies**: Managed via `frontend/package.json`.
- **Supabase**: Ensure your Supabase project is set up with tables from `supabase/` snippets.
- **Netlify**: Env vars are set in the dashboard (see Deployment).
- **Note**: `.env` is excluded from Git via `.gitignore` for security.

## Technical Approach

- **Frontend**: React (`19.0.0`), Tailwind CSS (`3.4.17`), Supabase client.
- **Backend**: Node.js/Express (`4.21.2`), Supabase client.

## Instructions for AI

To get a basic understanding of this project, start by requesting only the following core files. Additional files listed in 'Project Structure and Functionality' can be requested later as we work through the roadmap tasks. Review these files to grasp the project’s foundation without needing detailed feedback unless prompted:

- `README.md`: Project overview and setup.
- `frontend/src/App.js`: Root component with routing and auth setup.
- `frontend/src/supabaseClient.js`: Supabase client initialization.
- `supabase/create_tables.sql`: Database table structure.
- `Roadmap.md`: Task list, roadmap, and completed progress.

## Project Structure and Functionality

1. **Initialize Project**:

   - Git repository: `github.com/fakeneuron/CalenBooker` (branch: `master`).
   - Structure:
     - `Calenbooker/frontend`: React app (port 4000) with `react-scripts@5.0.1`.
     - `Calenbooker/backend`: Express app (port 4001, minimal setup for future v2 features).
     - `Calenbooker/supabase/`: Local SQL snippets (source of truth).
     - `Calenbooker/README.md`: Main project documentation (root-level).
     - `Calenbooker/Roadmap.md`: Detailed task list, roadmap, and completed progress.

2. **Frontend Setup**:

   - Tailwind CSS via local dependency (`3.4.17`) in `index.css`.
   - Structure:
     - `frontend/src/pages/`:
       - `Home.js`: Professional landing page for unauthenticated users (`/`) with a Kawaii-styled hero section, feature highlights, and inline login/signup forms. Features a pastel gradient hero, animated feature cards, centered "Login" and "Get Started" buttons that toggle to forms with a fade-in effect, and responsive design with vertical padding on mobile.
       - `AuthConfirm.js`: Handles email confirmation redirect (`/auth/confirm`), extracts tokens from URL to autologin users to `/dashboard`, or redirects to `/` on failure.
       - `Dashboard.js`: Dashboard screen with appointments table, default post-login page (`/dashboard`), left-aligned names, centered data columns.
       - `BusinessProfile.js`: Business profile screen (`/business-profile`) with form for business details (using `FormField`), auto-populates sample data on button click or fetches existing data on load, includes a time zone dropdown (e.g., "America/New_York") saved to `time_zone` column in `business_profile`, and a "Preview" button to display a Kawaii-styled preview of the profile as clients would see it.
       - `AppointmentScheduler.js`: Scheduling screen with appointment URL generation (`/appointment-scheduler`), profile check, and auto-populates sample data or recent client data on load. Includes a "Service Type" dropdown with preset options ("Haircut," "Consultation," "Shave") and an "Other" option with manual text entry (using `FormField`); saves `service_type` to the `appointments` table. Added a "Status" dropdown ("Confirmed," "Pending," "Cancelled") with "Confirmed" as default, saving to `status` column.
       - `AppointmentConfirmation.js`: Client-facing appointment confirmation page (`/appointment-confirmation/:id`) with appointment/business details (including `service_type` and `time_zone` displayed with the appointment time) and calendar integration (`.ics`, Google Calendar, Outlook) using centered branded logos.
       - `Terms.js`: Static Terms of Service page (`/terms`) with standard legal phrasing, styled in Kawaii theme, linked from footer and signup form.
       - `Privacy.js`: Static Privacy Policy page (`/privacy`) with standard data handling info, styled in Kawaii theme, linked from footer and signup form.
       - `Support.js`: Static Support page (`/support`) with contact info (placeholder email) and FAQ, styled in Kawaii theme, linked from footer.
       - `About.js`: Static About page (`/about`) with mission and team placeholder, styled in Kawaii theme, linked from footer.
       - `NotFound.js`: Static 404 error page with a cute Kawaii design and back-to-home button, displayed for unmatched routes.
     - `frontend/src/components/`:
       - `Navbar.js`: Navigation bar for authenticated (logged-in) users only, displayed via `App.js` conditional rendering (`{session && <Navbar />}`). Fixed at the top with content scrolling beneath, features a hamburger menu on mobile collapsing "Home" and "Book Appointment" links, and a Kawaii-styled user icon dropdown (hover/click) with "Business Profile" and "Logout" options. "Home" links to `/dashboard`, "Book Appointment" to `/appointment-scheduler`. Redirects to `/` on logout. Public pages rely on `Home.js` for navigation, with no navbar for unauthenticated users, preserving a clean landing page focus.
       - `AppointmentsTable.js`: Reusable table displaying user’s appointments with sortable columns (date/time ascending). Includes "Service Type" and "Status" columns with `status` shown in colors (green for "Confirmed," yellow for "Pending," red for "Cancelled").
       - `FormField.js`: Reusable form field component for text inputs and dropdowns, used in `BusinessProfile.js` and `AppointmentScheduler.js` to simplify form markup and reduce file size.
       - `Footer.js`: Kawaii-styled footer displayed across all pages, scrolls with content (non-fixed), includes links to Terms of Service, Privacy Policy, Support, and About sections.
       - `LoginForm.js`: Reusable login form component with email/password input, Supabase auth, and error handling, embedded inline in `Home.js`.
       - `SignupForm.js`: Reusable signup form component with email/password input, password validation, Supabase auth, and a required terms agreement checkbox linking to `/terms` and `/privacy`, embedded inline in `Home.js`.
     - `frontend/src/`:
       - `App.js`: Root component with routing and Supabase auth state management, includes global footer and padding-top for fixed navbar, now with a 404 catch-all route.
       - `index.js`: Entry point rendering `App.js` with routing.
       - `index.css`: Tailwind CSS setup with custom animation keyframes (e.g., fade-in).
       - `styles.js`: Centralized reusable Tailwind classes for all pages and components, updated with Kawaii-inspired styles (pastel colors, rounded shapes, playful shadows) applied app-wide for a consistent, cute aesthetic.
       - `supabaseClient.js`: Supabase client initialization with Anon Key from `.env`.
   - Routing with `react-router-dom@7.2.0`.
   - Dependencies in `frontend/package.json`: `react@19.0.0`, `@supabase/supabase-js@2.49.1`, etc.
   - Added `frontend/public/_redirects` to handle SPA routing on Netlify (`/* /index.html 200`).
   - `frontend/postcss.config.js`: Configures PostCSS with `tailwindcss` and `autoprefixer` plugins to process Tailwind CSS in `index.css`.
   - `frontend/scripts/checkEnv.js`: Utility script to verify `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` environment variables from `frontend/.env` during development.

3. **Backend Setup**:

   - `backend/server.js`: Minimal Express app with Supabase client (Anon Key from `backend/.env`), responds with a hello message, reserved for v2 features.
   - Dependencies in `backend/package.json`: `express@4.21.2`, `@supabase/supabase-js@2.49.1`, `cors@2.8.5`, `dotenv@16.4.7`.
   - Runs on port 4001.

4. **Supabase SQL Snippets**:

   - Tables: `business_profile` (business details with `time_zone` column for scheduling clarity), `appointments` (appointment records with `service_type` and `status` columns for tracking).
   - Views: `users_view` for email checks.
   - RLS policies for secure data access (`auth.users` linked).
   - Storage: `Calenbooker/supabase/`—source of truth, duplicated in SQL Editor (sync script pending).
   - Snippets:
     - `create_tables.sql`: Defines `business_profile` (updated with `time_zone TEXT NOT NULL DEFAULT 'America/New_York'`) and `appointments` tables (updated with `service_type TEXT NOT NULL` and `status TEXT NOT NULL DEFAULT 'Confirmed'`) linked to `auth.users`.
     - `rls.sql`: Enables RLS and defines policies for `INSERT`, `UPDATE`, `SELECT` on tables.
     - `users_view_setup.sql`: Creates `users_view` and grants Anon Key `SELECT` access for email checks.

5. **Client Appointment Notification System**:

   - `AppointmentScheduler.js`: Generates appointment URLs (e.g., `/appointment-confirmation/<id>`), enforces profile check with clickable link to `/business-profile`.
   - `AppointmentConfirmation.js`: Displays appointment/business details with `.ics`, Google Calendar, and Outlook integration (public access).

6. **Deployment**:
   - Deployed frontend to Netlify with HTTPS at `https://delparte.com`, configured Supabase auth redirects with local (`http://localhost:4000/auth/confirm`) and live (`https://delparte.com/auth/confirm`) options; confirmed HTTPS post-DNS propagation.

### Roadmap

See `Roadmap.md` in the root directory for a detailed list of pending tasks, feature ideas, and completed progress.
