import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {

  const hashedPassword = await bcrypt.hash('password', 10)

  await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })