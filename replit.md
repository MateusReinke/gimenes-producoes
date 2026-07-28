# Gimenes Produções - Classical Music Production Website

## Overview

Gimenes Produções is a classical music production company website built with React, TypeScript, and modern web technologies. The application showcases classical musicians, events, repertoire, and services for weddings, corporate events, and special occasions. It features an elegant dark theme with sophisticated design elements, interactive components, and integrations with Spotify and YouTube for media content.

**Project Status**: Successfully migrated from Lovable to Replit fullstack environment with complete backend API, validated forms, and data persistence.

## Recent Changes (October 2024)

### Backend Implementation
- Created comprehensive data schemas with Zod validation for all entities
- Implemented Express.js REST API with complete CRUD operations
- Built `IStorage` interface abstraction for future database migration
- Deployed `MemStorage` in-memory storage for rapid development
- Added seed data functionality for initial content population
- All API routes validated with Zod schemas

### Frontend Integration
- Updated `Events` component to fetch data from backend API using React Query
- Implemented `ContactForm` with full validation (react-hook-form + Zod)
- Created `NewsletterForm` with backend integration
- Added loading states and error handling for all data operations
- Integrated data-testid attributes for testing

### Data Flow
- Frontend → React Query → Express API → Storage Interface → MemStorage
- Form submissions validated client-side and server-side
- Cache invalidation configured for mutations
- Type safety maintained across full stack with shared schemas

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom dark classical theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation

**Design System:**
- Custom dark classical color palette with gold primary (#45 90% 65%), burgundy secondary, and deep blue accent colors
- Typography: Playfair Display for headings, Inter for body text
- Sophisticated gradient effects and animation system
- Responsive design with mobile-first approach
- Scroll-based animations using Intersection Observer

**Component Structure:**
- Modular component architecture with separation of concerns
- Reusable UI components in `/components/ui/`
- Feature components in `/components/` (Hero, About, Services, Musicians, etc.)
- Custom hooks for scroll animations and mobile detection

### Backend Architecture

**Server Setup:**
- **Runtime**: Node.js with Express.js
- **Development**: TSX with watch mode for hot reloading
- **Production**: Sirv for static file serving
- **Port**: 5000 with 0.0.0.0 binding

**Data Layer:**
- **Storage Pattern**: Interface-based storage abstraction (`IStorage`)
- **Current Implementation**: In-memory storage (`MemStorage`)
- **Data Models**: Drizzle ORM schema definitions with Zod validation
- **Seed Data**: Automated database seeding on server start

**API Design:**
- RESTful API endpoints for all resources
- CRUD operations for: Events, Musicians, Videos, Services, Repertoire, Contact Requests, Newsletter Subscribers
- Standard HTTP methods (GET, POST, PATCH, DELETE)
- JSON request/response format
- Zod schema validation for request bodies

**Architecture Rationale:**
The in-memory storage provides a simple, zero-configuration development experience. The `IStorage` interface allows easy migration to a persistent database (like PostgreSQL with Drizzle ORM) without changing business logic. This abstraction enables rapid prototyping while maintaining production-ready patterns.

### Data Models (Drizzle Schema)

**Core Entities:**
1. **Events**: Concert and event information with featured flag
2. **Musicians**: Artist profiles with social links and verification status
3. **Videos**: YouTube/platform video embeds with metadata
4. **Services**: Service offerings with features list
5. **Repertoire**: Musical pieces catalog with categories
6. **Contact Requests**: Client inquiries with event details
7. **Newsletter Subscribers**: Email subscription management

**Schema Design Decisions:**
- Serial primary keys for simplicity
- Text fields for flexible content (descriptions, bios)
- Boolean flags for feature toggles (featured, verified)
- JSON-serialized arrays stored as text for features/tags
- Varchar length limits for structured data (dates, emails)

### External Dependencies

**Third-Party Services:**
1. **Spotify Integration**
   - Embedded playlist player
   - Artist profiles display
   - Sticky player component
   - Custom playlist ID: `0hv0yTjSYSJ9Bvf81vqlDw`

2. **YouTube API**
   - Channel video fetching
   - API Key: Configured but requires valid key
   - Channel ID: `UCL24vuJfRN6_opDgrxwriNQ`
   - Video thumbnails and metadata display

3. **Google Fonts**
   - Playfair Display (weights: 400, 500, 600, 700)
   - Inter (weights: 300, 400, 500, 600)

**Development Tools:**
- ESLint with TypeScript support
- React Hooks and Refresh plugins
- Autoprefixer and PostCSS for CSS processing
- TypeScript path aliases (@/, @shared/)

**UI Component Libraries:**
- Radix UI primitives (26+ components)
- Embla Carousel for carousels
- Lucide React for icons
- Vaul for drawer component
- CMDK for command menu
- React Day Picker for calendars

**Validation & Forms:**
- Zod for runtime type validation
- Drizzle-Zod for schema-to-Zod conversion
- @hookform/resolvers for form validation integration

**Build & Development:**
- Vite SWC plugin for fast React compilation
- TSX for TypeScript execution
- tsconfig-paths for module resolution
- Sirv for production static serving

**Architectural Trade-offs:**
- **Pros**: Modern stack with excellent DX, type safety, component reusability
- **Cons**: Heavy dependency on external CDNs (fonts, Spotify), no server-side rendering
- **Alternative Considered**: Next.js for SSR, but chose Vite for simpler deployment and faster builds