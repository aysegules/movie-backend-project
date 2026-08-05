import express from "express";
import {
  addToWatchlist,
  updateWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

/** router.use can be used instead of using middleware separate for each router
 *  Usage: router.use(authMiddleware);
 */

router.post(
  "/",
  authMiddleware,
  validateRequest(addToWatchlistSchema),
  addToWatchlist,
);

router.put("/:id", authMiddleware, updateWatchlist);

router.delete("/:id", authMiddleware, removeFromWatchlist);

export default router;
