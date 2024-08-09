const express = require('express');
const User = require('../models/user');
const router = express.Router();

// This is to help with the rendering of the LOGIN Template(login.ejs)
router.get('/login', (req, res) =>{
    res.render('login');
});

// This is to help Pull submitted Login information from the Login Page flowFrom: 
router.post('/login', async(req, res) =>{
    // get the in formation and save as CONST
    const {username, password} = req.body;

    // Process the data
    try{
        const user = await User.findByUsername(username); //Check if the user is available

        if(!user){ // if user is not available, process this code
            return res.status(400).send('Invalid username or password'); 
        }

        const isValid = await User.verifyPassword(password, user.password);//check password match
        if(!isValid){ //if not run this code
            return res.status(400).send('Invalid username or password');
        }

        //ELSE if all credentials are correct
        req.session.userId = user.id;

        //Input link to the page you want to open when the user Log in is successful
        res.redirect('/'); // in my case am redirecting to the Index page
    } catch (error){
        console.error(error);
        res.status(500).send('An error occured during Login ');
    }
});

//Render Register Page
router.get('/register', (req, res) =>{
    res.render('register');
});

// receive data from register page an d process it.
router.post('/register', async (req, res) =>{
    const {email, username, password} = req.body;

    try{
        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            return res.status(400).send('Email already in use');
        } 
        const existingUsername = await User.findByUsername(username);
        if (existingUsername) {
            return res.status(400).send('Username already in use');
        } 

        //ELSE
        await User.create(email, username, password);
        //redirect to login page or any page of your choice after successful account creation
        res.redirect('/user/login')
    } catch (error){
        console.error(error);
        res.status(500).send('An errorn occurred during Registration');
    }
});

// user logout Route
router.get('/logout', (req, res) =>{
    //lets destroy the session creaed during login, by doing so the user is automatically logged out
    req.session.destroy((err) =>{
        if (err){
            console.error(err);
        }
        res.redirect('/user/login');
    });
});

module.exports = router;
