// recommended to have happy-path handlers as default and override them in specific tests as needed
import { db } from './db'

export const handlers = [
  ...db.product.toHandlers('rest'),
  ...db.users.toHandlers('rest')
]
