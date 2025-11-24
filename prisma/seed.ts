const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  
  await prisma.post.deleteMany({})

  const post1 = await prisma.post.create({
    data: {
      title: 'Post Pertama (Deploy Test)',
      content: 'Ini adalah konten yang dimasukkan secara lokal sebelum deploy ke Vercel.',
      published: true,
    },
  })
  
  const post2 = await prisma.post.create({
    data: {
      title: 'Post Kedua',
      content: 'Ini adalah post yang belum dipublikasikan.',
      published: false,
    },
  })

  console.log(`Created posts: ${post1.title}, ${post2.title}`)
  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })