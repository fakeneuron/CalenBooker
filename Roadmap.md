# CalenBooker Roadmap

This file tracks tasks and progress for CalenBooker development. Functional changes from completed tasks are reflected in `README.md`, with broad milestones noted here. Last updated: March 19, 2025.

## Short-Term Tasks

[ ] **Owner Calendar Sync**

- **Description**: Add 2-way sync with owners’ calendars (Google Calendar, Outlook, Apple iCloud) in `AppointmentScheduler.js` or `Dashboard.js`. Support multiple providers with an optional toggle for privacy-conscious users (app-only mode if disabled). Pulls events into `appointments` table or a new `calendar_events` table for conflict checks, pushes new bookings to the selected calendar. Enables visual calendar feedback (month view with saturation dots, hourly day view) for scheduling.
- **Effort**: ~6-8 hours
- **Priority**: High - Seamless workflow integration, critical for adoption and conflict-aware scheduling.

[ ] **Appointment Scheduler Preview/Confirmation Integration**

- **Description**: Enhance `AppointmentScheduler.js` with a visual calendar: month view (dots/shaded for saturation) and clickable hourly day view showing appointments inline. Selecting a date scrolls the calendar and populates the form; clicking the calendar fills the form. Booking at a conflicting time triggers a warning (e.g., “Conflict at 2 PM—Confirm anyway?”), overrideable with a flag (color-coded, stored in `appointments`). Uses 15-min increment granularity for openings (MVP, no profile setting yet). Post-submission, shows full `AppointmentConfirmation.js` content inline (date, time, service type, notes, calendar links, shareable `/appointment-confirmation/<id>` link), keeping the user on the page. Future: Split views for multi-employee openings.
- **Effort**: ~4-6 hours (assumes local data; +2-3 hours with Sync)
- **Priority**: High - Improves workflow efficiency and UX, core to optimal scheduling.

[ ] **Marketing Landing Page**

- **Description**: Enhance `Home.js` with a “Sign Up Free” CTA, testimonials, and demo video for promotion.
- **Effort**: ~2-3 hours
- **Priority**: High - Boosts user acquisition.

[ ] **Referral Program**

- **Description**: Add a “Refer a Friend” link in `Dashboard.js` with a social shoutout reward.
- **Effort**: ~2-3 hours
- **Priority**: High - Drives word-of-mouth growth.

[ ] **SEO Optimization**

- **Description**: Add meta tags, keywords, and sitemap; optimize `Home.js` content for search engines.
- **Effort**: ~2-3 hours
- **Priority**: High - Essential for organic growth.

[ ] **Email-Friendly Message Format**

- **Description**: Add a formatted version of the `scheduled` message (and optionally others) in `Messages.js` or `AppointmentScheduler.js`, optimized for copy-pasting into emails. Include appointment details (e.g., date, time, location) in a clean, readable block (e.g., plain text with line breaks). Provide a "Copy to Clipboard" button for ease.
- **Effort**: ~2-3 hours
- **Priority**: Medium - Enhances client communication flexibility.

[ ] **Streamline Messages Page Layout**

- **Description**: Redesign `Messages.js` layout for a more compact, desktop-friendly view. Shrink oversized buttons, stack textareas vertically or use a grid, and maximize visible content per screen (e.g., all 4 messages + business info without scrolling on a standard desktop). Keep Kawaii styling but prioritize clarity and space efficiency.
- **Effort**: ~3-4 hours
- **Priority**: Medium - Boosts usability, especially for desktop users.

[x] **Fix Confirmation Resend Token Reuse**

- **Description**: Update `SignupForm.js` and `LoginForm.js` to use `emailRedirectTo` from `REACT_APP_AUTH_REDIRECT` (defaults to `localhost:4000/auth/confirm`), ensuring consistent redirects for signup and resend links across dev (`localhost`) and live (`delparte.com`) environments. Fixed resend link defaulting to Site URL (`calenbooker.com`) by adding `emailRedirectTo` to `supabase.auth.resend()`. Addresses latent bug where resend reused expired tokens and mismatched redirects.
- **Effort**: ~2-3 hours
- **Priority**: High - Critical auth flow bug.
- **Completed**: Fixed redirect mismatch, resend now uses `localhost` locally, aligns with live site via env vars.

[x] **Messages Section**

- **Description**: Add a "Messages" section in `Messages.js` for customizable global default messages, stored in `messages` table (`id`, `user_id`, `event_type`, `default_message`). Includes `scheduled` (used as intro in `AppointmentConfirmation.js`), `rescheduled`, `cancelled`, `no_show` (displayed as "No-Show"). Moved `parking_instructions`, `office_directions`, `custom_info` to `business_profile` (nullable, blank by default), shown in confirmation "Notes" (bulleted list) if populated, with business name in location fields. Default messages now populate on first dashboard load (`Dashboard.js`) instead of signup to avoid RLS conflicts.
- **Effort**: ~4-6 hours
- **Priority**: Medium - Enhances customization.
- **Completed**: Implemented `Messages.js` with edit/revert, integrated into confirmation with notes and calendar events, fixed signup conflict by moving message initialization to dashboard.

[ ] **Client Feedback**

- **Description**: Add a "Feedback" link on `/appointment-confirmation/<id>` (public), store in a `feedback` table.
- **Effort**: ~4-6 hours
- **Priority**: Medium - Improves service quality, client engagement.

[x] **Secure `users_view` Access**

- **Description**: Address `auth_users_exposed` by restricting `users_view` (`anon` access) and moving email checks to a secure function or backend. Ultimately dropped `users_view` entirely, relying on `check_email_exists` function to resolve persistent security errors.
- **Effort**: ~2-4 hours
- **Priority**: Medium - Resolves Supabase security warning.
- **Completed**: Dropped `users_view`, implemented `check_email_exists` with `SECURITY DEFINER`, restricted to `anon` execution, verified signup functionality post-reset.

## Long-Term Tasks

[ ] **Premium Version**

- **Description**: Limit free tier to 5 appointments/month, offer premium with unlimited appointments and extras.
- **Effort**: ~6-8 hours (without payment)
- **Priority**: High - Sets up monetization.

[ ] **Payment Integration**

- **Description**: Add Stripe or PayPal for booking payments.
- **Effort**: ~6-8 hours
- **Priority**: High - Supports premium tier.

[ ] **Appointment Reminders (Pre-Email)**

- **Description**: Add in-app reminders on `/dashboard` using a `reminders` table.
- **Effort**: ~4-6 hours
- **Priority**: Medium - Reduces no-shows.

[ ] **Self-Scheduling for Clients**

- **Description**: Build a public booking page for direct client scheduling.
- **Effort**: ~8-10 hours
- **Priority**: High - Major client feature.

[ ] **Multi-Employee Scheduling**

- **Description**: Enable staff assignment via a `staff` table. Future: Support split calendar views in `AppointmentScheduler.js` for finding openings across employees offering the same service.
- **Effort**: ~8-10 hours
- **Priority**: High - Scales to teams.

[ ] **Analytics Dashboard**

- **Description**: Add appointment stats in `Dashboard.js` (e.g., bookings/week).
- **Effort**: ~6-8 hours
- **Priority**: Medium - Provides insights.

[ ] **Client Portal**

- **Description**: Develop a client login to view/manage bookings.
- **Effort**: ~10-12 hours
- **Priority**: Medium - Enhances client experience.

[ ] **Recurring Appointments**

- **Description**: Allow recurring scheduling in `AppointmentScheduler.js`.
- **Effort**: ~6-8 hours
- **Priority**: Medium - Useful for regulars.

[ ] **Availability Calendar**

- **Description**: Add a calendar view in `AppointmentScheduler.js` for open slots. Note: Overlaps with Scheduler Preview—may merge into a unified calendar feature.
- **Effort**: ~8-10 hours
- **Priority**: Medium - Visual aid.

[ ] **Two-Factor Authentication (2FA)**

- **Description**: Implement 2FA for business accounts.
- **Effort**: ~6-8 hours
- **Priority**: Medium - Security boost.

[ ] **Data Export Options**

- **Description**: Add export for appointments (CSV, PDF).
- **Effort**: ~6-8 hours
- **Priority**: Medium - Reporting tool.

[ ] **Advanced Filtering and Sorting**

- **Description**: Enhance `AppointmentsTable.js` with filters (date range, status).
- **Effort**: ~4-6 hours
- **Priority**: Medium - Improves UX.

[ ] **Calendar App Integrations**

- **Description**: Expand to Apple Calendar and others. Note: Multi-provider support moved to Owner Calendar Sync—may refine here for additional integrations.
- **Effort**: ~4-6 hours
- **Priority**: Medium - Broadens compatibility.

[ ] **Custom Service Types in Business Profile**

- **Description**: Allow custom service types in `BusinessProfile.js` for `AppointmentScheduler.js`.
- **Effort**: ~4-6 hours
- **Priority**: Medium - Personalization.

[ ] **Client Confirmation Workflow**

- **Description**: Default appointments to "Pending," send confirm/cancel links, update `status`.
- **Effort**: ~8-10 hours
- **Priority**: Medium - Needs email integration.

[ ] **Automate Client Notification Emails**

- **Description**: Integrate MailerSend/Twilio for automated emails.
- **Effort**: ~5-6 hours
- **Priority**: Medium - Deferred until tool approval.

[ ] **Move Sensitive Operations to Backend**

- **Description**: Shift email/data writes to `backend/server.js` with Supabase Service Key.
- **Effort**: ~5-6 hours
- **Priority**: Medium - Security-focused.

[ ] **Server-Side Input Validation**

- **Description**: Add backend validation in `backend/server.js`.
- **Effort**: ~4-6 hours
- **Priority**: Medium - Security enhancement.

[ ] **Rate Limiting or CAPTCHA**

- **Description**: Implement rate limiting/CAPTCHA on signup/login.
- **Effort**: ~4-6 hours
- **Priority**: Medium - Prevents abuse.

[ ] **Enterprise-Level Security Audits**

- **Description**: Encrypt data, ensure GDPR/CCPA compliance.
- **Effort**: ~6-8 hours
- **Priority**: Low - Future-focused.

[ ] **Client Loyalty Program**

- **Description**: Track `loyalty_points` in `appointments`, offer discounts.
- **Effort**: ~6-8 hours
- **Priority**: Low - Engagement-focused.

[ ] **Barber Shop Marketplace**

- **Description**: Add `/marketplace` listing premium businesses. Note: Renamed to Professional Business Marketplace to reflect broader scope.
- **Effort**: ~10-12 hours
- **Priority**: Low - Larger scope.

[ ] **AI Appointment Suggestions**

- **Description**: Suggest optimal times in `AppointmentScheduler.js` via Edge Functions.
- **Effort**: ~8-10 hours
- **Priority**: Low - Innovative.

[ ] **Affiliate Links or Ads**

- **Description**: Add affiliate links or ads for free tier users.
- **Effort**: ~3-4 hours
- **Priority**: Low - Monetization.

## Progress (Completed)

1. **Initialize Project**: Set up Git repo and structure.
2. **Frontend Setup**: Built React frontend with routing, Tailwind CSS, and styles.
3. **Backend Setup**: Minimal Express backend for v2.
4. **Supabase SQL Snippets**: Implemented tables, views, and RLS.
5. **Client Appointment Notification System**: Added scheduling and calendar integration.
6. **Deployment**: Deployed frontend to Netlify with HTTPS.
7. **Appointment Scheduler Enhancements**: Added "Service Type," "Status," "Time Zone," landing page redesign, navbar updates, and UI polish.
8. **Navigation Enhancements**: Added "Home" link and refined public nav.
9. **Inline Login/Signup on Landing Page**: Integrated forms into `Home.js` with autologin.
10. **Create Footer Pages**: Added static pages linked from footer.
11. **Terms Agreement on Signup**: Added checkbox to signup form.
12. **Error Pages**: Added Kawaii 404 page.
13. **Messages Section**: Implemented message management, integrated into confirmation, fixed signup by moving message initialization to dashboard.
14. **Supabase Security Fixes**: Resolved `auth_users_exposed`, `security_definer_view`, `function_search_path_mutable` for `insert_default_messages`, set OTP expiry to 1 hour, enabled leaked password protection.
15. **Fix Confirmation Resend**: Fixed redirect mismatch in `SignupForm.js` and `LoginForm.js` for consistent dev/live URLs.
16. **Database Reset and Security Update**: Dropped `users_view`, rebuilt tables and functions to resolve lingering security errors.
