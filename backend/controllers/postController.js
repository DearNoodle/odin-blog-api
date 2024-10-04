const query = require('../models/query');
async function createPost(req, res) {
  const post = await query.createPost(req);
  res.json({ postId: post.id });
}
async function readPost(req, res) {
  const post = await query.readPost(req);
  res.json(post);
}
async function updatePost(req, res) {
  const post = await query.updatePost(req);
  res.json(post);
}
async function deletePost(req, res) {
  await query.deletePost(req);
  res.send('deleted');
}
async function readAllPosts(req, res) {
  const posts = await query.readAllPosts();
  res.json(posts);
}
module.exports = {
  createPost,
  readPost,
  updatePost,
  deletePost,
  readAllPosts,
};
