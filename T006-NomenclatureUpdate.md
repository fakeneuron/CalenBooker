# T006-NomenclatureUpdate

**Start Date**: March 23, 2025  
**Starting Commit**: `git commit -m "Start T006-NomenclatureUpdate"`

## Task: Update Code Nomenclature to Use Abbreviations

- **Goal**: Shorten `Appointment` to `Appt` and `Confirmation` to `Confirm` in code (not UI) and rename related filenames.
- **Details**: Update variable names, function names, and class names in `.jsx` and `.js` files; rename `AppointmentScheduler.jsx`, `AppointmentConfirmationPrivate.jsx`, and `AppointmentConfirmationPublic.jsx`; exclude UI strings (e.g., labels, headings).
- **Effort**: ~2-3 hours
- **Steps**:
  1. Identify all files needing changes using VS Code’s Search.
  2. Use VS Code Find/Replace to update `Appointment` to `Appt` in code (case-sensitive, exclude strings).
  3. Use VS Code Find/Replace to update `Confirmation` to `Confirm` in code (case-sensitive, exclude strings).
  4. Rename files: `AppointmentScheduler.jsx` to `ApptScheduler.jsx`, `AppointmentConfirmationPrivate.jsx` to `ApptConfirmPrivate.jsx`, `AppointmentConfirmationPublic.jsx` to `ApptConfirmPublic.jsx`.
  5. Update imports in all files referencing renamed files.
  6. Test locally to ensure no breaks (e.g., run `npm start`, check key pages).
  7. Update `README.md` with new filenames if referenced.
- **Progress**:
  - [ ] Identify files
  - [ ] Replace `Appointment` with `Appt`
  - [ ] Replace `Confirmation` with `Confirm`
  - [ ] Rename files
  - [ ] Update imports
  - [ ] Test locally
  - [ ] Update `README.md`
- **File Tracking**:
  - **Instructions**: List files relevant to the task here. Categorize as:
    - _Required_: Files needed but not yet shared (request these).
    - _In Memory_: Files already provided to the assistant (e.g., from prior tasks).
    - _Modified_: Files changed during the task (update as you go).
    - _Created_: New files made for the task.
    - _Deleted_: Files removed during the task.
  - **Files**:
    - [In Memory] frontend/src/App.jsx - [Routing and imports]
    - [In Memory] frontend/src/supabaseClient.js - [Supabase client setup]
    - [In Memory] frontend/src/BusinessProfile.jsx - [May have `Appointment` references]
    - [Required] frontend/src/AppointmentScheduler.jsx - [Needs renaming and code updates]
    - [Required] frontend/src/AppointmentConfirmationPrivate.jsx - [Needs renaming and code updates]
    - [Required] frontend/src/AppointmentConfirmationPublic.jsx - [Needs renaming and code updates]
    - [Required] frontend/src/Dashboard.jsx - [May have `Appointment` references]
    - [Required] frontend/src/Messages.jsx - [May have `Appointment` references]
- **Notes**: Focus on code (variables, functions, classes), not UI text; use case-sensitive replacements.
- **Challenges**: [To be filled during execution]
- **Summary**: [To be filled on completion]
