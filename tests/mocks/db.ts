import { factory, oneOf, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'

export const db = factory({
  users: {
    id: primaryKey(faker.string.uuid),
    name: faker.person.fullName,
    email: faker.internet.email
  },
  product: {
    id: primaryKey(faker.number.int),
    name: faker.commerce.productName,
    price: () => faker.number.int({ min: 1, max: 100 }),
    categoryId: faker.number.int,
    category: oneOf('category')
  }
})

// should be used in afterAll in global test setup file
export const resetDb = () => {
  db.users.deleteMany({ where: {} })
  db.product.deleteMany({ where: {} })
}

export const getProductsByCategory = (categoryId: number) =>
  db.product.findMany({
    where: {
      categoryId: { equals: categoryId }
    }
  })
