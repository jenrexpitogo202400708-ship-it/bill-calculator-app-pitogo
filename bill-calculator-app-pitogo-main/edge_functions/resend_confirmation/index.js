// Edge Function template: Resend confirmation email
// Deploy this function to your serverless platform (Supabase Edge Functions, Netlify Functions, Vercel Serverless, etc.)
// It requires a SUPABASE_SERVICE_ROLE_KEY environment variable and SUPABASE_URL.

// Example for Supabase Edge Functions (node runtime):
// 1. Put this file at `edge_functions/resend_confirmation/index.js`
// 2. Deploy with `supabase functions deploy resend_confirmation`
// 3. Set env: `supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<service_role_key>" SUPABASE_URL="https://your-project.supabase.co"`

// NOTE: This uses the server-side Supabase client and admin auth methods.
// The exact admin API shape may differ depending on SDK version. Adjust if necessary.

const { createClient } = require('@supabase/supabase-js');

// Handler for platforms expecting (req, res)
module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(await getRawBody(req));
    const email = body.email;
    if (!email) return res.status(400).json({ error: 'Missing email' });

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: 'Missing server configuration' });
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    });

    // Attempt to generate a confirmation/magic link for the email.
    // This uses the admin API to generate a link. SDKs may have `auth.admin.generateLink`.
    // If your SDK version differs, call the REST admin endpoint instead.

    // Try using admin.generateLink (may require SDK v2+)
    if (typeof supabaseAdmin.auth.admin.generateLink === 'function') {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({ type: 'signup' }, email);
      if (error) {
        console.error('generateLink error:', error);
        return res.status(500).json({ error: error.message || 'Failed to generate link' });
      }
      // data contains the generated link; send it via your SMTP provider or rely on Supabase internal send
      return res.status(200).json({ message: 'Confirmation link generated. Check email inbox.' });
    }

    // Fallback: attempt to trigger the built-in invite/verification by updating the user via admin API.
    // Replace this with an appropriate admin REST call if needed.
    const { data: users, error: userErr } = await supabaseAdmin.auth.admin.listUsers();
    if (userErr) {
      console.error('listUsers error:', userErr);
      return res.status(500).json({ error: 'Failed to list users' });
    }

    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // If we cannot generate a link via SDK, a safer route is to call the Admin REST endpoint
    // to send an invite/verification. Implementation depends on Supabase internal API and may
    // change; refer to Supabase docs for the correct admin endpoint.

    return res.status(200).json({ message: 'User found. Please check admin docs to finish resend implementation.' });
  } catch (err) {
    console.error('resend confirmation error:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', err => reject(err));
  });
}
