function businessMiddleware(req, res, next) {

    if (req.user.role !== "business") {
        return res.status(403).json({
            message: "Only business accounts can access this route"
        });
    }

    next();
}

module.exports = businessMiddleware;