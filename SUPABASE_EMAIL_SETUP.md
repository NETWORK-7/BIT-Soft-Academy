# Supabase Email Confirmation Setup

## Email Template Configuration

To use the custom email confirmation template in Supabase:

### Option 1: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Templates** (or **Email Templates**)
3. Find the **"Confirm Signup"** template
4. Replace the template content with:

```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
```

5. Click **Save**

### Option 2: Via Supabase Management API

If you prefer to set it via code, use the Supabase Management API:

```bash
curl -X PUT \
  https://<PROJECT_ID>.supabase.co/rest/v1/rpc/update_email_template \
  -H "Authorization: Bearer <SERVICE_ROLE_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "template_type": "confirm_signup",
    "subject": "Confirm your signup",
    "body": "<h2>Confirm your signup</h2>\n\n<p>Follow this link to confirm your user:</p>\n<p><a href=\"{{ .ConfirmationURL }}\">Confirm your mail</a></p>"
  }'
```

## How It Works

1. User signs up with email and password
2. Supabase automatically sends a confirmation email to their email address
3. Email contains a link with the confirmation URL
4. User clicks the link to confirm their email
5. User is now fully authenticated and can sign in

## Troubleshooting

- **Email not received**: Check spam/junk folder or verify email sending is enabled in Supabase settings
- **Link not working**: Ensure your `NEXT_PUBLIC_SUPABASE_URL` is correctly set in `.env.local`
- **Email template not updating**: Clear browser cache and try again in a few minutes

## Testing

To test email confirmations locally:
1. Sign up with a test email in your app
2. Check the email for the confirmation link
3. Click the link - you should be redirected and authenticated

For development, you can also use Supabase's built-in email testing feature or use a service like Mailtrap to capture emails.
