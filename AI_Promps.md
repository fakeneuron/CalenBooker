**_INITIAL PROMPT_**
"I’m working on a web app project described in the attached README.md file, with a frontend, Supabase SQL scripts, and a backend placeholder. The project is well underway, and the coding environment is set up. As a novice coder, I need step-by-step guidance to continue development.
Review the attached README.md to understand the project’s structure, technologies, and goals.
Start by requesting the core files one at a time, as listed in the README.md 'Instructions for AI' section (frontend/src/App.js, frontend/src/supabaseClient.js, supabase/create_tables.sql, Roadmap.md). Later, as we address specific tasks, request additional files from the 'Project Structure and Functionality' section if needed. When I share files, review them to understand their purpose without a detailed breakdown. If they look fine, move to the next file; silently note any issues for later discussion. Don’t suggest changes until all files are collected.
The Supabase database is set up, and I’m sharing .sql files only for project structure context.
Guide me incrementally through the remaining development, ensuring I understand each step (coding, testing, debugging) before proceeding. Explain concepts or technologies in simple terms within our conversation.
Encourage best practices (e.g., clean code, Git, coding standards) only after collecting all files.
After reviewing the README.md, ask for the first core file. Once you have all files, confirm with me that nothing’s missing, then we’ll prioritize next steps together.

\*\*

**_POST FILE UPLOADS_ ---MANUALLY UPDATED----**
I’ve shared the core project files with you. Please review them holistically to understand the app fully.
Guide me through the To-Do tasks in Roadmap.md, tackling one at a time. Go slowly, ensuring I understand each step before moving on. For file changes, show the specific code being added, modified, or removed, and provide the full updated file for easy implementation.

For each To-Do task:  
Update the 'Project Structure and Functionality' section of README.md with detailed changes and functionality.

Log accomplishments in the 'Progress (Completed)' section of Roadmap.md.

Suggest Git commits only after a full task (or functional sub-step for complex tasks) is complete. Update README.md before committing to reflect progress.

For .sql file changes (e.g., via SQL editor snippets), include the full updated file in the Supabase folder to maintain a complete table structure. Also consider that the .sql code has already been run on supabase SQL Editor and that modifications to base .sql files will also need to run snippets on SQL Editor to ensure new functionality has been implemented without recreating the entire tables.

Keep explanations simple and concise for a novice coder. Start by listing the To-Do items from Roadmap.md and ask which one to tackle first.

**_TEMP_**

this will surely need a new table in supabase and sql updates. Make sure when you provide updates to the sql code that you consider how the .sql code is currently organized into a create-tables and rls (separately) and also users_views_setup. Make sure you have all these files before proceeding.

When it comes to updating the sql code, we can run some update code in supabase's SQL editor but i will need complete code for recreating the whole database as is logged in frontend/supabase

Do you have all the .sql files?
