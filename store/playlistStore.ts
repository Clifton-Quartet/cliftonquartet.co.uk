import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Song {
  title: string;
  composer: string;
  category: string;
  id: string;
}

export interface PlaylistState {
  quartetPlaylist: Song[];
  trioPlaylist: Song[];
  quartetPlaylistTitle: string;
  trioPlaylistTitle: string;

  // Actions
  setQuartetPlaylist: (songs: Song[]) => void;
  setTrioPlaylist: (songs: Song[]) => void;
  setQuartetPlaylistTitle: (title: string) => void;
  setTrioPlaylistTitle: (title: string) => void;
  addToQuartetPlaylist: (song: Song) => void;
  addToTrioPlaylist: (song: Song) => void;
  removeFromQuartetPlaylist: (songId: string) => void;
  removeFromTrioPlaylist: (songId: string) => void;
  clearQuartetPlaylist: () => void;
  clearTrioPlaylist: () => void;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      quartetPlaylist: [],
      trioPlaylist: [],
      quartetPlaylistTitle: "Favourite Songs",
      trioPlaylistTitle: "Favourite Songs",

      setQuartetPlaylist: (songs: Song[]) => set({ quartetPlaylist: songs }),

      setTrioPlaylist: (songs: Song[]) => set({ trioPlaylist: songs }),

      setQuartetPlaylistTitle: (title: string) =>
        set({ quartetPlaylistTitle: title }),

      setTrioPlaylistTitle: (title: string) =>
        set({ trioPlaylistTitle: title }),

      addToQuartetPlaylist: (song: Song) => {
        const { quartetPlaylist } = get();
        if (!quartetPlaylist.find((s) => s.id === song.id)) {
          set({ quartetPlaylist: [...quartetPlaylist, song] });
        }
      },

      addToTrioPlaylist: (song: Song) => {
        const { trioPlaylist } = get();
        if (!trioPlaylist.find((s) => s.id === song.id)) {
          set({ trioPlaylist: [...trioPlaylist, song] });
        }
      },

      removeFromQuartetPlaylist: (songId: string) => {
        const { quartetPlaylist } = get();
        set({
          quartetPlaylist: quartetPlaylist.filter((s) => s.id !== songId),
        });
      },

      removeFromTrioPlaylist: (songId: string) => {
        const { trioPlaylist } = get();
        set({ trioPlaylist: trioPlaylist.filter((s) => s.id !== songId) });
      },

      clearQuartetPlaylist: () => set({ quartetPlaylist: [] }),
      clearTrioPlaylist: () => set({ trioPlaylist: [] }),
    }),
    {
      name: "playlist-storage",
      partialize: (state) => ({
        quartetPlaylist: state.quartetPlaylist,
        trioPlaylist: state.trioPlaylist,
        quartetPlaylistTitle: state.quartetPlaylistTitle,
        trioPlaylistTitle: state.trioPlaylistTitle,
      }),
    }
  )
);
