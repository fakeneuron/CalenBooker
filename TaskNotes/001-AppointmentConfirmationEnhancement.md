# Appointment Confirmation Enhancement Plan

This document outlines the steps to enhance the appointment confirmation page with short links and calendar integration, plus a refactoring plan. Last updated: March 20, 2025.

## 1. Create appointment_links Table in Supabase

- **File**: `supabase/create_tables.sql`
- **Details**: Added `appointment_links` table to store short codes for appointments.
- **Fields**:
  - `id` (UUID, primary key)
  - `short_code` (text, unique)
  - `appointment_id` (BIGINT, foreign key to `appointments(id)`)
  - `expires_at` (timestamptz)
  - `created_at` (timestamptz, default NOW())
- **Status**: [x] Completed

## 2. Set Up RLS for appointment_links

- **File**: `supabase/rls.sql`
- **Details**: Enabled RLS on `appointment_links`. Policies: authenticated users insert/select their own links; public read access to non-expired links.
- **Status**: [x] Completed

## 3. Create Utility for Short Code Generation

- **File**: `frontend/src/utils/shortCode.js`
- **Details**: Created `generateShortCode` using `nanoid` to generate unique 8-character codes, checking uniqueness against `appointment_links`.
- **Status**: [x] Completed

## 4. Update App.jsx to Add Public Route

- **File**: `frontend/src/App.jsx`
- **Details**: Added route `/a/:code` to render `AppointmentConfirmationPublic.jsx` for public access via short link. Updated `/appointment-confirmation/:id` to use `AppointmentConfirmationPrivate.jsx`.
- **Status**: [x] Completed

## 5. Update AppointmentConfirmation.jsx

- **File**: `frontend/src/pages/AppointmentConfirmation.jsx`
- **Details**: Initially handled both `/appointment-confirmation/:id` (private) and `/a/:code` (public) routes. Fetched appointment ID from `appointment_links` for public route, generated/stored short link (private only) with expiration (appointment date + 1 day), updated email/SMS formats with short link, added `.ics` link to email format. Later refactored into separate files (see Step 8).
- **Status**: [x] Completed (pre-refactor)

## 6. Test

- **Steps**:
  - Updated `supabase/create_tables.sql` and `supabase/rls.sql` (done).
  - Ran SQL in Supabase (done).
  - Updated `App.jsx`, `AppointmentConfirmationPrivate.jsx`, `AppointmentConfirmationPublic.jsx`, `AppointmentsTable.jsx` (done).
  - Tested locally:
    - cd /Users/fakeneuron/Code/Calenbooker/frontend
    - npm run build
    - npm run preview
  - **Private Route**: Visited `http://localhost:4173/appointment-confirmation/<id>`:
    - Email/SMS formats include clickable short link (`localhost:4173/a/<short_code>`), `.ics` download works.
  - **Public Route**: Visited `http://localhost:4173/a/<short_code>`—matches private details, simplified view.
  - **Expiration**: Set `expires_at` in past, accessed short link—shows "This link has expired".
  - **Copy**: Pasted email/SMS into Gmail/SMS app, verified links/`.ics` work.
- **Status**: [x] Completed
- **Notes**: Local testing verified short links, expiration, and copy functionality (e.g., `localhost:4173/a/F6XfLdxw`). All features operational as of March 20, 2025.

## 7. Deploy to Live Site

- **Details**: Deploy updated code to `delparte.com`. Sync Supabase production DB with `appointment_links` table and RLS. Verify short links live (e.g., `https://delparte.com/a/<short_code>`).
- **Status**: [ ] Not Started
- **Notes**: Pending Netlify redeploy and Supabase production sync.

## 8. Refactor AppointmentConfirmation.jsx

- **Details**: At 358 lines, `AppointmentConfirmation.jsx` was large. Refactored for reusability and clarity:
  - **Extract Data Fetching**: Moved `fetchAppointmentDetails` to `useAppointmentDetails.js` (custom hook).
  - **Extract Formatting**: Moved email/SMS formatting and `.ics` generation to `appointmentUtils.js`.
  - **Split UI**:
    - `AppointmentConfirmationPrivate.jsx`: Full view with SMS/email for business owners (private route).
    - `AppointmentConfirmationPublic.jsx`: Simplified view with only web details for clients (public route, no SMS/email).
    - Removed `AppointmentConfirmation.jsx`, replaced with direct routing in `App.jsx`.
  - **Update App.jsx**: Updated routes to use `AppointmentConfirmationPrivate.jsx` for `/appointment-confirmation/:id` and `AppointmentConfirmationPublic.jsx` for `/a/:code`.
  - **Enhance AppointmentsTable.jsx**: Added web/email/SMS copy links per row with overlay feedback using `appointmentUtils.js` and `react-icons`.
- **Status**: [x] Completed
- **Effort**: ~6-8 hours
- **Priority**: Medium - Improves maintainability and reusability.
- **Notes**: Completed March 20, 2025. Public view simplified, private view retains full features with clickable links styled via `styles.js`. "Appt" rename deferred to Roadmap B.25.
