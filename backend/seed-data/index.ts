import { products } from './data'
import { KeystoneContext } from '@keystone-6/core/types'
import { PrismaClient } from '@prisma/client'

export async function insertSeedData(keystone: KeystoneContext) {
  const prisma: PrismaClient = keystone.prisma

  console.log(`🌱 Inserting Seed Data: ${products.length} Products`)
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`)
    const image = await prisma.productImage.create({
      data: {
        image: JSON.stringify(product.photo),
        altText: product.description
      }
    })
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        status: product.status,
        price: product.price,
        photoId: image.id,
      }
    })
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`)
  console.log('👋 Please start the process with `yarn dev` or `npm run dev`')
  process.exit()
}
