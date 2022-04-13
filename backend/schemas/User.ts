import { password, text } from '@keystone-6/core/fields'
import { list } from '@keystone-6/core'

export const User = list({
  // access
  // ui
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    password: password(),
    // TODO: Add sales, carts and orders
  },
})
