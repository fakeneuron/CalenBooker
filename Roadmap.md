# ROADMAP

This file tracks incomplete tasks for CalenBooker development. Completed tasks are logged in `TaskNotes/` with sequential numbering (e.g., `T004-QuickFixes.md`). Last updated: March 22, 2025.

## Task Process

- **New Tasks**: Open a new `T###-ShortName.md` TaskNote in the root (e.g., `T006-NavigationPrompts.md`) to plan and execute. Start with `git commit -m "Start T###-ShortName"`.
- **Execution**: Complete all items in the TaskNote.
- **Completion**:
  - Log new functionality or configuration in `README.md`.
  - Remove the task from `ROADMAP.md`.
  - Add any new tasks to `ROADMAP.md`.
  - Move the TaskNote to `TaskNotes/` (e.g., `TaskNotes/T006-NavigationPrompts.md`).
  - Confirm with user for Git push.
  - Run Git commands: `git add`, `git commit`, `git push origin master`.
- **Git**: Hold off on Git commands until the end, unless live site testing is required.

## High Priority

- **T006-NavigationPrompts**

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

  - **Goal**: Enhance `AppointmentScheduler.jsx` with a visual calendar and confirmation flow.
  - **Details**: Add month view (dots for saturation), hourly day view; populate form via clicks; warn on conflicts (overrideable, stored in `appointments`); use 15-min increments; show inline confirmation (date/time, service, notes, links) post-submission.
  - **Effort**: ~6-8 hours
  - **Notes**: Merges scheduler preview and availability calendar for a unified feature.

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

  - **Goal**: Support team scheduling.
  - **Details**: Add staff assignment via a `staff` table; future split calendar views in `AppointmentScheduler.jsx`.
  - **Effort**: ~8-10 hours

- **Secure Public Shortcode Access**
  - **Goal**: Enhance privacy for `/a/:code`.
  - **Details**: Require PIN or email verification for access.
  - **Effort**: ~6-8 hours

## Moderate Priority

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

  - **Goal**: Provide booking insights in `Dashboard.jsx`.
  - **Details**: Add stats (e.g., bookings/week).
  - **Effort**: ~6-8 hours

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

- **Custom Service Types in Business Profile**

  - **Goal**: Personalize services in `BusinessProfile.jsx`.
  - **Details**: Allow custom service types; optional address autocomplete (e.g., Google Places API).
  - **Effort**: ~4-6 hours (base); +4-6 hours with autocomplete

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
