// Authentication and page protection functions

// Check if user is authenticated, redirect to provided login page (default: login.html)
// usage: await requireAuth() or await requireAuth('login.html')
async function requireAuth(redirectTo = 'login.html') {
    const session = await checkAuth();
    if (!session) {
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// Check authentication on page load for protected pages
async function initAuth() {
    const session = await checkAuth();
    if (!session) {
        window.location.href = "login.html";
    }
    return session;
}

// Redirect to dashboard if already logged in (for login/register pages)
async function redirectIfAuthenticated() {
    const session = await checkAuth();
    if (session) {
        window.location.href = "dashboard.html";
    }
}

// Supabase Configuration is in js/supabase_config.js

// Authentication helper functions
async function checkAuth() {
    const {
        data: { session },
        error,
    } = await supabaseClient.auth.getSession();
    if (error) {
        console.error("Error checking auth:", error);
        return null;
    }
    return session;
}

async function getCurrentUser() {
    const {
        data: { user },
        error,
    } = await supabaseClient.auth.getUser();
    if (error) {
        console.error("Error getting user:", error);
        return null;
    }
    return user;
}

async function signOut() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        console.error("Error signing out:", error);
        return false;
    }
    return true;
}

// Expose functions globally for pages
window.checkAuth = checkAuth;
window.getCurrentUser = getCurrentUser;
window.signOut = signOut;
window.requireAuth = requireAuth;
window.initAuth = initAuth;
window.redirectIfAuthenticated = redirectIfAuthenticated;
