# EmailJS Setup Guide for Nirmanam Solutions

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" (free plan: 200 emails/month)
3. Verify your email address

---

## Step 2: Add Email Service

1. Go to **Email Services** tab
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - Outlook
   - Yahoo
   - Custom SMTP

### For Gmail:
1. Select **Gmail**
2. Click **Connect Account**
3. Allow EmailJS to access your Gmail
4. **Copy the Service ID** (e.g., `service_abc1234`)

---

## Step 3: Create Email Templates

### Template 1: Contact Form (Project Inquiries)

1. Go to **Email Templates** tab
2. Click **Create New Template**
3. **Template Name:** `Contact Form Inquiry`
4. **Template ID:** Will be auto-generated (e.g., `template_xyz5678`)

**Template Content:**

```
Subject: 🚀 New Project Inquiry from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Service: {{service_type}}
Budget: {{budget_range}}

Project Details:
{{message}}

---
Reply within 24 hours for best conversion!
```

**Variables to use:**
- `{{from_name}}` - Client name
- `{{from_email}}` - Client email
- `{{service_type}}` - Service requested
- `{{budget_range}}` - Budget range
- `{{message}}` - Project details

5. **To Email:** Your email (e.g., `your-email@gmail.com`)
6. **From Name:** `{{from_name}}`
7. **Reply To:** `{{from_email}}`
8. Click **Save**
9. **Copy the Template ID**

---

## Step 4: Get Your Public Key

1. Go to **Account** tab
2. Find **Public Key** section
3. **Copy your Public Key** (e.g., `user_abc123xyz456`)

---

## Step 5: Update Your Environment Variables

### File: `.env` (root directory)

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual EmailJS credentials:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc1234           # Your Service ID
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_xyz5678 # Contact Form Template ID
VITE_EMAILJS_PUBLIC_KEY=user_abc123xyz456         # Your Public Key
```

**Example with real values:**
```env
VITE_EMAILJS_SERVICE_ID=service_9k2j4n5
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact123
VITE_EMAILJS_PUBLIC_KEY=user_xYz789AbC123
```

### Important Notes:

- ⚠️ **NEVER commit `.env` to Git** (already in .gitignore)
- ✅ Variables must start with `VITE_` to be accessible in React
- ✅ Restart dev server after changing .env file
- ✅ Use `.env.example` for team members (no secrets)

---

## Step 6: Restart Dev Server

After updating `.env`, restart your server:

```bash
# Stop the server (Ctrl+C)
# Then start again
npm run dev
```

The app will now use your EmailJS credentials from environment variables!

---

## Step 7: Test Your Forms

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Fill out the contact form
3. Check your email inbox
4. You should receive the inquiry!

---

## Troubleshooting

### "Failed to send inquiry"
- ✅ Check Service ID, Template ID, Public Key are correct
- ✅ Verify Gmail account is connected in EmailJS
- ✅ Check browser console for errors
- ✅ Ensure you're online

### Emails going to spam
- Add your domain to EmailJS settings
- Use a custom domain email (not Gmail)
- Upgrade to paid plan for better deliverability

### "Invalid public key"
- Double-check you copied the entire key
- No extra spaces
- Should start with `user_`

### Template not found
- Verify Template ID matches exactly
- Template must be saved in EmailJS dashboard
- Case-sensitive

---

## Free Plan Limits

- **200 emails/month**
- **1 email service**
- **Email templates included**
- EmailJS branding in emails

**Upgrade ($15/month) for:**
- 5,000 emails/month
- No branding
- Custom domains
- Better deliverability

---

## Auto-Reply Setup (Optional)

Want to send auto-reply to clients?

1. Create a 3rd template: "Auto Reply"
2. Use same Service ID
3. In `Contact.jsx`, add second `emailjs.send()`:

```javascript
// Send to you
await emailjs.send(serviceID, templateID, templateParams, publicKey);

// Auto-reply to client
await emailjs.send(serviceID, 'template_autoreply', {
  to_email: email,
  to_name: name
}, publicKey);
```

---

## Production Checklist

Before deploying:

- [ ] Service ID configured
- [ ] Template ID configured
- [ ] Public Key configured
- [ ] Tested contact form
- [ ] Emails arriving correctly
- [ ] Emails not in spam
- [ ] Error handling works
- [ ] Toast notifications work

---

## Support

**EmailJS Documentation:** https://www.emailjs.com/docs/

**Need Help?**
- Check EmailJS dashboard logs
- View browser console errors
- Test with EmailJS dashboard "Send Test Email"

---

## Security Notes

✅ **Safe to expose Public Key** - It's meant to be public
✅ **No API keys in code** - EmailJS handles auth
✅ **Rate limiting built-in** - Prevents spam
✅ **reCAPTCHA support** - Add later if needed

---

**Setup Time:** 10-15 minutes
**Cost:** Free (200 emails/month)
**Difficulty:** Easy ⭐⭐

Good luck! 🚀
