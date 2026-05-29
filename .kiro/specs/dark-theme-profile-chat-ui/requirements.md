# Requirements Document

## Introduction

Bu doküman, AI recruiter uygulaması için koyu tonlu, modern bir frontend tasarımının gereksinimlerini tanımlar. Mevcut PublicProfile sayfası yeniden tasarlanacak ve kullanıcı profil bilgileri (yetenekler, deneyim, projeler, eğitim) ile AI sohbet alanı koyu tema ile modern bir arayüzde sunulacaktır.

## Glossary

- **PublicProfile_Page**: Kullanıcının herkese açık profil sayfası
- **Profile_Section**: Kullanıcının temel bilgilerini (isim, bio, profil fotoğrafı, linkler) gösteren bölüm
- **Skills_Section**: Kullanıcının teknik yeteneklerini pill-style butonlarla gösteren bölüm
- **Experience_Section**: Kullanıcının iş deneyimlerini timeline düzeninde gösteren bölüm
- **Education_Section**: Kullanıcının eğitim geçmişini timeline düzeninde gösteren bölüm
- **Projects_Section**: Kullanıcının projelerini kart tabanlı düzende gösteren bölüm
- **Chat_Section**: AI sohbet alanını gösteren bölüm
- **Dark_Theme**: Koyu tonların hakim olduğu renk paleti (arka plan: koyu gri/siyah, vurgular: yeşil/cyan/mavi)
- **Backend_API**: Profil verilerini sağlayan mevcut Express.js API
- **Profile_Model**: MongoDB'de kullanıcı profil verilerini tutan model

## Requirements

### Requirement 1: Dark Theme Implementation

**User Story:** As a user, I want to see the profile page with a dark theme, so that I can have a modern and visually comfortable experience.

#### Acceptance Criteria

1. THE PublicProfile_Page SHALL use a dark background color (gray-900 or darker)
2. THE PublicProfile_Page SHALL use light text colors (gray-100 or lighter) for primary content
3. THE PublicProfile_Page SHALL use accent colors (green-500, cyan-500, blue-500) for interactive elements and highlights
4. THE PublicProfile_Page SHALL use semi-transparent dark cards (gray-800 with opacity) for content sections
5. THE PublicProfile_Page SHALL maintain WCAG AA contrast ratio standards for text readability

### Requirement 2: Profile Section Display

**User Story:** As a visitor, I want to see the candidate's basic profile information at the top of the page, so that I can quickly understand who they are.

#### Acceptance Criteria

1. THE Profile_Section SHALL display the user's profile photo as a circular avatar
2. THE Profile_Section SHALL display the user's name as a large heading
3. THE Profile_Section SHALL display the user's title or role below the name
4. THE Profile_Section SHALL display the user's bio text
5. THE Profile_Section SHALL display social media links (GitHub, LinkedIn, Website, ArtBook) as pill-style buttons with icons
6. WHEN a social media link is clicked, THE Profile_Section SHALL open the link in a new browser tab

### Requirement 3: Skills Section Display

**User Story:** As a visitor, I want to see the candidate's technical skills, so that I can evaluate their expertise.

#### Acceptance Criteria

1. THE Skills_Section SHALL display skills as pill-style buttons with rounded corners
2. THE Skills_Section SHALL use accent colors (green-500, cyan-500) for skill pills
3. THE Skills_Section SHALL display skills in a flex-wrap layout
4. THE Skills_Section SHALL group skills by category (e.g., Frontend, Backend, Tools)
5. WHEN a skill pill is hovered, THE Skills_Section SHALL apply a subtle scale transform effect

### Requirement 4: Experience Section Display

**User Story:** As a visitor, I want to see the candidate's work experience, so that I can understand their professional background.

#### Acceptance Criteria

1. THE Experience_Section SHALL display work experiences in a vertical timeline layout
2. THE Experience_Section SHALL display company name, job title, and date range for each experience
3. THE Experience_Section SHALL display job description or key responsibilities
4. THE Experience_Section SHALL use a vertical line with dots to connect timeline items
5. THE Experience_Section SHALL display experiences in reverse chronological order (most recent first)

### Requirement 5: Education Section Display

**User Story:** As a visitor, I want to see the candidate's education background, so that I can understand their academic qualifications.

#### Acceptance Criteria

1. THE Education_Section SHALL display education entries in a vertical timeline layout
2. THE Education_Section SHALL display institution name, degree, field of study, and date range for each entry
3. THE Education_Section SHALL use a vertical line with dots to connect timeline items
4. THE Education_Section SHALL display education entries in reverse chronological order (most recent first)

### Requirement 6: Projects Section Display

**User Story:** As a visitor, I want to see the candidate's projects, so that I can evaluate their practical work.

#### Acceptance Criteria

1. THE Projects_Section SHALL display projects in a card-based grid layout
2. THE Projects_Section SHALL display project name, description, and technologies used for each project
3. THE Projects_Section SHALL display a "View on GitHub" button for each project with a GitHub link
4. WHEN a project card is hovered, THE Projects_Section SHALL apply a subtle lift effect (shadow and transform)
5. THE Projects_Section SHALL use a responsive grid (1 column on mobile, 2 columns on tablet, 3 columns on desktop)

### Requirement 7: Chat Section Positioning

**User Story:** As a visitor, I want to interact with the AI chatbot at the bottom of the page, so that I can ask questions about the candidate.

#### Acceptance Criteria

1. THE Chat_Section SHALL be positioned at the bottom of the PublicProfile_Page
2. THE Chat_Section SHALL remain visible when scrolling to the bottom
3. THE Chat_Section SHALL use the same dark theme as the rest of the page
4. THE Chat_Section SHALL maintain the existing chat functionality (message display, input, send button)
5. THE Chat_Section SHALL display a subtle border or separator from the profile content above

### Requirement 8: Backend Data Model Extension

**User Story:** As a developer, I want to extend the Profile model to support new fields, so that the frontend can display skills, experience, education, and projects.

#### Acceptance Criteria

1. THE Profile_Model SHALL include a skills array field with category and name properties
2. THE Profile_Model SHALL include an experience array field with company, title, startDate, endDate, and description properties
3. THE Profile_Model SHALL include an education array field with institution, degree, fieldOfStudy, startDate, and endDate properties
4. THE Profile_Model SHALL include a projects array field with name, description, technologies, and githubUrl properties
5. THE Profile_Model SHALL include a title field for the user's professional title

### Requirement 9: Backend API Extension

**User Story:** As a developer, I want to extend the profile API to support CRUD operations for new fields, so that users can manage their profile data.

#### Acceptance Criteria

1. WHEN a GET request is made to /api/profile/:userId, THE Backend_API SHALL return all profile fields including skills, experience, education, and projects
2. WHEN a PUT request is made to /api/profile/me with skills data, THE Backend_API SHALL update the skills array
3. WHEN a PUT request is made to /api/profile/me with experience data, THE Backend_API SHALL update the experience array
4. WHEN a PUT request is made to /api/profile/me with education data, THE Backend_API SHALL update the education array
5. WHEN a PUT request is made to /api/profile/me with projects data, THE Backend_API SHALL update the projects array

### Requirement 10: Responsive Layout

**User Story:** As a user, I want the profile page to be responsive, so that I can view it on any device.

#### Acceptance Criteria

1. THE PublicProfile_Page SHALL use a single-column layout on mobile devices (width < 768px)
2. THE PublicProfile_Page SHALL use a two-column layout on tablet devices (768px ≤ width < 1024px)
3. THE PublicProfile_Page SHALL use a multi-column layout on desktop devices (width ≥ 1024px)
4. THE PublicProfile_Page SHALL adjust font sizes and spacing for different screen sizes
5. THE Chat_Section SHALL remain full-width on all screen sizes

### Requirement 11: Dashboard Profile Editor

**User Story:** As a user, I want to edit my skills, experience, education, and projects from the dashboard, so that I can keep my profile up to date.

#### Acceptance Criteria

1. THE Dashboard SHALL display form sections for editing skills, experience, education, and projects
2. WHEN a user adds a skill, THE Dashboard SHALL send a PUT request to update the skills array
3. WHEN a user adds an experience entry, THE Dashboard SHALL send a PUT request to update the experience array
4. WHEN a user adds an education entry, THE Dashboard SHALL send a PUT request to update the education array
5. WHEN a user adds a project, THE Dashboard SHALL send a PUT request to update the projects array
6. THE Dashboard SHALL display success or error messages after each update operation

### Requirement 12: Hover and Interaction Effects

**User Story:** As a visitor, I want interactive elements to respond to my actions, so that I have a smooth and engaging experience.

#### Acceptance Criteria

1. WHEN a skill pill is hovered, THE Skills_Section SHALL apply a scale transform of 1.05
2. WHEN a project card is hovered, THE Projects_Section SHALL apply a shadow and translateY transform
3. WHEN a social link button is hovered, THE Profile_Section SHALL apply a brightness filter
4. WHEN the "View on GitHub" button is hovered, THE Projects_Section SHALL apply a background color transition
5. THE PublicProfile_Page SHALL use CSS transitions with a duration of 200-300ms for all hover effects
