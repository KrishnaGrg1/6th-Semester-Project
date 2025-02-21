import UserModel from "../models/model.js";
import fetchMovieDetails  from "../services/movieService.js";

const viewHome = async (req, res) => {
  try {
    const loggedInUser = await UserModel.findById(req.user._id); // Get the logged-in user by ID
    res.render("home", { user: loggedInUser }); // Pass the logged-in user data to the home page view
  } catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Error loading home page");
  }
};

const viewContact = async (req, res) => {
  try {
    const loggedInUser = await UserModel.findById(req.user._id); // Get the logged-in user by ID
    res.render("contact1", { user: loggedInUser }); // Pass the logged-in user data to the home page view
  } catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Error loading home page");
  }
};

const viewAbout = async (req, res) => {
  try {
    const loggedInUser = await UserModel.findById(req.user._id); // Get the logged-in user by ID
    res.render("about", { user: loggedInUser }); // Pass the logged-in user data to the home page view
  } catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Error loading home page");
  }
};

const viewPricing = async (req, res) => {
  try {
    const loggedInUser = await UserModel.findById(req.user._id); // Get the logged-in user by ID
    res.render("pricing", { user: loggedInUser }); // Pass the logged-in user data to the home page view
  } catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Error loading home page");
  }
};


const viewMoviebyMovieID=async (req, res) => {
    try {
        const movieId = req.params.id;
        const movieDetails = await fetchMovieDetails(movieId);
        console.log(movieId);
        res.render('movie_details', { movie: movieDetails, user: req.user });
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).send('Error fetching movie details');
    }
}

const movieController = {
  viewHome,
  viewContact,
  viewAbout,
  viewPricing,
  viewMoviebyMovieID
};

export default movieController;
