// Supabase Configuration
// Using the Supabase project values provided by the user
const supabaseUrl = "https://nrdadjisfwvgjgyshdqc.supabase.co";
const supabaseKey = "sb_publishable_aJjF7aENUv9OvV9FsWCP3g_7ilD49tm";

// Create Supabase client (supabase is available globally from CDN)
const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// The site URL used for auth redirects. If running from a local static server,
// `window.location.origin` will be correct (e.g. http://localhost:5500).
// If the origin is missing (file://) we fallback to localhost for development.
let siteUrl = 'http://localhost:5500';
try {
	if (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null') {
		siteUrl = window.location.origin;
	}
} catch (e) {
	// ignore
}

// Expose for other scripts
window.supabaseClient = supabaseClient;
window.siteUrl = siteUrl;
