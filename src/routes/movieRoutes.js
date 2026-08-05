import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    httpMethod: "get",
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    httpMethod: "post",
  });
});

router.put("/", (req, res) => {
  res.status(200).json({
    httpMethod: "put",
  });
});

router.delete("/", (req, res) => {
  res.status(200).json({
    httpMethod: "delete",
  });
});

export default router;
