module.exports = (req, res, next) => {

    //this deals with authentication 

    // if (!req.session.isLoggedIn) {
    //     return res.redirect('/login');
    // }

    // right now you are authenticated. revisit this. to actually authenticate
    next();
}