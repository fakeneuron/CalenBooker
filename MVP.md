# CalenBooker MVP Plan

## Purpose and Vision

"CalenBooker MVP" streamlines appointment scheduling for small businesses (e.g., barber shops), enabling business owners to sign up, provide business details, and schedule client meetings. Key features include minimal signup (email/password), email confirmation, business details capture, and meeting scheduling. The v1 goal is to generate downloadable `.ics` files for meetings; email notifications are deferred to v2. The system uses Supabase with anon key and RLS for authentication and data storage.

## Coder Environment

- **Coder**: Novice, using Terminal, VS Code, Node.js v20.18.0, npm v11.1.0, Git on Mac OS.

## Project Coding Overview

### Progress (Completed)

1. **Initialize Project**:

   - Git repository: `github.com/fakeneuron/CalenBooker`.
   - Project structure:
     - `Calenbooker/frontend`: React app (port 4000) with `react-scripts@5.0.1`.
     - `Calenbooker/backend`: Express app (port 4001).
     - `Calenbooker/.env`: Top-level environment variables (e.g., `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`).
     - `Calenbooker/supabase/`: Local storage for Supabase SQL snippets.

2. **Frontend Setup**:

   - Tailwind CSS (`3.4.17`) for styling (local dependency; `public/index.html` references CDN `2.2.19`—potentially redundant).
   - **Components**:
     - `frontend/src/App.js`: Root component with routing and Supabase auth state management.
     - `frontend/src/components/Signup.js`: Signup with Supabase Auth, redirects to `/login`.
     - `frontend/src/components/Login.js`: Login with Supabase Auth, redirects to `/business-details`.
     - `frontend/src/components/ConfirmationPage.js`: Handles email confirmation, links to `/business-details?user_id=<id>` (flow incomplete).
     - `frontend/src/forms/BusinessDetailsForm.js`: Submits/updates business details in Supabase `business_details`.
     - `frontend/src/forms/SchedulingMeetingsForm.js` (named `ScheduleMeetingForm`): Schedules meetings in Supabase `meetings`.
     - `frontend/src/supabaseClient.js`: Initializes Supabase client with anon key.
     - `frontend/src/EnvCheck.js`: Debugging component for environment variables.
   - Routing with `react-router-dom@7.2.0`.
   - Dependencies in `frontend/package.json`: `react@19.0.0`, `@supabase/supabase-js@2.49.1`, etc.
   - `frontend/public/index.html`: Entry point with Tailwind CDN and React root.

3. **Backend Setup**:

   - Supabase (`@supabase/supabase-js@2.49.1`) for authentication (`auth.users`) and data storage (`business_details`, `meetings` tables).
   - **Main File**: `backend/server.js`:
     - Initializes Express app, Supabase client with anon key, mounts routes, runs on port 4001.
     - Includes test endpoints (`/test-supabase`, `/test-auth-users`—`/test-supabase` may reference obsolete `signup` table).
   - **Routes** (Obsolete, Confirmed for Removal):
     - `backend/routes/signup.js`: POST endpoint for signup, checks `users_view` for duplicates (unused by frontend).
     - `backend/routes/business-details.js`: POST to upsert business details, GET `/check` to retrieve/check existence (unused by frontend).
     - `backend/routes/schedule-meeting.js`: POST to insert meeting details into `meetings` (unused by frontend).
     - **Note**: Routes are redundant; frontend uses Supabase directly with auth in `App.js`. Removal safe as they’re not called (no frontend HTTP requests observed).
   - Dependencies in `backend/package.json`: `express@4.21.2`, `@supabase/supabase-js@2.49.1`, `cors@2.8.5`, `dotenv@16.4.7`.

4. **Signup Flow**:

   - Frontend: `Signup.js` handles signup in Supabase `auth.users`, redirects to `/login`.
   - Email confirmation via Supabase link to `ConfirmationPage.js` (manual access), links to `/business-details?user_id=<id>` (param ignored by `BusinessDetailsForm.js`).
   - Login via `Login.js`, redirects to `/business-details`.
   - **Note**: Flow incomplete; needs refinement with Supabase auth functions.

5. **Business Details**:
   - Frontend: `BusinessDetailsForm.js` upserts details in `business_details`, toggles “Save”/“Update” via direct Supabase query.

### Supabase SQL Snippets

- **Purpose**: Define tables (`business_details`, `meetings`), views (`users_view`), and RLS policies for anon key access. Used for project setup/migration.
- **Storage**: Stored locally in `Calenbooker/supabase/` as the source of truth; currently duplicated in Supabase SQL Editor (sync script pending).
- **Goal**: Keep minimal core snippets, update existing ones for changes (e.g., fields, RLS).
- **Snippets**:

  - **`create_tables.sql`**:

    - **Purpose**: Creates `business_details` and `meetings` tables with foreign keys to `auth.users`.
    - **Content**:

      ```sql
      -- Supabase (PostgreSQL) schema for CalenBooker MVP (simplified to use auth.users)
      DROP TABLE IF EXISTS meetings;
      DROP TABLE IF EXISTS business_details;

      CREATE TABLE business_details (
        user_id UUID PRIMARY KEY,  -- References auth.users.id
        email TEXT UNIQUE NOT NULL,
        business_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        unit TEXT,
        city TEXT NOT NULL,
        province TEXT NOT NULL,
        postal_code TEXT NOT NULL,
        logo TEXT,
        FOREIGN KEY (user_id) REFERENCES auth.users(id)
      );

      CREATE TABLE meetings (
        id BIGSERIAL PRIMARY KEY,  -- Auto-incrementing ID for PostgreSQL
        user_id UUID NOT NULL,     -- One-to-many with auth.users
        client_name TEXT NOT NULL,
        client_email TEXT NOT NULL,
        meeting_date DATE NOT NULL,
        meeting_time TIME NOT NULL,
        duration INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES auth.users(id)
      );
      ```

  - **`rls.sql`**:

    - **Purpose**: Enables RLS and sets policies for authenticated users to insert/update their own data in `business_details` and `meetings`.
    - **Content**:

      ```sql
      --Enable RLS for Tables
      ALTER TABLE business_details ENABLE ROW LEVEL SECURITY;
      ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

      -- Allow authenticated users to INSERT meetings (linked to auth.users.id)
      CREATE POLICY "Allow authenticated inserts" ON meetings
        FOR INSERT WITH CHECK (auth.role() = 'authenticated');

      -- Allow authenticated users to UPDATE their own meetings (using auth.users.id)
      CREATE POLICY "Allow authenticated updates" ON meetings
        FOR UPDATE USING (auth.uid() = user_id);

      -- Allow authenticated users to INSERT business details (linked to auth.users.id)
      CREATE POLICY "Allow authenticated inserts" ON business_details
        FOR INSERT WITH CHECK (auth.role() = 'authenticated');

      -- Allow authenticated users to UPDATE their own business details (using auth.users.id)
      CREATE POLICY "Allow authenticated updates" ON business_details
        FOR UPDATE USING (auth.uid() = user_id);
      ```

  - **`user_views.sql`**:
    - **Purpose**: Creates `users_view` to expose `id` and `email` from `auth.users` (used by obsolete backend routes).
    - **Content**:
      ```sql
      CREATE VIEW public.users_view AS
      SELECT id, email FROM auth.users;
      ```
  - **`allow_anon_check_email.sql`**:
    - **Purpose**: Allows anon users to select from `auth.users` (possibly unused or legacy; `users_view` used instead).
    - **Content**:
      ```sql
      CREATE POLICY "Allow anon to check emails" ON auth.users
        FOR SELECT
        USING (true);
      ```

### Remaining (v1)

1. **Fix Current Frontend Errors**:

   - Resolve existing issues (details pending from user).

2. **Refine Signup/Confirmation Flow**:

   - Define complete flow with Supabase auth and additional pages (major step post-errors).

3. **Scheduling Meetings Form**:

   - **Current**: `SchedulingMeetingsForm.js` inserts into `meetings`.
   - **Pending**: Generate downloadable `.ics` files for meetings.

4. **Domain Hosting**:
   - Confirm HTTPS on `fakeneuron.com` post-Netlify DNS propagation.

### Shelved Queries (To Address Later)

- **Post-Error Fixes**:
  - Refine signup/confirmation flow with Supabase auth and additional pages (before `.ics` work).
- **Post-Flow Refinement**:
  - Implement snippet sync script (Option 1) to push `Calenbooker/supabase/` files to Supabase, using service key.
- **Cleanup**:
  - Remove obsolete backend routes (`signup.js`, `business-details.js`, `schedule-meeting.js`) post-error fixes, confirmed safe.
  - Clean up SQLite remnants (e.g., `/test-supabase` in `server.js`).
  - Update `backend/package.json` `"main": "server.js"` (currently `index.js`).
  - Remove Tailwind CDN (`2.2.19`) from `index.html` if local `3.4.17` is sufficient.
  - Review `allow_anon_check_email.sql` relevance (possibly redundant with `users_view`).

### v2 Considerations

- Email notifications with MailerSend.
- Real-time password feedback in `Signup.js`.
- Self-scheduling for clients.
- Multi-employee support.
- Analytics dashboard.

### Technical Approach

- **Frontend**:

  - React (`19.0.0`) with `react-router-dom@7.2.0` for navigation, defined in `App.js`.
  - Tailwind CSS (`3.4.17`) for styling (local), with CDN (`2.2.19`) in `index.html`.
  - Supabase client in `supabaseClient.js` with anon key from `Calenbooker/.env`, secured by RLS.
  - Runs on port 4000.

- **Backend**:
  - Node.js/Express (`4.21.2`) with `server.js` as entry point.
  - Supabase client in `server.js` with anon key from `Calenbooker/.env`, secured by RLS.
  - CORS enabled for `http://localhost:4000`.
  - Routes in `backend/routes/` (unused, pending removal).
  - Runs on port 4001.
