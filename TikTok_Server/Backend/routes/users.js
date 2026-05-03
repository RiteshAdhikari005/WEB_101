const express = require("express");
const auth = require("../middleware/auth");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, avatar: true, bio: true },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/me/following", auth, async (req, res) => {
  try {
    const following = await prisma.follow.findMany({
      where: { followerId: req.user.id },
      include: {
        following: { select: { id: true, username: true, avatar: true } },
      },
    });
    res.json(following.map((f) => f.following));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        videos: {
          include: { likes: true, comments: true },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { followers: true, following: true } },
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/follow", auth, async (req, res) => {
  try {
    const follow = await prisma.follow.create({
      data: { followerId: req.user.id, followingId: parseInt(req.params.id) },
    });
    res.json(follow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id/follow", auth, async (req, res) => {
  try {
    await prisma.follow.deleteMany({
      where: { followerId: req.user.id, followingId: parseInt(req.params.id) },
    });
    res.json({ message: "Unfollowed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
