This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Google Analytics Integration

This project includes comprehensive Google Analytics 4 (GA4) tracking integrated throughout the website. All analytics data is viewable in your [Google Analytics dashboard](https://analytics.google.com/).

### Setup Instructions

1. Create a Google Analytics 4 property at [Google Analytics](https://analytics.google.com/)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Restart your development server

### What Gets Tracked

The analytics integration automatically tracks:

**Page Views:**
- Initial page load
- Client-side navigation (Next.js routing)
- Project detail pages

**User Interactions:**
- Button clicks (View Projects, What I Offer, etc.)
- Project card clicks
- Resume downloads
- Email and phone contact clicks
- Social media link clicks (GitHub, LinkedIn)
- Section views (About, Skills, Experience, Services, Projects)

**Event Categories:**
- `button` - All button interactions
- `external_link` - External link clicks
- `file` - File downloads (resume)
- `project` - Project views
- `section` - Section scrolls into view
- `contact` - Contact method clicks
- `social` - Social media clicks

### Viewing Analytics

All analytics data is available in your Google Analytics dashboard:
- Visit [Google Analytics](https://analytics.google.com/)
- Select your property
- View reports for:
  - Real-time visitors
  - User demographics and location
  - Traffic sources
  - Page views and navigation
  - Custom events (button clicks, downloads, etc.)
  - User engagement metrics

**Note:** Analytics only loads if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. If not provided, the component gracefully skips loading.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Important:** When deploying, make sure to add `NEXT_PUBLIC_GA_MEASUREMENT_ID` as an environment variable in your Vercel project settings.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
