# 🚀 Quick EmailJS Setup - 5 Minutes

Your contact form is ready but needs EmailJS credentials to send emails.

## Current Issue
❌ Your `.env` file has placeholder values:
```
VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
```

## Quick Fix (5 Steps)

### Step 1: Sign Up for EmailJS (1 min)
1. Go to https://www.emailjs.com/
2. Click **Sign Up** (It's FREE - 200 emails/month)
3. Verify your email

### Step 2: Connect Gmail (1 min)
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account** and authorize
5. **📋 COPY the Service ID** (looks like `service_abc1234`)

### Step 3: Create Contact Template (2 min)
1. Go to **Email Templates** tab
2. Click **Create New Template**
3. Set **Template Name**: `Contact Form`
4. Paste this content:

```
Subject: 🚀 New Project Inquiry from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Service: {{service_type}}
Budget: {{budget_range}}

Project Details:
{{message}}
```

5. Set **To Email** to your email (where you want to receive inquiries)
6. Set **From Name** to: `{{from_name}}`
7. Set **Reply To** to: `{{from_email}}`
8. Click **Save**
9. **📋 COPY the Template ID** (looks like `template_xyz5678`)

### Step 4: Get Public Key (30 sec)
1. Go to **Account** tab in EmailJS
2. Find **Public Key** section
3. **📋 COPY your Public Key** (looks like `user_abc123xyz456`)

### Step 5: Update .env File (30 sec)
Open your `.env` file and replace with YOUR values:

```env
# Replace these with YOUR actual values from EmailJS
VITE_EMAILJS_SERVICE_ID=service_abc1234           # From Step 2
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_xyz5678 # From Step 3
VITE_EMAILJS_PUBLIC_KEY=user_abc123xyz456         # From Step 4
```

**⚠️ IMPORTANT: Restart your dev server after saving .env!**

```bash
# Press Ctrl+C to stop server
# Then restart:
npm run dev
```

---

## Test It!

1. Go to http://localhost:5173/#contact
2. Fill out the form
3. Click "Submit Request"
4. Check your email inbox! 📧

---

## Still Not Working?

### Check Browser Console
Press **F12** → **Console** tab → Look for errors

### Common Issues:

**"Email service not configured"**
- ✅ Make sure Service ID starts with `service_`
- ✅ Restart dev server after changing .env

**"Invalid public key"**
- ✅ Public key should start with `user_`
- ✅ No extra spaces when copying

**"Template not found"**
- ✅ Template ID should start with `template_`
- ✅ Check it's saved in EmailJS dashboard

### Need More Help?
See detailed guide: `EMAILJS_SETUP.md`

---

## What Each Credential Does

| Credential | What It Is | Example |
|------------|-----------|---------|
| Service ID | Your Gmail connection | `service_9k2j4n5` |
| Template ID | Email format/template | `template_contact123` |
| Public Key | Your account key | `user_xYz789AbC123` |

---

## Free Plan Limits
✅ 200 emails/month (plenty for testing)  
✅ 1 email service (Gmail is enough)  
✅ 2 email templates (contact + career)  

Upgrade later if you need more!

---

**Setup Time:** 5 minutes  
**Cost:** FREE  
**Emails Per Month:** 200  

🎉 Your contact form will work perfectly once configured!
