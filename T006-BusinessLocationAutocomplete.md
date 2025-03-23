# T006-BusinessLocationAutocomplete

## Goal

Add Google Places Autocomplete to the address field in `BusinessProfile.jsx` to help users enter valid business addresses easily.

## Details

- Implement Google Places API Autocomplete for the `address` field.
- Populate related fields (`city`, `province`, `postalCode`) when an address is selected.
- Update `README.md` with setup instructions for Google Places API.
- Effort: ~4-6 hours.

## Steps

1. Install Google Places API library.
2. Get a Google API key and add it to `.env`.
3. Update `BusinessProfile.jsx` to use Autocomplete for the address field.
4. Test the feature locally.
5. Update `README.md` with configuration details.

## Notes

- Requires a Google Cloud API key with Places API enabled.
- Does not include custom service types (moved to a future task if needed).
