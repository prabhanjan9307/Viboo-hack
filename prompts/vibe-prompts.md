## Vibe Coding Prompt Strategy

We followed an iterative prompt-based development approach.

### Phase 1: System Design
Prompt focused on:
- Role separation (Students, Campus Authority, Service Partners)
- Trust and review moderation logic

### Phase 2: Feature Development
Separate prompts for:
- Student demand & review system
- Campus Authority dashboard
- Service Partner onboarding

### Phase 3: Refinement
Prompts used to:
- Simplify UI
- Improve naming
- Reduce overengineering

AI was used as a co-developer, while final decisions were made by the team.

--------------------------------------------------------------------------------

## Sample Prompts Used

### Prompt 1: System Architecture
"Design a role-based web platform with Students, Campus Authority, and Service Partners.
Focus on trust, review moderation, and scalable structure for a campus service system."

### Prompt 2: Student Demand & Review Flow
"Create logic where students can post service demands, upvote them, and review existing services.
Prevent fake or joke reviews using reporting and aggregation."

### Prompt 3: Service Partner Flow
"Design a vendor onboarding flow where service partners can browse college demands and apply to serve a campus."

These prompts were iteratively refined during development.


ChatGpt:My idea is create a website which connects brands to college and small firms too if needed in that area like if there is no sports shop in campus or not a good quality of food then students can review on the website itself and colleges can upload for need of other food shop like if there is a local shop pizza then Colleges can approach and put there demands and if big brands are ready to connect they can connect through the website for each college there will section they can select college and verify on our website ....give prompt for gemini.


Gemini:I will update the application to reflect the new terminology: Campus Authority (formerly Admin) and Campus Partners (formerly Vendor). Additionally, as a senior engineer, I'm adding a core AI feature: "Authority AI Insights". This feature allows the Campus Authority to use Gemini to analyze student demands and automatically generate a prioritized strategic recommendation for the campus.
Terminology Update:
All UI labels and role-based components renamed from "Admin" to "Campus Authority".
All UI labels and role-based components renamed from "Vendor" to "Campus Partners".
Internal UserRole enum updated to AUTHORITY and PARTNER for consistency.
AI Priority Analyzer (New Feature):
Added to the Campus Authority Dashboard.
Uses gemini-3-flash-preview to process the current list of student demands.
Behavior: When the authority clicks "Generate AI Strategic Report", the model analyzes the titles, descriptions, and upvote counts of student demands.
Visuals: A new card in the dashboard with a "Magic" icon that displays a professional summary of student sentiment and a recommended next step (e.g., "The high demand for late-night coffee suggests a productivity bottleneck; prioritize a 24/7 cafe tender").
UI/UX Enhancements:
Updated the Dashboard headers to be more prestigious.
Improved the "Partner" experience with a focus on "Campus Collaboration" rather than just "Vending".


Further more prompts to improve ui and ux and add features:

-for authority put unique id pass and for patner shop name partner email and pass and students registration id and pass
-put instead of upper arrow upvote and add dowmvote also
-put review for students only and add the4 shop whiich i am goona say first u keep kfc and anyone vendor and u put sports shop under sports and cafe also under food and add more shops
-when i click on review service then i shd get review option
