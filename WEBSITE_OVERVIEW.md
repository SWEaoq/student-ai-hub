# AI Hub - Website Overview

## About the Project

**AI Hub** (formerly Student AI Hub) is a comprehensive, dynamic platform designed for founders, creators, and professionals. It serves as a central hub for discovering and mastering artificial intelligence tools.

Unlike static directories, **AI Hub is a fully dynamic application**. The entire content of the website—from the tools listed to the educational guides—is driven by a real-time database and can be managed instantly without touching a single line of code.

## Dynamic Content & Admin Panel

The core power of AI Hub lies in its **Admin Panel**, which provides complete control over the platform's data. Administrators can log in to a secure dashboard to manage the site's content in real-time.

### Key Admin Capabilities:

- **Dynamic Tool Management**:
  - **Add/Edit/Delete Tools**: Instantly launch new AI tools on the homepage.
  - **Dual-Language Support**: Manage titles, descriptions, and tags in both **English and Arabic**. The site automatically serves the correct content based on the user's language preference.
  - **Categorization**: Organize tools into categories (Writing, Design, Coding, etc.) that instantly update the filtering logic on the frontend.
  - **Metadata Control**: Manage tool URLs, colors, icons, and "Free Tier" status directly from the UI.
- **Academy & Learning Paths**:
  - **Course Builder**: Create comprehensive learning modules (e.g., "Meta Frameworks", "Mobile Dev").
  - **Tutorial Management**: Write and edit step-by-step tutorials, including code blocks and checkpoints, entirely through dynamic forms.
- **Playbooks & Guides**:
  - Manage the "AI Playbook" section, adding new use-cases, prompt guides, and "hacks" for users.
- **Search & SEO**:
  - Changes made in the admin panel are immediately indexed by the site's internal search engine, making new tools discoverable instantly.

## Tech Stack

### Frontend Architecture

- **Framework**: [React](https://react.dev/) (v19) - The core library for building the user interface.
- **Build Tool**: [Vite](https://vitejs.dev/) - For lightning-fast development and optimized production builds.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS for a bespoke, premium "dark mode" design.
- **State Management**: Custom React Hooks (`useSiteContent`) for efficient data fetching and caching.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - For fluid page transitions and interactive elements.
- **Routing**: [React Router](https://reactrouter.com/) - Handling client-side navigation.

### Backend & Infrastructure

- **Database**: [Supabase](https://supabase.com/) (PostgreSQL) - The source of truth for all dynamic content.
- **Authentication**: **Supabase Auth** - Secure email/password authentication for Admin access.
- **Storage**: Supabase Storage (for asset management).
- **Hosting**: Deployed on Vercel (recommended) or any static host.

### Key Features

- **Real-time Updates**: Content updates in the Admin Panel reflect immediately on the user-facing site.
- **Bilingual System**: Deep integration of internationalization (i18n) within the database schema, allowing for seamless switching between English and Arabic.
- **Responsive Design**: Mobile-first architecture ensuring a perfect experience on all devices.
