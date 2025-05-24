This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Contact Form with Playlist Integration Setup

This setup creates a complete contact form solution that integrates with your existing String Quartet and Trio repertoire components, allowing users to send their favorite playlists along with their messages.

## Features

- ✅ Complete contact form with name, email, subject, and message fields
- ✅ Playlist selection dropdown (String Quartet or String Trio favorites)
- ✅ Zustand state management for sharing playlist data across components
- ✅ Email delivery with HTML formatting and automatic confirmation emails
- ✅ Disabled playlist selection when no songs are added (with helpful message)
- ✅ Form validation and error handling
- ✅ Responsive design matching your existing theme
- ✅ Loading states and success/error feedback

## Installation Steps

### 1. Install Required Dependencies

```bash
npm install zustand nodemailer
npm install --save-dev @types/nodemailer
```

### 2. Create the Zustand Store

Create `store/playlistStore.ts` with the provided Zustand store code. This will manage playlist state across all components.

### 3. Update Your Existing Components

Replace your existing repertoire components with the updated versions that integrate with Zustand:

- Update `RepertoirePlaylist` component (String Quartet)
- Update `TrioRepertoirePlaylist` component (String Trio)

### 4. Create the Contact Form Component

Add the `ContactForm` component to your components directory.

### 5. Create the API Route

Create `app/api/contact/route.ts` with the provided API route code for handling email sending.

### 6. Environment Variables Setup

Create or update your `.env.local` file with the email configuration:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=your-email@gmail.com
```

### 7. Email Provider Configuration

#### For Gmail:

1. Enable 2-factor authentication on your Google account
2. Generate an App Password: Google Account → Security → 2-Step Verification → App passwords
3. Use the generated app password in `SMTP_PASS`

#### For Other Providers:

- **Outlook/Hotmail**: Use `smtp-mail.outlook.com` with port 587
- **Yahoo**: Use `smtp.mail.yahoo.com` with port 587
- **Custom Domain**: Contact your hosting provider for SMTP settings

### 8. Add Contact Form to Your App

Import and use the ContactForm component in your desired page:

```tsx
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ContactForm />
    </div>
  );
}
```

## How It Works

### State Management Flow

1. **Zustand Store**: Centrally manages both String Quartet and String Trio playlists
2. **Repertoire Components**: Updated to use Zustand instead of localStorage
3. **Contact Form**: Reads playlist data from Zustand store
4. **Persistence**: Zustand automatically persists data to localStorage

### Contact Form Behavior

1. **Empty Playlists**: When no songs are added, playlist selection is disabled with a helpful message
2. **With Playlists**: Users can select which playlist to include (Quartet, Trio, or none)
3. **Email Generation**: Selected playlist is formatted and included in the email message
4. **Confirmation**: Users receive automatic confirmation emails

### Email Format

The system sends two emails:

1. **To Website Owner**: Contains the contact form data plus formatted playlist if selected
2. **To User**: Confirmation email acknowledging receipt of their message

## Playlist Email Format

When a user includes a playlist, it's formatted like this in the email:

```
=== My Favourite Songs (String Quartet Repertoire) ===
Total Songs: 5

1. Canon in D
   Composer: Pachelbel
   Category: Classical

2. Yesterday
   Composer: Beatles
   Category: Beatles

[... etc ...]

---
Generated from website contact form
Date: 24/05/2025
```

## Customization Options

### Styling

- The contact form uses your existing Tailwind classes and color scheme
- Modify the component classes to match your exact design requirements

### Email Templates

- Customize the HTML email templates in the API route
- Add your branding, logos, or additional information

### Form Fields

- Add additional form fields by extending the `ContactFormData` interface
- Update both the form component and API route accordingly

### Validation

- The form includes basic validation (required fields, email format)
- Add custom validation rules as needed

## Troubleshooting

### Email Not Sending

1. Check environment variables are correctly set
2. Verify SMTP credentials with your email provider
3. Check spam folders for test emails
4. Review server logs for error messages

### Playlists Not Appearing

1. Ensure Zustand store is properly imported
2. Check that updated repertoire components are being used
3. Verify playlist data is being saved (check browser dev tools → Application → Local Storage)

### Form Submission Issues

1. Check API route is correctly placed in `app/api/contact/route.ts`
2. Verify Next.js app router is being used (not pages router)
3. Check browser network tab for API call errors

## Security Considerations

- Environment variables are not exposed to the client
- Email addresses are validated before processing
- Form data is sanitized before sending emails
- Consider adding rate limiting for production use
- Use app passwords rather than main account passwords

## Testing

1. **Local Testing**: Use a test email account for SMTP settings
2. **Playlist Testing**: Add songs to favorites, verify they appear in contact form
3. **Email Testing**: Send test messages and verify both emails are received
4. **Error Testing**: Test with invalid email addresses and empty required fields

## Production Deployment

1. Set environment variables in your hosting platform
2. Consider using a dedicated email service (SendGrid, Mailgun, etc.) for better deliverability
3. Add rate limiting to prevent spam
4. Monitor email delivery rates and error logs

This setup provides a complete, production-ready contact form that seamlessly integrates with your existing playlist functionality!
