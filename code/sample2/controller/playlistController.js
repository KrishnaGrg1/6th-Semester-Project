import UserModel from "../models/model.js";

const addPlaylist = async (req, res) => {
    const { movieId, title, poster_path } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!movieId || !title || !poster_path) {
        return res.status(400).send('Missing required fields: movieId, title, or poster_path');
    }

    try {
        // Find the user by their ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if the movie already exists in the playlist
        const existingMovies = user.playlist.filter(movie => movie.title === title);
        if (existingMovies.length > 0) {
            return res.status(409).send(`"${title}" is already in the playlist.`);
        }

        // Add the new movie to the playlist
        user.playlist.push({ movieId, title, poster_path });
        await user.save();

        // Respond with success message
        res.status(201).send('Movie added to playlist');
    } catch (error) {
        console.error('Error adding movie to playlist:', error);
        res.status(500).send('Internal Server Error',error.message);
    }
};

const viewPlaylist = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const playlist = user.playlist || [];
        res.render('playlist', { user: { playlist,user } });
    } catch (error) {
        console.error('Error fetching playlist:', error);
        res.status(500).send('Internal Server Error');
    }
};

const removePlaylist = async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user._id;

    if (!movieId) {
        return res.status(400).send('Missing required field: movieId');
    }

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const initialLength = user.playlist.length;
        user.playlist = user.playlist.filter(movie => movie.movieId !== movieId);

        if (initialLength === user.playlist.length) {
            return res.status(404).send('Movie not found in playlist');
        }

        await user.save();
        res.send('Movie removed from playlist');
    } catch (error) {
        console.error('Error removing movie from playlist:', error);
        res.status(500).send('Internal Server Error');
    }
};

const editPlaylist = async (req, res) => {
    const { movieId, newTitle, newPosterPath } = req.body;
    const userId = req.user._id;

    if (!movieId || !newTitle || !newPosterPath) {
        return res.status(400).send('Missing required fields: movieId, newTitle, or newPosterPath');
    }

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const movieIndex = user.playlist.findIndex(movie => movie.movieId === movieId);
        if (movieIndex === -1) {
            return res.status(404).send('Movie not found in playlist');
        }

        user.playlist[movieIndex].title = newTitle;
        user.playlist[movieIndex].poster_path = newPosterPath;
        await user.save();
        res.send('Movie edited in playlist');
    } catch (error) {
        console.error('Error editing movie in playlist:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default { addPlaylist, viewPlaylist, removePlaylist, editPlaylist };
