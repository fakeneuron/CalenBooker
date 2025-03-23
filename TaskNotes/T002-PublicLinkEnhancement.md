# Task Note - Public Link Enhancement

This document outlines the strategy for enhancing and securing the public shortcode link (`/a/<short_code>`) in CalenBooker, balancing usability and privacy for the MVP. PHIPA compliance is deferred to the roadmap. Last updated: March 22, 2025.

## Plan

### Step 1: MVP Public Link (Non-PHIPA)

- **Goal**: Show `business_name`, `address`, `meeting_date`, `meeting_time`, `duration` in `/a/<short_code>` with no PII.
- **Status**: [x] Completed - Public link works via `AppointmentConfirmationPublic.jsx` and `public.sql` as of March 20, 2025.

### Step 2: Enhance Public Link

- **Goal**: Ensure public link data is anonymized and calendar content is complete.
- **Sub-Steps**:
  1. **Verify Business Profile Save in `Messages.jsx`**:
     - Ensure upsert saves all `business_profile` fields (`business_name`, `address`, etc.).
     - Test with notes fields.
     - **Status**: [x] Completed - Verified functional March 22, 2025.
  2. **Anonymize Public Data**:
     - Confirm `useAppointmentDetails.js` filters out `client_name`, `client_email`, `service_type` for public view.
     - Verify `AppointmentConfirmationPublic.jsx` shows only `business_name`, `address`, `meeting_date`, `meeting_time`, `duration`.
     - **Status**: [x] Completed - No PII in public view as of March 22, 2025.
  3. **Enhance Calendar Generation**:
     - Update `appointmentUtils.js` to:
       - Set `.ics` and Google link location to full `address` (without `business_name`), escaping commas in `.ics`.
       - Include `parking_instructions`, `office_directions`, `custom_info` in `.ics` and Google notes.
     - Test output in `AppointmentConfirmationPublic.jsx` and refine `AppointmentConfirmationPrivate.jsx`.
     - **Status**: [x] Completed - Fixed public `.ics` and Google link; removed private calendar links, updated copy UI (March 22, 2025).
- **Overall Status**: [x] Completed

### Step 3: PIN Enhancement (Pre-PHIPA)

- **Goal**: Add `access_pin` to `appointment_links` for optional security.
- **Sub-Steps**:
  - Add `access_pin` (text, nullable) to `appointment_links` in `create_tables.sql`.
  - Update `useAppointmentDetails.js` to require PIN for non-expired links if set.
  - Add PIN input in `AppointmentConfirmationPublic.jsx`.
- **Status**: [ ] Not Started - Deferred to roadmap "Secure Public Shortcode Access".

## Progress

- Implemented MVP public link with short codes (March 20, 2025).
- Confirmed `Messages.jsx` saves correctly (March 22, 2025).
- Verified no PII in public `.ics`/Google links; fixed `.ics` title (March 22, 2025).
- Fixed `.ics` location truncation with escaped commas and added notes fields for public view (March 22, 2025).
- Updated public Google link to use full address and notes (March 22, 2025).
- Removed private calendar links from `AppointmentConfirmationPrivate.jsx` as redundant (March 22, 2025).
- Replaced private copy buttons with overlaid copy icons for a subtler UI (March 22, 2025).

## Challenges

- `.ics` location truncated at commas—fixed by escaping with `\`.
- Google link hardcoded in public view—replaced with `generateGoogleCalendarLink`.
- Private copy buttons too prominent—swapped for overlaid icons.

## Summary of Implementations

- **Completed**: March 22, 2025
- **Outcome**: Public link (`/a/<short_code>`) enhanced to show full address ("123 Main St\, Unit 5\, Toronto\, ON M5V 2T6") in `.ics` and Google Calendar without `business_name`, with notes including `parking_instructions`, `office_directions`, `custom_info`, and no PII. Private view (`/appointment-confirmation/<id>`) calendar links removed as redundant, copy buttons replaced with overlaid icons for a cleaner UI, relying on public links and future sync. Step 2 completed; Step 3 deferred.
- **Files Updated**:
  - `frontend/src/utils/appointmentUtils.js` (`.ics` escaping, Google link function).
  - `frontend/src/pages/AppointmentConfirmationPublic.jsx` (Google link fix).
  - `frontend/src/pages/AppointmentConfirmationPrivate.jsx` (removed calendar links, updated copy UI).
  - `frontend/src/styles.js` (added `copyIcon` style).
- **Notes**: Effort ~4-6 hours total. Public goals met; private UI refined.

## Next Steps

- Deploy to `delparte.com`.
- Plan "Owner Calendar Sync" for detailed private calendar integration.
