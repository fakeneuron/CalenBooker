# CalenBooker MVP

CalenBooker is a Minimum Viable Product (MVP) for a scheduling application designed to streamline appointment booking for professional businesses (e.g., consultants, tutors, salons). It allows owners to sign up, set up business profiles, and manage client appointments with notifications, featuring a cute, Kawaii-styled interface. Built with React (frontend) and Supabase (backend), it’s hosted on github.com/fakeneuron/CalenBooker (branch: master). Requires Node.js, npm, and a Supabase account to set up.

## Purpose and Vision

CalenBooker simplifies scheduling with a quick signup process (email, password, terms agreement), email confirmation with automatic login, business profile setup, and appointment scheduling. Clients receive a shareable confirmation page with appointment details and calendar integration (.ics, Google Calendar, Outlook). Full email notifications are planned for version 2 (v2). It uses Supabase with an Anonymous Key (Anon Key) for public API access and Row-Level Security (RLS) to restrict data access to authorized users.

## Coder Environment

Coder: Novice, using Terminal, VS Code, Node.js v20.18.0, npm v11.1.0, Git on macOS (tested on Ventura; should work on other versions or OSes with minor adjustments).

## Project Setup

To run CalenBooker locally:

### Frontend

- Navigate to `frontend/`:
  cd frontend
- Install dependencies (requires Node.js v20.18.0, npm v11.1.0):
  npm install
- Rename `frontend/.env.example` to `frontend/.env` and add:
  - `VITE_SUPABASE_URL`: Supabase project URL (e.g., `https://<project-id>.supabase.co` from Supabase Dashboard > Settings > API).
  - `VITE_SUPABASE_ANON_KEY`: Anon Key (from Supabase Dashboard > Settings > API).
  - `VITE_AUTH_REDIRECT`: Redirect URL (`http://localhost:4000/auth/confirm` locally, `https://delparte.com/auth/confirm` live).
  - `VITE_RECAPTCHA_SITE_KEY`: Google reCAPTCHA v2 site key (optional, from Google reCAPTCHA dashboard).
  - `VITE_ENABLE_CAPTCHA`: `true` to enable reCAPTCHA, `false` to disable (default: `false`).
- Run development server (opens `http://localhost:4000`):
  npm start
- Build for production (outputs to `dist/`):
  npm run build
- Preview the build (serves `dist/` at `http://localhost:4173`):
  npm run preview

### Supabase

- Create a project in the Supabase Dashboard (https://supabase.com/dashboard).
- Run SQL snippets from `supabase/` in the SQL Editor (in order):
  - `reset_database.sql` (optional, resets database if needed).
  - `create_tables.sql` (creates `business_profile`, `appointments`, `messages`, `appointment_links`).
  - `rls.sql` (enables RLS with policies).
  - `check_email_exists.sql` (secure email check function).
- Configure Authentication:
  - Enable email signups: Authentication > Configuration > Sign In / Up > Email.
  - Set OTP expiry to 3600s (1 hour).
- Copy Project URL and Anon Key from API settings to `frontend/.env`.
- Test:
  - Sign up at `http://localhost:4000`.
  - Set up a profile at `/business-profile`.
  - Book an appointment at `/appointment-scheduler`.
  - Check private confirmation (`/appointment-confirmation/<id>`) and public short link (`/a/<short_code>`).

### Dependencies

- Managed in `frontend/package.json`.
- Key additions: `react-icons@5.3.0` (table icons), `nanoid@6.0.0` (shortcode generation).
- Zero vulnerabilities as of March 20, 2025.

### Deployment

- **Frontend**: Hosted on Netlify (https://delparte.com) with HTTPS.
  - In Netlify UI:
    - Build command: `npm run build`.
    - Publish directory: `frontend/dist` (Vite output).
    - Environment variables:
      - `VITE_SUPABASE_URL`
      - `VITE_SUPABASE_ANON_KEY`
      - `VITE_AUTH_REDIRECT` (e.g., `https://delparte.com/auth/confirm`)
      - `VITE_RECAPTCHA_SITE_KEY` (if using reCAPTCHA)
      - `VITE_ENABLE_CAPTCHA` (e.g., `true`)
- **Supabase**: Apply database changes (e.g., `appointment_links` table) to production via SQL Editor.
- **SPA Routing**: Configured via `frontend/netlify.toml` for Netlify SPA support.
- Note: `.env` excluded from Git via `.gitignore`. Backend (`backend/`) is optional for MVP and not required locally.

## Technical Approach

- **Frontend**: React (19.0.0), Tailwind CSS (3.4.17) via `styles.js`, Supabase client (@supabase/supabase-js@2.49.1), Vite (6.2.2) for dev/build.
- **Backend**: Supabase (PostgreSQL, Authentication, Storage); minimal Node.js/Express (4.21.2) setup for future v2 features.

## Project Structure and Functionality

### 1. Project Initialization

- Git: github.com/fakeneuron/CalenBooker (branch: master).
- Structure:
  - `frontend/`: React app on port 4000 (migrated from react-scripts to Vite).
  - `backend/`: Express app on port 4001 (minimal, for v2).
  - `supabase/`: SQL snippets for database setup.
  - `README.md`: Main documentation.
  - `Roadmap.md`: Task list and progress.
  - `docs/`: Enhancement plans (e.g., `enhancement-plan-confirmation-page-split.md`).

### 2. Frontend Overview

- **Styling**: Tailwind CSS (`index.css`, `styles.js`) with Kawaii theme (pastels, rounded shapes), processed via `postcss.config.js`.
- **Pages** (in `src/pages/`):
  - `/` (`Home.jsx`): Landing with login/signup toggles.
  - `/auth/confirm` (`AuthConfirm.jsx`): Email confirmation redirect.
  - `/dashboard` (`Dashboard.jsx`): Appointments table, initializes messages.
  - `/business-profile` (`BusinessProfile.jsx`): Profile editor with time zone.
  - `/appointment-scheduler` (`AppointmentScheduler.jsx`): Booking form with dropdowns.
  - `/appointment-confirmation/:id` (`AppointmentConfirmationPrivate.jsx`): Private confirmation with calendar links, email/SMS formats.
  - `/a/:code` (`AppointmentConfirmationPublic.jsx`): Public confirmation with calendar links.
  - `/messages` (`Messages.jsx`): Message editor with save/revert.
  - Static: `/terms` (`Terms.jsx`), `/privacy` (`Privacy.jsx`), `/support` (`Support.jsx`), `/about` (`About.jsx`), 404 (`NotFound.jsx`).
- **Components** (in `src/components/`):
  - `Navbar.jsx`: Fixed nav with menu and dropdown.
  - `AppointmentsTable.jsx`: Sortable table with status colors and web/email/SMS copy icons.
  - `FormField.jsx`: Reusable input component.
  - `Footer.jsx`: Links to static pages.
  - `LoginForm.jsx`: Login component.
  - `SignupForm.jsx`: Signup component with reCAPTCHA v2.
- **Root Files** (in `frontend/` or `src/`):
  - `index.html`: Root HTML with `<div id="root">` and `<script type="module" src="/src/index.jsx">`.
  - `vite.config.js`: Vite config (port 4000, React plugin).
  - `tailwind.config.js`: Tailwind CSS config.
  - `postcss.config.js`: PostCSS setup for Tailwind and Autoprefixer.
  - `src/index.jsx`: Entry point, mounts React app with Router.
  - `src/App.jsx`: Routing and auth management.
  - `src/supabaseClient.js`: Supabase connection.
  - `src/styles.js`: Tailwind CSS class definitions (e.g., `shortLink`, `messageText`).
  - `src/hooks/useAppointmentDetails.js`: Custom hook for appointment data fetching.
  - `src/utils/shortCode.js`: Shortcode generation with `nanoid`.
  - `src/utils/appointmentUtils.js`: Email/SMS formatting and `.ics` generation.
- **Routing**: `react-router-dom@7.2.0`.
- **Dependencies**: `react@19.0.0`, `@supabase/supabase-js@2.49.1`, `react-google-recaptcha`, `vite@6.2.2`, `react-icons@5.3.0`, `nanoid@6.0.0` (see `frontend/package.json`).
- **SPA Routing**: Handled by Vite build for Netlify (no `public/_redirects` needed).
- **Env**: Uses `import.meta.env.VITE_*` in `.jsx` files (e.g., `VITE_SUPABASE_URL`).

### 3. Backend Overview

- Minimal Express app (`backend/server.js`) with Supabase client (Anon Key from `backend/.env`), port 4001, for v2 features.
- Dependencies: `express@4.21.2`, `@supabase/supabase-js@2.49.1`, `cors@2.8.5`, `dotenv@16.4.7`.

### 4. Database Setup

- **Tables**:
  - `business_profile`: Business details with `time_zone`, `parking_instructions`, `office_directions`, `custom_info` (nullable, blank by default).
  - `appointments`: Appointment records with `service_type`, `status`.
  - `messages`: Event messages (`scheduled`, `rescheduled`, `cancelled`, `no_show`), populated on first dashboard load.
  - `appointment_links`: Short links (`id`, `short_code`, `appointment_id`, `expires_at`, `created_at`) for public access.
- **Functions**: `check_email_exists` for secure signup email checks.
- **Security**: RLS policies for INSERT, UPDATE, SELECT (authenticated users) and public SELECT on `appointment_links` for non-expired links.
- **SQL Files**: In `supabase/` (unchanged).

## Current Features

- User authentication with Supabase Auth, dynamic redirects (`localhost:4000/auth/confirm` locally, `delparte.com/auth/confirm` live), email checks via `check_email_exists`.
- Business profile setup with time zone.
- Appointment booking with service type and status.
- Confirmation page with calendar integration, scheduled message, and optional notes.
- Messages management for event messages and business info, initialized on first dashboard load.
- **Appointment Confirmation with Short Links**:
  - Generates unique short links (e.g., `delparte.com/a/<short_code>`) stored in `appointment_links` with expiration (appointment date + 1 day).
  - Private view (`/appointment-confirmation/:id`): Includes clickable short links in email/SMS formats, calendar icons, and `.ics` download.
  - Public view (`/a/<short_code>`): Simplified details with calendar integration.
  - Table enhancements: `AppointmentsTable.jsx` includes web/email/SMS copy icons with overlay feedback.

## Roadmap

See `Roadmap.md` for planned features and progress.

## Contributing

Fork, make changes, submit a PR, follow React hooks and Tailwind via `styles.js`.

## Instructions for AI

Provide full updated files and specific code snippets for changes. For significant updates to `README.md` or `Roadmap.md`, share the full file; for minor edits, provide the updated section (e.g., task A.3).
