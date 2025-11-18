# Sanity and Next.js Monorepo

This is a monorepo containing multiple [Next.js](https://nextjs.org) projects bootstrapped with [Sanity.io](https://sanity.io). Each app has its own Sanity studio, dataset, and Vercel deployment.

## Monorepo Structure

```
.
├── apps/
│   ├── qi-gong/          # Qi Gong project
│   └── psykoterapi/      # Psykoterapi project
├── package.json          # Root workspace configuration
└── ...
```

Each app is independent with its own:

- Sanity project ID and dataset
- Environment variables
- Source code and configuration
- Vercel deployment

## Development Workflow

This project follows an opinionated workflow to maintain code quality and consistency:

### Code Style

- Uses [@antfu/eslint-config](https://github.com/antfu/eslint-config) for strict code formatting and linting
- Enforces kebab-case for filenames (except README.md)
- Uses double quotes and semicolons
- TypeScript-first approach with strict type checking
- Automatic import sorting and organization

### Git Workflow

- Pre-commit hooks with Husky for linting
- Pull requests are automatically linted via GitHub Actions

### Development Practices

- Uses Turbopack for faster development builds
- Automatic TypeScript type generation for Sanity schemas
- Live preview support for Sanity content

### Page Builder Component Previews

You can add custom image previews (screenshots) for each component in the page builder:

1. Add a screenshot of the component (from Figma) to the public folder
2. Use the following specifications:
   - Dimensions: 600x400px (maintain consistent sizing)
   - Format: PNG with transparent background
   - Naming: Match schema type names (e.g., hero.png, splitImage.png)
3. Reference the images in your page builder options:

```
options: {
  insertMenu: {
    views: [
      {
        name: "grid",
        previewImageUrl: schemaType => `/block-previews/${schemaType}.png`,
      },
    ],
  },
}
```

## Environment Variables

Each app requires its own `.env` file with app-specific configuration.

### Setting Up Environment Variables

1. Navigate to the app directory (e.g., `apps/qi-gong/` or `apps/psykoterapi/`)

2. Create a `.env` file with the following variables:

   ```bash
   # Site Configuration
   NEXT_PUBLIC_SITE_NAME=qi-gong  # or 'psykoterapi' for the other app

   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=development

   # Optional: Sanity API Version (defaults to 2025-03-26)
   # SANITY_API_VERSION=2025-03-26
   ```

   **Important**: Each app must have a different `NEXT_PUBLIC_SANITY_PROJECT_ID` and its own datasets.

   You can find these values in your Sanity project settings.

## Getting Started

### Initial Setup

1. Install dependencies (shared across all apps):

   ```bash
   npm install
   ```

2. Set up environment variables for each app:
   - Create `.env` files in `apps/qi-gong/` and `apps/psykoterapi/`
   - See [Environment Variables](#environment-variables) section above

3. Copy Sanity dataset (optional, for initial data):

   To copy the development dataset from qi-gong to psykoterapi:

   ```bash
   # From the qi-gong app directory
   cd apps/qi-gong
   sanity dataset export development --output=./dataset-export.tar.gz

   # From the psykoterapi app directory
   cd ../psykoterapi
   sanity dataset import ./dataset-export.tar.gz development
   ```

### Running Apps

Each app can be run independently:

**Qi Gong:**

```bash
npm run dev:qi-gong
```

**Psykoterapi:**

```bash
npm run dev:psykoterapi
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- Open [http://localhost:3000/admin](http://localhost:3000/admin) to edit content in Sanity Studio.

### Quick Setup Script

For a new app, you can use the setup script from within the app directory:

```bash
cd apps/qi-gong  # or apps/psykoterapi
npm run setup:project
```

This script will:

- Prompt you for your Sanity Project ID and API Read Token
- Create a `.env` file with the correct configuration
- Set up a Vercel project (optional)
- Deploy environment variables to Vercel with proper dataset configuration
- Generate TypeScript types from Sanity schemas

## Available Scripts

### Root Level Scripts (Workspace Commands)

**Development:**

- `npm run dev:qi-gong` - Start qi-gong development server
- `npm run dev:psykoterapi` - Start psykoterapi development server

**Build:**

- `npm run build:qi-gong` - Build qi-gong for production
- `npm run build:psykoterapi` - Build psykoterapi for production

**Start:**

- `npm run start:qi-gong` - Start qi-gong production server
- `npm run start:psykoterapi` - Start psykoterapi production server

**Type Generation:**

- `npm run typegen:qi-gong` - Generate TypeScript types for qi-gong
- `npm run typegen:psykoterapi` - Generate TypeScript types for psykoterapi

**Code Generation:**

- `npm run create:pagetype:qi-gong` - Create new page type in qi-gong
- `npm run create:pagetype:psykoterapi` - Create new page type in psykoterapi
- `npm run create:module:qi-gong` - Create new module in qi-gong
- `npm run create:module:psykoterapi` - Create new module in psykoterapi

**Linting:**

- `npm run lint` - Run ESLint on all apps
- `npm run lint:fix` - Fix ESLint issues automatically

### App-Level Scripts

You can also run scripts directly from within an app directory:

```bash
cd apps/qi-gong  # or apps/psykoterapi
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run typegen  # Generate TypeScript types
npm run setup:project  # Interactive setup script
```

## Vercel Deployment

Each app should be deployed as a separate Vercel project:

1. Connect each app directory (`apps/qi-gong/` and `apps/psykoterapi/`) as separate Vercel projects
2. Set environment variables in each Vercel project:
   - `NEXT_PUBLIC_SITE_NAME` (qi-gong or psykoterapi)
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` (app-specific)
   - `NEXT_PUBLIC_SANITY_DATASET` (development or production)
3. Configure the root directory in Vercel to point to the respective app directory
