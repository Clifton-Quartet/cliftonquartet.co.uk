// emails/contact-confirmation.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface ContactConfirmationEmailProps {
  name: string;
  subject: string;
  hasPlaylist: boolean;
  playlistType?: string;
  playlistTitle?: string;
  playlistCount?: number;
}

export const ContactConfirmationEmail: React.FC<
  ContactConfirmationEmailProps
> = ({
  name,
  subject,
  hasPlaylist,
  playlistType,
  playlistTitle,
  playlistCount = 0,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for your message, {name}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>
              🎼 Thank You for Your Message!
            </Heading>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hello {name},</Text>

            <Text style={paragraph}>
              Thank you for contacting us! We have received your message about{" "}
              <strong>&quot;{subject}&quot;</strong> and will get back to you as
              soon as possible.
            </Text>

            {hasPlaylist && (
              <Section style={playlistSection}>
                <Text style={playlistText}>
                  🎵 We&apos;re excited to see that you&apos;ve included your{" "}
                  <strong>{playlistTitle}</strong> (
                  {playlistType === "quartet"
                    ? "String Quartet"
                    : "String Trio"}
                  ) playlist with {playlistCount} songs with your message.
                  We&apos;ll review your selections and include them in our
                  response.
                </Text>
              </Section>
            )}

            <Text style={paragraph}>
              We typically respond within 24-48 hours during business days.
            </Text>

            <Hr style={divider} />

            <Text style={signature}>
              Best regards,
              <br />
              <strong>The String Quartet Team</strong>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This is an automated confirmation email. Please do not reply to
              this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#1e293b",
  borderRadius: "8px 8px 0 0",
  padding: "20px",
  textAlign: "center" as const,
};

const headerTitle = {
  color: "#fef3c7",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "32px 24px",
  border: "1px solid #e2e8f0",
};

const greeting = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#374151",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#374151",
  margin: "0 0 16px 0",
};

const playlistSection = {
  backgroundColor: "#dbeafe",
  border: "1px solid #3b82f6",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0",
};

const playlistText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#1e40af",
  margin: "0",
};

const divider = {
  margin: "24px 0",
  borderColor: "#e2e8f0",
};

const signature = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#374151",
  margin: "0",
};

const footer = {
  backgroundColor: "#374151",
  borderRadius: "0 0 8px 8px",
  padding: "16px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#d1d5db",
  fontSize: "12px",
  margin: "0",
};

export default ContactConfirmationEmail;
