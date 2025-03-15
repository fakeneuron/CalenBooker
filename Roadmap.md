# CalenBooker Roadmap

This file tracks tasks and progress for CalenBooker development. Functional changes from completed tasks are reflected in `README.md`, with broad milestones noted here. Last updated: March 15, 2025.

## Short-Term Tasks

[ ] **Owner Calendar Sync**

- **Description**: Add 2-way sync for business owners’ calendars (e.g., Google Calendar API) in `AppointmentScheduler.js` or `Dashboard.js`.
- **Effort**: ~6-8 hours
- **Priority**: High - Seamless workflow integration, critical for adoption.

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

[x] **Messages Section**

- **Description**: Add a "Messages" section in `Messages.js` (not `AppointmentScheduler.js`) for customizable global default messages, stored in `messages` table (`id`, `user_id`, `event_type`, `default_message`) with a trigger auto-populating on signup. Includes `scheduled` (used as intro in `AppointmentConfirmation.js`), `rescheduled`, `cancelled`, `no_show` (displayed as "No-Show"). Moved `parking_instructions`, `office_directions`, `custom_info` to `business_profile` (nullable, blank by default), shown in confirmation "Notes" (bulleted list) if populated, with business name in location fields.
- **Effort**: ~4-6 hours
- **Priority**: Medium - Enhances customization.
- **Completed**: Implemented `Messages.js` with edit/revert, integrated into confirmation with notes and calendar events.

[ ] **Client Feedback**

- **Description**: Add a "Feedback" link on `/appointment-confirmation/<id>` (public), store in a `feedback` table.
- **Effort**: ~4-6 hours
- **Priority**: Medium - Improves service quality, client engagement.

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

- **Description**: Enable staff assignment via a `staff` table.
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

- **Description**: Add a calendar view in `AppointmentScheduler.js` for open slots.
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

- **Description**: Expand to Apple Calendar and others.
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

- **Description**: Add `/marketplace` listing premium businesses.
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
13. **Messages Section**: Implemented message management, integrated into confirmation.
