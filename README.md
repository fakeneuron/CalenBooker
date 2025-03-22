# CalenBooker MVP

CalenBooker is a Minimum Viable Product (MVP) for a scheduling application designed to streamline appointment booking for professional businesses (e.g., consultants, tutors, salons). It allows owners to sign up, set up business profiles, and manage client appointments with notifications, featuring a cute, Kawaii-styled interface. Built with React (frontend) and Supabase (backend), it’s hosted on `github.com/fakeneuron/CalenBooker` (branch: master). Requires Node.js, npm, and a Supabase account to set up.

## Purpose and Vision

CalenBooker simplifies scheduling with a quick signup process (email, password, terms agreement), email confirmation with automatic login, business profile setup, and appointment scheduling. Clients receive a shareable confirmation page with appointment details and calendar integration (.ics, Google Calendar, Outlook). Full email notifications are planned for version 2 (v2). It uses Supabase with an Anonymous Key (Anon Key) for public API access and Row-Level Security (RLS) to restrict data access to authorized users.

## Coder Environment

Coder: Novice, using Terminal, VS Code, Node.js v20.18.0, npm v11.1.0, Git on macOS (tested on Ventura; should work on other versions or OSes with minor adjustments).

## Project Setup

To run CalenBooker locally:

### Frontend

- Navigate to `frontend/`
- Install dependencies (requires Node.js v20.18.0, npm v11.1.0):
  `npm install`
- Rename `frontend/.env.example` to `frontend/.env` and add:
  - Local: Fill in values in `frontend/.env`.
  - Production: Set in Netlify UI (see "Deployment > Netlify").
  - `VITE_SUPABASE_URL`: Supabase project URL (e.g., `https://<project-id>.supabase.co` from Supabase Dashboard > Settings > API).
  - `VITE_SUPABASE_ANON_KEY`: Anon Key (from Supabase Dashboard > Settings > API).
  - `VITE_AUTH_REDIRECT`: Redirect URL (`http://localhost:4000/auth/confirm` locally, `https://delparte.com/auth/confirm` live).
  - `VITE_RECAPTCHA_SITE_KEY`: Google reCAPTCHA v2 site key (optional, from `https://www.google.com/recaptcha/admin/create`).
  - `VITE_ENABLE_CAPTCHA`: `true` to enable reCAPTCHA, `false` to disable (default: `false`).
- Run development server (opens `http://localhost:4000`):
  `npm start`
- Build for production (outputs to `dist/`):
  `npm run build`
- Preview the build (serves `dist/` at `http://localhost:4173`):
  `npm run preview`

### Supabase

- Create a project in the Supabase Dashboard (`https://supabase.com/dashboard`).
- Run SQL snippets from `supabase/` in the SQL Editor (in order):
  - `reset_database.sql` (optional, resets database if needed).
  - `create_tables.sql` (creates `business_profile`, `appointments`, `messages`, `appointment_links`).
  - `rls.sql` (enables RLS with policies for authenticated users).
  - `public.sql` (adds public access policies for appointment links).
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

- **Frontend**: Hosted on Netlify (`https://delparte.com`) with HTTPS.
  - In Netlify UI:
    - Build command: `npm run build`.
    - Publish directory: `frontend/dist` (Vite output).
    - Environment Variables: Set in "Site Settings > Environment Variables":
      - `VITE_SUPABASE_URL`
      - `VITE_SUPABASE_ANON_KEY`
      - `VITE_AUTH_REDIRECT` (e.g., `https://delparte.com/auth/confirm`)
      - `VITE_RECAPTCHA_SITE_KEY` (if using reCAPTCHA)
      - `VITE_ENABLE_CAPTCHA` (e.g., `true`)
  - **SPA Routing**: Configured via `frontend/netlify.toml` to ensure all routes (e.g., `/appointment-confirmation/:id`, `/a/:code`) are handled by the React app. Required for deep linking to work on Netlify.
- **Supabase**: Apply database changes (e.g., `appointment_links` table) to production via SQL Editor.
- Note: `.env` excluded from Git via `.gitignore`. Backend (`backend/`) is optional for MVP and not required locally.

## Technical Approach

- **Frontend**: React (19.0.0), Tailwind CSS (3.4.17) via `styles.js`, Supabase client (@supabase/supabase-js@2.49.1), Vite (6.2.2) for dev/build.
  - Vite: Configured in `vite.config.js` with React plugin; dev server runs on port 4000.
- **Backend**: Supabase (PostgreSQL, Authentication, Storage); minimal Node.js/Express (4.21.2) setup for future v2 features.

## Project Structure and Functionality

### 1. Project Initialization

- Git: `github.com/fakeneuron/CalenBooker` (branch: master).
- Structure:
  - `frontend/`: React app on port 4000 (migrated from react-scripts to Vite).
  - `backend/`: Express app on port 4001 (minimal, for v2, currently inactive).
  - `supabase/`: SQL snippets for database setup.
  - `docs/`: Enhancement plans (e.g., `enhancement-plan-confirmation-page-split.md`).
  - `TaskNotes/`: Completed task records (e.g., `000-InitialProgress.md` for historical progress).
  - `README.md`: Main documentation.
  - `Roadmap.md`: Planned tasks; active tasks tracked in `ShortName.md` files in root (e.g., `OwnerCalendarSync.md`).

### 2. Frontend Overview

- **Styling**: Tailwind CSS (`src/index.css`, `src/styles.js`) with Kawaii theme (pastels, rounded shapes), processed via `postcss.config.js`.
- **Assets**:
  - `src/logo.svg`: Application logo (currently in `src/`, planned move to `src/assets/`).
  - `src/assets/icons/`: Calendar icons (`google-calendar96.png`, `outlook96.png`, `apple96.png`) for confirmation pages.
- **Pages** (in `src/pages/`):
  - `/` (`Home.jsx`): Landing with login/signup toggles.
  - `/auth/confirm` (`AuthConfirm.jsx`): Handles email confirmation redirects from Supabase.
  - `/dashboard` (`Dashboard.jsx`): Displays appointments table, initializes default messages on first load.
  - `/business-profile` (`BusinessProfile.jsx`): Edits business details with time zone selection and preview.
  - `/appointment-scheduler` (`AppointmentScheduler.jsx`): Booking form with dropdowns for service type, duration, and status.
  - `/appointment-confirmation/:id` (`AppointmentConfirmationPrivate.jsx`): Private confirmation with calendar links, email/SMS formats, and notes.
  - `/a/:code` (`AppointmentConfirmationPublic.jsx`): Public confirmation with calendar links and minimal data.
  - `/messages` (`Messages.jsx`): Customizes event messages (scheduled, rescheduled, cancelled, no-show) and business info.
  - Static: `/terms` (`Terms.jsx`), `/privacy` (`Privacy.jsx`), `/support` (`Support.jsx`), `/about` (`About.jsx`), 404 (`NotFound.jsx`).
  - Legacy: `AppointmentConfirmation.jsx` - Possibly deprecated wrapper for public/private views; not used in current routing.
- **Components** (in `src/components/`):
  - `Navbar.jsx`: Fixed navigation with menu and user dropdown (profile, messages, logout).
  - `AppointmentsTable.jsx`: Sortable table with status colors and web/email/SMS copy icons with overlay feedback.
  - `FormField.jsx`: Reusable input/select/textarea component for forms.
  - `Footer.jsx`: Static footer with links to terms, privacy, support, and about pages.
  - `LoginForm.jsx`: Login form with email/password and resend confirmation option.
  - `SignupForm.jsx`: Signup form with reCAPTCHA v2, terms checkbox, and password validation.
- **Root Files** (in `frontend/` or `src/`):
  - `index.html`: Root HTML with `<div id="root">` and `<script type="module" src="/src/index.jsx">`.
  - `vite.config.js`: Vite config (port 4000, React plugin).
  - `tailwind.config.js`: Tailwind CSS config.
  - `postcss.config.js`: PostCSS setup for Tailwind and Autoprefixer.
  - `src/index.jsx`: Entry point, mounts React app with Router.
  - `src/index.css`: Global styles with Tailwind imports and custom animations (bounce, fadeIn, fadeOut).
  - `src/App.jsx`: Routing and auth management.
  - `src/supabaseClient.js`: Supabase connection using Anon Key.
  - `src/styles.js`: Tailwind CSS class definitions (e.g., `shortLink`, `messageText`).
- **Hooks** (in `src/hooks/`):
  - `useAppointmentDetails.js`: Fetches appointment data for public/private views, generates short links.
- **Utilities** (in `src/utils/`):
  - `appointmentUtils.js`: Formats email/SMS messages and generates `.ics` files.
  - `shortCode.js`: Generates unique short codes with `nanoid`.
- **Routing**: `react-router-dom@7.2.0`.
- **Dependencies**: See `frontend/package.json` (e.g., `react@19.0.0`, `@supabase/supabase-js@2.49.1`, `react-google-recaptcha`).
- **SPA Routing**: Handled by Vite build for Netlify via `netlify.toml`.
- **Env**: Uses `import.meta.env.VITE_*` in `.jsx` files (e.g., `VITE_SUPABASE_URL`).

### 3. Backend Overview

- Minimal Express app (`backend/server.js`) with Supabase client (Anon Key from `backend/.env`), port 4001, for future v2 features. **Currently inactive in the MVP.**
- Dependencies: `express@4.21.2`, `@supabase/supabase-js@2.49.1`, `cors@2.8.5`, `dotenv@16.4.7`.

### 4. Database Setup

- **Tables**:
  - `business_profile`: Business details with `time_zone`, `parking_instructions`, `office_directions`, `custom_info` (nullable, blank by default).
  - `appointments`: Appointment records with `service_type`, `status`.
  - `messages`: Event messages (`scheduled`, `rescheduled`, `cancelled`, `no_show`), populated on first dashboard load.
  - `appointment_links`: Short links (`id`, `short_code`, `appointment_id`, `expires_at`, `created_at`, `access_pin`) for public access; `access_pin` nullable for future PIN security.
- **Functions**:
  - `insert_default_messages`: Adds default message templates on setup.
  - `check_email_exists`: Checks for existing emails during signup.
- **Security**: RLS policies split between `rls.sql` (authenticated) and `public.sql` (public SELECT for non-expired links).
- **SQL Files**: In `supabase/` (`create_tables.sql`, `rls.sql`, `public.sql`, `reset_database.sql`, `purge_tables.sql`, `check_email_exists.sql`).
- **Setup**: Run SQL files in order: `create_tables.sql`, `rls.sql`, `public.sql`, `check_email_exists.sql`. Requires `auth.users` (auto-created by Supabase).

## Third-Party Configurations

### Supabase

- **Tables**: `business_profile`, `appointments`, `messages`, `appointment_links`.
- **Functions**:
  - `insert_default_messages`: Adds default message templates on setup.
  - `check_email_exists`: Checks for existing emails during signup.
- **RLS Policies**:
  - `business_profile`: Authenticated users only (read/write own data).
  - `appointments`: Authenticated write, public read for non-expired links.
  - `messages`: Authenticated access only.
  - `appointment_links`: Public read if not expired, authenticated write.
- **Setup**: Run SQL files in order: `create_tables.sql`, `rls.sql`, `public.sql`, `check_email_exists.sql`. Requires `auth.users` (auto-created by Supabase).

### Netlify

- **Integration**: Hosts frontend at `https://delparte.com`.
- **SPA Routing**: Configured via `frontend/netlify.toml` for deep linking (e.g., `/a/:code`).
- **Environment Variables**: Set in Netlify UI under "Site Settings > Environment Variables" (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

### Google reCAPTCHA

- **Integration**: Used in `SignupForm.jsx` for signup validation.
- **Setup**: Generate keys at `https://www.google.com/recaptcha/admin/create`. Set `VITE_RECAPTCHA_SITE_KEY` in environment variables.
- **Toggle**: `VITE_ENABLE_CAPTCHA=true` enables it; `false` disables it.

## Current Features

- User authentication with Supabase Auth, dynamic redirects (`localhost:4000/auth/confirm` locally, `delparte.com/auth/confirm` live), email checks via `check_email_exists`.
- Business profile setup with time zone.
- Appointment booking with service type and status.
- Confirmation page with calendar integration, scheduled message, and optional notes.
- Messages management for event messages and business info, initialized on first dashboard load.
- **Appointment Confirmation with Short Links**:
  - Generates unique short links (e.g., `delparte.com/a/<short_code>`) stored in `appointment_links` with expiration (appointment date + 1 day).
  - Private view (`/appointment-confirmation/:id`): Includes clickable short links in email/SMS formats, calendar icons, and `.ics` download.
  - Public view (`/a/:code`): Simplified details with calendar integration.
  - Table enhancements: `AppointmentsTable.jsx` includes web/email/SMS copy icons with overlay feedback.

## Known Issues

- **Public Link PII Exposure**: `/a/:code` displays appointment details (including PII) publicly. See `Roadmap.md` tasks #043 (Secure Public Shortcode Access) and #044 (Anonymize Public Appointment Data) for planned fixes.
- **Legacy File**: `src/pages/AppointmentConfirmation.jsx` is likely deprecated post-refactor into public/private versions. Consider removing or updating if needed.

## Roadmap

See `Roadmap.md` for planned features and progress.

## Contributing

Fork, make changes, submit a PR, follow React hooks and Tailwind via `styles.js`.

## Instructions for AI

Provide full updated files and specific code snippets for changes. For significant updates to `README.md` or `Roadmap.md`, share the full file; for minor edits, provide the updated section (e.g., task A.3).
