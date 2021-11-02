const Ad = require('./../models/ad.model');

const adsGetAll = (req, res, next) => {
    try {
        const ads = await Ad.find();
        return res.status(200).json(ads);
    } catch(err){
        return next(err);
    }
}

module.exports = {
    adsGetAll,
}