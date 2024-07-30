import express from "express";
import { getSimilarTv, getTrendingTv, getTvCategories, getTvDetails, getTvTrailers } from "../controllers/tvController.js";


const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:category", getTvCategories);


export default router;