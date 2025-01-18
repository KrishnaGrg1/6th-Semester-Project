import { Router } from "express";
import playlistController from "../controller/playlistController.js";
import { restrictToLoggedinUserOnly } from '../middleware/auth.js';

const playlistRouter = Router();

playlistRouter.post('/add-to-playlist', restrictToLoggedinUserOnly, playlistController.addPlaylist);
playlistRouter.get('/playlist', restrictToLoggedinUserOnly, playlistController.viewPlaylist);
playlistRouter.post('/remove-from-playlist', restrictToLoggedinUserOnly, playlistController.removePlaylist);
playlistRouter.post('/edit-playlist', restrictToLoggedinUserOnly, playlistController.editPlaylist);

export default playlistRouter;
