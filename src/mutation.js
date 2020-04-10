import { idArg, mutationType, stringArg } from 'nexus'

export const Mutation = mutationType({
    name: 'Mutation',
    definition(t) {

        t.crud.deleteOneUser()
        
        t.field('createUser', {
            type: 'Users',
            args: {
                email: stringArg({ nullable: false }),
                students: stringArg(),
                lesson: stringArg(),
                unit: stringArg(),
            },
            resolve: (parent, { email, students, lesson, unit}, ctx) => {
                return ctx.prisma.course.create({
                    data: {
                        email,
                        students,
                        lesson,
                        unit
                    }
                })
            }
        })

        t.field('updateUser', {
            type: 'Users',
            args: { id: idArg(),
                email: stringArg(),
                students: stringArg(),
                lesson: stringArg(),
                unit: stringArg(),
            },
            resolve: (parent, { id, email, students, lesson, unit }, ctx) => {
                return ctx.prisma.user.update({
                    where: {
                        id
                    },
                    data: {
                        email,
                        students,
                        lesson,
                        unit,
                    }
                })
            }
        })
    }
})