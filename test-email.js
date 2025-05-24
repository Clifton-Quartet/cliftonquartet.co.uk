// test-email.js - Run this to test your setup
// Usage: node test-email.js

const testData = {
  name: "Test User",
  email: "cliftonquartetprismic@gmail.com",
  subject: "Test Contact Form",
  message:
    "This is a test message to verify the Resend integration is working.",
  hasPlaylist: true,
  playlistType: "quartet",
  playlistTitle: "My Test Playlist",
  playlistSongs: [
    {
      title: "Canon in D",
      composer: "Pachelbel",
      category: "Classical",
    },
    {
      title: "Yesterday",
      composer: "Beatles",
      category: "Beatles",
    },
  ],
};

async function testContactForm() {
  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Test successful!");
      console.log("📧 Notification ID:", result.notificationId);
      console.log("📧 Confirmation ID:", result.confirmationId);
      console.log("Check your email inbox!");
    } else {
      console.error("❌ Test failed:", result.error);
    }
  } catch (error) {
    console.error("❌ Test error:", error.message);
  }
}

testContactForm();
