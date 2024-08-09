const express = require('express');
const router = express.Router();

//dynamically render Index.ejs template
router.get('/', (req, res) =>{
    res.render('index', {username: req.session.username});
});

module.exports = router;