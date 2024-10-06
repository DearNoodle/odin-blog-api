const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createUser(req) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({
    data: {
      username: req.body.username,
      password: hashedPassword,
    },
  });
}

async function createPost(req) {
  const { title, content, published } = req.body;
  return await prisma.post.create({
    data: { authorId: req.user.id, title, content, published },
  });
}

async function readPost(req) {
  return await prisma.post.findUnique({
    where: { id: req.params.id },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
}

async function updatePost(req) {
  const { title, content, published } = req.body;
  return await prisma.post.update({
    where: { authorId: req.user.id, id: req.params.id },
    data: { authorId: req.user.id, title, content, published },
  });
}

async function deletePost(req) {
  return await prisma.post.delete({
    where: { authorId: req.user.id, id: req.params.id },
  });
}

async function readAllPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
}

async function readPostsByUserId(req) {
  return await prisma.post.findMany({
    where: { authorId: req.user.id },
  });
}

async function createComment(req) {
  const { postId, content } = req.body;
  return await prisma.comment.create({
    data: { userId: req.user.id, postId, content },
  });
}

async function readComment(req) {
  return await prisma.comment.findUnique({
    where: { userId: req.user.id, id: req.params.id },
  });
}

async function updateComment(req) {
  const { postId, content } = req.body;
  return await prisma.comment.update({
    where: { userId: req.user.id, id: req.params.id },
    data: { userId: req.user.id, postId, content },
  });
}

async function deleteComment(req) {
  return await prisma.comment.delete({
    where: { userId: req.user.id, id: req.params.id },
  });
}

async function readAllPostComments(req) {
  return await prisma.comment.findMany({
    where: { postId: req.params.id },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}
module.exports = {
  createUser,
  createPost,
  readPost,
  updatePost,
  deletePost,
  readAllPosts,
  readPostsByUserId,
  createComment,
  readComment,
  updateComment,
  deleteComment,
  readAllPostComments,
};
