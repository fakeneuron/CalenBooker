# CalenBooker Roadmap

This file tracks granular tasks and completed progress for CalenBooker development. Functional changes from completed tasks will update relevant sections in `README.md`, with broad milestones noted here.

## Short-Term Tasks

[x] **Footer**

- Added a footer with Terms of Service (`/terms`), Privacy Policy (`/privacy`), Support (`/support`), About (`/about`), and social links.
- Effort: ~2-3 hours
- Priority: High - Quick win, improves site professionalism and trust.

[x] **Navigation Enhancements**

- Add "Home" link to `Navbar.js` for logged-in users; refine public page nav (`/`, `/signup`, `/login`).
- Effort: ~1 hour
- Priority: High - Simple, enhances user flow.
- **Completed**: Added "Home" link to `/dashboard` in `Navbar.js` for logged-in users; public pages (`/`, `/signup`, `/login`) rely on individual page links for navigation, with no navbar for unauthenticated users.

[x] **Inline Login/Signup on Landing Page**

- Integrate login and signup forms into `Home.js`, replacing separate pages with inline components toggled by "Login" and "Get Started" buttons.
- Effort: ~2-3 hours
- Priority: High - Streamlines onboarding UX, reduces navigation steps.
- **Completed**: Converted `Login.js` and `Signup.js` to `LoginForm.js` and `SignupForm.js`, updated `Home.js` with centered buttons and forms, removed `/login`, `/signup`, and `/signup-success` routes, added autologin via `AuthConfirm.js`, fixed logout redirect and dashboard hydration error.

[ ] **Create Footer Pages**

- Build static pages for Terms of Service (`/terms`), Privacy Policy (`/privacy`), Support (`/support`), and About (`/about`), linked from the footer.
- Effort: ~1-2 hours
- Priority: High - Quick, foundational for trust and promotion.

[ ] **Terms Agreement on Signup**

- Add a required terms and conditions checkbox to `Signup.js`, linking to `/terms` and `/privacy`.
- Effort: ~1-2 hours
- Priority: High - Enhances compliance and trust, ties into footer pages.

[ ] **Client List**

- Create a running list of clients in `AppointmentScheduler.js` to track returning clients and auto-populate forms using `appointments` data.
- Effort: ~3-4 hours
- Priority: High - Practical, immediate value for scheduling efficiency; supports marketing pitch.

[ ] **Owner Calendar Sync**

- Add 2-way sync for business owners’ calendars (e.g., Google Calendar API) in `AppointmentScheduler.js`.
- Effort: ~6-8 hours
- Priority: High - Seamless workflow integration, critical for user adoption.

[ ] **Marketing Landing Page**

- Enhance `Home.js` with a strong CTA (“Sign Up Free”), testimonials, and a demo video for promotion.
- Effort: ~2-3 hours
- Priority: High - Boosts initial user acquisition.

[ ] **Referral Program**

- Add a “Refer a Friend” link in `Dashboard.js` with a social shoutout reward.
- Effort: ~2-3 hours
- Priority: High - Drives word-of-mouth growth.

[ ] **SEO Optimization**

- Add meta tags, keywords, and sitemap to improve discoverability on search engines; optimize `Home.js` content.
- Effort: ~2-3 hours
- Priority: High - Essential for organic user acquisition.

[ ] **Messages Section**

- Add a "Messages" section in `AppointmentScheduler.js` for customizable appointment invites (e.g., confirmations, instructions), stored in `appointments`.
- Effort: ~3-4 hours
- Priority: Medium - Enhances customization, builds on current UI.

[ ] **Error Pages**

- Create a 404 "Appointment Not Found" page with a cute design and back-to-home button.
- Effort: ~1-2 hours
- Priority: Medium - Polishes UX, low effort.

[ ] **Client Feedback**

- Add a "Feedback" link on `/appointment-confirmation/<id>` (public), store in a `feedback` table.
- Effort: ~4-6 hours
- Priority: Medium - Improves service quality, client engagement.

## Long-Term Tasks

[ ] **Premium Version**

- Limit free tier to 5 appointments/month, offer premium with unlimited appointments and extras (e.g., reminders, feedback).
- Effort: ~6-8 hours (without payment integration)
- Priority: High - Sets up monetization, scalable model; long-term due to potential payment setup.

[ ] **Payment Integration**

- Add Stripe or PayPal for booking payments, enhancing monetization and appeal.
- Effort: ~6-8 hours
- Priority: High - Standard feature, supports premium tier; long-term due to external tool integration.

[ ] **Appointment Reminders (Pre-Email)**

- Add in-app reminders on `/dashboard` using a new `reminders` table until email integration is ready.
- Effort: ~4-6 hours
- Priority: Medium - Adds value, reduces no-shows, Supabase-only; long-term until email integration.

[ ] **Self-Scheduling for Clients**

- Build a public booking page where clients can schedule appointments directly.
- Effort: ~8-10 hours
- Priority: High - Major client-facing feature, broader scope.

[ ] **Multi-Employee Scheduling**

- Enable appointment assignments to staff via a `staff` table.
- Effort: ~8-10 hours
- Priority: High - Scales to teams, enterprise potential.

[ ] **Analytics Dashboard**

- Create a dashboard in `Dashboard.js` for appointment statistics (e.g., bookings/week, retention).
- Effort: ~6-8 hours
- Priority: Medium - Valuable insights, but not core MVP.

[ ] **Client Portal**

- Develop a client login system to view/manage bookings.
- Effort: ~10-12 hours
- Priority: Medium - Enhances client experience, larger scope.

[ ] **Recurring Appointments**

- Allow scheduling recurring appointments in `AppointmentScheduler.js`.
- Effort: ~6-8 hours
- Priority: Medium - Useful for regulars, adds complexity.

[ ] **Availability Calendar**

- Add a calendar view in `AppointmentScheduler.js` showing open slots.
- Effort: ~8-10 hours
- Priority: Medium - Visual aid, UI-intensive.

[ ] **Two-Factor Authentication (2FA)**

- Implement 2FA for business accounts.
- Effort: ~6-8 hours
- Priority: Medium - Security boost, enterprise-grade.

[ ] **Data Export Options**

- Add export functionality for appointments (e.g., CSV, PDF).
- Effort: ~6-8 hours
- Priority: Medium - Reporting tool, not urgent.

[ ] **Advanced Filtering and Sorting**

- Enhance `AppointmentsTable.js` with filters (e.g., date range, status).
- Effort: ~4-6 hours
- Priority: Medium - Improves table UX.

[ ] **Calendar App Integrations**

- Expand integrations to include Apple Calendar and others beyond Google/Outlook.
- Effort: ~4-6 hours
- Priority: Medium - Broadens compatibility.

[ ] **Custom Service Types in Business Profile**

- Allow custom service types in `BusinessProfile.js`, populate `AppointmentScheduler.js` dropdown.
- Effort: ~4-6 hours
- Priority: Medium - Personalization, builds on profile.

[ ] **Client Confirmation Workflow**

- Default appointments to "Pending," send email with confirm/cancel links, update `status`.
- Effort: ~8-10 hours
- Priority: Medium - Workflow enhancement, needs email integration.

[ ] **Automate Client Notification Emails**

- Integrate MailerSend/Twilio for automated emails (e.g., confirmations). Shelved until tool approval.
- Effort: ~5-6 hours
- Priority: Medium - Core feature, deferred.

[ ] **Move Sensitive Operations to Backend**

- Shift email/data writes to `backend/server.js` with Supabase Service Key.
- Effort: ~5-6 hours
- Priority: Medium - Security-focused, backend-heavy.

[ ] **Server-Side Input Validation**

- Add backend validation in `backend/server.js`.
- Effort: ~4-6 hours
- Priority: Medium - Security enhancement.

[ ] **Rate Limiting or CAPTCHA**

- Implement rate limiting/CAPTCHA on signup/login.
- Effort: ~4-6 hours
- Priority: Medium - Security, abuse prevention.

[ ] **Enterprise-Level Security Audits**

- Encrypt data, ensure GDPR/CCPA compliance.
- Effort: ~6-8 hours
- Priority: Low - Enterprise-grade, future-focused.

[ ] **Client Loyalty Program**

- Track `loyalty_points` in `appointments`, offer discounts for premium users.
- Effort: ~6-8 hours
- Priority: Low - Creative, engagement-focused.

[ ] **Barber Shop Marketplace**

- Add `/marketplace` page listing premium businesses.
- Effort: ~10-12 hours
- Priority: Low - Adjacent feature, larger scope.

[ ] **AI Appointment Suggestions**

- Suggest optimal times in `AppointmentScheduler.js` via Edge Functions.
- Effort: ~8-10 hours
- Priority: Low - Innovative, complex.

[ ] **Affiliate Links or Ads**

- Add affiliate links or ads (e.g., AdSense) for free tier users.
- Effort: ~3-4 hours
- Priority: Low - Monetization, less urgent.

## Progress (Completed)

1. **Initialize Project**:

   - Established Git repository and project structure.

2. **Frontend Setup**:

   - Built React frontend with routing, Tailwind CSS (`3.4.17`), centralized styles, PostCSS configuration for Tailwind processing, and a utility script (`checkEnv.js`) for environment variable debugging.

3. **Backend Setup**:

   - Set up minimal Express backend for future expansion.

4. **Supabase SQL Snippets**:

   - Implemented database tables, views, and RLS policies.

5. **Client Appointment Notification System**:

   - Added appointment scheduling with profile check and calendar integration; removed unused dependencies.

6. **Deployment**:

   - Deployed frontend to Netlify with HTTPS and configured auth redirects.

7. **Appointment Scheduler Enhancements**:

   - Added a "Service Type" field to `AppointmentScheduler.js` with preset options and manual "Other" entry, displayed in `AppointmentConfirmation.js` and `AppointmentsTable.js`, with `service_type` column added to the `appointments` table.
   - Added "Status" indicators to `AppointmentScheduler.js` (dropdown with "Confirmed," "Pending," "Cancelled") and `AppointmentsTable.js` (color-coded display), with `status` column added to the `appointments` table.
   - Added a "Time Zone" field to `BusinessProfile.js`, stored in `business_profile` as `time_zone`, and displayed on `AppointmentConfirmation.js` with the appointment time for clarity.
   - Redesigned `Home.js` into a professional landing page with a hero section, feature highlights, and updated app-wide styles in `styles.js` for a cohesive cute look.
   - Enhanced `Navbar.js` with a user icon dropdown for "Business Profile" and "Logout," and a top-level "Schedule Appointment" link, with click-outside collapse functionality.
   - Refactored nomenclature from "Meeting" to "Appointment" across all frontend files, UI text, Supabase table (`meetings` to `appointments`), and documentation for consistency.
   - Added a "Preview" button to `BusinessProfile.js` displaying a preview of the profile, enhancing transparency for business owners.
   - Removed unused "Settings" option from the `Navbar.js` dropdown for a cleaner UI.
   - Refactored `BusinessProfile.js` and `AppointmentScheduler.js` to use a reusable `<FormField>` component, reducing file size and improving maintainability.
   - Enhanced `AppointmentConfirmation.js` with centered Google, Outlook, and Apple calendar logos for a polished UI.

8. **Navigation Enhancements**:

   - Added "Home" link to `/dashboard` in `Navbar.js` for logged-in users; confirmed public pages (`/`, `/signup`, `/login`) rely on individual page links for navigation, with no navbar for unauthenticated users.

9. **Inline Login/Signup on Landing Page**:
   - Integrated login and signup into `Home.js` with reusable `LoginForm.js` and `SignupForm.js` components, removed separate `Login.js`, `Signup.js`, and `SignupSuccess.js` pages, added responsive buttons and fade-in forms, implemented autologin via `AuthConfirm.js` using Supabase tokens, fixed logout redirect to `/` and dashboard hydration error.
