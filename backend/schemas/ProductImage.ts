import { list } from '@keystone-6/core'
import { text } from '@keystone-6/core/fields'
import { cloudinaryImage } from '@keystone-6/cloudinary'
import 'dotenv/config'

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'sickfits'
}

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source'
    }),
    altText: text()
  }
})