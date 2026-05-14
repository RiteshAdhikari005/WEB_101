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

// GET all videos — cursor-based pagination
router.get("/", async (req, res) => {
  try {
    const { cursor, limit = "10" } = req.query;
    const take = parseInt(limit, 10);

    const videos = await prisma.video.findMany({
      take: take + 1,
      ...(cursor && {
        cursor: { id: parseInt(cursor) },
        skip: 1,
      }),
      include: {
        user: { select: { id: true, username: true, avatar: true } },
        likes: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const hasNextPage = videos.length > take;
    const results = hasNextPage ? videos.slice(0, take) : videos;
    const nextCursor = hasNextPage ? results[results.length - 1].id : null;

    res.json({ videos: results, nextCursor, hasNextPage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET following videos — cursor-based pagination
router.get("/following", auth, async (req, res) => {
  try {
    const { cursor, limit = "10" } = req.query;
    const take = parseInt(limit, 10);

    const following = await prisma.follow.findMany({
      where: { followerId: req.user.id },
      select: { followingId: true },
    });
    const ids = following.map((f) => f.followingId);

    if (ids.length === 0) {
      return res.json({ videos: [], nextCursor: null, hasNextPage: false });
    }

    const videos = await prisma.video.findMany({
      take: take + 1,
      ...(cursor && {
        cursor: { id: parseInt(cursor) },
        skip: 1,
      }),
      where: { userId: { in: ids } },
      include: {
        user: { select: { id: true, username: true, avatar: true } },
        likes: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const hasNextPage = videos.length > take;
    const results = hasNextPage ? videos.slice(0, take) : videos;
    const nextCursor = hasNextPage ? results[results.length - 1].id : null;

    res.json({ videos: results, nextCursor, hasNextPage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST upload video
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

// POST like a video
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

// DELETE unlike a video
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

// GET comments for a video
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

// POST add comment to a video
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

// DELETE a video
router.delete("/:id", auth, async (req, res) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.userId !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await prisma.like.deleteMany({ where: { videoId: parseInt(req.params.id) } });
    await prisma.comment.deleteMany({ where: { videoId: parseInt(req.params.id) } });
    await prisma.video.delete({ where: { id: parseInt(req.params.id) } });

    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;