const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient();

async function addUser(req) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({
    data: {
      username: req.body.username,
      password: hashedPassword,
    },
  });
}

module.exports = {
  addUser,
};
