document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.edit-btn');
    const removeButtons = document.querySelectorAll('.remove-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const movieId = button.dataset.movieId;
            const newTitle = prompt('Enter new title:');
            const newPosterPath = prompt('Enter new poster path:');

            if (newTitle && newPosterPath) {
                try {
                    const response = await fetch('/edit-playlist', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ movieId, newTitle, newPosterPath })
                    });

                    if (response.ok) {
                        alert('Movie edited successfully');
                        location.reload();
                    } else {
                        const error = await response.text();
                        alert(`Error editing movie: ${error}`);
                    }
                } catch (error) {
                    console.error('Error editing movie:', error);
                    alert('An unexpected error occurred.');
                }
            } else {
                alert('Both title and poster path are required.');
            }
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const movieId = button.dataset.movieId;

            try {
                const response = await fetch('/remove-from-playlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ movieId })
                });

                if (response.ok) {
                    alert('Movie removed successfully');
                    location.reload();
                } else {
                    const error = await response.text();
                    alert(`Error removing movie: ${error}`);
                }
            } catch (error) {
                console.error('Error removing movie:', error);
                alert('An unexpected error occurred.');
            }
        });
    });
});
