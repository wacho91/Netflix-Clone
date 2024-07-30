import express from "express";
import { getMovieDetails, getMoviesCategories, getMovieTrailers, getSimilarMovies, getTrendingMovies } from "../controllers/movieController.js";

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesCategories);

export default router;