"use client";

import React, { useMemo } from "react";
import { Content } from "@prismicio/client";
import { usePlaylistStore, Song } from "../store/playlistStore";
import RepertoirePlaylistBase from "./RepertoirePlaylistBase";

// Define types for props
interface RepertoirePlaylistProps {
  repertoire: Content.StringQuartetRepertoireDocument[];
}

// Define types for the repertoire data structure
interface RepertoireSong {
  song_title: string;
  composer?: string;
}

interface RepertoireData {
  classical?: RepertoireSong[];
  popular?: RepertoireSong[];
  beatles?: RepertoireSong[];
  rags?: RepertoireSong[];
  jazz_classics?: RepertoireSong[];
  film_and_show?: RepertoireSong[];
  rock_and_pop?: RepertoireSong[];
}

// Category mapping for better display names
const categoryMap: Record<string, string> = {
  classical: "Classical",
  popular: "Popular Arrangements",
  beatles: "Beatles",
  rags: "Rags",
  jazz_classics: "Jazz Classics",
  film_and_show: "Film and Show Songs",
  rock_and_pop: "Rock & Pop",
};

// Default composers for certain categories
const defaultComposers: Record<string, string> = {
  beatles: "Beatles",
  rags: "",
  popular: "",
  jazz_classics: "",
  film_and_show: "",
};

// Category priority order (lower number = higher priority)
const categoryPriority: Record<string, number> = {
  "Rock & Pop": 1,
  Beatles: 2,
  "Popular Arrangements": 3,
  "Jazz Classics": 4,
  "Film and Show Songs": 5,
  Rags: 6,
  Classical: 7,
};

const RepertoirePlaylist: React.FC<RepertoirePlaylistProps> = ({
  repertoire,
}) => {
  const {
    quartetPlaylist,
    quartetPlaylistTitle,
    setQuartetPlaylistTitle,
    addToQuartetPlaylist,
    removeFromQuartetPlaylist,
    clearQuartetPlaylist,
  } = usePlaylistStore();

  // Transform the repertoire documents into the Song format
  const songs = useMemo(() => {
    const allSongs: Song[] = [];
    let idCounter = 0;

    if (repertoire) {
      repertoire.forEach((doc) => {
        const data = doc.data as RepertoireData;

        Object.entries(data).forEach(([categoryKey, songs]) => {
          if (Array.isArray(songs)) {
            songs.forEach((song) => {
              if (song.song_title) {
                allSongs.push({
                  id: `quartet-${categoryKey}-${idCounter++}`,
                  title: song.song_title,
                  composer:
                    song.composer || defaultComposers[categoryKey] || "",
                  category: categoryMap[categoryKey] || categoryKey,
                });
              }
            });
          }
        });
      });
    }

    return allSongs.sort((a, b) => {
      const priorityA = categoryPriority[a.category] || 999;
      const priorityB = categoryPriority[b.category] || 999;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return a.title.localeCompare(b.title);
    });
  }, [repertoire]);

  return (
    <RepertoirePlaylistBase
      title="String Quartet Repertoire"
      typeLabel="String Quartet"
      id="quartetplaylist"
      songs={songs}
      playlist={quartetPlaylist}
      playlistTitle={quartetPlaylistTitle}
      setPlaylistTitle={setQuartetPlaylistTitle}
      addToPlaylist={addToQuartetPlaylist}
      removeFromPlaylist={removeFromQuartetPlaylist}
      clearPlaylist={clearQuartetPlaylist}
    />
  );
};

export default RepertoirePlaylist;
