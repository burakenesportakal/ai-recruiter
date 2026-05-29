# Implementation Tasks: Dark Theme Profile & Chat UI

## Phase 1: Backend Data Model & API Extension

### Task 1.1: Extend Profile Model
- [ ] Add `title` field to Profile schema (String, maxlength: 100)
- [ ] Add `skills` array field with category (enum) and name (String)
- [ ] Add `experience` array field with company, title, startDate, endDate, description
- [ ] Add `education` array field with institution, degree, fieldOfStudy, startDate, endDate
- [ ] Add `projects` array field with name, description, technologies array, githubUrl
- [ ] Update Profile.js model file with validation rules

**Files to modify**: `server/models/Profile.js`

### Task 1.2: Update Profile API Endpoints
- [ ] Modify GET /api/profile/:userId to return new fields (skills, experience, education, projects, title)
- [ ] Modify PUT /api/profile/me to accept and update new fields
- [ ] Add validation for required fields and enum values
- [ ] Test API endpoints with Postman or similar tool

**Files to modify**: `server/routes/profileRoutes.js`

### Task 1.3: Add API Error Handling
- [ ] Add validation error responses (400) for invalid data
- [ ] Add descriptive error messages for each validation failure
- [ ] Test error cases (missing required fields, invalid enum values)

**Files to modify**: `server/routes/profileRoutes.js`

## Phase 2: Frontend Component Development

### Task 2.1: Create ProfileHeader Component
- [ ] Create `client/src/components/ProfileHeader.jsx`
- [ ] Implement avatar display (circular with first letter or image)
- [ ] Display user name, title, and bio
- [ ] Render social links as pill-style buttons with icons
- [ ] Apply dark theme styling (bg-gray-900, text-gray-100)
- [ ] Add hover effects to social links (brightness filter)
- [ ] Ensure links open in new tab (target="_blank" rel="noreferrer")

**Files to create**: `client/src/components/ProfileHeader.jsx`

### Task 2.2: Create SkillsSection Component
- [ ] Create `client/src/components/SkillsSection.jsx`
- [ ] Group skills by category
- [ ] Render skills as pill-style buttons with rounded corners
- [ ] Apply accent colors (green-500, cyan-500) with opacity
- [ ] Implement hover effect (scale-105 transform, 200ms transition)
- [ ] Use flex-wrap layout for responsive behavior
- [ ] Handle empty state ("No skills added yet")

**Files to create**: `client/src/components/SkillsSection.jsx`

### Task 2.3: Create ExperienceSection Component
- [ ] Create `client/src/components/ExperienceSection.jsx`
- [ ] Implement vertical timeline layout with connecting line
- [ ] Display company, title, date range, description for each entry
- [ ] Format dates (e.g., "Jan 2023 - Present" or "Jan 2023 - Dec 2024")
- [ ] Handle current positions (endDate = null → "Present")
- [ ] Sort entries in reverse chronological order
- [ ] Apply dark theme styling (bg-gray-800/50, timeline dots in cyan-500)
- [ ] Handle empty state

**Files to create**: `client/src/components/ExperienceSection.jsx`

### Task 2.4: Create EducationSection Component
- [ ] Create `client/src/components/EducationSection.jsx`
- [ ] Implement vertical timeline layout (similar to ExperienceSection)
- [ ] Display institution, degree, field of study, date range
- [ ] Format dates and handle current education (endDate = null)
- [ ] Sort entries in reverse chronological order
- [ ] Apply dark theme styling (timeline dots in blue-500)
- [ ] Handle empty state

**Files to create**: `client/src/components/EducationSection.jsx`

### Task 2.5: Create ProjectsSection Component
- [ ] Create `client/src/components/ProjectsSection.jsx`
- [ ] Implement card-based grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- [ ] Display project name, description, technologies as pills
- [ ] Add "View on GitHub" button (conditional on githubUrl)
- [ ] Implement hover effect (shadow, translateY transform, 300ms transition)
- [ ] Apply dark theme styling (bg-gray-800/50, border-gray-700/50)
- [ ] Handle empty state

**Files to create**: `client/src/components/ProjectsSection.jsx`

### Task 2.6: Update PublicProfile Page
- [ ] Import new section components (ProfileHeader, SkillsSection, etc.)
- [ ] Replace existing profile header with ProfileHeader component
- [ ] Add SkillsSection, ExperienceSection, EducationSection, ProjectsSection
- [ ] Update page background to dark theme (bg-gray-900 or bg-black)
- [ ] Update ChatSection styling for dark theme
- [ ] Ensure responsive layout (single column on mobile, multi-column on desktop)
- [ ] Update API call to fetch new profile fields
- [ ] Handle loading and error states

**Files to modify**: `client/src/pages/PublicProfile.jsx`

## Phase 3: Dashboard Profile Editors

### Task 3.1: Create SkillsEditor Component
- [ ] Create `client/src/components/SkillsEditor.jsx`
- [ ] Add form with category dropdown (Frontend, Backend, Database, DevOps, Tools, Soft Skills, Other)
- [ ] Add skill name input field
- [ ] Add "Add Skill" button
- [ ] Display current skills list with delete buttons
- [ ] Implement add skill handler (sends PUT request to /api/profile/me)
- [ ] Implement delete skill handler
- [ ] Show success/error messages
- [ ] Apply consistent styling with existing Dashboard

**Files to create**: `client/src/components/SkillsEditor.jsx`

### Task 3.2: Create ExperienceEditor Component
- [ ] Create `client/src/components/ExperienceEditor.jsx`
- [ ] Add form with fields: company, title, startDate, endDate (optional), description
- [ ] Add "Current Position" checkbox (sets endDate to null)
- [ ] Add "Add Experience" button
- [ ] Display current experience list with edit/delete buttons
- [ ] Implement add/update/delete handlers (PUT requests)
- [ ] Show success/error messages
- [ ] Validate required fields before submission

**Files to create**: `client/src/components/ExperienceEditor.jsx`

### Task 3.3: Create EducationEditor Component
- [ ] Create `client/src/components/EducationEditor.jsx`
- [ ] Add form with fields: institution, degree, fieldOfStudy, startDate, endDate (optional)
- [ ] Add "Currently Studying" checkbox
- [ ] Add "Add Education" button
- [ ] Display current education list with edit/delete buttons
- [ ] Implement add/update/delete handlers
- [ ] Show success/error messages
- [ ] Validate required fields

**Files to create**: `client/src/components/EducationEditor.jsx`

### Task 3.4: Create ProjectsEditor Component
- [ ] Create `client/src/components/ProjectsEditor.jsx`
- [ ] Add form with fields: name, description, technologies (comma-separated input), githubUrl (optional)
- [ ] Add "Add Project" button
- [ ] Display current projects list with edit/delete buttons
- [ ] Parse comma-separated technologies into array before submission
- [ ] Implement add/update/delete handlers
- [ ] Show success/error messages
- [ ] Validate required fields

**Files to create**: `client/src/components/ProjectsEditor.jsx`

### Task 3.5: Update Dashboard Page
- [ ] Import new editor components
- [ ] Add "Professional Title" input field to basic info form
- [ ] Add sections for SkillsEditor, ExperienceEditor, EducationEditor, ProjectsEditor
- [ ] Update PUT /api/profile/me calls to include title field
- [ ] Organize editors in collapsible sections or tabs for better UX
- [ ] Ensure consistent styling and spacing

**Files to modify**: `client/src/pages/Dashboard.jsx`

## Phase 4: Dark Theme & Styling

### Task 4.1: Update Tailwind Configuration
- [ ] Extend Tailwind config with custom dark theme colors
- [ ] Add custom color palette (dark.bg, dark.card, dark.border, accent colors)
- [ ] Verify color contrast meets WCAG AA standards

**Files to modify**: `client/tailwind.config.js`

### Task 4.2: Apply Dark Theme to PublicProfile
- [ ] Update page background to bg-gray-900 or bg-black
- [ ] Update all text colors (gray-100 for primary, gray-400 for secondary)
- [ ] Update card backgrounds to bg-gray-800/50 with borders
- [ ] Update ChatSection styling (bg-gray-800/50, gray-700 borders)
- [ ] Update message bubbles (cyan-600 for user, gray-700 for AI)
- [ ] Update input fields (bg-gray-900, border-gray-700, text-gray-100)

**Files to modify**: `client/src/pages/PublicProfile.jsx`

### Task 4.3: Add Hover Effects and Transitions
- [ ] Add hover effects to skill pills (scale-105, 200ms transition)
- [ ] Add hover effects to project cards (shadow, translateY, 300ms transition)
- [ ] Add hover effects to social links (brightness filter)
- [ ] Add hover effects to GitHub buttons (bg color transition)
- [ ] Ensure all transitions are smooth and consistent

**Files to modify**: All component files

### Task 4.4: Implement Responsive Layout
- [ ] Test PublicProfile on mobile (< 768px) - ensure single column
- [ ] Test on tablet (768px - 1023px) - ensure two columns where applicable
- [ ] Test on desktop (≥ 1024px) - ensure multi-column grid for projects
- [ ] Adjust font sizes and spacing for different screen sizes
- [ ] Ensure ChatSection remains full-width on all sizes

**Files to modify**: `client/src/pages/PublicProfile.jsx`, component files

## Phase 5: Testing & Quality Assurance

### Task 5.1: Write Component Tests
- [ ] Write tests for ProfileHeader (renders user info, social links)
- [ ] Write tests for SkillsSection (groups by category, applies hover effects)
- [ ] Write tests for ExperienceSection (timeline, date formatting)
- [ ] Write tests for EducationSection (timeline, all fields)
- [ ] Write tests for ProjectsSection (grid layout, GitHub links)
- [ ] Achieve >80% code coverage for components

**Files to create**: `client/src/components/__tests__/*.test.jsx`

### Task 5.2: Write API Integration Tests
- [ ] Test GET /api/profile/:userId returns all new fields
- [ ] Test PUT /api/profile/me updates skills array
- [ ] Test PUT /api/profile/me updates experience array
- [ ] Test PUT /api/profile/me updates education array
- [ ] Test PUT /api/profile/me updates projects array
- [ ] Test validation errors (missing required fields, invalid enums)
- [ ] Test authentication (protected endpoints)

**Files to create**: `server/__tests__/profileRoutes.test.js`

### Task 5.3: Manual Testing
- [ ] Test dark theme colors meet WCAG AA contrast standards (use contrast checker tool)
- [ ] Test all sections render correctly with sample data
- [ ] Test responsive layout on mobile, tablet, desktop (use browser dev tools)
- [ ] Test hover effects are smooth and consistent
- [ ] Test dashboard editors successfully update profile
- [ ] Test chat functionality works with new dark theme
- [ ] Test social links open in new tabs
- [ ] Test timeline displays dates in correct format
- [ ] Test project cards display GitHub links correctly
- [ ] Test empty states for all sections

### Task 5.4: Accessibility Audit
- [ ] Verify keyboard navigation works for all interactive elements
- [ ] Add aria-labels to icon-only buttons
- [ ] Ensure focus indicators are visible with dark theme
- [ ] Use semantic HTML (section, article, nav)
- [ ] Test with screen reader (NVDA or VoiceOver)

## Phase 6: Documentation & Deployment

### Task 6.1: Update Documentation
- [ ] Update README with new features (skills, experience, education, projects)
- [ ] Document API endpoints with request/response examples
- [ ] Add screenshots of dark theme profile page
- [ ] Document dashboard editor usage

**Files to modify**: `README.md`

### Task 6.2: Database Migration (if needed)
- [ ] Verify existing profiles work without new fields (defaults applied)
- [ ] Test backward compatibility
- [ ] No migration script needed (Mongoose handles defaults)

### Task 6.3: Deployment Checklist
- [ ] Deploy backend changes first (API + model updates)
- [ ] Verify backend is working in production
- [ ] Deploy frontend changes
- [ ] Test production deployment
- [ ] Monitor for errors in logs

## Task Summary

**Total Tasks**: 30
- Phase 1 (Backend): 3 tasks
- Phase 2 (Frontend Components): 6 tasks
- Phase 3 (Dashboard Editors): 5 tasks
- Phase 4 (Dark Theme & Styling): 4 tasks
- Phase 5 (Testing & QA): 4 tasks
- Phase 6 (Documentation & Deployment): 3 tasks

**Estimated Timeline**: 3-5 days (depending on team size and experience)

**Priority Order**:
1. Phase 1 (Backend) - Foundation for all other work
2. Phase 2 (Frontend Components) - Core feature implementation
3. Phase 4 (Dark Theme) - Visual polish (can be done in parallel with Phase 2)
4. Phase 3 (Dashboard Editors) - User management features
5. Phase 5 (Testing) - Quality assurance
6. Phase 6 (Documentation) - Final polish
