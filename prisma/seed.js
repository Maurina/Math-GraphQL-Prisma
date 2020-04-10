import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prismaClient = new PrismaClient()

const users_list = fs.readFileSync('prisma/example_files/users.json')

function loadInfo() {
  const usersInfo = JSON.parse(users_list)
  const allUsersInfo = usersInfo.math_users

  return allUsersInfo.map(crs => {
    return {
    data: {
    email: crs.email,
    unit: crs.unit,
    lesson: crs.lesson,
    dateCreated: crs.dateCreated,
     students: {
      set: crs.students
      }, 
    },
    }
    })
}

async function main() {
  try{
    const allUsersInfo = loadInfo()
    for (let crs of allUsersInfo){
      await prismaClient.users.create(crs)
      .catch(err => console.log(`Error trying to create Database: ${err} users ${crs}`))
    }
  }
  catch (err) {
    console.log(err)
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prismaClient.disconnect()
  })
