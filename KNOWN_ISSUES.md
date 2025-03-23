# Known Issues

## Supabase 406 Error on Appointment Links Query

- **Date Identified**: March 23, 2025
- **File**: `frontend/src/hooks/useAppointmentDetails.jsx`
- **Description**: When loading `/appt-confirm/:id`, the query `supabase.from('appointment_links').select('short_code').eq('appointment_id', apptId)` returns `{ data: [], error: null }`, but the browser logs a 406 network error.
- **Impact**: Cosmetic (console only); app generates new `shortLink` and displays correctly.
- **Findings**:
  - User authenticated correctly (`auth.uid()` matches `appointments.user_id`).
  - RLS allows SELECT (`auth.role() = 'authenticated'`).
  - Schema matches (`appointment_id` is `bigint`).
  - Likely a Supabase API bug (406 status with valid `[]` response).
- **Status**: Unresolved, low priority
- **Task Reference**: `TaskNotes/T008-FixSupabase406Error_XXX.md`
- **Next Steps**: Check Supabase API logs; report to Supabase if confirmed as a bug; ignore unless it escalates.
