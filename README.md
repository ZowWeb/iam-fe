# Identity and Access Management (IAM)

## Project Overview

- **Name:** `iam-fe` (Identity and Access Management Frontend)
- **Type:** Frontend Web Application
- **Domain:** The application is for managing Identity and Access Management (IAM). We have several entities which are Members (Users), Teams, Roles (PolicyTags at the backend), Service Accounts and Policies. Policies are grouped into Roles that are assigned to Principals (Members or Service Accounts).

## Technical Stack

- **Language:** TypeScript
- **Framework:** React
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Routing:** TanStack Router is used for client-side routing. The application uses a file-based routing setup (as indicated by `routeTree.gen.ts` and the `src/routes` directory structure). You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com)
- **Data Fetching & State Management:** TanStack Query is used for data fetching, caching, and server state management. This is evident from the `queries` and `mutations` directories.
- **UI Components:** The project uses the Mantine component library (`@mantine/core`) for its UI, along with some custom components in `src/components`.
- **Styling:** CSS-in-JS is used for styling, with Emotion (`@emotion/react`) and Linaria (`@linaria/core`).
- **Forms:** React Hook Form (`react-hook-form`) is used for form management, with Zod (`zod`) for schema validation.
- **Code Quality:**
    - **Linting:** ESLint
    - **Formatting:** Prettier
    - **Git Hooks:** Husky and `lint-staged` are used to enforce code quality standards before commits.
- **Testing:** The project is set up for testing with Vitest and React Testing Library.

## Project Structure

- **`src/`**: The main application source code.
    - **`components/`**: Reusable React components.
    - **`constants/`**: Application-wide constants.
    - **`hooks/`**: Custom React hooks, many of which are related to data fetching using TanStack Query.
    - **`mutations/`**: Functions for creating, updating, and deleting data on the server.
    - **`pages/`**: Components that represent application pages or views.
    - **`queries/`**: Functions for fetching data from the server.
    - **`routes/`**: Route definitions for TanStack Router.
    - **`styles/`**: Global styles and theme configuration.
    - **`types/`**: TypeScript type definitions.
    - **`utils/`**: Utility functions.
- **`public/`**: Static assets.
- **`package.json`**: Project dependencies and scripts.
- **`vite.config.js`**: Vite build configuration.
- **`tsconfig.json`**: TypeScript configuration.

## Getting Started

To run this application:

```bash
pnpm install
pnpm start  
```

## Building For Production

To build this application for production:

```bash
pnpm build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
pnpm test
```

