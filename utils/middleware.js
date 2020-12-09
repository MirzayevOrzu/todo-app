const Joi = require('joi');
const passport = require('passport');
const { todoSchema, querySchemaD, querySchemaG } = require('./schemas')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in first');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthorizated = (req, res, next) => {
    if (!(req.params.id == req.user._id)) {
        req.flash('error', 'YOU CANNOT ACCESS OURS PERSONAL INFOS IN ANY WAY');
        return res.redirect(`/user/${req.user._id}`)
    }
    next();
}

module.exports.validateTodo = (req, res, next) => {
    const { error } = todoSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        req.flash('error', msg);
        return res.redirect(`/user/${req.params.id}`)
    }
    next();
}

module.exports.validateQuery = (req, res, next) => {
    var { g, d } = req.query;
    const { id } = req.params;
    if (g && !d) {
        var { error } = querySchemaG.validate(req.query);
        if (error) {
            req.flash('error', `Cannot find group with name - ${g}`)
            return res.redirect(`/user/${id}`)
        }
    } else if (d && !g) {
        var { error } = querySchemaD.validate(req.query);
        if (error) {
            req.flash('error', `Cannot find data with name - ${d}`)
            return res.redirect(`/user/${id}`)
        }
    }
    next();
}

module.exports.loginWithPassport = passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' })