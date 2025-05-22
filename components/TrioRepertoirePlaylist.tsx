"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Music,
  X,
  Download,
  FileText,
  Edit2,
  Check,
} from "lucide-react";
import { Content } from "@prismicio/client";

// Define types for props
interface RepertoirePlaylistProps {
  trioRepertoire: Content.StringTrioRepertoireDocument[];
}

// Define the Song interface
interface Song {
  title: string;
  composer: string;
  category: string;
  id: string;
}

// Define types for the repertoire data structure
interface RepertoireSong {
  song_title: string;
  composer?: string;
}

interface RepertoireData {
  classical?: RepertoireSong[];
  popular_songs?: RepertoireSong[];
  lighter_repertoire?: RepertoireSong[];
}

const TrioRepertoirePlaylist: React.FC<RepertoirePlaylistProps> = ({
  trioRepertoire,
}) => {
  // Transform the repertoire documents into the Song format
  const songs = useMemo(() => {
    const allSongs: Song[] = [];
    let idCounter = 0;

    // Category mapping for better display names
    const categoryMap: Record<string, string> = {
      classical: "Classical",
      popular_songs: "Popular Songs",
      lighter_repertoire: "Lighter Repertoire",
    };

    if (trioRepertoire) {
      trioRepertoire.forEach((doc) => {
        const data = doc.data as RepertoireData;

        // Iterate through each category in the data
        Object.entries(data).forEach(([categoryKey, songs]) => {
          if (Array.isArray(songs)) {
            songs.forEach((song) => {
              if (song.song_title) {
                allSongs.push({
                  id: `${categoryKey}-${idCounter++}`,
                  title: song.song_title,
                  composer: song.composer || "",
                  category: categoryMap[categoryKey] || categoryKey,
                });
              }
            });
          }
        });
      });
    }

    return allSongs;
  }, [trioRepertoire]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("Favourite Songs");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(playlistTitle);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlaylist = localStorage.getItem("stringTrioPlaylist");
    const savedTitle = localStorage.getItem("stringTrioPlaylistTitle");

    if (savedPlaylist) {
      try {
        setPlaylist(JSON.parse(savedPlaylist));
      } catch (e) {
        console.error("Error loading playlist from localStorage:", e);
      }
    }

    if (savedTitle) {
      setPlaylistTitle(savedTitle);
      setTempTitle(savedTitle);
    }
  }, []);

  // Save to localStorage whenever playlist or title changes
  useEffect(() => {
    localStorage.setItem("stringTrioPlaylist", JSON.stringify(playlist));
  }, [playlist]);

  useEffect(() => {
    localStorage.setItem("stringTrioPlaylistTitle", playlistTitle);
  }, [playlistTitle]);

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

  const addToPlaylist = (song: Song) => {
    if (!playlist.find((s) => s.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const removeFromPlaylist = (songId: string) => {
    setPlaylist(playlist.filter((s) => s.id !== songId));
  };

  const startEditingTitle = () => {
    setIsEditingTitle(true);
    setTempTitle(playlistTitle);
  };

  const saveTitle = () => {
    setPlaylistTitle(tempTitle);
    setIsEditingTitle(false);
  };

  const cancelEditingTitle = () => {
    setTempTitle(playlistTitle);
    setIsEditingTitle(false);
  };

  const exportToPDF = () => {
    // Create a printable version of the playlist
    const printContent = `
    <html>
      <head>
        <title>${playlistTitle}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
          }
          h1 {
            color: #333;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .song {
            margin: 10px 0;
            padding: 10px;
            border-bottom: 1px solid #eee;
          }
          .song-title {
            font-weight: bold;
            font-size: 16px;
          }
          .song-composer {
            color: #666;
            font-size: 14px;
          }
          .song-category {
            color: #999;
            font-size: 12px;
            font-style: italic;
          }
          @media print {
            body { margin: 20px; }
          }
        </style>
      </head>
      <body>
        <h1>${playlistTitle}</h1>
        <h2>String Trio Repertoire</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Total Songs: ${playlist.length}</p>
        <hr />
        ${playlist
          .map(
            (song, index) => `
          <div class="song">
            <div class="song-title">${index + 1}. ${song.title}</div>
            <div class="song-composer">${song.composer}</div>
            <div class="song-category">${song.category}</div>
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
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const exportToWord = () => {
    // Create Word document content with proper formatting
    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>${playlistTitle}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
            }
            h1 {
              color: #333;
              font-size: 24pt;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .info {
              color: #666;
              font-size: 12pt;
              margin-bottom: 20px;
            }
            .song {
              margin: 15px 0;
              page-break-inside: avoid;
            }
            .song-number {
              font-weight: bold;
              font-size: 12pt;
              color: #333;
            }
            .song-title {
              font-weight: bold;
              font-size: 14pt;
              color: #000;
              margin-bottom: 5px;
            }
            .song-composer {
              font-size: 12pt;
              color: #666;
              font-style: italic;
            }
            .song-category {
              font-size: 10pt;
              color: #999;
              margin-top: 3px;
            }
          </style>
        </head>
        <body>
          <h1>${playlistTitle}</h1>
          <h2>String Trio Repertoire</h2>
          <div class="info">
            <p>String Quartet Repertoire Playlist</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
            <p>Total Songs: ${playlist.length}</p>
          </div>
          <hr />
          ${playlist
            .map(
              (song, index) => `
            <div class="song">
              <span class="song-number">${index + 1}.</span>
              <div class="song-title">${song.title}</div>
              <div class="song-composer">Composer: ${song.composer}</div>
              <div class="song-category">Category: ${song.category}</div>
            </div>
          `
            )
            .join("")}
        </body>
      </html>
    `;

    // Create blob with Word-specific MIME type
    const blob = new Blob([wordContent], {
      type: "application/msword",
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${playlistTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_playlist.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-4 py-8 min-h-[100dvh]">
      <h1 className="text-2xl my-8 lg:text-5xl uppercase font-serif font-bold text-center text-yellow-100">
        String Trio Repertoire
      </h1>

      {songs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading repertoire...</p>
        </div>
      ) : (
        <>
          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="relative w-full lg:w-1/3 mx-auto">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-100"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by title or composer..."
                className="w-full pl-10 pr-4 py-2 border text-yellow-100 border-yellow-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center mx-auto w-full min-md:w-2xl min-lg:w-3xl min-xl:w-4xl min-2xl:w-5xl">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-yellow-100" />
                <select
                  className="px-4 py-2 border border-yellow-100 text-yellow-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-900">
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg border-2 border-yellow-100 hover:bg-yellow-900 transition-colors cursor-pointer text-yellow-100"
              >
                <Music size={20} />
                Favourites ({playlist.length})
              </button>
            </div>
          </div>
        </>
      )}

      {/* Results Count */}
      <p className="mb-4 text-yellow-100 w-full min-md:w-2xl min-lg:w-3xl min-xl:w-4xl min-2xl:w-5xl mx-auto">
        Showing {filteredSongs.length} of {songs.length} songs
      </p>

      {/* Songs Grid */}
      <div className="mb-8 flex flex-col items-center">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="song-card shadow-md hover:shadow-lg w-full min-md:w-2xl min-lg:w-3xl min-xl:w-4xl min-2xl:w-5xl transition-shadow mb-2"
          >
            <div className="song-gradient flex justify-between items-center px-3 py-1">
              <div>
                <div className="flex items-center mb-1">
                  <p className="text-gray-100 mr-3">{song.composer}</p>
                  <h3 className="text-lg text-gray-100 font-semibold">
                    {song.title}
                  </h3>
                </div>
                <p className="text-sm text-yellow-100">{song.category}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    const isInPlaylist =
                      playlist.find((s) => s.id === song.id) !== undefined;
                    if (isInPlaylist) {
                      removeFromPlaylist(song.id);
                    } else {
                      addToPlaylist(song);
                    }
                  }}
                  className="flex items-center justify-center gap-1 lg:gap-2 font-semibold bg-yellow-200 text-yellow-900 py-2 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer px-3"
                >
                  <span className="sm:hidden">
                    {playlist.find((s) => s.id === song.id) ? "Remove" : "Add"}
                  </span>
                  <span className="hidden sm:inline">
                    {playlist.find((s) => s.id === song.id)
                      ? "Remove from favourites"
                      : "Add to favourites"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Playlist Sidebar */}
      {showPlaylist && (
        <div className="custom-scroll fixed right-0 top-0 h-full w-96 bg-yellow-50 border-l border-yellow-300 shadow-xl z-50 overflow-y-auto">
          <div className="flex justify-between items-start mb-6 bg-slate-900">
            <div className="flex items-start justify-between gap-2 flex-1 text-yellow-100 p-2 w-8 overflow-hidden overflow-x-auto">
              {isEditingTitle ? (
                <>
                  <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="flex-1 px-2 py-1 border-1 border-yellow-100 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onKeyPress={(e) => e.key === "Enter" && saveTitle()}
                    placeholder="Favourite Songs"
                  />
                  <button
                    onClick={saveTitle}
                    className="text-green-500 hover:text-green-700 cursor-pointer p-1"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={cancelEditingTitle}
                    className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{playlistTitle}</h2>
                  <button
                    onClick={startEditingTitle}
                    className="flex gap-1 text-white hover:text-slate-300 cursor-pointer p-1"
                  >
                    <Edit2 size={20} />
                    <span>Edit</span>
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => setShowPlaylist(false)}
              className="text-white hover:text-slate-300 p-2 cursor-pointer"
            >
              <X size={32} />
            </button>
          </div>

          {playlist.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              You don&apos;t have favourite songs yet. Add your favourite songs
              from the repertoire.
            </p>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {playlist.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-start gap-3 p-3 bg-white border border-yellow-300 rounded-lg mx-2"
                  >
                    <span className="text-gray-500 font-mono text-sm">
                      {index + 1}.
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">
                        {song.title}
                      </h4>
                      <p className="text-sm text-slate-700">{song.composer}</p>
                      <p className="text-xs text-gray-400">{song.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromPlaylist(song.id)}
                      className="text-slate-500 hover:text-slate-700 cursor-pointer p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mx-2 mb-6">
                <button
                  onClick={exportToPDF}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-500 transition-colors cursor-pointer"
                >
                  <Download size={20} />
                  Export to PDF
                </button>

                <button
                  onClick={exportToWord}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-500 transition-colors cursor-pointer"
                >
                  <FileText size={20} />
                  Export to Word doc
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TrioRepertoirePlaylist;
