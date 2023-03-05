const router = require("express").Router();
const { Post, User, Comments } = require("../models");
const withAuth = require('../utils/auth');

// route to find all of the posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comments,
          attributes: ["text", "date_created"],
          include: [{ model: User, attributes: ["name"] }],
        },
      ],
    });

    const posts = postData.map((post) => {
      const plainPost = post.get({ plain: true });
      plainPost.isOwner = req.session.user_id === plainPost.user_id;
      return plainPost;
    });


    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      isOwner: req.session.user_id === posts.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to find a specific post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comments,
          attributes: ["text","date_created"],
          include: [{ model: User, attributes: ["name"] }],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("singlepost", {
     
      post,
      logged_in: req.session.logged_in,
      isOwner: req.session.user_id === post.user_id,
      
    });
  } catch (err) {
    res.status(500).json(err);
  } 
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('signup');
});

// route to find a specific profile if the user is logged in
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          model: Post,
          include: [{model: User, attributes: ["name"]}]
         }]
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to find the edit post page
router.get("/post/:id/edit", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("editpost", {
      ...post,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
