# Onam Festival Website

## Overview

This is a full-stack festival website dedicated to celebrating Onam, built with React on the frontend and Express.js on the backend. The application features a personalized greeting system where users enter their names to receive customized Onam wishes, complete with interactive animations, festival elements like Maveli character and Pookalam displays, particle effects, and fireworks. The backend provides name validation services with humorous commentary, storing validation results for improved performance and user experience tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components with Radix UI primitives for accessible design
- **Styling**: Tailwind CSS with custom festival-themed color variables and responsive design
- **Animations**: Framer Motion for sophisticated animations, transitions, and interactive elements
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Data Fetching**: Custom query client with built-in error handling and authentication support

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for type safety and modern JavaScript features
- **API Design**: RESTful endpoints for name validation and session management
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development Tools**: TSX for TypeScript execution and hot reloading in development

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL for cloud hosting
- **Fallback Storage**: In-memory storage implementation for development and testing scenarios
- **Session Management**: Browser localStorage for client-side persistence of user data

### Authentication and Authorization
- **Session Storage**: Express sessions with PostgreSQL session store using connect-pg-simple
- **Client Persistence**: LocalStorage for maintaining user names and validation results across sessions
- **CORS Configuration**: Credentials included for cross-origin requests

### External Dependencies

#### Frontend Dependencies
- **UI Components**: Comprehensive Radix UI component library for accessibility
- **Animation**: Framer Motion for complex animations and gesture handling
- **Forms**: React Hook Form with Hookform Resolvers for form validation
- **Icons**: Lucide React for consistent iconography
- **Utilities**: Class Variance Authority and clsx for conditional styling
- **Audio**: Web Audio API integration for festival sound effects
- **Date Handling**: date-fns for date manipulation and formatting

#### Backend Dependencies
- **Database**: Drizzle ORM with Neon Database serverless PostgreSQL
- **Validation**: Zod for runtime type checking and schema validation
- **Development**: esbuild for production builds and bundle optimization

#### Development Tools
- **Build System**: Vite with React plugin and Replit-specific development enhancements
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Hot Reloading**: Vite HMR with runtime error overlay for development
- **Asset Management**: PostCSS with Autoprefixer for CSS processing

#### Festival-Specific Features
- **Interactive Elements**: Touch-friendly animations optimized for mobile devices
- **Cultural Theming**: Custom CSS variables for traditional Onam colors (gold, orange, red, green, purple)
- **Responsive Design**: Mobile-first approach with progressive enhancement for larger screens
- **Performance Optimization**: Lazy loading and efficient re-rendering for smooth animations