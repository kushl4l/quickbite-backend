function customerMiddleware(req, res, next) {

    if (req.user.role !== "customer") {
        return res.status(403).json({
            message: "Only customers can access this route"
        });
    }

    next();
}

module.exports = customerMiddleware;