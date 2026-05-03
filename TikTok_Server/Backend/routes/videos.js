const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const videos = await prisma.video.findMany({
      include: {
        user: { select: { id: true, username: true, avatar: true } },
        likes: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/following", auth, async (req, res) => {
  try {
    const following = await prisma.follow.findMany({
      where: { followerId: req.user.id },
      select: { followingId: true },
    });
    const ids = following.map((f) => f.followingId);
    const videos = await prisma.video.findMany({
      where: { userId: { in: ids } },
      include: {
        user: { select: { id: true, username: true, avatar: true } },
        likes: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/",
  auth,
  upload.fields([{ name: "video" }, { name: "thumbnail" }]),
  async (req, res) => {
    try {
      const { caption } = req.body;
      const videoUrl = req.files["video"]?.[0]?.filename;
      const thumbnail = req.files["thumbnail"]?.[0]?.filename;

      if (!videoUrl)
        return res.status(400).json({ message: "Video file required" });

      const video = await prisma.video.create({
        data: { caption, videoUrl, thumbnail, userId: req.user.id },
      });
      res.status(201).json(video);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

router.post("/:id/like", auth, async (req, res) => {
  try {
    const like = await prisma.like.create({
      data: { userId: req.user.id, videoId: parseInt(req.params.id) },
    });
    res.json(like);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id/like", auth, async (req, res) => {
  try {
    await prisma.like.deleteMany({
      where: { userId: req.user.id, videoId: parseInt(req.params.id) },
    });
    res.json({ message: "Unliked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { videoId: parseInt(req.params.id) },
      include: { user: { select: { id: true, username: true, avatar: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/comments", auth, async (req, res) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        text: req.body.text,
        userId: req.user.id,
        videoId: parseInt(req.params.id),
      },
      include: { user: { select: { id: true, username: true, avatar: true } } },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
