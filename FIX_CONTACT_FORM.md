# ⚠️ FIX: Contact Form Not Sending Emails

## The Problem
Your contact form shows this error:
> "Failed to send inquiry. Please try again or email us directly at contact@nirmanam.com"

## Why It's Happening
Your `.env` file has **placeholder values** instead of real EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID          ❌ Not real
VITE_EMAILJS_CONTACT_TEMPLATE_ID=YOUR_CONTACT_TEMPLATE_ID  ❌ Not real
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY          ❌ Not real
```

## The Solution
You need to get **real credentials from EmailJS** and put them in `.env`

---

## 🎯 EXACTLY What To Do

### 1️⃣ Go to EmailJS Website
👉 https://www.emailjs.com/

Click **"Sign Up"** (free account)

---

### 2️⃣ Connect Your Gmail
In EmailJS Dashboard:
1. Click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Choose **"Gmail"**
4. Click **"Connect Account"**
5. Allow EmailJS to access your Gmail
6. You'll see a **Service ID** like: `service_xyz123`

**📋 COPY THIS SERVICE ID**

---

### 3️⃣ Create Email Template
In EmailJS Dashboard:
1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. Copy-paste this into the **content area**:

```
Subject: New Project Inquiry from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Service: {{service_type}}
Budget: {{budget_range}}

Message:
{{message}}
```

4. In the **"To Email"** field, put YOUR email (where you want to receive inquiries)
5. In the **"From Name"** field, type: `{{from_name}}`
6. In the **"Reply To"** field, type: `{{from_email}}`
7. Click **"Save Template"**
8. You'll see a **Template ID** like: `template_abc456`

**📋 COPY THIS TEMPLATE ID**

---

### 4️⃣ Get Your Public Key
In EmailJS Dashboard:
1. Click **"Account"** (left sidebar)
2. Look for **"Public Key"** section
3. You'll see something like: `user_qwerty789`

**📋 COPY THIS PUBLIC KEY**

---

### 5️⃣ Update Your .env File

Open the file: `.env` (in your project root)

Replace the placeholder values with YOUR real values:

```env
VITE_EMAILJS_SERVICE_ID=service_xyz123           # ← Your Service ID from step 2
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_abc456 # ← Your Template ID from step 3
VITE_EMAILJS_CAREER_TEMPLATE_ID=template_abc456  # ← Same template for now
VITE_EMAILJS_PUBLIC_KEY=user_qwerty789          # ← Your Public Key from step 4
```

**⚠️ SAVE THE FILE**

---

### 6️⃣ Restart Your Dev Server

**IMPORTANT:** You MUST restart the server for changes to take effect!

In your terminal:
1. Press **Ctrl + C** to stop the server
2. Run: `npm run dev` to start it again

---

### 7️⃣ Test The Contact Form

1. Go to: http://localhost:5173/#contact
2. Fill out the form
3. Click "Submit Request"
4. Check your email inbox! 📧

✅ You should receive the inquiry email!

---

## Checklist

Before testing, make sure:

- [ ] Signed up for EmailJS (free account)
- [ ] Connected Gmail in EmailJS dashboard
- [ ] Created email template
- [ ] Copied Service ID to `.env` file
- [ ] Copied Template ID to `.env` file
- [ ] Copied Public Key to `.env` file
- [ ] Saved `.env` file
- [ ] Restarted dev server (`npm run dev`)

---

## Visual Example

**Your .env should look like this (with YOUR values):**

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_9k2j4n5
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact123
VITE_EMAILJS_PUBLIC_KEY=user_xYz789AbC123
```

**NOT like this:**
```env
# ❌ WRONG - These are placeholders
VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
VITE_EMAILJS_CONTACT_TEMPLATE_ID=YOUR_CONTACT_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
```

---

## Need Help?

### Check Console for Errors
Press **F12** in your browser → Go to **Console** tab

You might see:
- `"EmailJS credentials missing"` → Check .env values
- `"Invalid public key"` → Copy public key again from EmailJS
- `"Template not found"` → Make sure template is saved in EmailJS

### Still Stuck?
See the detailed guide: `EMAILJS_QUICK_SETUP.md`

---

## What Was Already Fixed

✅ Budget options changed from **$ USD** to **₹ Rupees**:
- Under ₹50,000
- ₹50,000 - ₹1,50,000
- ₹1,50,000 - ₹3,00,000
- ₹3,00,000+

✅ EmailJS integration code is working
✅ Form validation is working
✅ Error handling is working

**Only missing:** Your actual EmailJS credentials!

---

## Time Required
⏱️ **5-10 minutes** to set up EmailJS and update .env

## Cost
💰 **FREE** (200 emails per month)

---

**Once configured, your contact form will work perfectly! 🎉**
