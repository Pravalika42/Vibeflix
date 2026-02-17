import React, { useState } from "react";
import "./css/style.css";
import movies from "./data/movies.json";
import { fetchPoster } from "./utils/omdb";
import MovieCard from "./components/MovieCard";

async function enhanceMovie(movie) {
  const poster = await fetchPoster(movie.title);

  return {
    ...movie,
    poster:
      poster ||
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
  };
}

const moodThemes = {
  "Stardust & Portals": "linear-gradient(135deg, #f6d365, #fda085)",
  "Curiosity Nook": "linear-gradient(135deg, #b270fd, #ffe7f3)",
  "Tea & Tucked In": "linear-gradient(135deg, #fe89e9, #66ff87)",
  "Spikes & Sparks": "linear-gradient(135deg, #f02c2c, #0a0107)",
  "Bubbles & Grins": "linear-gradient(135deg, #ff9a9e, #fad0c4)",
  "Rainday Feels": "linear-gradient(135deg, #a1c4fd, #c2e9fb)"
};

const reactions = {
  cozy: "Blanket. Snacks. Zero stress.",
  rage: "Ahh yes… chaos therapy activated.",
  brainDead: "No thoughts. Just vibes.",
  dramatic: "Emotionally fragile mode detected.",
  dumbFun: "IQ decreasing entertainment selected."
};

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [movie, setMovie] = useState(null);
const [loading, setLoading] = useState(false);

const pickMovie = async (mood) => {
  const moodMovies = movies[mood];
  const randomIndex = Math.floor(Math.random() * moodMovies.length);
  const rawMovie = moodMovies[randomIndex];

  setLoading(true);

  const enhanced = await enhanceMovie(rawMovie);

  setMovie(enhanced);
  setLoading(false);
};

const toggleFavourite = (movie) => {
  const existing = JSON.parse(localStorage.getItem("favourites")) || [];

  const isSaved = existing.includes(movie.title);

  let updated;

  if (isSaved) {
    updated = existing.filter(title => title !== movie.title);
  } else {
    updated = [...existing, movie.title];
  }

  localStorage.setItem("favourites", JSON.stringify(updated));

  // Force UI refresh
  setMovie({ ...movie });
};
const handleMoodClick = (mood) => {
  setSelectedMood(mood);
  pickMovie(mood);
};

const retry = () => {
  if (selectedMood) pickMovie(selectedMood);
};


  const themeStyle = {
    background: selectedMood
      ? moodThemes[selectedMood]
      : "linear-gradient(135deg, #1d2671, #c33764)"
  };
const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
return (
  <div className="app" style={themeStyle}>
    <h1 className="title">VibeFlix 😌</h1>

    <div className="mood-grid">
      {Object.keys(movies).map((mood) => (
        <button
          key={mood}
          className="mood-btn"
          onClick={() => handleMoodClick(mood)}
        >
          {mood}
        </button>
      ))}
    </div>

    {loading ? (
      <p className="reaction">Finding your cinematic destiny… 😌</p>
    ) : (
      movie && <MovieCard movie={movie} onRetry={retry} onToggleFavourite={() => toggleFavourite(movie)} isFavourite={favourites.includes(movie.title)} />
    )}
  </div>
);
}