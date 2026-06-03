require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('./DB/connection');
const app = express();
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');
const port = process.env.PORT || 3000;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
},

function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(
    express.static(
        path.join(__dirname, '../frontend/public')
    )
);

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.get('/', (req, res) => {
    res.send('Health Food Tracker API is running!');
});

// 500 ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).send(
        `<div>
            <h1>500 - Internal Service Error</h1>
            <img src="/images/500.png" width="1000">
        </div>`
    )
});

// 404 ERROR HANDLING
app.use((req, res) => {
    res.status(404).send(`
        <div>
            <h1>404 - Route Not Found</h1>
            <img src="/images/404.png" width="1000">
        </div>
    `)
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        });
    }
});

