"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  Music,
  X,
  Download,
  FileText,
  Edit2,
  Check,
  Circle,
  CircleCheck,
} from "lucide-react";
import { SlideIn } from "./SlideIn";
import { Song } from "../store/playlistStore";

// Sanitize strings before injecting into HTML templates (prevent XSS)
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Configuration passed in by the wrapper components
export interface RepertoirePlaylistConfig {
  /** Display title, e.g. "String Quartet Repertoire" */
  title: string;
  /** Type label for exports, e.g. "String Quartet" */
  typeLabel: string;
  /** HTML anchor id for the section */
  id: string;
  /** The resolved list of songs (already transformed from Prismic data) */
  songs: Song[];
  /** Current playlist from Zustand */
  playlist: Song[];
  /** Current playlist title from Zustand */
  playlistTitle: string;
  /** Set playlist title in Zustand */
  setPlaylistTitle: (title: string) => void;
  /** Add song to playlist in Zustand */
  addToPlaylist: (song: Song) => void;
  /** Remove song from playlist by id in Zustand */
  removeFromPlaylist: (id: string) => void;
  /** Clear all songs from playlist in Zustand */
  clearPlaylist: () => void;
}

const RepertoirePlaylistBase: React.FC<RepertoirePlaylistConfig> = ({
  title,
  typeLabel,
  id,
  songs,
  playlist,
  playlistTitle,
  setPlaylistTitle,
  addToPlaylist,
  removeFromPlaylist,
  clearPlaylist,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(playlistTitle);

  // Ref for the playlist sidebar
  const playlistSidebarRef = useRef<HTMLDivElement>(null);

  // Update temp title when store title changes
  useEffect(() => {
    setTempTitle(playlistTitle);
  }, [playlistTitle]);

  // Handle click outside to close playlist
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        showPlaylist &&
        playlistSidebarRef.current &&
        !playlistSidebarRef.current.contains(event.target as Node)
      ) {
        setShowPlaylist(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showPlaylist) {
        setShowPlaylist(false);
      }
    };

    if (showPlaylist) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showPlaylist]);

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(songs.map((song) => song.category))];
    return cats.sort((a, b) => {
      if (a === "all") return -1;
      if (b === "all") return 1;
      return a.localeCompare(b);
    });
  }, [songs]);

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.composer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || song.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [songs, searchTerm, selectedCategory]);

  const handleClearPlaylist = () => {
    if (
      window.confirm(
        `Are you sure you want to clear all ${playlist.length} songs from your favourites list?`
      )
    ) {
      clearPlaylist();
    }
  };

  const startEditingTitle = () => {
    setIsEditingTitle(true);
    setTempTitle(playlistTitle);
  };

  const saveTitle = () => {
    setPlaylistTitle(tempTitle);
    setIsEditingTitle(false);
  };

  // --- Export functions ---

  const exportToPDF = () => {
    const printContent = `
    <html>
      <head>
        <title>${escapeHtml(playlistTitle)}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          h1 {
            color: #1e293b;
            margin-bottom: 5px;
          }
          h2 {
            color: #475569;
            font-size: 14px;
            font-weight: normal;
            margin-bottom: 20px;
          }
          .song {
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .song-title {
            font-weight: bold;
            font-size: 14px;
          }
          .song-composer {
            color: #64748b;
            font-size: 12px;
          }
          .song-category {
            color: #94a3b8;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(playlistTitle)}</h1>
        <h2>${typeLabel} Repertoire</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Total Songs: ${playlist.length}</p>
        ${playlist
          .map(
            (song, index) => `
          <div class="song">
            <div class="song-title">${index + 1}. ${escapeHtml(song.title)}</div>
            <div class="song-composer">${escapeHtml(song.composer)}</div>
            <div class="song-category">${escapeHtml(song.category)}</div>
          </div>
        `
          )
          .join("")}
      </body>
    </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const exportToWord = () => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>${escapeHtml(playlistTitle)}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #333;
            }
            h1 {
              color: #1e293b;
              margin-bottom: 5px;
            }
            h2 {
              color: #475569;
              font-size: 14px;
              font-weight: normal;
              margin-bottom: 20px;
            }
            .info {
              color: #64748b;
              font-size: 12px;
              margin-bottom: 20px;
            }
            .song {
              padding: 8px 0;
              border-bottom: 1px solid #e2e8f0;
              page-break-inside: avoid;
            }
            .song-number {
              color: #94a3b8;
              font-size: 12px;
              margin-right: 8px;
            }
            .song-title {
              font-weight: bold;
              font-size: 14px;
            }
            .song-composer {
              color: #64748b;
              font-size: 12px;
            }
            .song-category {
              color: #94a3b8;
              font-size: 11px;
            }
          </style>
        </head>
        <body>
          <h1>${escapeHtml(playlistTitle)}</h1>
          <h2>${typeLabel} Repertoire</h2>
          <div class="info">
            <p>${typeLabel} Repertoire Playlist</p>
            <p>Total Songs: ${playlist.length}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          ${playlist
            .map(
              (song, index) => `
            <div class="song">
              <span class="song-number">${index + 1}.</span>
              <div class="song-title">${escapeHtml(song.title)}</div>
              <div class="song-composer">Composer: ${escapeHtml(song.composer)}</div>
              <div class="song-category">Category: ${escapeHtml(song.category)}</div>
            </div>
          `
            )
            .join("")}
        </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", htmlContent], {
      type: "application/msword",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${playlistTitle.replace(/\s+/g, "_")}_Playlist.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isInPlaylist = (songId: string) =>
    playlist.some((s) => s.id === songId);

  const toggleSong = (song: Song) => {
    if (isInPlaylist(song.id)) {
      removeFromPlaylist(song.id);
    } else {
      addToPlaylist(song);
    }
  };

  // --- Render ---

  return (
    <section id={id} className="min-h-screen bg-slate-800 pb-8 md:pb-16">
      {/* Header */}
      <SlideIn>
        <div className="text-center my-6 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-yellow-100 mb-4 pt-20 md:pt-28">
            {title}
          </h2>
          <p className="text-sm md:text-lg text-gray-400 mx-auto font-sans">
            Browse our collection • Click the song to add to your favourites
          </p>
        </div>
      </SlideIn>

      <div className="flex flex-row px-4 md:px-8 gap-4 pb-4">
        {/* Search and Filter Bar */}
        <div className="flex flex-1 flex-col sm:flex-row gap-4 items-end">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search songs or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm font-sans"
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none text-sm font-sans"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Playlist Button */}
        <div className="flex flex-col items-center justify-end">
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-3 rounded-lg transition-colors font-sans text-xs md:text-sm ${
              showPlaylist
                ? "bg-yellow-500 text-slate-900"
                : "bg-slate-700 text-yellow-500 border border-yellow-500/30 hover:bg-slate-600"
            }`}
          >
            <Music className="h-5 w-5" />
            <span>Favourites</span>
            {playlist.length > 0 && (
              <span className="bg-yellow-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {playlist.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Songs count */}
      <div className="px-8 pb-2 text-gray-500 text-xs font-sans">
        Showing {filteredSongs.length} of {songs.length} songs
      </div>

      {/* Main content area */}
      <div className="flex px-4 md:px-8 gap-4">
        {/* Song List */}
        <div className="flex-1 max-h-[65vh] overflow-y-auto custom-scroll border border-slate-700/50 rounded-lg">
          {filteredSongs.length === 0 ? (
            <div className="text-center py-12">
              <Music className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-sans">No songs found</p>
              <p className="text-gray-500 text-sm font-sans">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            filteredSongs.map((song) => {
              const inPlaylist = isInPlaylist(song.id);
              return (
                <div
                  key={song.id}
                  className={`song-card flex items-center gap-3 p-3 cursor-pointer transition-all border-b border-slate-700/50 text-sm ${
                    inPlaylist
                      ? "bg-yellow-500/5 border-l-2 border-l-yellow-500"
                      : "hover:bg-slate-700/30"
                  }`}
                  onClick={() => toggleSong(song)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold truncate font-sans text-sm">
                        {song.title}
                      </span>
                      <span
                        className={`text-gray-400 ${song.composer ? "mr-3" : ""}`}
                      >
                        {song.composer ? "-" : ""}
                      </span>
                      <span className="text-gray-400 truncate font-sans text-sm">
                        {song.composer}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-sans">
                      {song.category}
                    </span>
                  </div>
                  {inPlaylist ? (
                    <CircleCheck className="h-6 w-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-600 flex-shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Playlist Sidebar */}
        {showPlaylist && (
          <div
            ref={playlistSidebarRef}
            className="w-full md:w-96 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-4 max-h-[65vh] flex flex-col fixed md:relative bottom-0 left-0 right-0 md:top-0 z-50 md:z-auto"
          >
            {/* Playlist Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Music className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                {isEditingTitle ? (
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <input
                      type="text"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      className="flex-1 px-2 py-1 border-1 bg-slate-700 border-yellow-100 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      onKeyDown={(e) => e.key === "Enter" && saveTitle()}
                      placeholder="Favourite Songs"
                    />
                    <button
                      onClick={saveTitle}
                      className="p-1 text-green-500 hover:text-green-400"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 min-w-0">
                    <h3 className="font-bold text-yellow-100 truncate text-sm font-sans">
                      {playlistTitle}
                    </h3>
                    <button
                      onClick={startEditingTitle}
                      className="p-1 text-gray-400 hover:text-yellow-500 flex-shrink-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowPlaylist(false)}
                className="p-1 text-gray-400 hover:text-white ml-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Playlist Content */}
            {playlist.length === 0 ? (
              <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
                <Music className="h-8 w-8 text-gray-600 mb-2" />
                <p className="text-gray-400 text-sm font-sans">
                  No songs in your favourites yet
                </p>
                <p className="text-gray-500 text-xs font-sans">
                  Click on songs to add them
                </p>
              </div>
            ) : (
              <>
                {/* Export buttons */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={exportToPDF}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 text-yellow-500 rounded text-xs hover:bg-slate-600 transition-colors font-sans"
                  >
                    <Download className="h-3 w-3" />
                    PDF
                  </button>
                  <button
                    onClick={exportToWord}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 text-yellow-500 rounded text-xs hover:bg-slate-600 transition-colors font-sans"
                  >
                    <FileText className="h-3 w-3" />
                    Word
                  </button>
                  <button
                    onClick={handleClearPlaylist}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-900/30 text-red-400 rounded text-xs hover:bg-red-900/50 transition-colors ml-auto font-sans"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                </div>

                {/* Playlist songs */}
                <div className="flex-1 overflow-y-auto custom-scroll">
                  {playlist.map((song, index) => (
                    <div
                      key={song.id}
                      className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded group"
                    >
                      <span className="text-gray-500 text-xs w-6 text-right font-sans">
                        {index + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate font-sans">
                          {song.title}
                        </p>
                        <p className="text-gray-400 text-xs truncate font-sans">
                          {song.composer}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromPlaylist(song.id)}
                        className="p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Playlist footer */}
                <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-gray-400 text-center font-sans">
                  {playlist.length} song{playlist.length !== 1 ? "s" : ""} in
                  your favourites
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RepertoirePlaylistBase;
