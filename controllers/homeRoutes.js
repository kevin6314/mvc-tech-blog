const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// ROUTE: /

//----allows you to view all posts----//
router.get('/', async (req, res) => {
    try {
        // Get all blogposts and JOIN with user data
        const blogpostData = await BlogPost.findAll({
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
    
        //testing
        res.status(200).json(blogpostData);

        // // Serialize data so the template can read it
        // const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
    
        // // Pass serialized data and session flag into template
        // res.render('homepage', { 
        //   blogposts, 
        //   logged_in: req.session.logged_in 
        // });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

//----allows you to view your dashboard----//
router.get('/dashboard', async (req, res) => {
    try {
        
        const criteria = {
            id: req.session.user_id
        };

        const blogpostData = await BlogPost.findAll({
            where: criteria,
        });

    //testing
    res.status(200).json(blogpostData);
    
        // const blogpost = blogpostData.get({ plain: true });
    
        // res.render('blogpost', {
        //   ...blogpost,
        //   logged_in: req.session.logged_in
        // });
        } catch (err) {
        res.status(500).json(err);
        }

});

//----allows you to view a single post with comments----//
router.get('/blogposts/:id', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ['username'],
            },
            {
              model: Comment,
              attributes: [
                'content',
                'created_at',
                'user_id',
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            },
          ],
        });
    
        //testing
         res.status(200).json(blogpostData);

        // const blogpost = blogpostData.get({ plain: true });
    
        // res.render('blogpost', {
        //   ...blogpost,
        //   logged_in: req.session.logged_in
        // });
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;