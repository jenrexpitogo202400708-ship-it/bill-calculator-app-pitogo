// Authentication and page protection functions

// Check if user is authenticated, redirect to login if not
async function requireAuth() {
    const session = await checkAuth();
    if (!session) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// Check authentication on page load for protected pages
async function initAuth() {
    const session = await checkAuth();
    if (!session) {
        window.location.href = "login.html";
        return;
    }
    
    // Check if email is confirmed
    const { data: { user }, error } = await supabaseClient.auth.getUser();
    
    if (user && !user.email_confirmed_at) {
        // Email not confirmed - redirect to confirmation page
        alert("Your email has not been confirmed yet. Please check your email and click the confirmation link.");
        await supabaseClient.auth.signOut();
        window.location.href = "login.html";
        return;
    }
    
    return session;
}

// Redirect to dashboard if already logged in (for login/register pages)
async function redirectIfAuthenticated() {
    const session = await checkAuth();
    if (session) {
        // Check if email is confirmed
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        
        if (user && user.email_confirmed_at) {
            window.location.href = "user_dashboard.html";
        }
    }
}
