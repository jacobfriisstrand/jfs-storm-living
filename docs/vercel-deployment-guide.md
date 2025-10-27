# Deploy to Vercel Guide

This guide provides step-by-step instructions for deploying your Sanity.io and Next.js application to Vercel.

## Prerequisites

- A completed Next.js application with Sanity.io integration
- A GitHub repository with your project
- A Vercel account (free tier available)

## Deployment Steps

### 1. Create a New Vercel Project

1. Visit [vercel.com/new](https://vercel.com/new)
2. Connect your GitHub account if you haven't already
3. Select your project repository
4. Set the **Framework Preset** to **Next.js**

### 2. Configure Environment Variables

1. Go to your Vercel project dashboard
2. Click on "Settings" in the top navigation
3. Select "Environment Variables" from the left sidebar
4. For `NEXT_PUBLIC_SANITY_DATASET`:
   - Click "Add New"
   - Enter `NEXT_PUBLIC_SANITY_DATASET` as the name
   - Enter `production` as the value
   - Under "Environment", select "Production"
   - Click "Save"
5. Add the development environment variable:
   - Click "Add New" again
   - Enter `NEXT_PUBLIC_SANITY_DATASET` as the name
   - Enter `development` as the value
   - Under "Environment", select "Preview"
   - Click "Save"
6. For `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Click "Add New" again
   - Enter `NEXT_PUBLIC_SANITY_PROJECT_ID` as the name
   - Enter your project ID as the value
   - Under "Environment", select all environments
   - Click "Save"
7. For `NEXT_PUBLIC_SANITY_API_READ_TOKEN`
   - Click "Add New" again
   - Enter `NEXT_PUBLIC_SANITY_API_READ_TOKEN` as the name
   - Enter your project ID as the value
   - Under "Environment", select all environments
   - Click "Save"

This setup ensures:

- Production deployments use the "production" dataset
- Preview deployments (from pull requests) use the "development" dataset
- Local development uses the "development" dataset (from your `.env`)

### 3. Deploy Your Application

1. Click **Deploy** in the Vercel dashboard
2. Monitor the build logs as your application:
   - Clones the repository
   - Installs dependencies
   - Builds the Next.js application
   - Deploys to Vercel's hosting

### 4. Post-Deployment Setup

#### Sanity Studio Access

- Visit `/admin` on your deployed site
- Add the deployment URL as a CORS origin when prompted
- This is required for client-side interactions with Sanity

#### Dataset Management

You can use different Sanity datasets for different environments:

1. Create a development dataset:

```bash
npx sanity@latest dataset create development
```

2. Export production data:

```bash
npx sanity@latest dataset export production
```

3. Import to development:

```bash
npx sanity@latest dataset import production.tar.gz development
```

4. Update your local `.env` file to use the development dataset:

```
SANITY_DATASET="development"
```

## Best Practices

- Use different datasets for development and production
- Keep environment variables secure
- Monitor build logs for any issues
- Test the deployed application thoroughly
- Set up preview deployments for pull requests

## Troubleshooting

Common issues and solutions:

- CORS errors: Ensure your deployment URL is added to Sanity's CORS origins
- Build failures: Check build logs for dependency or configuration issues
- Environment variables: Verify all required variables are set in Vercel

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Sanity CORS Documentation](https://www.sanity.io/docs/cors)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
