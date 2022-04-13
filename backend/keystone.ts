import { config } from '@keystone-6/core'
import { statelessSessions } from '@keystone-6/core/session'
import { createAuth } from '@keystone-6/auth'
import { Product, User } from './schemas'
import 'dotenv/config'

const databaseUrl = `${process.env.DATABASE_URL}` || 'file:./db/keystone.db'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // Sign In time
  secret: process.env.COOKIE_SECRET || 'COOKIE SECRET, PLEASE CHANGE',
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'id',

  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add initial roles
  },
})

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
        credentials: true,
      },
    },
    db: {
      provider: 'sqlite',
      url: databaseUrl,
      // TODO: add data seeding
    },
    lists: {
      User,
      Product,
    },
    ui: {
      isAccessAllowed: ({ session }) => {
        return !!session?.data
      },
    },
    session: statelessSessions(sessionConfig),
  })
)