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
    
        // res.status(200).json(blogpostData);

        // Serialize data so the template can read it
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('homepage', { 
          blogposts, 
          logged_in: req.session.logged_in 
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

//----allows you to view your dashboard----//
router.get('/dashboard', async (req, res) => {

    try {

        const blogpostData = await BlogPost.findAll({
            where: {
              user_id: req.session.user_id
          },
        });
    
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
    
        res.render('dashboard', {
          blogposts,
          logged_in: req.session.logged_in
        });
        } catch (err) {
          console.log(err);
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

        const blogpost = blogpostData.get({ plain: true });

        res.render('renderblog', {
          blogpost,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

//----allows you to view the create post fields----//
router.get('/blogposts/', async (req, res) => {
  try {
    res.render('createblog', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
  res.status(500).json(err);
  }
});

//----redirects from blogposts to home----//
// router.get('/blogposts/', (req, res) => {
//   try {
//     res.redirect(`/`);
//   } catch (err) {
//   res.status(500).json(err);
//   }
// });


//----allows you to edit a single post with comments----//
router.get('/blogposts/edit/:id/', async (req, res) => {
  try {
      const blogpostData = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      //testing
      // res.status(200).json(blogpostData);

      const blogpost = blogpostData.get({ plain: true });
  
      res.render('editblog', {
        ...blogpost,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  } 
    res.render('login');
});

//----allows you to view a single post with comments----//
// router.get('/blogposts/new', async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: BlogPost }],
//     });

//     //const user = userData.get({ plain: true });
//     const blogpost = blogpostData.get({ plain: true });

//     res.render('createblog', {
//       //...user,
//       ...blogpost,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     console.error('Error rendering create blog post form:', err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;