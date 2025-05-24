// emails/contact-notification.tsx
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

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  hasPlaylist: boolean;
  playlistType?: string;
  playlistTitle?: string;
  playlistSongs?: Array<{
    title: string;
    composer: string;
    category: string;
  }>;
}

export const ContactNotificationEmail: React.FC<
  ContactNotificationEmailProps
> = ({
  name,
  email,
  subject,
  message,
  hasPlaylist,
  playlistType,
  playlistTitle,
  playlistSongs = [],
}) => {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>
              🎼 New Contact Form Submission
            </Heading>
            <Text style={headerSubtitle}>String Quartet Website</Text>
          </Section>

          <Section style={content}>
            <div style={field}>
              <Text style={label}>📝 Name:</Text>
              <Text style={value}>{name}</Text>
            </div>

            <div style={field}>
              <Text style={label}>📧 Email:</Text>
              <Text style={value}>{email}</Text>
            </div>

            <div style={field}>
              <Text style={label}>📋 Subject:</Text>
              <Text style={value}>{subject}</Text>
            </div>

            <div style={field}>
              <Text style={label}>💬 Message:</Text>
              <Text style={messageValue}>{message}</Text>
            </div>

            {hasPlaylist && playlistSongs.length > 0 && (
              <>
                <Hr style={divider} />
                <Section style={playlistSection}>
                  <div style={playlistHeader}>
                    <Heading as="h2" style={playlistTitleStyle}>
                      🎵 Included Playlist: {playlistTitle}
                    </Heading>
                    <Text style={playlistMeta}>
                      {playlistType === "quartet"
                        ? "String Quartet"
                        : "String Trio"}{" "}
                      Repertoire • {playlistSongs.length} songs
                    </Text>
                  </div>

                  {playlistSongs.map((song, index) => (
                    <div key={index} style={songItem}>
                      <Text style={songNumber}>{index + 1}.</Text>
                      <div style={songDetails}>
                        <Text style={songTitle}>{song.title}</Text>
                        <Text style={songComposer}>
                          {song.composer && `Composer: ${song.composer}`}
                        </Text>
                        <Text style={songCategory}>
                          Category: {song.category}
                        </Text>
                      </div>
                    </div>
                  ))}
                </Section>
              </>
            )}
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Received on {new Date().toLocaleString()}
            </Text>
            <Text style={footerText}>Reply directly to: {email}</Text>
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
  margin: "0 0 8px 0",
};

const headerSubtitle = {
  color: "#fef3c7",
  fontSize: "16px",
  margin: "0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "20px",
  border: "1px solid #e2e8f0",
};

const field = {
  marginBottom: "16px",
};

const label = {
  color: "#374151",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 4px 0",
};

const value = {
  backgroundColor: "#f8fafc",
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #e2e8f0",
  margin: "0",
  fontSize: "14px",
};

const messageValue = {
  ...value,
  whiteSpace: "pre-wrap" as const,
  lineHeight: "1.5",
};

const divider = {
  margin: "24px 0",
  borderColor: "#e2e8f0",
};

const playlistSection = {
  backgroundColor: "#dbeafe",
  border: "1px solid #3b82f6",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "16px",
};

const playlistHeader = {
  marginBottom: "16px",
};

const playlistTitleStyle = {
  color: "#1e40af",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 8px 0",
};

const playlistMeta = {
  color: "#1e40af",
  fontSize: "14px",
  margin: "0",
};

const songItem = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "12px",
  padding: "8px",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
};

const songNumber = {
  color: "#6b7280",
  fontSize: "12px",
  fontWeight: "bold",
  marginRight: "8px",
  marginTop: "2px",
  minWidth: "20px",
};

const songDetails = {
  flex: "1",
};

const songTitle = {
  color: "#000000",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 4px 0",
};

const songComposer = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "0 0 2px 0",
};

const songCategory = {
  color: "#9ca3af",
  fontSize: "11px",
  margin: "0",
};

const footer = {
  backgroundColor: "#374151",
  borderRadius: "0 0 8px 8px",
  padding: "16px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#ffffff",
  fontSize: "12px",
  margin: "0 0 4px 0",
};

export default ContactNotificationEmail;
