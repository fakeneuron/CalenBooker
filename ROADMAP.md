# ROADMAP

This file tracks incomplete tasks for CalenBooker development. Completed tasks are logged in `TaskNotes/` with sequential numbering.
Last Completed Task: T005-UIOverhaul-Messages (completed March 22, 2025)

## Task Process

- **New Tasks**: Open a new `T###-ShortName.md` TaskNote in the `CalenBooker/` root (e.g., `T006-BusinessLocationAutocomplete.md`) using the template in `TaskNotes/T###-Template.md`. Start with `git commit -m "Start T###-ShortName"`. Use the next sequential number after the last completed task.
- **Execution**: Complete all steps in the TaskNote, checking off items in the "Progress" section as you go.
- **Completion**:
  - Log new functionality or configuration in `README.md`.
  - Remove the task from `ROADMAP.md`.
  - Add any new tasks to `ROADMAP.md`.
  - Move the TaskNote to `CalenBooker/TaskNotes/` (e.g., `TaskNotes/T006-BusinessLocationAutocomplete.md`).
  - Confirm with user for Git push.
  - Run Git commands: `git add`, `git commit`, `git push origin master`.
- **Git**: Hold off on Git commands until the end, unless live site testing is required.

## High Priority

- **Navigation Prompts**

  - **Goal**: Prevent navigation away from unsaved changes on all editable pages (Messages, Business Profile, Appointments).
  - **Details**: Add dirty state tracking to `Messages.jsx`, `BusinessProfile.jsx`, and future editable pages; implement prompts using `react-router-dom` (e.g., `useBlocker`); test across all editable fields.
  - **Effort**: ~4-6 hours
  - **Notes**: Prompt user to save or discard changes when navigating away.

- **Owner Calendar Sync**

  - **Goal**: Add 2-way sync with owners’ calendars (Google, Outlook, Apple) in `Dashboard.jsx` or `AppointmentScheduler.jsx`.
  - **Details**: Support multiple providers with an optional toggle (app-only mode if disabled); pull events into `appointments` or a new `calendar_events` table; push bookings to calendars; enable visual feedback (month view with dots, hourly day view).
  - **Effort**: ~6-8 hours
  - **Notes**: Combines multi-provider support; critical for workflow and conflict checks.

- **Enhanced Appointment Scheduler**

  - **Goal**: Redesign `AppointmentScheduler.jsx` with a visual calendar, confirmation flow, and availability controls.
  - **Details**: Add month view (dots for saturation), hourly day view; populate time slots via clicks; warn on conflicts (overrideable, stored in `appointments`); use 15-min increments; show inline confirmation (date/time, service, notes, links); add working hours/protected time to limit slots; future: allow clients to book directly with employees.
  - **Effort**: ~8-10 hours
  - **Notes**: Merges scheduler preview, availability calendar, and working hours for a unified feature.

- **Marketing Landing Page**

  - **Goal**: Boost user acquisition via `Home.jsx`.
  - **Details**: Add “Sign Up Free” CTA, testimonials, demo video.
  - **Effort**: ~2-3 hours

- **Referral Program**

  - **Goal**: Drive growth with a referral link in `Dashboard.jsx`.
  - **Details**: Add “Refer a Friend” with social shoutout reward.
  - **Effort**: ~2-3 hours

- **SEO Optimization**

  - **Goal**: Improve organic reach in `Home.jsx`.
  - **Details**: Add meta tags, keywords, sitemap; optimize content.
  - **Effort**: ~2-3 hours

- **Configure delparte.com Email**

  - **Goal**: Set up branded emails using `delparte.com` and ProtonMail Pro.
  - **Details**: Configure `calenbooker@delparte.com`, `noreply@delparte.com` via DNS (MX, TXT) and ProtonMail dashboard.
  - **Effort**: ~2-3 hours

- **Premium Version**

  - **Goal**: Monetize with a premium tier.
  - **Details**: Limit free tier to 5 appointments/month; offer unlimited appointments and extras for premium.
  - **Effort**: ~6-8 hours

- **Payment Integration**

  - **Goal**: Support premium tier payments.
  - **Details**: Add Stripe or PayPal for bookings.
  - **Effort**: ~6-8 hours

- **Self-Scheduling for Clients**

  - **Goal**: Enable direct client booking via a public page.
  - **Details**: Build a public scheduling interface.
  - **Effort**: ~8-10 hours

- **Multi-Employee Scheduling**

  - **Goal**: Support team scheduling with business signup options.
  - **Details**: Add signup as Business (admin) or Individual; businesses can add employees; admins manage employee data and appointments; only admins modify appointments unless permissions granted to co-workers.
  - **Effort**: ~10-12 hours
  - **Notes**: Expanded to include business signup and permissions.

- **Secure Public Shortcode Access**
  - **Goal**: Enhance privacy for `/a/:code`.
  - **Details**: Require PIN or email verification for access.
  - **Effort**: ~6-8 hours

## Moderate Priority

- **Business Profile Location Autocomplete**

  - **Goal**: Add Google Maps Autocomplete to `BusinessProfile.jsx` for accurate address entry.
  - **Details**: Implement a separate location search field (not inline with address input); auto-populate `address`, `city`, `province`, and `postalCode`; update `.env` and `.env.example` with Google API key.
  - **Effort**: ~4-6 hours
  - **Notes**: Post-launch feature; avoid LocationIQ (poor response format); use Google Maps API (requires credit card for billing).

- **Streamline Messages Page Layout**

  - **Goal**: Optimize `Messages.jsx` for desktop usability.
  - **Details**: Compact layout (vertical stack or grid), shrink buttons, maximize visible content (all messages + business info).
  - **Effort**: ~3-4 hours

- **Client Feedback**

  - **Goal**: Collect feedback on `/appointment-confirmation/<id>`.
  - **Details**: Add "Feedback" link, store in `feedback` table.
  - **Effort**: ~4-6 hours

- **Identify Missing Features from Competitors**

  - **Goal**: Research competitors for feature gaps.
  - **Details**: Analyze Calendly, Acuity, etc., for differentiation (e.g., privacy, UX); document findings.
  - **Effort**: ~3-4 hours

- **Appointment Reminders (Pre-Email)**

  - **Goal**: Reduce no-shows with in-app reminders.
  - **Details**: Add reminders on `/dashboard` using a `reminders` table.
  - **Effort**: ~4-6 hours

- **Analytics Dashboard**

  - **Goal**: Redesign `Dashboard.jsx` as a calendar with insights and interactivity.
  - **Details**: Show month/week view with appointment saturation (dots/shading); click dates for table/widget or day view (granular based on selection); make appointments clickable to drill down, modify, update, or reschedule.
  - **Effort**: ~8-10 hours
  - **Notes**: Expanded to include calendar view and clickable appointments.

- **Guest Mode for Appointment Creation**

  - **Goal**: Allow non-signed-up users to create appointment widgets.
  - **Details**: Enable "Appointment Confirmed" widget with Google/ICS links in guest mode; add protections (e.g., CAPTCHA, rate limiting) to prevent abuse.
  - **Effort**: ~4-6 hours

- **Client Portal**

  - **Goal**: Allow clients to manage bookings.
  - **Details**: Develop a client login interface.
  - **Effort**: ~10-12 hours

- **Recurring Appointments**

  - **Goal**: Support recurring bookings in `AppointmentScheduler.jsx`.
  - **Details**: Add recurring scheduling options.
  - **Effort**: ~6-8 hours

- **Two-Factor Authentication (2FA)**

  - **Goal**: Enhance account security.
  - **Details**: Implement 2FA for business accounts.
  - **Effort**: ~6-8 hours

- **Data Export Options**

  - **Goal**: Enable appointment exports.
  - **Details**: Add CSV, PDF export for appointments.
  - **Effort**: ~6-8 hours

- **Advanced Filtering and Sorting**

  - **Goal**: Improve `AppointmentsTable.jsx` usability.
  - **Details**: Add filters (date range, status).
  - **Effort**: ~4-6 hours

- **Client Booking Workflow**

  - **Goal**: Streamline client confirmation and email flow.
  - **Details**: Default appointments to "Pending," send confirm/cancel links; enhance `AppointmentConfirmationPrivate.jsx` with `mailto:` link (formatted message, `.ics` attachment), update content (shortlink at top, combined date/time, no timezone).
  - **Effort**: ~8-10 hours
  - **Notes**: Merges confirmation workflow and email enhancements.

- **Automate Client Notification Emails**

  - **Goal**: Send automated emails via MailerSend/Twilio.
  - **Details**: Integrate for notifications; deferred until tool approval.
  - **Effort**: ~5-6 hours

- **Move Sensitive Operations to Backend**

  - **Goal**: Secure operations in `backend/server.js`.
  - **Details**: Shift email/data writes with Supabase Service Key.
  - **Effort**: ~5-6 hours

- **Server-Side Input Validation**

  - **Goal**: Enhance security in `backend/server.js`.
  - **Details**: Add backend validation.
  - **Effort**: ~4-6 hours

- **Rate Limiting or CAPTCHA**

  - **Goal**: Prevent abuse on signup/login.
  - **Details**: Implement rate limiting or CAPTCHA.
  - **Effort**: ~4-6 hours

- **Unify Routes to `/a/:code`**

  - **Goal**: Simplify routing.
  - **Details**: Phase out `/appointment-confirmation/:id` for `/a/:code` with auth-based views.
  - **Effort**: ~4-6 hours

- **Anonymize Public Appointment Data**

  - **Goal**: Reduce privacy risks on `/a/:code`.
  - **Details**: Limit public view to generic details (date, time, business name).
  - **Effort**: ~4-6 hours

- **PHIPA Compliance Toggle**
  - **Goal**: Prepare for health sector use.
  - **Details**: Add PHIPA mode at signup (PIN access, TOS acceptance).
  - **Effort**: ~8-10 hours

## Low Priority

- **Enterprise-Level Security Audits**

  - **Goal**: Ensure GDPR/CCPA compliance.
  - **Details**: Encrypt data, audit compliance.
  - **Effort**: ~6-8 hours

- **Client Loyalty Program**

  - **Goal**: Boost engagement with `loyalty_points`.
  - **Details**: Track points in `appointments`, offer discounts.
  - **Effort**: ~6-8 hours

- **Professional Business Marketplace**

  - **Goal**: List premium businesses on `/marketplace`.
  - **Details**: Develop a marketplace page.
  - **Effort**: ~10-12 hours

- **AI Appointment Suggestions**

  - **Goal**: Optimize scheduling in `AppointmentScheduler.jsx`.
  - **Details**: Suggest times via Edge Functions.
  - **Effort**: ~8-10 hours

- **Affiliate Links or Ads**

  - **Goal**: Monetize free tier.
  - **Details**: Add affiliate links or ads.
  - **Effort**: ~3-4 hours

- **Rename "Appointment" to "Appt" in UI**

  - **Goal**: Improve UI brevity.
  - **Details**: Update text (titles, labels) to "Appt".
  - **Effort**: ~2-3 hours

- **Add psql Client**

  - **Goal**: Streamline DB updates.
  - **Details**: Set up local `psql` client for Supabase.
  - **Effort**: ~2-4 hours

- **Consolidate Assets into `src/assets/`**

  - **Goal**: Organize assets.
  - **Details**: Move `logo.svg` to `src/assets/`, update `Navbar.jsx`, document in `README.md`.
  - **Effort**: ~1-2 hours

- **PHIPA Compliance Audit**
  - **Goal**: Ensure health data compliance.
  - **Details**: Audit for PHIPA, encrypt PHI, log consent.
  - **Effort**: ~10-12 hours
