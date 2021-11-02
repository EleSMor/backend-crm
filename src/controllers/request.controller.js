const Request = require('./../models/request.model');

const requestsGetAll = (req, res, next) => {
    try {
        const requests = await Request.find();
        return res.status(200).json(requests);
    } catch(err){
        return next(err);
    }
}

module.exports = {
    requestsGetAll,
}