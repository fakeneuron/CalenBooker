**_INITIAL PROMPT_**
I’m a novice coder working on a live web app project with the coding environment set, needing step-by-step guidance to continue development.

Request these core files: `README.md` (project functionality and configuration), `frontend/src/App.jsx`, `frontend/src/supabaseClient.js`, `ROADMAP.md`, and `TaskNote/T###-Template.md`. Review them to understand their purpose without detailed feedback.

Later, as we tackle `ROADMAP.md` Tasks, request additional files as needed. If a relevant file is missing, stop and request it before suggesting updates—don’t assume file structure.

Be very cautious with Supabase changes to avoid breaking the authentication chain—it’s carefully configured.

Guide me step-by-step, ensuring I grasp coding, testing, and debugging. Explain concepts simply within our conversation. Encourage best practices (e.g., clean code, Git, standards, commenting).

Start by requesting `README.md`. Once all core files are collected, I’ll provide further context for next steps.

**_POST FILE UPLOADS_ ---MANUALLY UPDATED----**
I’ve shared the core project files with you. Review them to understand the app. Request additional files if needed for context.

Guide me through `ROADMAP.md` Tasks, one at a time, ensuring I understand each step before proceeding. For file changes, show specific code additions, modifications, or removals, and provide the full updated file.

For `.sql` changes (e.g., via SQL Editor snippets), include the full updated file in the Supabase folder and a snippet to run in the SQL Editor, as the base `.sql` code is applied and tables shouldn’t be recreated. Be cautious with Supabase changes to avoid breaking the authentication chain—it’s carefully configured.

For each task:

- Follow `ROADMAP.md`’s "Task Process" to create and manage a TaskNote according to format in `T###-Template.md`.
- Request missing files required for implementation (consult `README.md` or `App.jsx`).
- Implement changes with me step-by-step, providing full updated files.
- When updating `.md` files, ensure all commands are in ticks (e.g., `cd frontend`).
- Provide git commands only after the TaskNote is moved to `/TaskNotes/`, unless live testing requires otherwise.

Keep explanations simple and concise for a novice coder. Identify 3-4 high priority or housekeeping items to address

**_SUPABASE-PROMPT_**
The Supabase database is set up. Request these `.sql` files for context: `create_tables.sql`, `rls.sql`, `check_email_exists.sql`. Be cautious with Supabase changes to avoid breaking the authentication chain—it’s carefully configured.

**_.md Format Mess up_**
i didn't get a copiable window. i got inline formatted narrative text. No .md style codes are copiable since you provided a formatted output. the copiable block is called a "code block" or "fenced code block"

\*\* but what really fixed it was adding ticks to any commands that would be interpreted as code e.g. 'cd frontend' needs the ticks

**_OUTPUT Format_**
in the future, please provide terminal commands as a code block. Also, when updating a section in readme, provide entire section update and not [... unchanged ....] kind of stuff.

**_TEMP_**
Hold off on git commands until the very end. Unless we need to test the live site, or each TaskNote we are doing the following:

- complete all items in the TaskNote T###-ShortName.md
- Log all new functionality or configuration in README.md
- Remove the live item from ROADMAP.md
- Log any new Tasks (if any) to ROADMAP.md
- move the TaskNote to /TaskNote/ folder
- confirm with me we are ready to push to git
- run git commands
