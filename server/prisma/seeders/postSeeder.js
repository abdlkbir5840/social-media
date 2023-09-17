const faker = require('faker');
const prisma = require('../prisma');

async function seedPosts() {
  // Adjust the number of posts you want to generate
  const numberOfPosts = 10;

  const users = await prisma.user.findMany();

  for (let i = 0; i < numberOfPosts; i++) {
    const randomUser = faker.random.arrayElement(users);
    await prisma.post.create({
      data: {
        content: faker.lorem.paragraph(),
        authorId: randomUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  console.log(`Seeded ${numberOfPosts} posts.`);
}

seedPosts()
  .catch((error) => {
    console.error('Error seeding posts:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
