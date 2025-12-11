# Electric Bill Calculator - Supabase Setup Guide

## 📋 Project Overview

This is a full-stack Electric Bill Calculator web application built with HTML, CSS, JavaScript, and Supabase for backend services. The application allows users to:

- Register and login with email/password
- Calculate electricity bills based on consumption and cost per kWh
- Save and view calculation history
- Track usage statistics
- Manage user profiles

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Supabase account (free at https://supabase.com)

### Your Project Details
- **Supabase URL**: https://zoybffgiylntzxclbtmz.supabase.co
- **Publishable Key**: sb_publishable_rOa4EItHH7JYkoJpBvXIXA_e93WGmrO

### Step 1: Create the Database Table

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** → Click **New Query**
4. Copy the SQL code from `schema.sql` file
5. Click **Run** to execute the SQL

This will create:
- `calculations` table with all required columns
- Indexes for better performance
- Row Level Security (RLS) policies

### Step 2: Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** provider is **ENABLED**
3. Configure email settings if needed (optional)

### Step 3: Test the Application

1. Open `index.html` in your web browser
2. Click **Register** to create a new account
3. Enter your details and register
4. Login with your credentials
5. Start calculating!

## 📁 Project Structure

```
bill-calculator-app-pitogo/
├── index.html                 # Homepage
├── login.html                 # Login page
├── register.html              # Registration page
├── user_dashboard.html        # User dashboard (protected)
├── form.html                  # Calculator page (protected)
├── history.html               # Calculation history (protected)
├── profile.html               # User profile (protected)
├── dashboard.html             # Alternative dashboard (protected)
├── menu.html                  # Menu page (protected)
├── welcome.html               # Welcome page
├── report.html                # Usage report (protected)
├── style.css                  # Global styling
├── schema.sql                 # Database schema
└── js/
    ├── supabase-config.js    # Supabase configuration
    └── auth.js               # Authentication helper functions
```

## 🔑 Key Features

### Authentication
- User registration with email/password
- Email verification (optional, configurable in Supabase)
- Secure login/logout
- Session management
- Profile update functionality

### Database Operations
- Save electricity bill calculations
- Retrieve user's calculation history
- Delete calculations
- Calculate statistics (average, highest, lowest bills)

### Page Protection
- Protected pages automatically redirect to login if user is not authenticated
- Public pages: `index.html`, `login.html`, `register.html`, `welcome.html`
- Protected pages: `user_dashboard.html`, `form.html`, `history.html`, `profile.html`, `dashboard.html`, `menu.html`, `report.html`

## 🛡️ Security Features

### Row Level Security (RLS)
- Users can only access their own calculations
- Database policies automatically enforce access control
- RLS is configured in `schema.sql`

### Safe API Key
- Using public/anon key (safe for client-side code)
- Private operations protected by RLS policies
- No sensitive data exposed in client code

## 📊 Database Schema

### calculations table
- `id`: BIGSERIAL PRIMARY KEY
- `user_id`: UUID (links to auth.users)
- `month`: TEXT (Month/Period name)
- `power_consumption`: NUMERIC (kWh consumed)
- `cost_per_kwh`: NUMERIC (Cost per unit)
- `result`: NUMERIC (Calculated total bill)
- `created_at`: TIMESTAMP (Creation date)

## 🔧 Configuration

The Supabase configuration is in `js/supabase-config.js`:

```javascript
const supabaseUrl = "https://zoybffgiylntzxclbtmz.supabase.co";
const supabaseKey = "sb_publishable_rOa4EItHH7JYkoJpBvXIXA_e93WGmrO";
```

This file is already configured with your project details. No changes needed!

## 🧪 Testing Checklist

### 1. Registration
- [ ] Open register.html
- [ ] Fill in all fields
- [ ] Verify passwords match
- [ ] Click Register
- [ ] Should redirect to login

### 2. Login
- [ ] Open login.html
- [ ] Enter registered email and password
- [ ] Click Login
- [ ] Should redirect to user_dashboard.html

### 3. Page Protection
- [ ] Try accessing protected pages without logging in
- [ ] Should automatically redirect to login.html

### 4. Calculator
- [ ] Go to form.html
- [ ] Fill in Month, Power Consumption, Cost per kWh
- [ ] Click Calculate
- [ ] Result should display
- [ ] Data should be saved to database

### 5. History
- [ ] Go to history.html
- [ ] Should display all your calculations
- [ ] Try sorting and filtering
- [ ] Try deleting a calculation

### 6. Profile
- [ ] Go to profile.html
- [ ] View your account information
- [ ] Update full name
- [ ] Changes should be saved

### 7. Logout
- [ ] Click Logout
- [ ] Should redirect to login.html
- [ ] Trying to access protected pages should redirect to login

## 🐛 Troubleshooting

### "Auth Error" or "Failed to load user"
- Check browser console (F12 → Console tab)
- Verify Supabase URL and key in `js/supabase-config.js`
- Check if Email provider is enabled in Supabase dashboard

### Calculations don't save
- Check browser console for error messages
- Verify `calculations` table exists in Supabase
- Check if RLS policies are set up correctly
- Ensure you're logged in (check session)

### Can't login after registering
- Check if email verification is required (Supabase settings)
- Verify email confirmation link if sent
- Try registering with a different email
- Check browser console for detailed error messages

### 500 errors
- Clear browser cache and reload
- Check Supabase dashboard for service status
- Verify API key is correct
- Check RLS policies are not blocking operations

## 🚀 Deployment

To deploy this application:

### Option 1: Static Hosting (GitHub Pages, Vercel, Netlify)
1. Push files to GitHub
2. Enable GitHub Pages or connect to Vercel/Netlify
3. Your app will be live!

### Option 2: Local Server
```bash
# Python 3
python -m http.server 8000

# Or Node.js
npx http-server
```

Then open http://localhost:8000

## 📚 API Reference

### Authentication Functions

#### `checkAuth()`
Checks if user has an active session.
```javascript
const session = await checkAuth();
```

#### `getCurrentUser()`
Gets current logged-in user's information.
```javascript
const user = await getCurrentUser();
```

#### `signOut()`
Logs out the current user.
```javascript
const success = await signOut();
```

### Database Operations

#### Insert calculation
```javascript
const { data, error } = await supabaseClient
    .from("calculations")
    .insert([{
        user_id: user.id,
        month: "January 2024",
        power_consumption: 100,
        cost_per_kwh: 10.50,
        result: 1050
    }])
    .select();
```

#### Fetch calculations
```javascript
const { data, error } = await supabaseClient
    .from("calculations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
```

#### Delete calculation
```javascript
const { error } = await supabaseClient
    .from("calculations")
    .delete()
    .eq("id", 123);
```

## 📞 Support

For issues with:
- **Supabase**: Visit https://supabase.com/docs
- **JavaScript**: Visit https://developer.mozilla.org
- **Web Development**: Visit https://MDN Web Docs

## 📄 License

This project is open source and free to use.

## 🎯 Features Implemented

✅ User authentication (register, login, logout)
✅ Page protection (redirect unauthorized users)
✅ Calculate electricity bills
✅ Save calculations to database
✅ View calculation history
✅ Delete calculations
✅ User profile management
✅ Statistics and analytics
✅ Responsive design (mobile-friendly)
✅ Error handling and validation
✅ RLS security policies

## 🎨 Design Features

- Modern, clean UI with gradient effects
- Responsive design for mobile and desktop
- Smooth animations and transitions
- User-friendly forms and tables
- Professional color scheme
- Accessible navigation

## 🔐 Security Best Practices

1. **Always verify user sessions** before operations
2. **Validate user input** on client and server side
3. **Use RLS policies** for data protection
4. **Never expose private keys** in frontend code
5. **HTTPS only** in production
6. **Regular security audits** recommended

---

**Last Updated**: December 11, 2024
**Status**: ✅ Fully Functional
