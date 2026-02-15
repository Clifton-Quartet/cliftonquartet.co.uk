"use client";

import React, { useMemo } from "react";
import { Content } from "@prismicio/client";
import { usePlaylistStore, Song } from "../store/playlistStore";
import RepertoirePlaylistBase from "./RepertoirePlaylistBase";

// Define types for props
interface RepertoirePlaylistProps {
  trioRepertoire: Content.StringTrioRepertoireDocument[];
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

// Category mapping for better display names
const categoryMap: Record<string, string> = {
  classical: "Classical",
  popular_songs: "Popular Songs",
  lighter_repertoire: "Lighter Repertoire",
};

// Category priority order (lower number = higher priority)
const categoryPriority: Record<string, number> = {
  "Popular Songs": 1,
  "Lighter Repertoire": 2,
  Classical: 3,
};

const TrioRepertoirePlaylist: React.FC<RepertoirePlaylistProps> = ({
  trioRepertoire,
}) => {
  const {
    trioPlaylist,
    trioPlaylistTitle,
    setTrioPlaylistTitle,
    addToTrioPlaylist,
    removeFromTrioPlaylist,
    clearTrioPlaylist,
  } = usePlaylistStore();

  // Transform the repertoire documents into the Song format
  const songs = useMemo(() => {
    const allSongs: Song[] = [];
    let idCounter = 0;

    if (trioRepertoire) {
      trioRepertoire.forEach((doc) => {
        const data = doc.data as RepertoireData;

        Object.entries(data).forEach(([categoryKey, songs]) => {
          if (Array.isArray(songs)) {
            songs.forEach((song) => {
              if (song.song_title) {
                allSongs.push({
                  id: `trio-${categoryKey}-${idCounter++}`,
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

    return allSongs.sort((a, b) => {
      const priorityA = categoryPriority[a.category] || 999;
      const priorityB = categoryPriority[b.category] || 999;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return a.title.localeCompare(b.title);
    });
  }, [trioRepertoire]);

  return (
    <RepertoirePlaylistBase
      title="String Trio Repertoire"
      typeLabel="String Trio"
      id="trioplaylist"
      songs={songs}
      playlist={trioPlaylist}
      playlistTitle={trioPlaylistTitle}
      setPlaylistTitle={setTrioPlaylistTitle}
      addToPlaylist={addToTrioPlaylist}
      removeFromPlaylist={removeFromTrioPlaylist}
      clearPlaylist={clearTrioPlaylist}
    />
  );
};

export default TrioRepertoirePlaylist;
