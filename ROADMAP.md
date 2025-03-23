# T006-CustomServiceAndAutocomplete

**Start Date**: March 23, 2025  
**Starting Commit**: `git commit -m "Start T006-CustomServiceAndAutocomplete"`

## Tasks: Add Custom Service Types and Address Autocomplete to Business Profile

- **Goal**: Enhance `BusinessProfile.jsx` with custom service types for scheduling and address autocomplete for signup.
- **Tasks**:
  1. **Custom Service Types**: Allow users to define custom service types in `BusinessProfile.jsx` and store them in the `business_profile` table.
  2. **Address Autocomplete**: Add address autocomplete to the signup form using Google Places API.
- **Steps**:
  1. Collect necessary files (`BusinessProfile.jsx`, `supabaseClient.js`).
  2. Add a `services` field to `business_profile` table in Supabase (array of strings for service types).
  3. Update `BusinessProfile.jsx` to include a dynamic input for adding/removing service types.
  4. Install `react-places-autocomplete` and configure Google Places API for address autocomplete.
  5. Integrate autocomplete into the address field in `BusinessProfile.jsx`.
  6. Test: Ensure services save correctly and address autocomplete populates fields (address, city, province, postal code).
  7. Update `README.md` with new functionality and setup instructions (e.g., Google API key).
- **Progress**:
  - [ ] Custom service types added
  - [ ] Address autocomplete implemented
  - [ ] Docs updated
- **Summary**: [To be filled after completion]
