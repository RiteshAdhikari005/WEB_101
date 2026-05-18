const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.video.deleteMany();
  await prisma.user.deleteMany();

  // Create 10 users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@test.com`,
        password: hashedPassword,
        bio: `Bio for user ${i}`,
      },
    });
    users.push(user);
    console.log(`Created user: ${user.username}`);
  }

  // Create 50 videos (5 per user)
  const videos = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 1; j <= 5; j++) {
      const video = await prisma.video.create({
        data: {
          caption: `Video ${j} by ${users[i].username}`,
          videoUrl: `https://example.com/videos/user${i + 1}_video${j}.mp4`,
          thumbnail: `https://example.com/thumbnails/user${i + 1}_thumb${j}.jpg`,
          userId: users[i].id,
        },
      });
      videos.push(video);
    }
  }
  console.log(`Created ${videos.length} videos`);

  // Create 200 comments
  for (let i = 0; i < 200; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    await prisma.comment.create({
      data: {
        text: `Comment ${i + 1} on this video!`,
        userId: randomUser.id,
        videoId: randomVideo.id,
      },
    });
  }
  console.log("Created 200 comments");

  // Create 300 video likes (unique per user+video)
  const likedPairs = new Set();
  let likesCreated = 0;
  while (likesCreated < 300) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const pair = `${randomUser.id}-${randomVideo.id}`;
    if (!likedPairs.has(pair)) {
      likedPairs.add(pair);
      await prisma.like.create({
        data: {
          userId: randomUser.id,
          videoId: randomVideo.id,
        },
      });
      likesCreated++;
    }
  }
  console.log("Created 300 likes");

  // Create 40 follow relationships (unique per follower+following)
  const followPairs = new Set();
  let followsCreated = 0;
  while (followsCreated < 40) {
    const follower = users[Math.floor(Math.random() * users.length)];
    const following = users[Math.floor(Math.random() * users.length)];
    const pair = `${follower.id}-${following.id}`;
    if (follower.id !== following.id && !followPairs.has(pair)) {
      followPairs.add(pair);
      await prisma.follow.create({
        data: {
          followerId: follower.id,
          followingId: following.id,
        },
      });
      followsCreated++;
    }
  }
  console.log("Created 40 follow relationships");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
