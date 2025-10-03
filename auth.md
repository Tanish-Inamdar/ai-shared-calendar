# Authentication

This document describes the authentication functionality of the AI Calendar application.

## Supabase

The application uses Supabase for authentication. The Supabase client is initialized in `src/lib/supabaseClient.js`.

## Environment Variables

To connect to Supabase, you need to create a `.env` file in the root of the project and add the following environment variables:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Authentication Flow

The authentication flow is handled by the following components:

* `src/components/Auth.jsx`: This component provides a form for users to sign in or sign up.
* `src/pages/LoginPage.jsx`: This page displays the `Auth` component for logging in.
* `src/pages/SignUpPage.jsx`: This page displays the `Auth` component for signing up.

## Session Management

The user's session is managed by the `useSession` hook, which is defined in `src/hooks/useSession.jsx`. This hook provides a `session` object that can be used to determine if the user is logged in or not.

## Protected Routes

The `/calendar` route is protected. If the user is not logged in, they will be redirected to the `/login` page.

## Logout

The user can log out by clicking the "Logout" button in the navbar. This will call the `signOut` method of the Supabase client.
