require ('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const usersRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const authMiddleware = require('./middleware/auth');

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:true
}));

//Initialize View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.use('/user', usersRoutes);
app.use('/', authMiddleware.isAuthenticated, indexRoutes);

//Error handling middleware
app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

const PORT = process.env.PORT || 20001;
app.listen(PORT, () =>{
    console.log(`Server is Running on port ${PORT}`);
});