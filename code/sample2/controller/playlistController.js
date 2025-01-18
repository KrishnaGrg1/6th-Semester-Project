import  UserModel from "../models/model.js";

const addPlaylist=async (req, res) => {
    const { movieId, title, poster_path } = req.body;
    const userId = req.user._id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const movieExists = user.playlist.some(movie => movie.movieId === movieId);
        if (movieExists) {
            return res.status(400).send('Movie already in playlist');
        }

        user.playlist.push({ movieId, title, poster_path });
        await user.save();
        res.send('Movie added to playlist');
    } catch (error) {
        console.error('Error adding movie to playlist:', error);
        res.status(500).send('Internal Server Error');
    }
}

const viewPlaylist=async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await UserModel.findOne({_id:userId})
        const playlist=user.playlist

        res.render('playlist', { user: playlist });
    } catch (error) {
        console.error('Error fetching playlist:', error);
        res.status(500).send('Internal Server Error');
    }
}

const removePlaylist=async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user._id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.playlist = user.playlist.filter(movie => movie.movieId !== movieId);
        await user.save();
        res.send('Movie removed from playlist');
    } catch (error) {
        console.error('Error removing movie from playlist:', error);
        res.status(500).send('Internal Server Error');
    }
}

const editPlaylist=async (req, res) => {
    const { movieId, newTitle, newPosterPath } = req.body;
    const userId = req.user._id;

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
}

const playlistController={
    addPlaylist,
    viewPlaylist,
    removePlaylist,
    editPlaylist
}

export default playlistController