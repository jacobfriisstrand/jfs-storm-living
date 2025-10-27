# Sanity and Next.js

This is a personal [Next.js](https://nextjs.org) boilerplate template bootstrapped with [Sanity.io](https://sanity.io).

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

1. Copy the `.env.example` file to create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

2. Fill in the required environment variables in your `.env` file:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
   ```

   You can find these values in your Sanity project settings.

## Getting Started

### Quick Setup

For a new project, run the setup script to configure everything automatically:

```bash
npm run setup:project
```

This script will:

- Prompt you for your Sanity Project ID and API Read Token
- Create a `.env` file with the correct configuration
- Set up a Vercel project (optional)
- Deploy environment variables to Vercel with proper dataset configuration
- Generate TypeScript types from Sanity schemas

### Manual Setup

If you prefer to set up manually:

1. Copy the `.env.example` file to create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

2. Fill in the required environment variables in your `.env` file:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_API_READ_TOKEN=your_sanity_api_read_token
   ```

   You can find these values in your Sanity project settings.

3. Run the development server:

   ```bash
   npm run dev
   ```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- Open [http://localhost:3000/admin](http://localhost:3000/admin) to edit content.

## Available Scripts

- `npm run setup:project` - Interactive setup script for new projects
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run typegen` - Generate TypeScript types from Sanity schemas
