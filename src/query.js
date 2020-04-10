import { idArg, queryType, stringArg } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.field('Users', {
      type: 'Users',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.users.findOne({
          where: {
            id,
          },
        })
      }
    })

    t.list.field('Users', {
      type: 'Users',
      args: {
        searchString: stringArg({ nullable: true}),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.users.findMany({
          where: {
            OR: [
              { email: { contains: searchString }},
              { student: { contains: searchString } }
            ],
          },
        })
      }
    })

  }
})