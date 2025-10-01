import { prisma } from '../src/services/prisma.js';

async function main() {
  console.log('No seed data defined for MusicDiscovery backend.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
