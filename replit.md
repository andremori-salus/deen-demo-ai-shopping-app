# E-Commerce Web Application

## Overview

This is a modern e-commerce web application built with React, Express, and PostgreSQL. The application provides a product catalog browsing experience with shopping cart functionality. Users can view products, filter by category, search for items, view detailed product information, and manage their shopping cart. The application follows a minimalist design philosophy inspired by modern e-commerce platforms like Shopify and Etsy, emphasizing clean interfaces and product-first presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**: React with Vite for fast development and optimized production builds

**Routing**: Wouter for client-side routing (lightweight React Router alternative)

**State Management**: 
- React Context API for cart state management (CartContext)
- TanStack Query (React Query) for server state and data fetching
- Local storage for cart persistence

**UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling

**Design System**:
- Tailwind CSS with custom theme configuration
- Custom CSS variables for theming (light mode focused)
- Typography system using modern sans-serif fonts
- Responsive grid layouts with mobile-first approach
- Spacing based on Tailwind's scale (2, 4, 6, 8 units)

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**Development vs Production**:
- Development mode uses Vite middleware for HMR and module transformation
- Production mode serves pre-built static assets from dist/public
- Separate entry points (index-dev.ts, index-prod.ts) for different environments

**API Structure**: RESTful API with routes in /api namespace
- GET /api/products - List all products
- GET /api/products/:id - Get single product details

**Data Layer**: 
- Storage abstraction interface (IStorage) allowing for multiple implementations
- Current implementation uses in-memory storage (MemStorage) with seed data
- Schema designed for PostgreSQL via Drizzle ORM (ready for database integration)

### Data Storage

**ORM**: Drizzle ORM with PostgreSQL dialect configured

**Database Schema**:
- `users` table: id (UUID), username (unique), password
- `products` table: id (UUID), name, description, shortDescription, price (numeric), image, category, stock (integer)
- Schema validation using Zod through drizzle-zod

**Current Implementation**: In-memory storage with mock product data (MemStorage class)

**Database Provider**: Configured for Neon Database serverless PostgreSQL (@neondatabase/serverless)

**Migration Strategy**: Drizzle Kit configured with migrations directory, can run schema pushes via npm scripts

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components
- shadcn/ui design system (New York style variant)
- Lucide React for icons

**Styling**:
- Tailwind CSS with PostCSS
- class-variance-authority for component variants
- clsx for conditional class merging

**Data Fetching & Forms**:
- TanStack Query for async state management
- React Hook Form with Zod resolvers for form validation

**Database & Backend**:
- Neon Database serverless driver
- Drizzle ORM for type-safe database queries
- connect-pg-simple for session storage (configured but not actively used)

**Development Tools**:
- Replit-specific Vite plugins (cartographer, dev-banner, runtime-error-modal)
- tsx for running TypeScript in development
- esbuild for production server bundling

**Routing**: wouter for lightweight client-side routing

**Date Utilities**: date-fns for date manipulation

**Carousel**: embla-carousel-react for product image carousels (installed but not currently implemented)

### Key Architectural Decisions

**Separation of Concerns**: 
- Clear separation between client, server, and shared code directories
- Shared schema definitions in /shared for type consistency between frontend and backend
- Path aliases configured (@/, @shared/) for clean imports

**Development Experience**:
- Hot module replacement in development via Vite
- TypeScript across the stack for type safety
- Incremental compilation with build info caching

**Cart Implementation**:
- Client-side cart storage using localStorage
- Cart state managed through React Context
- No backend persistence for cart (stateless server design)

**Design Philosophy**:
- Product-first visual hierarchy
- Scannable grid layouts for browsing
- Generous whitespace and clean typography for trust building
- Frictionless navigation from discovery to cart

**Database Strategy**:
- Schema-first approach with Drizzle ORM
- Ready for PostgreSQL but currently using in-memory storage
- Easy migration path from mock data to real database
- UUID-based primary keys for scalability