document.addEventListener('DOMContentLoaded', () => {
  const addToPlaylistBtn = document.querySelector('.add-to-playlist-btn');

  if (addToPlaylistBtn) {
      addToPlaylistBtn.addEventListener('click', async () => {
          const movieId = addToPlaylistBtn.dataset.movieId;
          const title = document.querySelector('.movie-info h2').textContent.trim();
          const posterPath = document.querySelector('.poster-img').src;

          try {
              const response = await fetch('/add-to-playlist', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ movieId, title, poster_path: posterPath }),
              });

              if (response.ok) {
                  alert('Movie added to playlist successfully!');
              } else {
                  const error = await response.text();
                  alert(`Failed to add movie to playlist: ${error}`);
              }
          } catch (error) {
              console.error('Error adding movie to playlist:', error);
              alert('An unexpected error occurred.');
          }
      });
  }
});
