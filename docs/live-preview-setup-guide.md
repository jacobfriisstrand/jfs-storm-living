## Setting Up API Token

### Creating the Token

1. Access Sanity Manage in one of two ways:
   - Click the menu in the top right of Sanity Studio and select "Manage project"
   - Run `npx sanity@latest manage` in your terminal

2. Navigate to the "API" tab
3. Create a new token with "Viewer" permissions

### Environment Configuration

Add the following to your `.env` file:

```env
NEXT_PUBLIC_SANITY_API_READ_TOKEN="your-new-token"
```

⚠️ **Important Security Notes:**

- The token must be kept secure as it provides access to all documents in your project
- The implementation should prevent the token from being included in your code bundle
