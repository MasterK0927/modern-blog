const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  try {
    // Create default categories
    const categories = [
      {
        title: 'Technology',
        slug: 'technology',
        img: '/coding.png',
      },
      {
        title: 'Travel',
        slug: 'travel',
        img: '/travel.png',
      },
      {
        title: 'Food',
        slug: 'food',
        img: '/food.png',
      },
      {
        title: 'Fashion',
        slug: 'fashion',
        img: '/fashion.png',
      },
      {
        title: 'Culture',
        slug: 'culture',
        img: '/culture.png',
      },
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: category,
        create: category,
      });
    }

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main(); 