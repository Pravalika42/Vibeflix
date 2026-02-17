const API_KEY = "bbc06abc";

export async function fetchPoster(title) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`
    );

    const data = await res.json();

    if (data.Response === "True" && data.Poster && data.Poster !== "N/A") {
      return data.Poster; // Direct usable image URL 😌
    }

    return null;
  } catch (err) {
    console.error("OMDb error:", err);
    return null;
  }
}