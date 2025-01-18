
import { Router } from "express";
import playlistController from "../controller/playlistController.js";

import {restrictToLoggedinUserOnly} from '../middleware/auth.js'
const playlistRouter=Router();

// Add a movie to the playlist
playlistRouter.post('/add-to-playlist', restrictToLoggedinUserOnly,playlistController.addPlaylist );

// Get user's playlist
playlistRouter.get('/playlist', restrictToLoggedinUserOnly,playlistController.viewPlaylist );

// Remove a movie from the playlist
playlistRouter.post('/remove-from-playlist', restrictToLoggedinUserOnly, playlistController.removePlaylist);

// Edit a movie in the playlist
playlistRouter.post('/edit-playlist', restrictToLoggedinUserOnly,playlistController.editPlaylist );


export default playlistRouter