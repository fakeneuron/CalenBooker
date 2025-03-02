# CalenBooker MVP Plan

## Purpose and Vision

"CalenBooker MVP" streamlines appointment scheduling for small businesses (e.g., barber shops), allowing owners to sign up, provide business profiles, and schedule client meetings with client notifications. Key features include minimal signup (email/password), email confirmation, business profile capture, and meeting scheduling with a shareable webpage displaying meeting details and calendar integration options (e.g., `.ics`, Google Calendar, Outlook); full email notifications are deferred to v2. The system leverages Supabase with Anon Key and RLS for authentication and data storage, hosted on `github.com/fakeneuron/CalenBooker` (branch: `master`).

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

Request the following files to understand and work on this project:

- **Frontend Pages**: `frontend/src/pages/*.js` (Home.js, Signup.js, SignupSuccess.js, Login.js, AuthConfirm.js, Dashboard.js, BusinessProfile.js, MeetingScheduler.js, MeetingConfirmation.js)
- **Frontend Components**: `frontend/src/components/*.js` (Navbar.js, MeetingsTable.js)
- **Frontend Core**: `frontend/src/App.js`, `frontend/src/index.js`, `frontend/src/styles.js`, `frontend/src/supabaseClient.js`, `frontend/src/index.css`
- **Frontend Public**: `frontend/public/index.html`, `frontend/public/_redirects`
- **Backend**: `backend/server.js`
- **Supabase SQL**: `supabase/create_tables.sql`, `supabase/rls.sql`, `supabase/users_view_setup.sql`
- **Root**: `README.md`, `frontend/package.json`, `backend/package.json`

## Project Structure and Functionality

1. **Initialize Project**:

   - Git repository: `github.com/fakeneuron/CalenBooker` (branch: `master`).
   - Structure:
     - `Calenbooker/frontend`: React app (port 4000) with `react-scripts@5.0.1`.
     - `Calenbooker/backend`: Express app (port 4001, minimal setup for future v2 features).
     - `Calenbooker/supabase/`: Local SQL snippets (source of truth).
     - `Calenbooker/README.md`: Main project documentation (root-level).

2. **Frontend Setup**:

   - Tailwind CSS via local dependency (`3.4.17`) in `index.css`.
   - Structure:
     - `frontend/src/pages/`:
       - `Home.js`: Landing page for unauthenticated users (`/`) with signup/login links.
       - `Signup.js`: Signup screen with email/password form, login link, and email confirmation trigger.
       - `SignupSuccess.js`: Confirmation screen after signup (`/signup-success`) with login link.
       - `Login.js`: Login screen with signup link and resend confirmation option for unconfirmed emails.
       - `AuthConfirm.js`: Handles email confirmation redirect to `/dashboard` (`/auth/confirm`).
       - `Dashboard.js`: Dashboard screen with meetings table, default post-login page (`/dashboard`), left-aligned names, centered data columns.
       - `BusinessProfile.js`: Business profile screen (`/business-profile`) with form for business details, auto-populate sample data, and a time zone dropdown (e.g., "America/New_York") saved to `time_zone` column in `business_profile`.
       - `MeetingScheduler.js`: Scheduling screen with meeting URL generation (`/meeting-scheduler`), profile check, and auto-populate sample data. Includes a "Service Type" dropdown with preset options ("Haircut," "Consultation," "Shave") and an "Other" option with manual text entry; saves `service_type` to the `meetings` table. Added a "Status" dropdown ("Confirmed," "Pending," "Cancelled") with "Confirmed" as default, saving to `status` column.
       - `MeetingConfirmation.js`: Client-facing meeting confirmation page (`/meeting-confirmation/:id`) with meeting/business details (including `service_type` and `time_zone` displayed with the meeting time) and calendar integration (`.ics`, Google Calendar, Outlook).
     - `frontend/src/components/`:
       - `Navbar.js`: Navigation bar for protected routes (dashboard, profile, scheduling, logout), redirects to `/` on logout.
       - `MeetingsTable.js`: Reusable table displaying user’s meetings with sortable columns (date/time ascending). Includes "Service Type" and "Status" columns with `status` shown in colors (green for "Confirmed," yellow for "Pending," red for "Cancelled").
     - `frontend/src/`:
       - `App.js`: Root component with routing and Supabase auth state management.
       - `index.js`: Entry point rendering `App.js` with routing.
       - `index.css`: Tailwind CSS setup (placeholder for custom styles).
       - `styles.js`: Centralized reusable Tailwind classes for all pages and components.
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

   - Tables: `business_profile` (business details with `time_zone` column for scheduling clarity), `meetings` (meeting records with `service_type` and `status` columns for tracking).
   - Views: `users_view` for email checks.
   - RLS policies for secure data access (`auth.users` linked).
   - Storage: `Calenbooker/supabase/`—source of truth, duplicated in SQL Editor (sync script pending).
   - Snippets:
     - `create_tables.sql`: Defines `business_profile` (updated with `time_zone TEXT NOT NULL DEFAULT 'America/New_York'`) and `meetings` tables (updated with `service_type TEXT NOT NULL` and `status TEXT NOT NULL DEFAULT 'Confirmed'`) linked to `auth.users`.
     - `rls.sql`: Enables RLS and defines policies for `INSERT`, `UPDATE`, `SELECT` on tables.
     - `users_view_setup.sql`: Creates `users_view` and grants Anon Key `SELECT` access for email checks.

5. **Client Meeting Notification System**:

   - `MeetingScheduler.js`: Generates meeting URLs (e.g., `/meeting-confirmation/<id>`), enforces profile check with clickable link to `/business-profile`.
   - `MeetingConfirmation.js`: Displays meeting/business details with `.ics`, Google Calendar, and Outlook integration (public access).

6. **Deployment**:
   - Deployed frontend to Netlify with HTTPS at `https://delparte.com`, configured Supabase auth redirects with local (`http://localhost:4000/auth/confirm`) and live (`https://delparte.com/auth/confirm`) options; confirmed HTTPS post-DNS propagation.

### Progress (Completed)

1. **Initialize Project**:

   - Established Git repository and project structure.

2. **Frontend Setup**:

   - Built React frontend with routing, Tailwind CSS (`3.4.17`), centralized styles, PostCSS configuration for Tailwind processing, and a utility script (`checkEnv.js`) for environment variable debugging.

3. **Backend Setup**:

   - Set up minimal Express backend for future expansion.

4. **Supabase SQL Snippets**:

   - Implemented database tables, views, and RLS policies.

5. **Client Meeting Notification System**:

   - Added meeting scheduling with profile check and calendar integration; removed unused dependencies.

6. **Deployment**:

   - Deployed frontend to Netlify with HTTPS and configured auth redirects.

7. **Meeting Scheduler Enhancements**:
   - Added a "Service Type" field to `MeetingScheduler.js` with preset options and manual "Other" entry, displayed in `MeetingConfirmation.js` and `MeetingsTable.js`, with `service_type` column added to the `meetings` table.
   - Added "Status" indicators to `MeetingScheduler.js` (dropdown with "Confirmed," "Pending," "Cancelled") and `MeetingsTable.js` (color-coded display), with `status` column added to the `meetings` table.
   - Added a "Time Zone" field to `BusinessProfile.js`, stored in `business_profile` as `time_zone`, and displayed on `MeetingConfirmation.js` with the meeting time for clarity.

### To-Dos

#### Short-Term Implementations

##### Simple

- **Business Profile Preview**
  - Add a preview button in `BusinessProfile.js` to show how clients will see the profile, enhancing transparency.
- **Professional Landing Page**
  - Redesign `Home.js` with a polished, enterprise-level look (e.g., hero section, feature highlights, signup CTA).
- **Improved Navigation**
  - Enhance `Navbar.js` with better grouping or dropdowns for protected routes (e.g., dashboard, profile, scheduling).

##### Complex

- **Messages Section**
  - Add a "Messages" section for customizable meeting invites (e.g., booking confirmations, cancellations, instructions).
- **Client List**
  - Create a running list of clients in `MeetingScheduler.js` to track returning clients and auto-populate forms.
- **Automate Client Notification Emails**
  - Integrate MailerSend to send automated emails (e.g., welcome messages, meeting confirmations).
- **Move Sensitive Operations to Backend**
  - Shift email notifications and data writes to `backend/server.js` using a Supabase Service Key for enhanced security.
- **Server-Side Input Validation**
  - Add backend validation in `backend/server.js` to sanitize data before it reaches Supabase.
- **Rate Limiting or CAPTCHA**
  - Implement rate limiting or CAPTCHA on signup/login endpoints to prevent abuse and improve security.

#### Long-Term Implementations (Complex)

- **Self-Scheduling for Clients**
  - Build a public booking page where clients can schedule meetings directly, reducing business workload.
- **Multi-Employee Scheduling**
  - Enable meeting assignments to specific staff members for team-based operations.
- **Analytics Dashboard**
  - Create a dashboard in `Dashboard.js` to display meeting statistics (e.g., bookings per week, client retention).
- **Client Portal**
  - Develop a client login system to view and manage bookings, enhancing client engagement.
- **Recurring Meetings**
  - Allow scheduling of recurring meetings (e.g., weekly sessions) in `MeetingScheduler.js`.
- **Availability Calendar**
  - Add a calendar view in `MeetingScheduler.js` showing open slots based on business availability.
- **Two-Factor Authentication (2FA)**
  - Implement 2FA for business accounts to bolster security.
- **Data Export Options**
  - Add functionality to export meetings and client data (e.g., CSV, PDF) for reporting purposes.
- **Advanced Filtering and Sorting**
  - Enhance `MeetingsTable.js` with filters (e.g., date range, status) and multi-column sorting.
- **Calendar App Integrations**
  - Expand integrations to include Apple Calendar and other platforms beyond Google/Outlook.
- **Enterprise-Level Security Audits**
  - Conduct regular security audits, encrypt sensitive data, and ensure compliance with privacy regulations (e.g., GDPR, CCPA).
- **Custom Service Types in Business Profile**
  - Allow businesses to define their own service types in `BusinessProfile.js`, stored in the `business_profile` table, and dynamically populate the `MeetingScheduler.js` dropdown with these options.
- **Client Confirmation Workflow**
  - Enhance appointment scheduling to default to "Pending," send an email to the client with details and links to confirm or cancel, updating the `status` based on client action; requires email integration and backend updates.
- **Nomenclature Refactoring**
  - Replace "Meeting" with "Appointment" across frontend files (e.g., rename `MeetingScheduler.js` to `AppointmentScheduler.js`, update UI text), README.md, and optionally Supabase table names for consistency.
