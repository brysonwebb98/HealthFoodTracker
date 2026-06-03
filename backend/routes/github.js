const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/github', 
    /*
        #swagger.description = 'Starts GitHub OAuth login. Use in browser, not Swagger.'
    */
    passport.authenticate('github', { 
        scope: ['user:email'] 
    })
);


router.get(
    '/github/callback',
    /*
        #swagger.description = 'GitHub redirects here after login. Returns a JWT token.'
    */
    passport.authenticate('github', {
        session: false,
        failureRedirect: '/auth/failure'
    }),
    (req, res) => {
        const token = jwt.sign(
            {
                githubId: req.user.id,
                username: req.user.username
            },
            process.env.SESSION_SECRET,
            { expiresIn: '1h'}
        );

        res.json({
            message: 'GitHub Login Successful',
            token: token
        })
    }
);

module.exports = router;