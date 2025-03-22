# Public Link Plan for CalenBooker

This document outlines the strategy for implementing and securing the public shortcode link (`/a/<short_code>`) in CalenBooker, balancing usability and privacy for the MVP, with PHIPA compliance deferred to the roadmap. Last updated: March 20, 2025.

## Current State

- **Route**: `/a/<short_code>` uses `AppointmentConfirmationPublic.jsx` and `useAppointmentDetails.js`.
- **Data Intended**: Minimal fields (`business_name`, `address`, `meeting_date`, etc.), no PII.
- **Progress**:
  - Public link works as of March 20, 2025 (e.g., `/a/8cyxLKm1`).
  - `business_profile.email` made nullable.
  - `BusinessProfile.jsx` saves all fields correctly.
  - `Messages.jsx` "Default Messages" (e.g., scheduled) saves fine; "Business Information" section fails ("null value in column 'business_name'") due to incomplete upsert.
  - Calendar issues pending: Title ("undefined with [business_name]"), location (only `business_name`), missing notes.
- **Goal**: Fix save in `Messages.jsx` "Business Information", then enhance calendar content.

## Privacy Concerns

### Normal (Non-PHIPA) Use Case

- **Data Exposed**:
  - `client_name`, `client_email`: High privacy (not exposed).
  - `service_type`, `meeting_date`, `meeting_time`, `duration`: Moderate privacy (MVP focus).
  - `business_name`, `address`, `phone`, `parking_instructions`, `office_directions`, `custom_info`: Low privacy (publicly acceptable).
- **Risks**: Guessable shortcodes; mitigated by expiration and future PIN.

### PHIPA Use Case (Deferred)

- **Data**: Same as above, PHI if health-related.
- **Risks**: Requires access control—deferred to roadmap (B.32).

## Data Classification

| Data Field             | Privacy Level | Normal Concern                | PHIPA Concern                 |
| ---------------------- | ------------- | ----------------------------- | ----------------------------- |
| `client_name`          | High          | PII exposure                  | PHI, strict protection needed |
| `client_email`         | High          | PII exposure                  | PHI, strict protection needed |
| `service_type`         | Moderate      | Context-dependent sensitivity | PHI if health-related         |
| `meeting_date/time`    | Moderate      | Schedule leakage              | PHI, ties to client identity  |
| `duration`             | Moderate      | Minor context                 | PHI, part of record           |
| `business_name`        | Low           | Public info                   | Moderate if health context    |
| `address`, `phone`     | Low           | Public info                   | Low, unless tied to PHI       |
| `parking_instructions` | Low           | Operational info              | Low, unless PHI               |
| `office_directions`    | Low           | Operational info              | Low, unless PHI               |
| `custom_info`          | Low           | Operational info              | Low, unless PHI               |

## Plan

### Step 1: MVP Public Link (Non-PHIPA) - Completed

- **Goal**: Show `business_name`, `address`, `meeting_date`, `meeting_time`, `duration`.
- **Status**: Done—public link works with minimal data via `public.sql`.

### Step 2: Enhance Public Link (In Progress)

- **Goal**: Fix calendar content and business profile save in `Messages.jsx`.
- **Issues**:
  - `Messages.jsx` "Business Information" save fails ("null value in column 'business_name'")—upsert lacks required fields.
  - Calendar title: "undefined with [business_name]" (needs `service_type`).
  - Calendar location: Only `business_name` (needs full address).
  - Notes: Missing due to save failure.
- **Sub-Steps**:
  1. **Fix Business Profile Save in `Messages.jsx`** (Current):
     - Update `Messages.jsx` to fetch all `business_profile` fields and merge with updates.
     - Test save with notes fields after setting required fields in `BusinessProfile.jsx`.
  2. **Update Public RLS and Fetch**:
     - Confirm `public.sql` application (done).
     - Update `useAppointmentDetails.js` for calendar fields (done).
  3. **Fix Calendar Generation**:
     - Update `AppointmentConfirmationPublic.jsx` for correct calendar output (done).
- **Risk**: Low—adds moderate-privacy fields, no PII.

### Step 3: PIN Enhancement (Pre-PHIPA)

- **Goal**: Add `access_pin` security, compatible with PHIPA.

### SQL Organization

- **Files**: `rls.sql` (auth), `public.sql` (public access).
- **Reset**: `reset_database.sql` includes `appointment_links`.

## Roadmap Updates

- **B.32 PHIPA Compliance Toggle**: Signup option for PHIPA mode (PIN, client TOS) (8-10 hours, Medium priority).
- **B.29 Secure Public Shortcode Access**: Implement PIN (6-8 hours, High priority).
- **B.30 Anonymize Public Data**: Generic placeholders (4-6 hours, Medium priority).
- **B.31 PHIPA Compliance Audit**: Encryption, consent (10-12 hours, Low priority).
- **B.33 Add psql Client**: Set up `psql` client for direct SQL file execution (2-4 hours, Low priority).

## Next Steps

1. Fix save issue in `Messages.jsx`.
2. Test save, then proceed to calendar fixes.
3. Push to Git and redeploy.
