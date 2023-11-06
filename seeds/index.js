const sequelize = require('../config/connection');
const seedBlogPost = require('./blogPost');
const seedComment = require('./comment');
const seedUser = require('./user')

const seedAll = async () => {
    
  await sequelize.sync({ force: true });

  await seedUser();

  await seedBlogPost();

  await seedComment();

  process.exit(0);

};

seedAll();