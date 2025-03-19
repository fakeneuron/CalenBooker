# CalenBooker MVP

CalenBooker is a Minimum Viable Product (MVP) for a scheduling application designed to streamline appointment booking for professional businesses (e.g., consultants, tutors, salons). It allows owners to sign up, set up business profiles, and manage client appointments with notifications, featuring a cute, Kawaii-styled interface. Built with React (frontend) and Supabase (backend), it’s hosted on `github.com/fakeneuron/CalenBooker` (branch: `master`). Requires Node.js, npm, and a Supabase account to set up.

## Purpose and Vision

CalenBooker simplifies scheduling with a quick signup process (just email, password, and terms agreement), email confirmation with automatic login, business profile setup, and appointment scheduling. Clients receive a shareable confirmation page with appointment details and calendar integration (`.ics`, Google Calendar, Outlook). Full email notifications are planned for version 2 (v2). It uses Supabase, a cloud platform, with an Anonymous Key (Anon Key) for public API access and Row-Level Security (RLS) to restrict data access to authorized users.

## Coder Environment

- Coder: Novice, using Terminal, VS Code, Node.js v20.18.0, npm v11.1.0, Git on macOS (tested on Ventura; should work on other versions or OSes with minor adjustments).

## Project Setup

To run CalenBooker locally:

- **Clone the Repo**: `git clone https://github.com/fakeneuron/CalenBooker.git`
- **Frontend**:
  - Navigate: `cd frontend`
  - Install: `npm install` (requires Node.js v20.18.0, npm v11.1.0)
  - Rename `frontend/.env.example` to `frontend/.env` and add your Supabase URL, Anon Key, and redirect URL (see `.env.example` for template).
  - Run: `npm start` (opens `http://localhost:4000`)
- **Supabase**:
  - Create a project in the [Supabase Dashboard](https://supabase.com/dashboard).
  - Run SQL snippets from `supabase/` in the SQL Editor (order: `reset_database.sql` if resetting, then `create_tables.sql`, `rls.sql`, `check_email_exists.sql`).
  - Configure Authentication: Enable email signups, set OTP expiry to 3600s (1 hour) under Authentication > Configuration > Sign In / Up > Email.
  - Copy Project URL and Anon Key from API settings to `frontend/.env`.
- **Test**: Sign up, set up a profile, book an appointment, check the confirmation page.
- **Dependencies**: Managed in `frontend/package.json`.
- **Deployment**: Frontend on Netlify (`https://delparte.com`) with HTTPS, Supabase auth redirects (`http://localhost:4000/auth/confirm` locally, `https://delparte.com/auth/confirm` live).
- **Note**: `.env` is excluded from Git via `.gitignore`. Backend (`backend/`) is optional for MVP and not required locally yet.

## Technical Approach

- Frontend: React (`19.0.0`), Tailwind CSS (`3.4.17`) via `styles.js`, Supabase client (`@supabase/supabase-js@2.49.1`).
- Backend: Supabase (PostgreSQL, Authentication, Storage); minimal Node.js/Express (`4.21.2`) setup for future v2 features.

## Project Structure and Functionality

### 1. Project Initialization

- Git: `github.com/fakeneuron/CalenBooker` (branch: `master`).
- Structure:
  - `frontend/`: React app on port 4000 (`react-scripts@5.0.1`).
  - `backend/`: Express app on port 4001 (minimal, for v2).
  - `supabase/`: SQL snippets for database setup.
  - `README.md`: Main documentation.
  - `Roadmap.md`: Task list and progress.

### 2. Frontend Overview

- **Styling**: Tailwind CSS (`index.css`, `styles.js`) with Kawaii theme (pastels, rounded shapes).
- **Pages**:
  - `/` (`Home.js`): Landing with login/signup toggles.
  - `/auth/confirm` (`AuthConfirm.js`): Email confirmation redirect.
  - `/dashboard` (`Dashboard.js`): Appointments table, initializes messages.
  - `/business-profile` (`BusinessProfile.js`): Profile editor with time zone.
  - `/appointment-scheduler` (`AppointmentScheduler.js`): Booking form with dropdowns.
  - `/appointment-confirmation/:id` (`AppointmentConfirmation.js`): Public confirmation with calendar links.
  - `/messages` (`Messages.js`): Message editor with save/revert.
  - Static pages: `/terms`, `/privacy`, `/support`, `/about`, 404 (`NotFound.js`).
- **Components**:
  - `Navbar.js`: Fixed nav with menu and dropdown.
  - `AppointmentsTable.js`: Sortable table with status colors.
  - `FormField.js`: Reusable input component.
  - `Footer.js`: Links to static pages.
  - `LoginForm.js`, `SignupForm.js`: Inline auth forms with reCAPTCHA v2.
- **Root Files**:
  - `App.js`: Routing and auth management.
  - `index.js`: Entry point.
  - `supabaseClient.js`: Supabase connection.
- **Routing**: `react-router-dom@7.2.0`.
- **Dependencies**: `react@19.0.0`, `@supabase/supabase-js@2.49.1`, `react-google-recaptcha`, etc. (see `frontend/package.json`).
- **SPA Routing**: `frontend/public/_redirects` (`/* /index.html 200`) for Netlify.
- **PostCSS**: `frontend/postcss.config.js` with `tailwindcss` and `autoprefixer`.
- **Env Check**: `frontend/scripts/checkEnv.js` verifies `.env` vars.

### 3. Backend Overview

- Minimal Express app (`backend/server.js`) with Supabase client (Anon Key from `backend/.env`), port 4001, for v2 features.
- Dependencies: `express@4.21.2`, `@supabase/supabase-js@2.49.1`, `cors@2.8.5`, `dotenv@16.4.7`.

### 4. Database Setup

- **Tables**:
  - `business_profile`: Business details with `time_zone`, `parking_instructions`, `office_directions`, `custom_info` (nullable, blank by default).
  - `appointments`: Appointment records with `service_type`, `status`.
  - `messages`: Event messages (`scheduled`, `rescheduled`, `cancelled`, `no_show`), populated on first dashboard load.
- **Functions**: `check_email_exists` for secure signup email checks.
- **Security**: RLS policies for `INSERT`, `UPDATE`, `SELECT` (authenticated users) and public `SELECT` on `messages`.
- **SQL Files**: In `supabase/`:
  - `create_tables.sql`: Table definitions with `insert_default_messages` and `execute_sql` functions (fixed `search_path`).
  - `rls.sql`: RLS policies.
  - `check_email_exists.sql`: Defines `check_email_exists` function.
  - `reset_database.sql`: Drops all tables/views/functions for full reset.
  - `purge_tables.sql`: Truncates tables (excludes `auth.users`) for data reset.
- **Configuration** (Supabase Dashboard):
  - Authentication > Configuration > Sign In / Up > Email:
    - Email OTP Expiration: Set to `3600` seconds (1 hour) to address `auth_otp_long_expiry`.
    - Prevent use of leaked passwords: Enabled to check against HaveIBeenPwned, addressing `auth_leaked_password_protection`.
  - Authentication > Settings:
    - Site URL: Set to `https://calenbooker.com` (placeholder), overridden by `REACT_APP_AUTH_REDIRECT` in `SignupForm.js` and `LoginForm.js` for signup and resend links.

## Current Features

- User authentication with Supabase Auth, using dynamic redirect URLs (dev: `localhost:4000/auth/confirm`, live: `delparte.com/auth/confirm`), with email checks via `check_email_exists`.
- Business profile setup with time zone.
- Appointment booking with service type and status.
- Confirmation page with calendar integration, `scheduled` message, and optional notes.
- Messages management for event messages and business info, initialized on first dashboard load.

## Roadmap

See `Roadmap.md` for planned features and progress.

## Contributing

Fork, make changes, submit a PR, follow React hooks and Tailwind via `styles.js`.

## Instructions for AI

Provide full updated files and specific code snippets for changes. For significant updates to `README.md` or `Roadmap.md`, share the full file; for minor edits, provide the updated section (e.g., task A.3).
