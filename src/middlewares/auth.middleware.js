const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.json('/auth/login')
    }
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === "Admin") {
            return next();
        } else {
            return res.redirect('/');
        };
    } else {
        return res.redirect('/auth/login');
    };
};

module.exports = {
    isAuth,
    isAdmin,
};