const express=require('express');
const router=express.Router();

const {register,login}=require('../controller/url');
const { renderHomePage, fetchTrendingMovies, fetchTopPicks, fetchContinueWatching, searchMovies } = require('../controller/moviecontroller');


router.post('/register', register);
router.post('/login', login); 
// Render Home Page
router.get('/', renderHomePage);

// Search Movies Route
router.post('/search', searchMovies);

router.get('/fetchData', async (req, res) => {
    try {
      const trendingMovies = await fetchTrendingMovies();
      const topPicks = await fetchTopPicks();
      const continueWatching = await fetchContinueWatching();
  
      // Send data as JSON response
      res.json({ trendingMovies, topPicks, continueWatching });
    } catch (error) {
      console.error('Error fetching movie data:', error);
      res.status(500).send('Error fetching movie data.');
    }
  });
  
module.exports = router;

