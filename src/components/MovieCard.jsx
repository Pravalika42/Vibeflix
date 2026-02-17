import React from "react";

export default function MovieCard({ movie, onRetry, onToggleFavourite, isFavourite }) {
  return (
    <div className="card">
      <div className="heart-row">
        <span
          className={`heart ${isFavourite ? "saved" : ""}`}
          onClick={onToggleFavourite}
        >
          ♥
        </span>
      </div>
      <img
        src={movie.poster}
        alt={movie.title}
        onError={(e) =>
          (e.target.src =
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba")
        }
      />
      <h2>{movie.title}</h2>
      <p>
        {(() => {
          let genres = movie.genres;
          if (typeof genres === "string") {
            try {
              genres = JSON.parse(genres.replace(/'/g, '"'));
            } catch (e) {
              return "Unknown Genre";
            }
          }
          if (Array.isArray(genres)) {
            return genres.map(g => g.name).join(", ");
          }
          return "Unknown Genre";
        })()}
      </p>
      <button onClick={onRetry}>Another One 😌</button>
      
    </div>
  );
}