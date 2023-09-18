const bcrypt = require('bcrypt');
const faker = require('faker');
const prisma = require('../prisma');

// Fonction pour ajouter des utilisateurs à la base de données avec des données fictives
async function seedUsers() {
  try {
    // Créez un tableau d'utilisateurs avec des données générées par Faker.js
    const usersData = Array.from({ length: 10 }, () => ({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync(faker.internet.password(), 10), // Générez un mot de passe haché aléatoire
      impressions: faker.random.number({ min: 1, max: 10 }),
      viewedProfile: faker.random.number({ min: 1, max: 10 }),
      occupation: faker.name.jobTitle(),
    }));

    // Parcourez les données et ajoutez chaque utilisateur à la base de données
    for (const userData of usersData) {
      await prisma.user.create({
        data: userData,
      });
    }

    console.log('A user seed operation containing fake data was successfully executed.');
  } catch (error) {
    console.error('Error running user seeders :', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Appelez la fonction de seeder
seedUsers();
