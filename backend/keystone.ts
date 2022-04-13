import { config } from '@keystone-6/core'
import { User } from './schemas/User'
import 'dotenv/config'

const databaseUrl = `${process.env.DATABASE_URL}` || 'file:./db/keystone.db'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // Sign In time
  secret: process.env.COOKIE_SECRET || 'COOKIE SECRET, PLEASE CHANGE',
}

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
      credentials: true,
    }
  },
  db: {
    provider: 'sqlite',
    url: databaseUrl,
    // TODO: add data seeding
  },
  lists: {
    User
  },
  ui: {
    // TODO: Change for roles
    isAccessAllowed: () => true
  }
  // TODO: Add session values
})

