const { BlogPost } = require('../models');

const blogPostData = [
    {
      title: 'This is a dope blog',
      content: "This blog is the most dope blog I've seen in my life",
      user_id: 1,
    },
    {
      title: 'This is an even doper blog',
      content: "This blog is even better than the previous one",
      user_id: 2,
    },
    {
      title: 'This is a terrible blog',
      content: "This blog is just terrible",
      user_id: 1,
    },
    {
      title: 'This is an even doper blog',
      content: "This blog is even more terrible than the previous one",
      user_id: 3,
    },

];

  const seedBlogPost = () => BlogPost.bulkCreate(blogPostData);

  module.exports = seedBlogPost;