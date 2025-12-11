Resend Confirmation - Edge Function

Purpose
This function provides a server-side endpoint to trigger resending a confirmation (signup) link to a user. It must be deployed to a serverless platform (Supabase Edge Functions, Netlify Functions, Vercel Serverless) and requires a Supabase `service_role` key.

Deploying to Supabase Edge Functions (recommended)
1. Install the Supabase CLI and log in:
   - https://supabase.com/docs/guides/cli

2. From your project root, copy this folder into `functions/resend_confirmation`.

3. Deploy the function:
   supabase functions deploy resend_confirmation

4. Set secrets (service role key and url):
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<service_role_key>" SUPABASE_URL="https://your-project.supabase.co"

5. Invoke the function from your frontend by POSTing to the function URL with JSON { "email": "user@example.com" }.

Security
- The function must run server-side and must never expose the service_role key to clients.
- Only call this endpoint from trusted clients or protect it with additional checks (rate-limit / captcha).

Notes
- The example implementation attempts to use `supabaseAdmin.auth.admin.generateLink()`; SDK versions differ. If generateLink() is unavailable, you may need to call the Supabase Admin REST endpoints directly, following the Supabase docs.
- This template may require small edits depending on the runtime (Node.js, Deno) and hosting platform.
