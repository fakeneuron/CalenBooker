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
I’ve shared the core project files with you. Now that you have everything, please take a holistic look at all the files to get a full picture of the app.

Guide me through completing the tasks in the To-Do list from the README.md file, addressing one item at a time. Don’t move too fast—ensure I understand and complete each step before proceeding. When making changes to files, provide the specific part of the code being modified, added, or removed. Also for simplicity of implementation, provide the full updated file content.

As we progress through each To-Do item:
Update the 'Project Structure and Functionality' section of the README.md file with detailed changes and functionality added.

Track accomplishments in the 'Progress (Completed)' section of the Roadmap.md file.

Only suggest committing to Git once a full To-Do step is completed and confirmed functional. For complex tasks, break them into sub-steps if needed, and suggest Git commits for sub-steps only after they’re confirmed functional. Update the README.md file before any Git commits to reflect the progress and new functionality.

When suggesting changes to .sql files (e.g., via snippets in the SQL editor), also provide the full updated .sql file in the Supabase folder to ensure it reflects the entire table structure for a single setup step.

Keep explanations simple and concise, suitable for a novice coder. Now that you have an idea of the project structure, start by listing the To-Do items from the Roadmap.md and ask me which one we should tackle first.

**_Specifics on the meeting invitation notification_**
Before moving on to the .ics generation, let's give some greater consideration to the purpose of this. Generation of the .ics is just a component of the whole 'meeting generation' notification that we will be giving clients. Clients are those seeking services from the businesses - the main goal of this app is to create not only a .ics but a standard meeting invitation message to the client. Let's make this live on a webpage for now - you've probably seen this kind of thing before - where you make an appointment and you receive either an email or a link containing different options such as 'add to icalendar', 'add to outlook' download .ics (am i missing any popular ones?). Give this some deeper thought to better capture this kind of message to be sent to clients after scheduling meetings with the businesses. The goal is for the business to enter client details in the meetings form and the client automatically gets a notification with all the easy integrations to their calendars. Provide a more detailed and standardized overview of what i'm describing here before proceeding. Provide a sample of this type of notification (email, web link) to the client as part of the plan with all the relevant buttons to add to calendar. Consider the logic of how this might be executed.
