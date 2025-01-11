import { Router } from 'express';
import getJokes from '../controllers/getjokes.js';
const jokesRouter=Router();

jokesRouter.get('/',getJokes);


export default jokesRouter;