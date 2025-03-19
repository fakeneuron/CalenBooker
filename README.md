# CalenBooker MVP

CalenBooker is a Minimum Viable Product (MVP) for a scheduling application designed to streamline appointment booking for small businesses (e.g., barber shops). It allows owners to sign up, set up business profiles, and manage client appointments with notifications, featuring a cute, Kawaii-styled interface. Built with **React** (frontend) and **Supabase** (backend), it’s hosted on `github.com/fakeneuron/CalenBooker` (branch: `master`).

## Purpose and Vision

CalenBooker simplifies scheduling with minimal signup (email/password, terms agreement), email confirmation with autologin, business profile capture, and appointment scheduling. Clients get a shareable confirmation page with appointment details and calendar integration (`.ics`, Google Calendar, Outlook). Full email notifications are deferred to v2. The system uses Supabase with Anon Key and RLS for authentication and data storage.

## Coder Environment

- **Coder**: Novice, using Terminal, VS Code, Node.js v20.18.0, npm v11.1.0, Git on Mac OS.

## Project Setup

To run locally:

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
- **Supabase**: Set up a project in [Supabase Dashboard](https://supabase.com/dashboard), run SQL snippets from `supabase/` in the SQL Editor, configure Authentication settings, and add URL/Anon Key to `.env`.
- **Netlify**: Env vars set in dashboard (see Deployment).
- **Note**: `.env` is excluded from Git via `.gitignore`.

## Technical Approach

- **Frontend**: React (`19.0.0`), Tailwind CSS (`3.4.17`) via `styles.js`, Supabase client.
- **Backend**: Supabase (PostgreSQL, Authentication, Storage); minimal Node.js/Express (`4.21.2`) setup for future v2 features.

## Instructions for AI

Start with these core files to understand the project:

- `README.md`: Project overview and setup.
- `frontend/src/App.js`: Root component with routing and auth.
- `frontend/src/supabaseClient.js`: Supabase client initialization.
- `supabase/create_tables.sql`: Database structure.
- `Roadmap.md`: Tasks and progress.
  Request additional files from "Project Structure and Functionality" as needed.

## Project Structure and Functionality

1. **Initialize Project**:

   - Git: `github.com/fakeneuron/CalenBooker` (branch: `master`).
   - Structure:
     - `Calenbooker/frontend`: React app (port 4000) with `react-scripts@5.0.1`.
     - `Calenbooker/backend`: Express app (port 4001, minimal for v2).
     - `Calenbooker/supabase/`: SQL snippets (source of truth).
     - `Calenbooker/README.md`: Main docs.
     - `Calenbooker/Roadmap.md`: Task list and progress.

2. **Frontend Setup**:

   - Tailwind CSS via `index.css` and `styles.js` (centralized Kawaii styles: pastel colors, rounded shapes, playful shadows).
   - **Pages (`frontend/src/pages/`)**:
     - `Home.js`: Landing page (`/`) for unauthenticated users with a pastel gradient hero, animated feature cards, inline login/signup forms (toggle via "Login" and "Get Started" buttons), and responsive design.
     - `AuthConfirm.js`: Email confirmation redirect (`/auth/confirm`), autologins to `/dashboard` or redirects to `/` on failure.
     - `Dashboard.js`: Owner dashboard (`/dashboard`) with an appointments table (left-aligned names, centered data). Initializes default messages on first load.
     - `BusinessProfile.js`: Profile editor (`/business-profile`) with a form (`FormField`), auto-populates sample data, includes a time zone dropdown (`time_zone` column), and a Kawaii-styled preview button.
     - `AppointmentScheduler.js`: Booking form (`/appointment-scheduler`) with profile check, auto-populates recent client data, includes "Service Type" (dropdown: "Haircut," "Consultation," "Shave," "Other") and "Status" (dropdown: "Confirmed," "Pending," "Cancelled"; default "Confirmed") saved to `appointments`.
     - `AppointmentConfirmation.js`: Confirmation page (`/appointment-confirmation/:id`) with details (business name in location, `service_type`, `time_zone` with time), calendar integration (`.ics`, Google Calendar, Outlook) via centered logos, and the `scheduled` message from `messages` as the intro. Includes a "Notes" section (bulleted list) with `parking_instructions`, `office_directions`, `custom_info` from `business_profile` if populated.
     - `Messages.js`: Messages editor (`/messages`) with textareas for `scheduled`, `rescheduled`, `cancelled`, `no_show` (stored in `messages`, "No-Show" styled), and `parking_instructions`, `office_directions`, `custom_info` (stored in `business_profile`). Features "Save" and "Revert to Default" buttons, accessible via `Navbar.js` dropdown.
     - `Terms.js`: Terms of Service (`/terms`), Kawaii-styled, linked from footer/signup.
     - `Privacy.js`: Privacy Policy (`/privacy`), Kawaii-styled, linked from footer/signup.
     - `Support.js`: Support page (`/support`) with placeholder email/FAQ, Kawaii-styled, linked from footer.
     - `About.js`: About page (`/about`) with mission/team placeholder, Kawaii-styled, linked from footer.
     - `NotFound.js`: 404 page with Kawaii design and back-to-home button.
   - **Components (`frontend/src/components/`)**:
     - `Navbar.js`: Fixed navbar for authenticated users (via `App.js`), with mobile hamburger menu ("Home" to `/dashboard`, "Book Appointment" to `/appointment-scheduler`) and user icon dropdown ("Business Profile," "Messages," "Logout").
     - `AppointmentsTable.js`: Sortable table (date/time ascending) with "Service Type" and colored "Status" (green "Confirmed," yellow "Pending," red "Cancelled").
     - `FormField.js`: Reusable form field for inputs/dropdowns, used in `BusinessProfile.js` and `AppointmentScheduler.js`.
     - `Footer.js`: Kawaii-styled, non-fixed footer with links to Terms, Privacy, Support, About.
     - `LoginForm.js`: Inline login form in `Home.js` with Supabase auth.
     - `SignupForm.js`: Inline signup form in `Home.js` with terms checkbox and Supabase auth.
   - **Root Files (`frontend/src/`)**:
     - `App.js`: Routing and auth state management, with 404 catch-all and navbar/footer padding.
     - `index.js`: Entry point rendering `App.js`.
     - `index.css`: Tailwind setup with custom animations (e.g., fade-in).
     - `styles.js`: Tailwind classes for Kawaii styling app-wide.
     - `supabaseClient.js`: Supabase client with Anon Key from `.env`.
   - Routing: `react-router-dom@7.2.0`.
   - Dependencies: `react@19.0.0`, `@supabase/supabase-js@2.49.1`, etc. (see `frontend/package.json`).
   - SPA Routing: `frontend/public/_redirects` (`/* /index.html 200`) for Netlify.
   - PostCSS: `frontend/postcss.config.js` with `tailwindcss` and `autoprefixer`.
   - Env Check: `frontend/scripts/checkEnv.js` verifies `.env` vars.

3. **Backend Setup**:

   - `backend/server.js`: Minimal Express app with Supabase client (Anon Key from `backend/.env`), port 4001, for v2 features.
   - Dependencies: `express@4.21.2`, `@supabase/supabase-js@2.49.1`, `cors@2.8.5`, `dotenv@16.4.7`.

4. **Supabase SQL Snippets and Configuration**:

   - **Tables**:
     - `business_profile`: Business details with `time_zone`, `parking_instructions`, `office_directions`, `custom_info` (nullable, blank by default).
     - `appointments`: Appointment records with `service_type`, `status`.
     - `messages`: Event messages (`scheduled`, `rescheduled`, `cancelled`, `no_show`), populated on first dashboard load.
   - **Functions**: `check_email_exists` for secure signup email checks (replaces `users_view`).
   - **RLS**: Policies for `INSERT`, `UPDATE`, `SELECT` (authenticated users) and public `SELECT` on `messages`.
   - **Snippets**:
     - `create_tables.sql`: Table definitions with manual `insert_default_messages` function (fixed `search_path`).
     - `rls.sql`: RLS policies.
     - `users_view_setup.sql`: Defines `check_email_exists` function (no `users_view` after security fixes).
     - `reset_database.sql`: Drops all tables/views/functions for full reset.
     - `purge_tables.sql`: Truncates tables (excludes `auth.users`) for data reset.
   - **Configuration** (Supabase Dashboard):
     - **Authentication > Configuration > Sign In / Up > Email**:
       - **Email OTP Expiration**: Set to `3600` seconds (1 hour) to address `auth_otp_long_expiry`.
       - **Prevent use of leaked passwords**: Enabled to check against HaveIBeenPwned, addressing `auth_leaked_password_protection`.
     - **Authentication > Settings**:
       - **Site URL**: Set to `https://calenbooker.com` (placeholder), overridden by `REACT_APP_AUTH_REDIRECT` in `SignupForm.js` and `LoginForm.js` for signup and resend links.

5. **Client Appointment Notification System**:

   - `AppointmentScheduler.js`: Generates `/appointment-confirmation/<id>`, enforces profile check.
   - `AppointmentConfirmation.js`: Public-facing confirmation with calendar options, `scheduled` message, and optional notes.

6. **Deployment**:
   - Frontend on Netlify (`https://delparte.com`) with HTTPS, Supabase auth redirects (`http://localhost:4000/auth/confirm` locally, `https://delparte.com/auth/confirm` live).

## Current Features

- User authentication with Supabase Auth, using dynamic redirect URLs for signup and resend confirmation (dev: `localhost:4000/auth/confirm`, live: `delparte.com/auth/confirm`), with email checks via secure `check_email_exists` function.
- Business profile setup with time zone.
- Appointment booking with service type and status.
- Confirmation page with calendar integration, `scheduled` message, and optional notes.
- Messages management for event messages and business info, initialized on first dashboard load.

## Getting Started

1. **Supabase**: Create a project, run `supabase/reset_database.sql` (if resetting), then `create_tables.sql`, `rls.sql`, `users_view_setup.sql`, configure Authentication settings, update `frontend/.env`.
2. **Local Run**: `cd frontend`, `npm install`, `npm start`.
3. **Test**: Sign up, set up a profile, book an appointment, check confirmation.

## Roadmap

See `Roadmap.md` for planned features and progress.

## Contributing

Fork, make changes, submit a PR, follow React hooks and Tailwind via `styles.js`.
