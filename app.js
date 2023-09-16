const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');
const profileRoutes = require('./routes/profile')
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const { genJobs } = require('./middleware/jobMiddleware');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

//connect to database then listen
const dbURI = 'mongodb+srv://admin:admin@main.ynh3grn.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3002))
    .catch((err) => console.log(err));

app.get('*', checkUser);
app.get('/', requireAuth, genJobs, (req, res) => {
    res.render('index');
})
app.get('/data', requireAuth, (req, res) => {
    res.render('data');
})

app.use(authRoutes);
app.use(profileRoutes);
app.use(jobRoutes);
