# ROADMAP

This file tracks incomplete tasks for CalenBooker development. Completed tasks are logged in `TaskNotes/` with sequential numbering.
Last Completed Task: T005-UIOverhaul-Messages (completed March 22, 2025)

## Priority Statement

The focus is on creating a sleek, visually appealing, and highly functional MVP. High-priority tasks enhance page designs and layouts (e.g., sidebars, dashboards, streamlined pages), improve user flow, add feature-rich public-facing functionality (e.g., guest scheduler, landing page visuals), and include core functionality, branding, and quick-win security features (e.g., email setup, PIN access). Moderate priorities include technical expansions and secondary features like marketing. Low-priority tasks cover tertiary enhancements or compliance.

## Task Process

- **New Tasks**: Open a new `T###-ShortName.md` TaskNote in the `CalenBooker/` root (e.g., `T006-SiteRedesign.md`) using the template in `TaskNotes/T###-Template.md`. Start with `git commit -m "Start T###-ShortName"`. Use the next sequential number after the last completed task.
- **Execution**: Complete all steps in the TaskNote, checking off items in the "Progress" section as you go.
- **Completion**:
  - Log new functionality or configuration in `README.md`.
  - Remove the task from `ROADMAP.md`.
  - Add any new tasks to `ROADMAP.md`.
  - Move the TaskNote to `CalenBooker/TaskNotes/` (e.g., `TaskNotes/T006-SiteRedesign.md`).
  - Confirm with user for Git push.
  - Run Git commands: `git add`, `git commit`, `git push origin master`.
- **Git**: Hold off on Git commands until the end, unless live site testing is required.

## High Priority

- **Site Redesign with Sidebars**

  - **Goal**: Revamp key pages (`Dashboard.jsx`, `BusinessProfile.jsx`, `Messages.jsx`) with sidebars and a sleek, modern layout.
  - **Details**: Replace basic forms with a sidebar navigation layout; use Tailwind CSS for a professional, cohesive design; ensure responsive behavior.
  - **Effort**: ~8-10 hours
  - **Notes**: Critical for a polished MVP; enhances user experience and visual appeal.

- **Enhanced Appointment Scheduler**

  - **Goal**: Redesign `AppointmentScheduler.jsx` with a visual calendar, confirmation flow, and availability controls.
  - **Details**: Add month view (dots for saturation), hourly day view; populate time slots via clicks; warn on conflicts (overrideable, stored in `appointments`); use 15-min increments; show inline confirmation (date/time, service, notes, links); add working hours/protected time to limit slots; future: allow clients to book directly with employees.
  - **Effort**: ~8-10 hours
  - **Notes**: Key for smooth booking flow and feature richness.

- **Sophisticated Dashboard**

  - **Goal**: Redesign `Dashboard.jsx` as an interactive, visually rich dashboard.
  - **Details**: Replace table with a month/week view (dots/shading for saturation); add clickable dates for detailed day view or widgets; enable appointment drill-down (modify, reschedule); use sidebar for navigation or filters.
  - **Effort**: ~8-10 hours
  - **Notes**: Merges analytics and interactivity; replaces boring form layout.

- **Public Guest Scheduler**

  - **Goal**: Allow non-signed-up users to book via a public-facing scheduler.
  - **Details**: Build a standalone page (e.g., `/guest-scheduler`) with a simplified `AppointmentScheduler.jsx`; generate confirmation with Google/ICS links; add CAPTCHA/rate limiting to prevent abuse.
  - **Effort**: ~6-8 hours
  - **Notes**: Boosts accessibility and feature richness for clients.

- **Landing Page Visual Enhancements**

  - **Goal**: Improve `Home.jsx` with a sleek design and optional video.
  - **Details**: Add a visually appealing hero section (e.g., Kawaii illustrations, smooth animations); include a demo video or carousel; ensure “Sign Up Free” CTA pops; optimize for responsiveness.
  - **Effort**: ~4-6 hours
  - **Notes**: Critical for first impressions; prioritizes visuals.

- **Navigation Prompts**

  - **Goal**: Prevent navigation away from unsaved changes on editable pages.
  - **Details**: Add dirty state tracking to `Messages.jsx`, `BusinessProfile.jsx`, etc.; use `react-router-dom` (e.g., `useBlocker`) for prompts; test across all forms.
  - **Effort**: ~4-6 hours
  - **Notes**: Ensures smooth flow by protecting user data.

- **Owner Calendar Sync**

  - **Goal**: Add 2-way sync with owners’ calendars (Google, Outlook, Apple).
  - **Details**: Integrate with `Dashboard.jsx` or `AppointmentScheduler.jsx`; support toggle (app-only mode); pull/push events; show month view with dots, hourly day view.
  - **Effort**: ~6-8 hours
  - **Notes**: Enhances functionality and workflow.

- **Configure delparte.com Email**

  - **Goal**: Set up branded emails using `delparte.com` and ProtonMail Pro.
  - **Details**: Configure `calenbooker@delparte.com`, `noreply@delparte.com` via DNS (MX, TXT) and ProtonMail dashboard.
  - **Effort**: ~2-3 hours
  - **Notes**: Supports core notification functionality and branding for MVP.

- **Streamline Messages Page Layout**

  - **Goal**: Optimize `Messages.jsx` for desktop usability with a sleek design.
  - **Details**: Compact layout (vertical stack or grid), shrink buttons, maximize content; align with site-wide design standards.
  - **Effort**: ~3-4 hours
  - **Notes**: Improves layout for a polished MVP.

- **Secure Public Shortcode Access**
  - **Goal**: Enhance privacy for `/a/:code` with PIN access.
  - **Details**: Add PIN requirement to `appointment_links` table and `/a/:code` page; keep implementation simple for base security.
  - **Effort**: ~4-6 hours (simplified from ~6-8 hours)
  - **Notes**: Quick security win for MVP; email verification deferred.

## Moderate Priority

- **Marketing Landing Page**

  - **Goal**: Boost user acquisition via `Home.jsx`.
  - **Details**: Add “Sign Up Free” CTA, testimonials, demo video (content-focused, less visual emphasis than High Priority version).
  - **Effort**: ~2-3 hours
  - **Notes**: Secondary to visual enhancements; focus on marketing post-MVP.

- **Referral Program**

  - **Goal**: Drive growth with a referral link in `Dashboard.jsx`.
  - **Details**: Add “Refer a Friend” with social shoutout reward.
  - **Effort**: ~2-3 hours
  - **Notes**: Marketing feature, not critical for MVP.

- **SEO Optimization**

  - **Goal**: Improve organic reach in `Home.jsx`.
  - **Details**: Add meta tags, keywords, sitemap; optimize content.
  - **Effort**: ~2-3 hours
  - **Notes**: Marketing-related, deferred until after visual polish.

- **Business Profile Location Autocomplete**

  - **Goal**: Add Google Maps Autocomplete to `BusinessProfile.jsx`.
  - **Details**: Use a separate search field (not inline with address); auto-populate `address`, `city`, `province`, `postalCode`; update `.env` and `.env.example`.
  - **Effort**: ~4-6 hours
  - **Notes**: Post-launch; avoid LocationIQ (poor format); Google Maps requires credit card.

- **Self-Scheduling for Clients**

  - **Goal**: Enable direct client booking via a public page.
  - **Details**: Build a public scheduling interface (distinct from guest scheduler, tied to owner accounts).
  - **Effort**: ~8-10 hours
  - **Notes**: Technical feature for later phase.

- **Multi-Employee Scheduling**

  - **Goal**: Support team scheduling with business signup options.
  - **Details**: Add signup as Business/Individual; manage employees and permissions.
  - **Effort**: ~10-12 hours
  - **Notes**: Technical feature for later phase.

- **Client Feedback**

  - **Goal**: Collect feedback on `/appointment-confirmation/<id>`.
  - **Details**: Add "Feedback" link, store in `feedback` table.
  - **Effort**: ~4-6 hours

- **Premium Version**

  - **Goal**: Monetize with a premium tier.
  - **Details**: Limit free tier to 5 appointments/month; offer unlimited and extras for premium.
  - **Effort**: ~6-8 hours
  - **Notes**: Secondary; MVP launches free.

- **Payment Integration**
  - **Goal**: Support premium tier payments.
  - **Details**: Add Stripe or PayPal.
  - **Effort**: ~6-8 hours
  - **Notes**: Tied to Premium Version.

## Low Priority

- **Identify Missing Features from Competitors**

  - **Goal**: Research competitors for feature gaps.
  - **Details**: Analyze Calendly, Acuity, etc., for differentiation; document findings.
  - **Effort**: ~3-4 hours

- **Appointment Reminders (Pre-Email)**

  - **Goal**: Reduce no-shows with in-app reminders.
  - **Details**: Add reminders on `/dashboard` using a `reminders` table.
  - **Effort**: ~4-6 hours

- **Guest Mode for Appointment Creation**

  - **Goal**: Allow non-signed-up users to create appointment widgets.
  - **Details**: Enable "Appointment Confirmed" widget with Google/ICS links; add protections (CAPTCHA, rate limiting).
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
  - **Details**: Default appointments to "Pending," send confirm/cancel links; enhance `AppointmentConfirmationPrivate.jsx`.
  - **Effort**: ~8-10 hours

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
  - **Details**: Limit public view to generic details.
  - **Effort**: ~4-6 hours

- **PHIPA Compliance Toggle**

  - **Goal**: Prepare for health sector use.
  - **Details**: Add PHIPA mode at signup (PIN access, TOS acceptance).
  - **Effort**: ~8-10 hours

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
  - **Notes**: Low priority; focus on MVP first.

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
