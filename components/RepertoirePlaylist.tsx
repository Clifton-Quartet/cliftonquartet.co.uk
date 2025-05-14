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
} from "lucide-react";

// Define the Song interface
interface Song {
  title: string;
  composer: string;
  category: string;
  id: string;
}

// Parse the repertoire data
const parseRepertoireData = (): Song[] => {
  const repertoire: Song[] = [];
  let id = 0;

  // Classical Section
  const classicalData = `
Albeniz - Tango
Bach - Air on a G String, Arioso, Wachet Auf, Jesu Joy of Man's Desiring, Sheep may safely graze, Brandenburg Concerto No 3 & No 4, Concerto for two violins, Badinerie
Beethoven - Ode to Joy, Adagio Cantabile (Pathetique Sonata), Minuet
Bizet - Prelude to Carmen, Entracte from Carmen
Boccherini - Minuet and Trio, La Musica notturna di Madrid
Borodin - Polotsvian Dances
Boyce - Symphonies
Charpentier - Prelude to Te Deum
Clarke - Trumpet Voluntary
Corelli - Concerto Grossi, Christmas Concerto
Debussy - Gollywoggs Cake-walk
Delibes - Flower Duet from Lakme, Copelia Medley
Dvorak - Humoresque
Elgar - Nimrod, Salut D'Amour, Chanson de Matin
Franck - Panis Angelicus
Gershwin - I Got Rhythm, Rhapsody in Blue, American in Paris
Grainger - Molly on the Shore
Grieg - Wedding Day at Troldhaugen, Morning from 'Peer Gynt', Norwegian Dance No 3
Handel - Aria from Xerxes, Arrival of the Queen of Sheba, Departure of the Queen of Sheba, Water Music Suite, Sirens Song from Rinaldo, All we like sheep
Haydn - Various String Quartets
Jenkins - Palladio
Liszt - Liebestraum
Mascagni - Cavalira Rusticana
Massenet - Meditation
Mendelssohn - Wedding March
Monti - Czardas
Mouret - Rondeau
Mozart - Three Divertimento, Eine Kleine Nachtmusik, Laudate Dominum, Sull' aria, Various String Quartets, Andante from Piano Concerto 21, Alleluja from Exultate Jubilate, A Musical Joke, Ave Verum, Various String Quartets, Il Seraglio Overture
Offenbach - Barcarolle
Pachelbel - Canon and Gigue
Ponchelli - Dance of the Hours
Purcell - Chaconny, Trumpet Tune, Dido's Lament, Music for a While, Rondeaux
Puccini - O mio babinno caro
Rachmaninoff - Vocalise
Saint-Saens - The Swan
Satie - Gymnopedie
Schubert - Ave Maria, Standchen, Moment Musicale
Schumann - Traumeri
Strauss - Pizzicato Polka, Radetzky March, Wine Women & Song
Sullivan - Three Little Maids from School
Tavener - The Lamb
Tchaikovsky - Music from Nutcracker Suite, Sleeping Beauty Waltz
Verdi - La Forza del Destino, Libiamo from La Traviata
Vivaldi - Four Seasons
Vivaldi arr Richter - Spring
Wagner - Wedding March
`;

  // Parse classical pieces
  classicalData
    .trim()
    .split("\n")
    .forEach((line) => {
      const [composer, pieces] = line.split(" - ");
      if (composer && pieces) {
        pieces.split(", ").forEach((piece) => {
          repertoire.push({
            id: `classical-${id++}`,
            title: piece.trim(),
            composer: composer.trim(),
            category: "Classical",
          });
        });
      }
    });

  // Popular Arrangements
  const popularData = `
The Girl from Ipanema
Palladio
I do like to be beside the seaside
Greensleeves
Reel Fiddlin' (Folk Medley)
English Country Gardens
Irish Sherry (Irish Medley)
Cock Linnet (Cockney Medley)
Carpenters Selection
Annie's Song
Gabriel's Oboe
Fiddle Faddle
Plink, Plank, Plunk
The Typewriter
Blue Tango
Love and Marriage
Moondance
Ashokan Farewell
By the sleepy lagoon
As Time goes by
Morenita do Brazil
Scarborough Fair
Jerome Kern Medley
Just another Rhumba
Unchained Melody
Bridge over troubled water
Charade
You've got a friend
Food Glorious Food
Your Song
A fine romance
Abba Medley
Moonlight and Roses
Kalinka
Speak softly love
For he's a jolly good fellow
Happy Birthday
Various Christmas Carols
White Christmas
`;

  // Parse popular arrangements
  popularData
    .trim()
    .split("\n")
    .forEach((line) => {
      if (line.trim()) {
        repertoire.push({
          id: `popular-${id++}`,
          title: line.trim(),
          composer: "Traditional/Various",
          category: "Popular Arrangements",
        });
      }
    });

  // Beatles section
  const beatlesData = `
Yesterday
Eleanor Rigby
When I'm 64
Norwegian Wood
Michelle
Here comes the Sun
All you need is love
`;

  beatlesData
    .trim()
    .split("\n")
    .forEach((line) => {
      if (line.trim()) {
        repertoire.push({
          id: `beatles-${id++}`,
          title: line.trim(),
          composer: "Beatles",
          category: "Beatles",
        });
      }
    });

  // Rags section
  const ragsData = `
Peacherine Rag
Roseleaf Rag
Entertainer
Country Club
Paragon Rag
`;

  ragsData
    .trim()
    .split("\n")
    .forEach((line) => {
      if (line.trim()) {
        repertoire.push({
          id: `rags-${id++}`,
          title: line.trim(),
          composer: "Scott Joplin",
          category: "Rags",
        });
      }
    });

  // Jazz Classics
  const jazzData = `
Makin' Whoopee
Lullaby of Birdland
Let's do it
Fly me to the Moon
Gershwin – The Man I Love, But not for me, Embraceable you
Anything Goes
Every time we say goodbye
Cole Porter - You're the top
Misty
Don't get around much anymore
Everytime We Say Goodbye
`;

  jazzData
    .trim()
    .split("\n")
    .forEach((line) => {
      if (line.trim()) {
        const specialGershwin = line.includes("Gershwin");
        const specialPorter = line.includes("Cole Porter");

        if (specialGershwin) {
          const songs = line.split("–")[1].split(",");
          songs.forEach((song) => {
            repertoire.push({
              id: `jazz-${id++}`,
              title: song.trim(),
              composer: "Gershwin",
              category: "Jazz Classics",
            });
          });
        } else if (specialPorter) {
          repertoire.push({
            id: `jazz-${id++}`,
            title: "You're the top",
            composer: "Cole Porter",
            category: "Jazz Classics",
          });
        } else {
          repertoire.push({
            id: `jazz-${id++}`,
            title: line.trim(),
            composer: "Various",
            category: "Jazz Classics",
          });
        }
      }
    });

  // Film and Show Songs
  const filmShowData = `
James Bond Theme
Somewhere over the rainbow
Jeeves and Wooster Theme Tune
My Heart will go on
Meggie's theme from the Thorn Birds
Theme form Love Story
The music of the night
Selection from My Fair Lady
Theme from Fawlty Towers
Selections from 'Pirates of Penzance'
Selections from 'Mikado'
I Know Him So Well
I Dreamed a Dream
A Whole New World
Don't Cry For Me Argentina
Schindler's List
Theme from E.T.
Speak Softly Love (theme from The Godfather)
All I ask of You
Moon River
The Kiss – Last of the Mohicans
Theme from Jurassic Park
Tonight & Somewhere (West Side Story)
I don't know how to love him
Everybody wants to be a cat
Imperial March (Star Wars)
The Ludlows (Legends of the fall)
Somewhere my love (Lara's theme)
Somewhere in time (Barry)
Kissing you (Romeo & Juliet)
Brave medley
Home alone medley
Now we are free (Gladiator)
Pirates of the Carribean medley
Game of Thrones theme
Downton Abbey theme
`;

  filmShowData
    .trim()
    .split("\n")
    .forEach((line) => {
      if (line.trim()) {
        repertoire.push({
          id: `film-${id++}`,
          title: line.trim(),
          composer: "Various",
          category: "Film and Show Songs",
        });
      }
    });

  // Rock & Pop section
  const rockPopData = `
Shine - Take That
Nothing Else Matters - Metallica
I'm yours - Mraz
Bittersweet Symphony - The Verve
Viva la Vida - Coldplay
Your song - Elton John
Don't stop believin' - Journey
Hoppipolla - Sigur Ros
Kissing you - Des'ree
Clocks - Coldplay
Hallelujah - Cohen
Imagine - Lennon
Can't help falling in love - Weiss
The one I love - David Gray
Ho Hey - The Lumineers
Better together - Johnson
God only knows - Beach boys
On the nature of daylight - Richter
All you need is love - Beatles
You've got a friend - Carole King
Marry you - Bruno Mars
Best day of my life - American Authors
Stand by me - King
A thousand years - Perri
To build a home - Cinematic orchestra
Stay with me - Sam Smith
Nightswimming - REM
Sky full of stars - Coldplay
Cowboy take me away - The Chicks
Bad Guy - Billie Eilish
Beautiful Day - U2
Chasing Cars - Snow Patrol
City of Stars from la La Land - Hurwitz, Pasek, Paul
Dance the night away - Dua Lipa
Fly me to the moon - Frank Sinatra
Friday I'm in love - The Cure
Get Lucky - Daft Punk
Halo - Beyonce
How long will I love you - Ellie Goulding
If I ain't got you - Alicia Keys
I will always love you - Whitney Houston
Karma - Taylor Swift
Levitating - Dua Lipa
Love on top - Beyonce
Material girl - Madonna
Murder on the dance floor - Sophie Ellis-Bextor
Sign of the times - Harry Styles
Skyfall - Adele
A sky full of stars - Coldplay
Wildest Dreams - Taylor Swift
Wrecking Ball - Miley Cyrus
`;

  rockPopData
    .trim()
    .split("\n")
    .forEach((line) => {
      if (line.trim()) {
        const [title, artist] = line.split(" - ");
        repertoire.push({
          id: `rock-${id++}`,
          title: title.trim(),
          composer: artist ? artist.trim() : "Various",
          category: "Rock & Pop",
        });
      }
    });

  return repertoire;
};

const RepertoirePage: React.FC = () => {
  const songs = useMemo(() => parseRepertoireData(), []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("Favourite Songs");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(playlistTitle);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlaylist = localStorage.getItem("stringQuartetPlaylist");
    const savedTitle = localStorage.getItem("stringQuartetPlaylistTitle");

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
    localStorage.setItem("stringQuartetPlaylist", JSON.stringify(playlist));
  }, [playlist]);

  useEffect(() => {
    localStorage.setItem("stringQuartetPlaylistTitle", playlistTitle);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        String Quartet Repertoire
      </h1>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by title or composer..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Music size={20} />
            Playlist ({playlist.length})
          </button>
        </div>
      </div>

      {/* Results Count */}
      <p className="mb-4 text-gray-600">
        Showing {filteredSongs.length} of {songs.length} songs
      </p>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl text-gray-600 font-semibold mb-2">
              {song.title}
            </h3>
            <p className="text-gray-600 mb-2">{song.composer}</p>
            <p className="text-sm text-gray-500 mb-4">{song.category}</p>
            <button
              onClick={() => addToPlaylist(song)}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={playlist.find((s) => s.id === song.id) !== undefined}
            >
              <Plus size={16} />
              {playlist.find((s) => s.id === song.id)
                ? "Added to Playlist"
                : "Add to Playlist"}
            </button>
          </div>
        ))}
      </div>

      {/* Playlist Sidebar */}
      {showPlaylist && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 flex-1 text-black">
                {isEditingTitle ? (
                  <>
                    <input
                      type="text"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      className="flex-1 px-2 py-1 border  border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === "Enter" && saveTitle()}
                      placeholder="Favourite Songs"
                    />
                    <button
                      onClick={saveTitle}
                      className="text-green-500 hover:text-green-700"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={cancelEditingTitle}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{playlistTitle}</h2>
                    <button
                      onClick={startEditingTitle}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit2 size={20} />
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowPlaylist(false)}
                className="text-gray-500 hover:text-gray-700 ml-2"
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
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={exportToPDF}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Download size={20} />
                    Export to PDF
                  </button>

                  <button
                    onClick={exportToWord}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
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

export default RepertoirePage;
