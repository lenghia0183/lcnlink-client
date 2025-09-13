# Overview

This is a URL shortening application built with Next.js 15, featuring modern UI components, internationalization, authentication, and comprehensive form handling. The application allows users to create shortened URLs with advanced features like analytics, password protection, expiration dates, and two-factor authentication. It uses TypeScript for type safety and includes a complete authentication system with user management capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 15 with App Router and Server Components
- **UI Framework**: Custom component library built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Component Strategy**: Compound components pattern with reusable UI primitives (AppButton, AppCard, AppDialog, etc.)
- **Form Management**: React Hook Form with Zod validation schemas for type-safe form handling
- **State Management**: Zustand for client-side state, React Context for user authentication and theme management
- **Internationalization**: next-intl for multi-language support (English and Vietnamese)

## Authentication & Security
- **Authentication**: Token-based authentication with access/refresh token pattern
- **Two-Factor Authentication**: TOTP-based 2FA with QR code generation
- **Protected Routes**: Middleware-based route protection with automatic redirects
- **Cookie Management**: Secure cookie handling for token storage

## Data Fetching & API Integration
- **HTTP Client**: Axios with custom interceptors for token management and error handling
- **Data Fetching**: SWR for client-side data fetching with caching and revalidation
- **API Architecture**: RESTful API integration with typed response interfaces
- **Error Handling**: Centralized error handling with user-friendly toast notifications

## State Management Strategy
- **User Context**: Global user state management with authentication status
- **Theme Context**: Dark/light theme management with next-themes
- **Language Context**: Locale switching with URL-based routing
- **Form State**: Local form state with React Hook Form and validation

## Responsive Design
- **Breakpoint System**: Custom breakpoint utilities with responsive value hooks
- **Mobile-First**: Responsive design approach with mobile navigation drawer
- **Viewport Detection**: Cookie-based viewport width detection for SSR compatibility

## Performance Optimizations
- **Code Splitting**: Next.js automatic code splitting and lazy loading
- **Image Optimization**: Next.js Image component with fallback handling
- **Font Optimization**: Geist font family with automatic font optimization
- **Bundle Analysis**: Webpack configuration for SVG imports and optimization

# External Dependencies

## Core Framework & Runtime
- **Next.js 15**: React framework with App Router and server components
- **React 19**: Latest React version with concurrent features
- **TypeScript**: Type safety and development experience

## UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Headless UI components for accessibility and functionality
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth transitions
- **next-themes**: Theme switching with system preference detection

## Form Management & Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for type-safe forms
- **@hookform/resolvers**: Zod resolver integration for React Hook Form
- **Formik**: Alternative form library (appears to be included but may not be actively used)

## Data Fetching & HTTP
- **SWR**: Data fetching with caching, revalidation, and optimistic updates
- **Axios**: HTTP client with request/response interceptors
- **cookies-next**: Cookie management for client and server

## Internationalization
- **next-intl**: Internationalization with route-based locale switching
- **@formatjs/intl-localematcher**: Locale matching and negotiation

## Date & Time Management
- **date-fns**: Date manipulation and formatting utilities
- **react-day-picker**: Calendar component for date selection

## State Management & Utilities
- **Zustand**: Lightweight state management library
- **Immer**: Immutable state updates
- **use-immer**: React hook for Immer integration

## Development & Build Tools
- **@svgr/webpack**: SVG imports as React components
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility
- **tailwind-merge**: Tailwind class merging utility

## Notifications & User Feedback
- **Sonner**: Toast notification system
- **Vaul**: Drawer component for mobile interfaces

## Authentication & Security
- **cookies-next**: Secure cookie handling for authentication tokens
- **Event-driven architecture**: Custom event emitter for authentication state changes

## Type Definitions & Development
- **Custom type definitions**: Comprehensive TypeScript interfaces for API responses, user data, and application state
- **Response validation**: Centralized response code validation utilities
- **Environment detection**: Client/server environment utilities for SSR compatibility

# Recent Changes

## September 13, 2025 - Guest User Experience & Policy Pages Enhancement

### Guest User localStorage Functionality
- **Home page enhancement**: Added localStorage support for guest users (non-logged in)
- **Link creation for guests**: When users create links without logging in, links are stored locally in browser storage
- **Guest link display**: Added dedicated section on home page to display previously created links from localStorage
- **Security improvements**: Guest links don't store sensitive data (passwords) for security
- **UX enhancements**: Added copy, delete, and click functionality for guest links

### New Policy & Information Pages
- **Contact page** (`/contact`): Professional contact form with company information and FAQ
- **Privacy Policy page** (`/privacy`): Comprehensive privacy policy covering data collection and user rights
- **Terms of Service page** (`/terms`): Complete terms and conditions with usage guidelines
- **Cookie Policy page** (`/cookies`): Detailed cookie usage explanation and management instructions

### Pricing Model Update
- **Free for all**: Updated pricing page to make all services completely free
- **Feature accessibility**: All premium features (custom domains, advanced analytics, API access, etc.) now included in free plan
- **UI improvements**: Added prominent "All services are FREE" announcement banner
- **Simplified pricing**: All plans now show $0 pricing with full feature access

### Technical Improvements
- **Error handling**: Improved localStorage operations with try/catch blocks
- **SSR compatibility**: Added proper browser environment checks for client-side features
- **Performance**: Optimized compilation by removing Turbopack to avoid symlink issues
- **Type safety**: Maintained TypeScript compliance across all new features