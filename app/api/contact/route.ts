import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import React from "react";
import { ContactNotificationEmail } from "@/emails/contact-notification";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation";

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

    // Render the notification email using the React Email component
    const notificationHtml = await render(
      React.createElement(ContactNotificationEmail, {
        name,
        email,
        subject,
        message,
        hasPlaylist,
        playlistType: playlistType ?? undefined,
        playlistTitle,
        playlistSongs,
      })
    );

    // Send notification email to website owner
    const notificationResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.CONTACT_EMAIL!],
      replyTo: email,
      subject: `🎼 Website Contact: ${subject}`,
      html: notificationHtml,
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

    // Render the confirmation email using the React Email component
    const confirmationHtml = await render(
      React.createElement(ContactConfirmationEmail, {
        name,
        subject,
        hasPlaylist,
        playlistType: playlistType ?? undefined,
        playlistTitle,
        playlistCount: playlistSongs.length,
      })
    );

    // Send confirmation email to user
    const confirmationResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [email],
      subject: "🎼 Thank you for your message - We'll be in touch soon!",
      html: confirmationHtml,
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
