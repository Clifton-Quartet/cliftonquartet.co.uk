"use client";

import React, { useState } from "react";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  FileText,
  Music,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { usePlaylistStore } from "../store/playlistStore";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  selectedPlaylist: "none" | "quartet" | "trio";
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export const ContactForm: React.FC = () => {
  const {
    quartetPlaylist,
    trioPlaylist,
    quartetPlaylistTitle,
    trioPlaylistTitle,
  } = usePlaylistStore();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    selectedPlaylist: "none",
  });

  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const hasQuartetSongs = quartetPlaylist.length > 0;
  const hasTrioSongs = trioPlaylist.length > 0;
  const hasAnySongs = hasQuartetSongs || hasTrioSongs;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPlaylistForEmail = (playlistType: "quartet" | "trio") => {
    const playlist =
      playlistType === "quartet" ? quartetPlaylist : trioPlaylist;
    const title =
      playlistType === "quartet" ? quartetPlaylistTitle : trioPlaylistTitle;
    const type = playlistType === "quartet" ? "String Quartet" : "String Trio";

    return `
=== ${title} (${type} Repertoire) ===
Total Songs: ${playlist.length}

${playlist
  .map(
    (song, index) =>
      `${index + 1}. ${song.title}
   Composer: ${song.composer || "Unknown"}
   Category: ${song.category}
`
  )
  .join("\n")}

---
Generated from website contact form
Date: ${new Date().toLocaleDateString()}
    `.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      // Prepare the complete message with playlist if selected
      let completeMessage = formData.message;

      if (formData.selectedPlaylist !== "none") {
        const playlistContent = formatPlaylistForEmail(
          formData.selectedPlaylist
        );
        completeMessage = `${formData.message}\n\n${playlistContent}`;
      }

      // Prepare the email data
      const emailData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: completeMessage,
        hasPlaylist: formData.selectedPlaylist !== "none",
        playlistType:
          formData.selectedPlaylist !== "none"
            ? formData.selectedPlaylist
            : null,
      };

      // Here you would integrate with your email service
      // For example, using a Next.js API route:
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          selectedPlaylist: "none",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setStatus({
        type: "error",
        message: `Failed to send message. Please try again later. ${errorMessage}`,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      selectedPlaylist: "none",
    });
    setStatus({ type: "idle", message: "" });
  };

  return (
    <div className="bg-yellow-900">
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-yellow-100 mb-2 font-serif">
            Contact Us
          </h2>
          <p className="text-yellow-100 font-extralight">
            Send us a message and optionally share your favourite songs list
            with us
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-yellow-100 font-medium mb-2"
            >
              <User size={18} />
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-700 border border-yellow-100 rounded-lg text-yellow-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-yellow-100 font-medium mb-2"
            >
              <Mail size={18} />
              Your Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-700 border border-yellow-100 rounded-lg text-yellow-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="flex items-center gap-2 text-yellow-100 font-medium mb-2"
            >
              <FileText size={18} />
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-700 border border-yellow-100 rounded-lg text-yellow-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              placeholder="What is this message about?"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="flex items-center gap-2 text-yellow-100 font-medium mb-2"
            >
              <MessageSquare size={18} />
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-slate-700 border border-yellow-100 rounded-lg text-yellow-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent resize-vertical"
              placeholder="Write your message here..."
            />
          </div>

          {/* Playlist Selection */}
          <div>
            <label
              htmlFor="selectedPlaylist"
              className="flex items-center gap-2 text-yellow-100 font-medium mb-2"
            >
              <Music size={18} />
              Include Favourites List (Optional)
            </label>

            {!hasAnySongs ? (
              <div className="p-4 border border-blue-500 rounded-lg tracking-wider">
                <p className="text-blue-300 font-extralight text-sm">
                  Add songs to your favourites list and send them to us. Visit
                  the repertoire page to create your favourites list.
                </p>
              </div>
            ) : (
              <select
                id="selectedPlaylist"
                name="selectedPlaylist"
                value={formData.selectedPlaylist}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700 border border-yellow-100 rounded-lg text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent cursor-pointer"
              >
                <option value="none">
                  Don&apos;t include any favourites list
                </option>
                {hasQuartetSongs && (
                  <option value="quartet">
                    {quartetPlaylistTitle} - String Quartet (
                    {quartetPlaylist.length} songs)
                  </option>
                )}
                {hasTrioSongs && (
                  <option value="trio">
                    {trioPlaylistTitle} - String Trio ({trioPlaylist.length}{" "}
                    songs)
                  </option>
                )}
              </select>
            )}

            {formData.selectedPlaylist !== "none" && (
              <div className="mt-3 p-3 border border-blue-500 rounded-lg tracking-wider">
                <p className="text-blue-300 text-sm font-extralight">
                  ✓ Your favourites will be included with your message
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.type === "loading"}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-100 text-slate-900 font-semibold rounded-lg hover:bg-yellow-100/90 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {status.type === "loading" ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </button>

          {status.type !== "idle" && (
            <div
              className={`my-6 p-4 rounded-lg border ${
                status.type === "success"
                  ? "bg-green-900/20 border-green-500 text-green-300"
                  : status.type === "error"
                    ? "bg-red-900/20 border-red-500 text-red-300"
                    : "bg-blue-900/20 border-blue-500 text-blue-300"
              }`}
            >
              <div className="flex items-center gap-2">
                {status.type === "loading" && (
                  <Loader2 className="animate-spin" size={20} />
                )}
                {status.type === "success" && <CheckCircle size={20} />}
                {status.type === "error" && <AlertCircle size={20} />}
                <span>{status.message}</span>
              </div>
              {status.type === "success" && (
                <button
                  onClick={resetForm}
                  className="mt-2 text-sm underline hover:no-underline"
                >
                  Send another message
                </button>
              )}
            </div>
          )}
        </form>

        <div className="border-t border-yellow-50/60 mt-6 pt-6 flex flex-col items-center">
          <p className="text-yellow-100 mb-2">
            Alternatively contact us by sending an email
          </p>
          <button className="bg-[#fcf2bd] rounded-lg hover:opacity-90 transition-colors cursor-pointer text-slate-900">
            <a
              href="mailto:cliftonstringquartet@gmail.com"
              className="p-2 block"
            >
              cliftonstringquartet@gmail.com
            </a>
          </button>
        </div>

        {/* Form Footer */}
        <div className="mt-8 pt-6 border-t border-yellow-50/60">
          <p className="text-yellow-50/60 text-sm text-center font-extralight tracking-wider">
            We respect your privacy and will only use your information to
            respond to your message.
          </p>
        </div>
      </div>
    </div>
  );
};
