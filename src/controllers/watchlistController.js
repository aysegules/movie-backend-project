import { prisma } from "../../lib/prisma.ts";

const addToWatchlist = async (req, res) => {
  try {
    const { movieId, status, rating, notes } = req.body;

    //Verify movie exists
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    //Check if already added
    const existingInWatchlist = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId,
        },
      },
    });

    if (existingInWatchlist) {
      return res
        .status(400)
        .json({ error: "Movie already exists in the watchlist" });
    }

    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId: req.user.id,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
      },
    });

    res.status(201).json({
      status: "success",
      data: watchlistItem,
    });
  } catch (err) {
    console.error(`Internal server error ${err.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateWatchlist = async (req, res) => {
  try {
    const { status, rating, notes } = req.body;

    //Find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id: req.params.id },
    });

    if (!watchlistItem) {
      return res.status(404).json({ error: "Watchlist item not found" });
    }

    //Ensure only owner can update
    if (watchlistItem.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not allowed to update this watchlist item" });
    }

    //Generate updated data
    const updateData = {};
    if (status !== undefined) {
      updateData.status = status.toUpperCase();
    }
    if (rating !== undefined) {
      updateData.rating = rating;
    }
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    //Update watchlist item
    const updatedItem = await prisma.watchlistItem.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.status(200).json({
      status: "success",
      data: {
        watchlistItem: updatedItem,
      },
    });
  } catch (err) {
    console.error(`Internal server error ${err.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    //Find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id: req.params.id },
    });

    if (!watchlistItem) {
      return res.status(404).json({ error: "Watchlist item not found" });
    }

    //Ensure only owner can delete
    if (watchlistItem.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not allowed to remove this watchlist item" });
    }

    await prisma.watchlistItem.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "success",
      message: `Movie removed from watchlist`,
    });
  } catch (err) {
    console.error(`Internal server error ${err.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { addToWatchlist, removeFromWatchlist, updateWatchlist };
