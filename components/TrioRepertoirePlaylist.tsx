"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Music,
  Plus,
  X,
  Download,
  FileText,
  Edit2,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

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

  // Pagination logic
  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

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
    <div className="container mx-auto px-4 py-8 min-h-[100dvh]">
      <h1 className="text-3xl lg:text-6xl uppercase font-serif font-bold mb-8 text-center text-yellow-900">
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
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-900"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by title or composer..."
                className="w-full pl-10 pr-4 py-2 border text-slate-900 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-slate-400" />
                <select
                  className="px-4 py-2 border border-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-amber-50">
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg hover:bg-slate-500 transition-colors cursor-pointer text-[#fcf2bd]"
              >
                <Music size={20} />
                Playlist ({playlist.length})
              </button>
            </div>
          </div>
        </>
      )}

      {/* Results Count */}
      <p className="mb-4 text-gray-600">
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, filteredSongs.length)} of{" "}
        {filteredSongs.length} songs
      </p>

      {/* Songs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
        {paginatedSongs.map((song) => (
          <div
            key={song.id}
            className="song-card shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="song-gradient flex flex-col justify-between p-6">
              <div>
                <h3 className="text-xl text-gray-100 font-semibold mb-2">
                  {song.title}
                </h3>
                <p className="text-gray-100 mb-2">{song.composer}</p>
                <p className="text-sm text-gray-100 mb-4">{song.category}</p>
              </div>
              <button
                onClick={() => addToPlaylist(song)}
                className="w-full flex items-center justify-center gap-2 bg-[#fcf2bd] text-slate-900 py-2 rounded-lg hover:opacity-80 transition-colors cursor-pointer"
                disabled={playlist.find((s) => s.id === song.id) !== undefined}
              >
                {playlist.find((s) => s.id === song.id) ? (
                  <Minus size={16} />
                ) : (
                  <Plus size={16} />
                )}
                {playlist.find((s) => s.id === song.id)
                  ? "Remove"
                  : "Add to Playlist"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-8">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 bg-slate-900 rounded-lg hover:bg-slate-500 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex gap-1">
            {/* Always show first page */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="px-3 py-2 rounded-lg bg-slate-500 hover:bg-slate-900 text-white cursor-pointer"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-2 py-2 text-slate-900 cursor-pointer">
                    ...
                  </span>
                )}
              </>
            )}

            {/* Show pages around current page */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === currentPage ||
                  page === currentPage - 1 ||
                  page === currentPage + 1 ||
                  page === currentPage - 2 ||
                  page === currentPage + 2
                );
              })
              .filter((page) => page > 0 && page <= totalPages)
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg cursor-pointer ${
                    page === currentPage
                      ? "bg-slate-900 text-white"
                      : "text-slate-900 hover:bg-slate-300 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}

            {/* Always show last page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 py-2 text-slate-900">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-300 cursor-pointer"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 bg-slate-900 rounded-lg hover:bg-slate-500 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Playlist Sidebar */}
      {showPlaylist && (
        <div className="custom-scroll fixed right-0 top-0 h-full w-96 bg-amber-50 shadow-xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 flex-1 text-black">
                {isEditingTitle ? (
                  <>
                    <input
                      type="text"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      className="flex-1 px-2 py-1 border  border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                      onKeyPress={(e) => e.key === "Enter" && saveTitle()}
                      placeholder="Favourite Songs"
                    />
                    <button
                      onClick={saveTitle}
                      className="text-green-500 hover:text-green-700 cursor-pointer"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={cancelEditingTitle}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{playlistTitle}</h2>
                    <button
                      onClick={startEditingTitle}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      <Edit2 size={20} />
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowPlaylist(false)}
                className="text-gray-500 hover:text-gray-700 ml-2 cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {playlist.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No songs in playlist yet. Add songs from the repertoire.
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {playlist.map((song, index) => (
                    <div
                      key={song.id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-500 font-mono text-sm">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-600">
                          {song.title}
                        </h4>
                        <p className="text-sm text-gray-600">{song.composer}</p>
                        <p className="text-xs text-gray-500">{song.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromPlaylist(song.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
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
                    Export to Word
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrioRepertoirePlaylist;
