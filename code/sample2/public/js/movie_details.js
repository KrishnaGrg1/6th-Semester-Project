document.addEventListener("DOMContentLoaded", () => {
  const addToPlaylistButton = document.querySelector(".add-to-playlist-btn");

  addToPlaylistButton.addEventListener("click", async () => {
    const movieId = addToPlaylistButton.dataset.movieId;

    try {
      const response = await fetch(`/movie/${movieId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const movieDetails = await response.json();
        const { id, title, poster_path } = movieDetails;

        const addResponse = await fetch("/add-to-playlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieId: id, title, poster_path })
        });

        if (addResponse.ok) {
          alert("Movie added to playlist");
          location.reload();
        } else {
          alert("Error adding movie to playlist");
        }
      } else {
        alert("Error fetching movie details");
      }
    } catch (error) {
      console.error("Error adding movie to playlist:", error);
    }
  });
});
