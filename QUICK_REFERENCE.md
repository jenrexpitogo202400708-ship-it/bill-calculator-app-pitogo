# ⚡ Electric Bill Calculator - Quick Reference

## 🚀 Quick Setup (5 Minutes)

### 1. Create Database (2 min)
- Go to https://supabase.com/dashboard
- SQL Editor → New Query
- Copy `schema.sql` content
- Click Run

### 2. Enable Email (1 min)
- Authentication → Providers
- Enable Email provider
- Save

### 3. Test App (2 min)
- Open `index.html`
- Register new account
- Login
- Try calculator

✅ Done! Your app is ready!

---

## 📱 Website Pages

### Public Pages (No Login)
| Page | URL | Purpose |
|------|-----|---------|
| Home | `index.html` | Landing page |
| Login | `login.html` | User login |
| Register | `register.html` | New user signup |
| Welcome | `welcome.html` | Info page |
| Confirmed | `auth-confirmed.html` | Email verification |

### Protected Pages (Login Required)
| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `user_dashboard.html` | Main dashboard |
| Alt Dashboard | `dashboard.html` | Alternative dashboard |
| Calculator | `form.html` | Calculate bills |
| History | `history.html` | View past calculations |
| Report | `report.html` | Detailed reports |
| Profile | `profile.html` | User profile |
| Menu | `menu.html` | Navigation menu |

---

## 🔑 Login Credentials

```
Supabase Project: zoybffgiylntzxclbtmz
URL: https://zoybffgiylntzxclbtmz.supabase.co
API Key: sb_publishable_rOa4EItHH7JYkoJpBvXIXA_e93WGmrO
```

All configured in `js/supabase-config.js` ✅

---

## 📋 Database Table

**Table Name**: `calculations`

| Column | Type | Notes |
|--------|------|-------|
| id | BIGSERIAL | Primary key, auto-increment |
| user_id | UUID | User reference |
| month | TEXT | Month/period name |
| power_consumption | NUMERIC | kWh consumed |
| cost_per_kwh | NUMERIC | Cost per unit |
| result | NUMERIC | Total bill |
| created_at | TIMESTAMP | Creation date |

---

## 💻 Key JavaScript Code

### Check if User is Logged In
```javascript
const user = await getCurrentUser();
if (user) {
    console.log("User:", user.email);
} else {
    console.log("Not logged in");
}
```

### Get All User's Calculations
```javascript
const { data } = await supabaseClient
    .from("calculations")
    .select("*")
    .eq("user_id", user.id);
```

### Save a Calculation
```javascript
const { data } = await supabaseClient
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

### Delete a Calculation
```javascript
await supabaseClient
    .from("calculations")
    .delete()
    .eq("id", 123);
```

---

## 🔒 Security Checklist

- ✅ Row Level Security (RLS) enabled
- ✅ Users can only see their own data
- ✅ Page protection on all protected pages
- ✅ API key is public/safe
- ✅ Password validation on registration
- ✅ Session-based authentication

---

## 🐛 Troubleshooting

### App Won't Load
```
- Check browser console (F12)
- Verify index.html opens
- Check Supabase URL is correct
```

### Can't Login
```
- Verify you registered first
- Check email/password are correct
- Check Email provider is enabled
- Check browser console for errors
```

### Calculations Don't Save
```
- Check you're logged in
- Verify calculations table exists
- Check browser console for errors
- Check Supabase RLS policies
```

### Page Redirects to Login
```
- This is expected for protected pages
- You must be logged in to access them
- Go to login.html first
```

---

## 📚 File Locations

```
js/
├── supabase-config.js (Supabase setup)
└── auth.js (Auth functions)

*.html files (All web pages)
style.css (All styling)
schema.sql (Database schema)
SETUP_GUIDE.md (Detailed guide)
IMPLEMENTATION_SUMMARY.md (Full summary)
```

---

## 🎨 Customization

### Change Colors
Edit `:root` in `style.css`:
```css
--primary-color: #3498db;      /* Blue */
--secondary-color: #2ecc71;    /* Green */
--danger-color: #e74c3c;       /* Red */
```

### Add More Features
1. Create new HTML page
2. Add authentication check:
   ```javascript
   document.addEventListener("DOMContentLoaded", async () => {
       await initAuth();
   });
   ```
3. Use Supabase client to read/write data

### Change Database Fields
1. Edit `schema.sql`
2. Add your new columns
3. Run in SQL editor
4. Update JavaScript code to use new fields

---

## 🌐 Deployment

### GitHub Pages
```bash
git push to GitHub
Enable Pages in settings
Live at: https://username.github.io/repo
```

### Vercel
```bash
Connect GitHub to Vercel
Push to GitHub
Auto-deploys automatically
```

### Local Testing
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Open: http://localhost:8000
```

---

## 🧪 Test Scenarios

### Scenario 1: New User Journey
1. Open `index.html`
2. Click Register
3. Fill form and register
4. Login with credentials
5. Go to Calculator
6. Calculate a bill
7. Check History
8. View Report
9. Update Profile
10. Logout

### Scenario 2: Returning User
1. Open `login.html`
2. Login with existing email/password
3. Dashboard loads
4. Access calculator and history
5. All previous calculations visible

### Scenario 3: Security Test
1. Logout
2. Try accessing `form.html` directly
3. Should redirect to `login.html` ✅

---

## 📞 Support Resources

| Topic | Link |
|-------|------|
| Supabase Help | https://supabase.com/docs |
| JavaScript | https://mdn.web.docs |
| CSS | https://css-tricks.com |
| HTML | https://html.spec.whatwg.org |

---

## ✅ Checklist Before Launch

- [ ] Database table created (schema.sql run)
- [ ] Email provider enabled
- [ ] Tested registration
- [ ] Tested login
- [ ] Tested calculator
- [ ] Tested history view
- [ ] Tested profile update
- [ ] Tested page protection
- [ ] Tested logout
- [ ] Responsive design checked
- [ ] All links work
- [ ] No console errors
- [ ] Ready to deploy!

---

## 📊 API Endpoints (via Supabase)

```
POST /auth/v1/signup
POST /auth/v1/token?grant_type=password
POST /auth/v1/logout
GET /auth/v1/user

POST /rest/v1/calculations
GET /rest/v1/calculations
DELETE /rest/v1/calculations
```

*(All automatic via Supabase JS client)*

---

## 🚀 Performance Tips

1. **Caching**: Browser caches CSS and JS
2. **Database Queries**: Filtered by user_id (indexed)
3. **Lazy Loading**: Load data only when needed
4. **Compression**: GZIP enabled on most hosts

---

**Last Updated**: December 11, 2024
**Version**: 1.0
**Status**: ✅ Production Ready
