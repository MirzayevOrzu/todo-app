const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('auth/register')
}

module.exports.registerInLogic = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'WELLCOME TO TODO APP')
            res.redirect(`user/${registeredUser._id}`)
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('auth/login')
}

module.exports.loginLogic = async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({username});
    req.flash('success', 'WELLCOME BACK');
    res.redirect(`/user/${user._id}`)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You logged out')
    res.redirect('/');
}