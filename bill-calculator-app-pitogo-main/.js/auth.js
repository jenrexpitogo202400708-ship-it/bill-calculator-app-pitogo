// Authentication and page protection functions

// Helper: get current session
async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('getSession error', error);
        return null;
    }
    return data?.session ?? null;
}

// Require authentication and ensure user has completed profile
// Redirects to login if not signed in, or to form.html if profile missing
async function requireAuth(redirectTo = 'login.html') {
    const session = await getSession();
    if (!session || !session.user) {
        window.location.href = redirectTo;
        return null;
    }

    const user = session.user;
    // Check profile completion in 'profiles' table
    try {
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('requireAuth profile lookup error', error);
        }

        if (!profile) {
            // profile not found -> redirect to registration form
            window.location.href = 'form.html';
            return null;
        }
    } catch (err) {
        console.error('requireAuth error', err);
        window.location.href = redirectTo;
        return null;
    }

    return user;
}

// Initialize auth state listener to keep local storage in sync
function initAuthListener() {
    supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
            localStorage.setItem('logged_user', JSON.stringify({ id: session.user.id, email: session.user.email }));
        } else {
            localStorage.removeItem('logged_user');
        }
    });
}

// Redirect to dashboard if already logged in (used on login page)
async function redirectIfAuthenticated() {
    const session = await getSession();
    if (session && session.user) {
        // if profile exists, go to dashboard, else go to form
        const { data: profile } = await supabase.from('profiles').select('id').eq('id', session.user.id).single();
        if (profile) window.location.href = 'dashboard.html';
        else window.location.href = 'form.html';
    }
}

// Get current authenticated user's information
async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        console.error('getCurrentUser error', error);
        return null;
    }
    return user;
}

// Expose helpful functions globally (if needed by HTML)
window.requireAuth = requireAuth;
window.initAuthListener = initAuthListener;
window.redirectIfAuthenticated = redirectIfAuthenticated;
window.getCurrentUser = getCurrentUser;