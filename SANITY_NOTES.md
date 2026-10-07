# Sanity & React Troubleshooting Guide

This document serves as a record of the key challenges faced during the development of this Sanity + React storefront, and exactly how they were resolved. 

## 1. CORS & Missing Data on Live Frontend (Netlify)
**The Problem:** Data (like hero images and products) showed up perfectly on `localhost`, but completely disappeared when the site was deployed to Netlify.
**The Root Cause:** 
1. The `.env` file containing the Sanity Project ID was correctly created locally but wasn't pushed to GitHub (for security).
2. Sanity's API blocks requests from unknown domains by default.
**The Solution:**
- Logged into the Netlify Dashboard → Site Settings → Environment Variables and manually added `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`.
- Ran `npx sanity cors add https://your-netlify-url.netlify.app` in the terminal to whitelist the live Netlify domain in Sanity's security settings.

## 2. Studio "Read-Only" Lock (The History Panel Bug)
**The Problem:** Fields in the Sanity Studio (like the HomePage singleton) were locked as "Read-only," preventing image uploads or text edits.
**The Root Cause:** The user was stuck in the **"Review Changes" (History) panel**. When this panel is open, Sanity locks the document so you don't accidentally edit historical data. Furthermore, because test documents were deleted, the Studio crashed trying to load missing history.
**The Solution:**
- Instructed the user to completely close the "Review changes" panel by clicking the 'X', or by stripping the `?rev=...` URL parameter from the browser's address bar to force the Studio back to the present, editable state.
- In severe corruption cases, we fully wiped the document via `npx sanity documents delete <id>` and recreated a fresh instance using a JSON file via `npx sanity documents create init.json`.

## 3. React 19 & Sanity Plugin Incompatibility
**The Problem:** Running `npm install` failed with peer dependency conflicts (specifically regarding `@sanity/color-input` and React 19).
**The Root Cause:** Older versions of Sanity plugins were built for React 18, but the project was upgraded to React 19.
**The Solution:**
- Updated the package to the newest version: `npm install @sanity/color-input@6`.
- Bypassed overly strict NPM checks by creating an `.npmrc` file with `legacy-peer-deps=true` to force successful installations.

## 4. Overly Strict Schema Validation Blocking Publishing
**The Problem:** Could not save or publish the HomePage because it threw validation errors immediately on creation.
**The Root Cause:** The `featuredCategories` schema was enforcing a strict rule: `validation: (Rule) => Rule.min(2)`.
**The Solution:**
- Removed `Rule.min(2)` from `src/sanity/schemaTypes/singletons/homePage.ts`.
- **Best Practice:** Avoid strict minimum validations on arrays in early development to prevent "locking out" content editors who are still setting up their initial data.

## 5. Deleting Corrupted Linked Documents
**The Problem:** Unable to delete testing categories because they were linked/referenced by other documents.
**The Solution:**
- Used the Sanity CLI to forcefully delete documents when the Studio UI prevented it.
- Command used: `npx sanity documents delete <document-id>`

---

## Best Practices Established:
1. **Always Restart Vite**: Whenever you change `.env` files locally, the React dev server must be stopped and restarted (`npm run dev`) or it will ignore the changes.
2. **Singleton Setup**: Singletons (like a global HomePage or Settings) require an initial document to be seeded into the database before they become fully editable.
3. **Environment Security**: Never commit `.env` files to Git. Always use the deployment host's (Netlify/Vercel) GUI to securely inject them.
4. **CORS Management**: Any new domain, staging site, or branch preview link MUST be explicitly authorized via `npx sanity cors add <url>` or data will quietly fail to load.
