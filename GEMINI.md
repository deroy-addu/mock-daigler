# Project: Brainwave

## Overview

`Brainwave` is a modern web application built using **Next.js 16** and **React 19**. It leverages the Next.js **App Router** architecture for its routing and layout system.

### Main Technologies

- **Framework:** [Next.js](https://nextjs.org/) (v16.2.2)
- **Library:** [React](https://react.dev/) (v19.2.4)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Linting:** [ESLint](https://eslint.org/)

## Getting Started

### Development

To start the development server with hot-reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

### Running in Production

To start the production server after building:

```bash
npm run start
```

### Linting

To check for code quality and style issues:

```bash
npm run lint
```

## Architecture & Conventions

### Directory Structure

- `app/`: Contains the application routes, layouts, and components (App Router).
  - `layout.tsx`: The root layout shared across the application.
  - `page.tsx`: The main entry point for the home route.
  - `globals.css`: Global styles, including Tailwind CSS imports.
- `public/`: Static assets like images and fonts.
- `next.config.ts`: Next.js configuration.
- `tsconfig.json`: TypeScript configuration.
- `eslint.config.mjs`: ESLint configuration.

### Coding Standards

- **TypeScript:** Use TypeScript for all new components and logic to ensure type safety.
- **Styling:** Prefer Tailwind CSS utility classes for styling. The project is configured with Tailwind v4.
- **Components:** Use functional components with React Hooks.
- **Fonts:** Uses `next/font` for optimized loading of the Geist and Geist Mono fonts.

### Layout & UI

- The root layout (`app/layout.tsx`) sets up a full-height, flexbox-based layout with antialiasing enabled.
- Global styles are defined in `app/globals.css`.
