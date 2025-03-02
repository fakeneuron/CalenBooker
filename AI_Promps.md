INITIAL PROMPT
I have a web app project described in the attached README.md file. The project includes a frontend, Supabase SQL scripts, and a backend placeholder. The project is well on its way, and the coding environment is already set up. As a novice coder, I need your help to guide me through the remaining development process step by step.
Please review the attached README.md file to understand the project structure, technologies used, and the overall goal of the application.
To avoid overwhelming me, please request the project files one at a time. Start with the most fundamental file relevant to the current stage of development, and we’ll proceed from there. All these files are already committed to Git, and I’m sharing them so I can pick up where I left off. When receiving the files, take them in to understand the concepts without providing a comprehensive analysis or being overly descriptive in your responses. Do not make any suggestions for changes as I share these files. Ensure you have all the files before proceeding with suggestions for changes.
The Supabase database is already set up. I’m sharing the .sql files only so you can understand the overall structure of the project.
Guide me through the remaining development process incrementally. Ensure I complete and understand each step before moving on to the next. This includes writing code, testing, and debugging based on the project’s current state.
As a beginner, I may need explanations of certain concepts or technologies. Please explain these in simple terms within our conversation.
Encourage me to follow best practices, such as writing clean and readable code, using version control (e.g., Git), and adhering to coding standards relevant to the technologies in this project, but only make suggestions after all files are collected.
The README.md file is attached for your review. After reviewing it, please ask me for the first project file you need based on the project’s current progress. Once you’ve requested and received all the files, check with me to confirm there’s nothing missing. After that, we’ll figure out what to prioritize next and proceed together.

POST FILE UPLOADS
We will plan to continue to update the .md file as we go - better to capture the full progress and overall function of the files in the project. As we go, we should try to be more inclusive in the .md without having too much detail. Capturing this much detail may be a bit unconventional for a README.md but this is what i want to capture in this project.

Do not commit every tiny step to git. Only moderate steps should be committed. Only commit once a step has been completed and the progress has been captured in the .md file.

The purpose of the .md file is both for the user's tracking of progress and documentation of overall functionality of the app but also to make sure that an AI can read the file and get a full scope of the project. By reading this .md file, an AI will be able to request all the required files for the project before moving forward.

Let's start by cleaning up the backend. Once tested, we will move on to the cleanup sql scripts. . I'd like to highlight that i'm a novice coder and leaning to code by using AI while developing this app. Please proceed slowly and deliberately so that I can keep up. When possible, include the full code for files rather than just pieces for manual insert (however it is nice to know which code is being changed explicitly). Don't move too fast or provide too many updates at once. i rather deal with smaller pieces of information and update before proceeding to the next stage.

Specifics on the meeting invitation notification
Before moving on to the .ics generation, let's give some greater consideration to the purpose of this. Generation of the .ics is just a component of the whole 'meeting generation' notification that we will be giving clients. Clients are those seeking services from the businesses - the main goal of this app is to create not only a .ics but a standard meeting invitation message to the client. Let's make this live on a webpage for now - you've probably seen this kind of thing before - where you make an appointment and you receive either an email or a link containing different options such as 'add to icalendar', 'add to outlook' download .ics (am i missing any popular ones?). Give this some deeper thought to better capture this kind of message to be sent to clients after scheduling meetings with the businesses. The goal is for the business to enter client details in the meetings form and the client automatically gets a notification with all the easy integrations to their calendars. Provide a more detailed and standardized overview of what i'm describing here before proceeding. Provide a sample of this type of notification (email, web link) to the client as part of the plan with all the relevant buttons to add to calendar. Consider the logic of how this might be executed.

Sample meeting invitation:
**Your Appointment with [Business Name]**
You’re scheduled for a [Service Name] with [Business Name]!

**Details:**

- **Date**: Wednesday, March 5, 2025
- **Time**: 2:00 PM - 2:30 PM (30 minutes)
- **Location**: [Business Address, Unit, City, Province, Postal Code]
- **Contact**: [Business Phone]

**Add to Your Calendar:**
[Add to iCalendar] [Add to Google Calendar] [Add to Outlook]

**Notes**: Please arrive 5 minutes early. Contact us if you need to reschedule.
