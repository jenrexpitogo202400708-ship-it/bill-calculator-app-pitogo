// DEBUGGING GUIDE - Login Issue Fix
// Open browser console (F12) and follow these steps:

// Step 1: Check if Supabase is loaded
console.log("Supabase loaded:", typeof supabase !== "undefined");
console.log("Supabase client:", typeof supabaseClient !== "undefined");

// Step 2: Check auth functions
console.log("Auth functions available:", {
  checkAuth: typeof checkAuth,
  getCurrentUser: typeof getCurrentUser,
  signOut: typeof signOut,
  requireAuth: typeof requireAuth
});

// Step 3: Manually test login (replace with real credentials)
async function testLogin() {
  console.log("Testing login...");
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: "your-email@gmail.com",
    password: "your-password"
  });
  
  if (error) {
    console.error("Login error:", error);
    return;
  }
  
  console.log("Login successful!", data.user);
  console.log("Redirecting to dashboard...");
  window.location.href = "dashboard.html";
}

// To run: testLogin()

// Step 4: Check current session
async function checkSession() {
  const session = await checkAuth();
  console.log("Current session:", session);
}

// To run: checkSession()
