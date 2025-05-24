// app/api/contact/route.ts - Alternative Simplified Version
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  hasPlaylist: boolean;
  playlistType: string | null;
  playlistTitle?: string;
  playlistSongs?: Array<{
    title: string;
    composer: string;
    category: string;
  }>;
}

function generateNotificationHTML(data: ContactFormData): string {
  const {
    name,
    email,
    subject,
    message,
    hasPlaylist,
    playlistType,
    playlistTitle,
    playlistSongs = [],
  } = data;

  const playlistHTML =
    hasPlaylist && playlistSongs.length > 0
      ? `
    <div style="background-color: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px; margin-top: 16px;">
      <h2 style="color: #1e40af; font-size: 18px; font-weight: bold; margin: 0 0 8px 0;">
        🎵 Included Playlist: ${playlistTitle}
      </h2>
      <p style="color: #1e40af; font-size: 14px; margin: 0 0 16px 0;">
        ${playlistType === "quartet" ? "String Quartet" : "String Trio"} Repertoire • ${playlistSongs.length} songs
      </p>
      ${playlistSongs
        .map(
          (song, index) => `
        <div style="display: flex; align-items: flex-start; margin-bottom: 12px; padding: 8px; background-color: #ffffff; border-radius: 4px;">
          <span style="color: #6b7280; font-size: 12px; font-weight: bold; margin-right: 8px; margin-top: 2px; min-width: 20px;">
            ${index + 1}.
          </span>
          <div style="flex: 1;">
            <div style="color: #000000; font-size: 14px; font-weight: bold; margin: 0 0 4px 0;">
              ${song.title}
            </div>
            ${song.composer ? `<div style="color: #6b7280; font-size: 12px; margin: 0 0 2px 0;">Composer: ${song.composer}</div>` : ""}
            <div style="color: #9ca3af; font-size: 11px; margin: 0;">Category: ${song.category}</div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `
      : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background-color: #f6f9fc; margin: 0; padding: 20px;">
        <div style="margin: 0 auto; max-width: 600px;">
          <div style="background-color: #1e293b; border-radius: 8px 8px 0 0; padding: 20px; text-align: center;">
            <h1 style="color: #fef3c7; font-size: 24px; font-weight: bold; margin: 0 0 8px 0;">
              🎼 New Contact Form Submission
            </h1>
            <p style="color: #fef3c7; font-size: 16px; margin: 0;">String Quartet/Trio Website</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0;">
            <div style="margin-bottom: 16px;">
              <p style="color: #374151; font-size: 14px; font-weight: bold; margin: 0 0 4px 0;">📝 Name:</p>
              <p style="background-color: #f8fafc; padding: 8px 12px; border-radius: 4px; border: 1px solid #e2e8f0; margin: 0; font-size: 14px;">
                ${name}
              </p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <p style="color: #374151; font-size: 14px; font-weight: bold; margin: 0 0 4px 0;">📧 Email:</p>
              <p style="background-color: #f8fafc; padding: 8px 12px; border-radius: 4px; border: 1px solid #e2e8f0; margin: 0; font-size: 14px;">
                ${email}
              </p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <p style="color: #374151; font-size: 14px; font-weight: bold; margin: 0 0 4px 0;">📋 Subject:</p>
              <p style="background-color: #f8fafc; padding: 8px 12px; border-radius: 4px; border: 1px solid #e2e8f0; margin: 0; font-size: 14px;">
                ${subject}
              </p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <p style="color: #374151; font-size: 14px; font-weight: bold; margin: 0 0 4px 0;">💬 Message:</p>
              <p style="background-color: #f8fafc; padding: 8px 12px; border-radius: 4px; border: 1px solid #e2e8f0; margin: 0; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">
                ${message}
              </p>
            </div>
            
            ${playlistHTML}
          </div>
          
          <div style="background-color: #374151; border-radius: 0 0 8px 8px; padding: 16px; text-align: center;">
            <p style="color: #ffffff; font-size: 12px; margin: 0 0 4px 0;">
              Received on ${new Date().toLocaleString()}
            </p>
            <p style="color: #ffffff; font-size: 12px; margin: 0;">
              Reply directly to: ${email}
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateConfirmationHTML(
  name: string,
  subject: string,
  hasPlaylist: boolean,
  playlistType?: string,
  playlistTitle?: string,
  playlistCount?: number
): string {
  const playlistSection = hasPlaylist
    ? `
    <div style="background-color: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <p style="font-size: 14px; line-height: 1.6; color: #1e40af; margin: 0;">
        🎵 We're excited to see that you've included your <strong>${playlistTitle}</strong> 
        (${playlistType === "quartet" ? "String Quartet" : "String Trio"}) playlist with ${playlistCount} songs 
        with your message. We'll review your selections and include them in our response.
      </p>
    </div>
  `
    : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for your message</title>
      </head>
      <body style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background-color: #f6f9fc; margin: 0; padding: 20px;">
        <div style="margin: 0 auto; max-width: 600px;">
          <div style="background-color: #1e293b; border-radius: 8px 8px 0 0; padding: 20px; text-align: center;">
            <h1 style="color: #fef3c7; font-size: 24px; font-weight: bold; margin: 0;">
              🎼 Thank You for Your Message!
            </h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 32px 24px; border: 1px solid #e2e8f0;">
            <p style="font-size: 16px; font-weight: bold; color: #374151; margin: 0 0 16px 0;">
              Hello ${name},
            </p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0 0 16px 0;">
              Thank you for contacting us! We have received your message about 
              <strong>"${subject}"</strong> and will get back to you as soon as possible.
            </p>
            
            ${playlistSection}
            
            <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0 0 16px 0;">
              We typically respond within 24-48 hours during business days.
            </p>
            
            <hr style="margin: 24px 0; border-color: #e2e8f0;">
            
            <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0;">
              Best regards,<br>
              <strong>The String Quartet/Trio Team</strong>
            </p>
          </div>
          
          <div style="background-color: #374151; border-radius: 0 0 8px 8px; padding: 16px; text-align: center;">
            <p style="color: #d1d5db; font-size: 12px; margin: 0;">
              This is an automated confirmation email. Please do not reply to this message.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const {
      name,
      email,
      subject,
      message,
      hasPlaylist,
      playlistType,
      playlistTitle,
      playlistSongs = [],
    } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send notification email to website owner
    const notificationResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.CONTACT_EMAIL!],
      replyTo: email,
      subject: `🎼 Website Contact: ${subject}`,
      html: generateNotificationHTML(body),
    });

    if (notificationResult.error) {
      console.error(
        "Error sending notification email:",
        notificationResult.error
      );
      return NextResponse.json(
        { error: "Failed to send notification email" },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const confirmationResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [email],
      subject: "🎼 Thank you for your message - We'll be in touch soon!",
      html: generateConfirmationHTML(
        name,
        subject,
        hasPlaylist,
        playlistType as "quartet" | "trio",
        playlistTitle,
        playlistSongs.length
      ),
    });

    if (confirmationResult.error) {
      console.error(
        "Error sending confirmation email:",
        confirmationResult.error
      );
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      {
        message: "Emails sent successfully",
        notificationId: notificationResult.data?.id,
        confirmationId: confirmationResult.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
