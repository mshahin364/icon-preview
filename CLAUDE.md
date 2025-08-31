# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React TypeScript application built with Vite that serves as an icon preview system. The application provides a comprehensive component library for displaying and previewing code samples across multiple formats (HTML, React JSX, CSS/SCSS, and custom VM templates).

## Development Commands

### Core Development
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run lint` - Run ESLint on all TypeScript/TSX files
- `npm run preview` - Preview production build locally

### TypeScript
- `tsc -b` - Build TypeScript project (part of build process)
- Use `tsc --noEmit` for type checking without building

## Architecture & Key Components

### Core Application Structure
- **Main Entry**: `src/main.tsx` - React 18 createRoot with StrictMode
- **App Component**: `src/App.tsx` - Main application layout using Reactstrap/Bootstrap
- **Styling**: SCSS-based with Bootstrap 5 integration via `src/styles/main.scss`

### Component System

#### CodePreview Component (`src/components/CodePreview.tsx`)
The centerpiece component providing multi-language code preview functionality:
- **Purpose**: Displays collapsible code examples with tabbed interface
- **Supported Languages**: HTML, React/JSX, CSS/SCSS, and custom VM templates
- **Features**: 
  - Collapsible preview sections
  - Tabbed navigation between code formats
  - Syntax highlighting via PrismJS
  - Copy-to-clipboard functionality
  - Dynamic tab ordering based on available content

#### Supporting Components
- **CodeHighlighter**: PrismJS wrapper with line numbers and copy-to-clipboard
- **Icon**: SVG icon component with sprite support
- **Header**: Reusable page header component
- **CopyToClipboard**: Clipboard functionality for code blocks
- **useTabToggle**: Custom hook for tab state management

### Technical Stack
- **Framework**: React 19.1.1 with TypeScript 5.8.3
- **Build Tool**: Vite 7.1.2 with React plugin
- **UI Framework**: Bootstrap 5.3.8 + Reactstrap 9.2.3
- **Styling**: SCSS with Bootstrap integration
- **Code Highlighting**: PrismJS with JSX support and line numbers plugin
- **Linting**: ESLint with TypeScript, React Hooks, and React Refresh rules

### Key Patterns & Conventions

#### Component Structure
- Functional components with TypeScript interfaces
- Props interfaces defined inline or as separate types
- Default exports for main components, named exports for utilities
- Bootstrap/Reactstrap components for UI consistency

#### State Management
- React hooks (useState, useEffect) for local state
- Custom hooks for reusable logic (useTabToggle)
- No external state management library

#### Styling Architecture
- SCSS with Bootstrap 5 as base
- CSS custom properties for theme variables
- Component-specific styles in main.scss
- Bootstrap utility classes preferred over custom CSS

#### Icon System
- SVG sprite-based icons via Icon component
- Configurable size, color, and accessibility features
- Support for title/desc elements for screen readers

### Code Quality Configuration
- **TypeScript**: Strict mode enabled with modern ES2022 target
- **ESLint**: Configured for TypeScript, React Hooks, and React Refresh
- **Build**: Type checking integrated into build process
- **Development**: Hot module replacement (HMR) enabled

### File Organization
```
src/
├── components/           # Reusable React components
│   ├── index.ts         # Component exports
│   └── *.tsx           # Individual components
├── styles/             # SCSS stylesheets
│   └── main.scss      # Main stylesheet with Bootstrap integration
├── assets/            # Static assets (images, etc.)
└── App.tsx            # Main application component
```

### Development Notes
- The application is designed as a component library/preview system
- Components are built to handle multiple content types simultaneously
- Dynamic tab rendering based on available content props
- Extensive use of Bootstrap grid system and components
- PrismJS integration requires specific imports for language support