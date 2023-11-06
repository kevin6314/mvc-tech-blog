const router = require('express').Router();
const { BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// ROUTE: /api/blogposts

//----create a new blog----//
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
          ...req.body,
          user_id: req.session.user_id,
        });
    
        res.status(200).json(newBlogPost);
        } catch (err) {
            res.status(400).json(err);
        }
});

//----update a blog----//
router.put('/:id', withAuth, async (req, res) => {

    const { id } = req.params;

    try {
        const [updatedBlogPost] = await BlogPost.update(
        {
            ...req.body, //all the fields you can update
            user_id: req.session.user_id,
        },
        {
        where: {
            id: id
            },
        });

        if (!updatedBlogPost) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }
    
        res.status(200).json({ 
            message: 'Blog post updated successfully!',
            blogpost: updatedBlogPost });
        } catch (err) {
        res.status(500).json(err);
      }
});

//----delete a blog----//
router.delete('/:id', withAuth, async (req, res) => {
    
    const { id, user_id } = req.params;

    try {
        const blogPostData = await BlogPost.destroy({
          where: {
            id: id,
            user_id: user_id,
          },
        });
    
        if (!blogPostData) {
          res.status(404).json({ message: 'No blog post found with this id!' });
          return;
        }
    
        res.status(200).json({ message: 'Blog post deleted successfully.' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});


//----add a comment----//
router.post('/:id/comments', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
          ...req.body,
          user_id: req.session.user_id,
        });
    
        res.status(200).json(newComment);
        } catch (err) {
            res.status(400).json(err);
        }
});

module.exports = router;