const { Comment } = require('../models');

const commentData = [
    {
        content: 'This is a comment 1',
        user_id: 3,
        blogpost_id: 1,
    },
    {
        content: "This is a comment 2",
        user_id: 1,
        blogpost_id: 2,
    },
    {
        content: "This is a comment 3",
        user_id: 2,
        blogpost_id: 3,
    },
    {
        content: "This is a comment 4",
        user_id: 3,
        blogpost_id: 4,
    },
    {
        content: "This is a comment 5",
        user_id: 2,
        blogpost_id: 1,
    },

];

  const seedComment = () => Comment.bulkCreate(commentData);

  module.exports = seedComment;