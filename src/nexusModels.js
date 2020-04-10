import { objectType } from 'nexus'

const Users = objectType({
  name: 'Users',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.email()
    t.model.students()
    t.model.lesson()
    t.model.unit()
  }
})

export const Models = [
  Users
]