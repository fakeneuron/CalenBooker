# CalenBooker Roadmap

This file tracks tasks and progress for CalenBooker development. Functional changes from completed tasks are reflected in `README.md`, with broad milestones noted here. Last updated: March 20, 2025.

## Instructions for AI

- Assign each task a unique identifier (e.g., `#001`) for tracking.
- For medium-to-large tasks (>2-3 hours), create a `T###-ShortTitle.md` Task Note file (e.g., `T001-OwnerCalendarSync.md`) to detail changes, problems, solutions, and third-party configs. Include the starting git commit hash (e.g., `git commit -m "Start #001"`) before beginning. Small tasks may skip this.
- Update `README.md`’s 'Project Structure and Functionality' with detailed functionality/setup after each task.
- Log completed tasks in the 'Progress (Completed)' section below with broad strokes.
- Provide full `.md` files for multiple section updates or the full item (e.g., `#001`) with its number for single changes.

## Tasks

#001 Owner Calendar Sync

- Description: Add 2-way sync with owners’ calendars (Google Calendar, Outlook, Apple iCloud) in `AppointmentScheduler.jsx` or `Dashboard.jsx`. Support multiple providers with an optional toggle for privacy-conscious users (app-only mode if disabled). Pulls events into `appointments` table or a new `calendar_events` table for conflict checks, pushes new bookings to the selected calendar. Enables visual calendar feedback (month view with saturation dots, hourly day view) for scheduling.
- Effort: ~6-8 hours
- Priority: High - Seamless workflow integration, critical for adoption and conflict-aware scheduling.

#002 Appointment Scheduler Preview/Confirmation Integration

- Description: Enhance `AppointmentScheduler.jsx` with a visual calendar: month view (dots/shaded for saturation) and clickable hourly day view showing appointments inline. Selecting a date scrolls the calendar and populates the form; clicking the calendar fills the form. Booking at a conflicting time triggers a warning (e.g., “Conflict at 2 PM—Confirm anyway?”), overrideable with a flag (color-coded, stored in `appointments`). Uses 15-min increment granularity for openings (MVP, no profile setting yet). Post-submission, shows full confirmation content inline (date, time, service type, notes, calendar links, shareable `/appointment-confirmation/<id>` link), keeping the user on the page. Future: Split views for multi-employee openings.
- Effort: ~4-6 hours (assumes local data; +2-3 hours with Sync)
- Priority: High - Improves workflow efficiency and UX, core to optimal scheduling.

#003 Marketing Landing Page

- Description: Enhance `Home.jsx` with a “Sign Up Free” CTA, testimonials, and demo video for promotion.
- Effort: ~2-3 hours
- Priority: High - Boosts user acquisition.

#004 Referral Program

- Description: Add a “Refer a Friend” link in `Dashboard.jsx` with a social shoutout reward.
- Effort: ~2-3 hours
- Priority: High - Drives word-of-mouth growth.

#005 SEO Optimization

- Description: Add meta tags, keywords, and sitemap; optimize `Home.jsx` content for search engines.
- Effort: ~2-3 hours
- Priority: High - Essential for organic growth.

#006 Email-Friendly Message Format

- Description: Add a formatted version of the `scheduled` message (and optionally others) in `Messages.jsx` or `AppointmentScheduler.jsx`, optimized for copy-pasting into emails. Include appointment details (e.g., date, time, location) in a clean, readable block (e.g., plain text with line breaks). Provide a "Copy to Clipboard" button for ease.
- Effort: ~2-3 hours
- Priority: Medium - Enhances client communication flexibility.
- Completed: Implemented in `AppointmentConfirmationPrivate.jsx` with clickable short links (`/a/<short_code>`), SMS/email formats, and `.ics` integration (March 20, 2025).

#007 Streamline Messages Page Layout

- Description: Redesign `Messages.jsx` layout for a compact, desktop-friendly view. Shrink oversized buttons, stack textareas vertically or use a grid, maximize visible content per screen (e.g., all 4 messages + business info without scrolling on a standard desktop). Keep Kawaii styling but prioritize clarity and space efficiency.
- Effort: ~3-4 hours
- Priority: Medium - Boosts usability, especially for desktop users.

#008 Fix Confirmation Resend Token Reuse

- Description: Updated `SignupForm.jsx` and `LoginForm.jsx` to use `emailRedirectTo` from `VITE_AUTH_REDIRECT` (defaults to `localhost:4000/auth/confirm`), ensuring consistent redirects for signup and resend links across dev (`localhost`) and live (`delparte.com`) environments. Fixed resend link defaulting to Site URL (`calenbooker.com`) by adding `emailRedirectTo` to `supabase.auth.resend()`. Addresses latent bug where resend reused expired tokens and mismatched redirects.
- Effort: ~2-3 hours
- Priority: High - Critical auth flow bug.
- Completed: Fixed redirect mismatch, resend now uses `localhost` locally, aligns with live site via env vars.

#009 Messages Section

- Description: Added a "Messages" section in `Messages.jsx` for customizable global default messages, stored in `messages` table (`id`, `user_id`, `event_type`, `default_message`). Includes `scheduled` (used as intro in confirmation pages), `rescheduled`, `cancelled`, `no_show` (displayed as "No-Show"). Moved `parking_instructions`, `office_directions`, `custom_info` to `business_profile` (nullable, blank by default), shown in confirmation "Notes" (bulleted list) if populated, with business name in location fields. Default messages now populate on first dashboard load (`Dashboard.jsx`) instead of signup to avoid RLS conflicts.
- Effort: ~4-6 hours
- Priority: Medium - Enhances customization.
- Completed: Implemented `Messages.jsx` with edit/revert, integrated into confirmation with notes and calendar events, fixed signup conflict by moving message initialization to dashboard.

#010 Client Feedback

- Description: Add a "Feedback" link on `/appointment-confirmation/<id>` (public), store in a `feedback` table.
- Effort: ~4-6 hours
- Priority: Medium - Improves service quality, client engagement.

#011 Secure `users_view` Access

- Description: Addressed `auth_users_exposed` by restricting `users_view` (`anon` access) and moving email checks to a secure function or backend. Ultimately dropped `users_view` entirely, relying on `check_email_exists` function to resolve persistent security errors.
- Effort: ~2-4 hours
- Priority: Medium - Resolves Supabase security warning.
- Completed: Dropped `users_view`, implemented `check_email_exists` with `SECURITY DEFINER`, restricted to `anon` execution, verified signup functionality post-reset.

#012 Configure delparte.com Email

- Description: Set up custom email addresses (e.g., `calenbooker@delparte.com`, `noreply@delparte.com`) using the owned `delparte.com` domain and ProtonMail Pro subscription. Leverage ProtonMail’s custom domain support to create functional emails for CalenBooker without a dedicated email server. Configure DNS (e.g., MX, TXT records) via domain registrar and ProtonMail dashboard for sending/receiving.
- Effort: ~2-3 hours
- Priority: High - Establishes branded email communication for the app.

#013 Identify Missing Features from Competitors

- Description: Research leading calendar booking apps (e.g., Calendly, Acuity Scheduling, SimplyBook.me) to identify features enticing customers (e.g., payment integration, team scheduling, custom branding). Analyze their competitive edge, assess how CalenBooker can differentiate (e.g., privacy focus, Kawaii UX), and explore similar efforts by privacy-first competitors (e.g., Proton Calendar). Document findings to inform future tasks.
- Effort: ~3-4 hours
- Priority: Medium - Strategic planning for market competitiveness.

#014 Resolve npm Vulnerabilities

- Description: Ran `npm audit` post-migration—found 0 vulnerabilities as of March 19, 2025 (previously addressed 11, including 7 high, after adding `react-google-recaptcha`). Dependencies updated, no manual fixes needed.
- Effort: ~2-4 hours
- Priority: Medium - Improves security and maintainability.
- Completed: Verified zero vulnerabilities post-Vite migration.

#015 Clean Up ESLint Warnings

- Description: Fix `no-unused-vars` warnings in `AppointmentConfirmation.jsx` (Line 172: `businessName`) and `Messages.jsx` (Line 107: `handleRevertBusinessInfo`). Remove or use the variables/functions, ensuring no functionality breaks. Improves code cleanliness and reduces console noise.
- Effort: ~1-2 hours
- Priority: Low - Minor cleanup for better maintainability.

#016 Premium Version

- Description: Limit free tier to 5 appointments/month, offer premium with unlimited appointments and extras.
- Effort: ~6-8 hours (without payment)
- Priority: High - Sets up monetization.

#017 Payment Integration

- Description: Add Stripe or PayPal for booking payments.
- Effort: ~6-8 hours
- Priority: High - Supports premium tier.

#018 Appointment Reminders (Pre-Email)

- Description: Add in-app reminders on `/dashboard` using a `reminders` table.
- Effort: ~4-6 hours
- Priority: Medium - Reduces no-shows.

#019 Self-Scheduling for Clients

- Description: Build a public booking page for direct client scheduling.
- Effort: ~8-10 hours
- Priority: High - Major client feature.

#020 Multi-Employee Scheduling

- Description: Enable staff assignment via a `staff` table. Future: Support split calendar views in `AppointmentScheduler.jsx` for finding openings across employees offering the same service.
- Effort: ~8-10 hours
- Priority: High - Scales to teams.

#021 Analytics Dashboard

- Description: Add appointment stats in `Dashboard.jsx` (e.g., bookings/week).
- Effort: ~6-8 hours
- Priority: Medium - Provides insights.

#022 Client Portal

- Description: Develop a client login to view/manage bookings.
- Effort: ~10-12 hours
- Priority: Medium - Enhances client experience.

#023 Recurring Appointments

- Description: Allow recurring scheduling in `AppointmentScheduler.jsx`.
- Effort: ~6-8 hours
- Priority: Medium - Useful for regulars.

#024 Availability Calendar

- Description: Add a calendar view in `AppointmentScheduler.jsx` for open slots. Note: Overlaps with Scheduler Preview—may merge into a unified calendar feature.
- Effort: ~8-10 hours
- Priority: Medium - Visual aid.

#025 Two-Factor Authentication (2FA)

- Description: Implement 2FA for business accounts.
- Effort: ~6-8 hours
- Priority: Medium - Security boost.

#026 Data Export Options

- Description: Add export for appointments (CSV, PDF).
- Effort: ~6-8 hours
- Priority: Medium - Reporting tool.

#027 Advanced Filtering and Sorting

- Description: Enhance `AppointmentsTable.jsx` with filters (date range, status).
- Effort: ~4-6 hours
- Priority: Medium - Improves UX.

#028 Calendar App Integrations

- Description: Expand to Apple Calendar and others. Note: Multi-provider support moved to Owner Calendar Sync—may refine here for additional integrations.
- Effort: ~4-6 hours
- Priority: Medium - Broadens compatibility.

#029 Custom Service Types in Business Profile

- Description: Allow custom service types in `BusinessProfile.jsx` for `AppointmentScheduler.jsx`.
- Effort: ~4-6 hours
- Priority: Medium - Personalization.

#030 Client Confirmation Workflow

- Description: Default appointments to "Pending," send confirm/cancel links, update `status`.
- Effort: ~8-10 hours
- Priority: Medium - Needs email integration.

#031 Automate Client Notification Emails

- Description: Integrate MailerSend/Twilio for automated emails.
- Effort: ~5-6 hours
- Priority: Medium - Deferred until tool approval.

#032 Move Sensitive Operations to Backend

- Description: Shift email/data writes to `backend/server.js` with Supabase Service Key.
- Effort: ~5-6 hours
- Priority: Medium - Security-focused.

#033 Server-Side Input Validation

- Description: Add backend validation in `backend/server.js`.
- Effort: ~4-6 hours
- Priority: Medium - Security enhancement.

#034 Rate Limiting or CAPTCHA

- Description: Implement rate limiting/CAPTCHA on signup/login.
- Effort: ~4-6 hours
- Priority: Medium - Prevents abuse.

#035 Enterprise-Level Security Audits

- Description: Encrypt data, ensure GDPR/CCPA compliance.
- Effort: ~6-8 hours
- Priority: Low - Future-focused.

#036 Client Loyalty Program

- Description: Track `loyalty_points` in `appointments`, offer discounts.
- Effort: ~6-8 hours
- Priority: Low - Engagement-focused.

#037 Professional Business Marketplace

- Description: Add `/marketplace` listing premium businesses.
- Effort: ~10-12 hours
- Priority: Low - Larger scope.

#038 AI Appointment Suggestions

- Description: Suggest optimal times in `AppointmentScheduler.jsx` via Edge Functions.
- Effort: ~8-10 hours
- Priority: Low - Innovative.

#039 Affiliate Links or Ads

- Description: Add affiliate links or ads for free tier users.
- Effort: ~3-4 hours
- Priority: Low - Monetization.

#040 Rename "Appointment" to "Appt" in UI

- Description: Update UI text (e.g., page titles, labels) from "Appointment" to "Appt" for brevity and consistency. Duplicate removed (was B.27).
- Effort: ~2-3 hours
- Priority: Low - Cosmetic improvement.

#041 Unify Routes to `/a/:code`

- Description: Phase out `/appointment-confirmation/:id` in favor of a single `/a/:code` route for both private and public access, using authentication checks to toggle full vs. simplified views.
- Effort: ~4-6 hours
- Priority: Medium - Simplifies routing.

#042 Enhance Email Confirmation with Formatted Mailto and ICS Attachment

- Description: Replace "Copy to Clipboard" in `AppointmentConfirmationPrivate.jsx` with a "Send Email" link using `mailto:` to open the user’s email client, pre-populating a formatted message (e.g., HTML bold text) and attaching the `.ics` file (via Blob URL or server-side solution).
- Effort: ~6-8 hours
- Priority: Medium - Improves client communication workflow.

#043 Secure Public Shortcode Access

- Description: Require a PIN or email verification to view `/a/:code`, preventing unauthorized access to appointment details.
- Effort: ~6-8 hours
- Priority: High - Enhances client privacy post-MVP.

#044 Anonymize Public Appointment Data

- Description: Limit public `/a/:code` view to generic details (e.g., date, time, business name) without client or service specifics.
- Effort: ~4-6 hours
- Priority: Medium - Reduces privacy risks.

#045 PHIPA Compliance Audit

- Description: Audit data handling for Personal Health Information Protection Act compliance, encrypt PHI, and log consent.
- Effort: ~10-12 hours
- Priority: Low - Prepares for health sector use.

#046 PHIPA Compliance Toggle

- Description: Add a signup option for businesses to enable PHIPA mode, requiring PIN access for public links and client TOS acceptance (e.g., limited liability, terms, conditions).
- Effort: ~8-10 hours
- Priority: Medium - Prepares for health sector use, includes third-party risks (e.g., Twilio).

#047 Add psql Client

- Description: Set up a local `psql` client to run SQL files directly against Supabase DB, streamlining resets and updates.
- Effort: ~2-4 hours
- Priority: Low - Improves dev workflow.

## Progress (Completed)

Initial Setup

- Description: Established core project structure and deployment (Git repo, React frontend with Tailwind and Supabase, minimal Express backend, Netlify HTTPS).

Frontend Enhancements

- Description: Improved UI/UX (inline login/signup with autologin, enhanced scheduler, static pages with Kawaii styling, refined navigation).

Database and Security

- Description: Set up Supabase (tables, RLS, `check_email_exists`), hardened security (dropped `users_view`, secured functions, OTP expiry, password checks).

Appointment System

- Description: Built client-facing features (scheduling, notifications with calendar integration, customizable messages in confirmation).

Authentication Fixes

- Description: Improved auth reliability (fixed resend redirect, added terms checkbox, integrated reCAPTCHA v2).

Migrate from CRA to Vite

- Description: Migrated frontend from Create React App (CRA) to Vite for faster builds and dev server (March 19, 2025).
  - Replaced `react-scripts` with `vite@6.2.2` and `@vitejs/plugin-react@4.3.4`.
  - Renamed `.js` files with JSX to `.jsx` (e.g., `App.js` → `App.jsx`, `Home.js` → `Home.jsx`).
  - Moved `index.html` from `public/` to `frontend/` root.
  - Added `postcss.config.js` for Tailwind CSS integration with `tailwindcss@3.4.17` and `autoprefixer@10.4.20`.
  - Updated environment variables from `REACT_APP_*` to `VITE_*` in `.env` and `.jsx` files.
  - Removed CRA leftovers (`public/`, `setupTests.js`, `reportWebVitals.js`).
  - Ensured Kawaii theme (pastels, rounded shapes) persists with `styles.js`.
  - Verified zero npm vulnerabilities post-migration.
  - Note: Fixed Netlify deployment by updating publish directory to `frontend/dist` and environment variables to `VITE_*` prefixes (March 20, 2025).
- Effort: ~10-12 hours
- Priority: High - Improves performance and maintainability.
- Completed: Full app functionality (signup, login, booking) and styling intact with Vite.

Appointment Confirmation Enhancements

- Description: Split `AppointmentConfirmation.jsx` into `AppointmentConfirmationPrivate.jsx` (private, full view with email/SMS) and `AppointmentConfirmationPublic.jsx` (public, simplified). Added short links in `appointment_links` table, integrated clickable links in private view, and enhanced `AppointmentsTable.jsx` with copy icons (March 20, 2025).
- Effort: ~6-8 hours
- Priority: Medium - Improves usability and client sharing.
- Completed: Fully functional with local testing verified.
