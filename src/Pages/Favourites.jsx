import React from 'react'

export default function Favourites() {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  return (
    <div className="page">
      <h1>Saved Vibes 😌</h1>

      {favourites.length === 0 ? (
        <p>No favourites yet… heartbreak.</p>
      ) : (
        favourites.map(title => <p key={title}>{title}</p>)
      )}
    </div>
  );
}