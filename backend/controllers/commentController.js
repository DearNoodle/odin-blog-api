const query = require('../models/query');
async function createComment(req, res) {
  const comment = await query.createComment(req);
  res.json({ commentId: comment.id });
}
async function readComment(req, res) {
  const comment = await query.readComment(req);
  res.json(comment);
}
async function updateComment(req, res) {
  const comment = await query.updateComment(req);
  res.json(comment);
}
async function deleteComment(req, res) {
  await query.deleteComment(req);
  res.send('deleted');
}

module.exports = {
  createComment,
  readComment,
  updateComment,
  deleteComment,
};
