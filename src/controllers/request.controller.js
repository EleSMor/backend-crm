const Request = require('./../models/request.model');
const Ad = require('./../models/ad.model');

const { getDate } = require('./utils');

const requestsGetAll = async (req, res, next) => {
    try {
        const requests = await Request
            .find()
            .populate({ path: 'requestContact', select: 'fullName company' })
            .populate({ path: 'requestConsultant', select: 'fullName' })
        console.log(requests)
        return res.status(200).json(requests);
    } catch (err) {
        return next(err);
    }
}

const requestGetOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const request = await Request.findById(id);
        return res.status(200).json(request);
    } catch (err) {
        return next(err);
    }
}

const requestLastReference = async (req, res, next) => {
    try {
        const lastReference = await Request.find().sort({ requestReference: - 1 });
        let reference = 0
        if (lastReference.length !== 0) reference = lastReference[0].requestReference
        return res.status(200).json(reference);
    } catch (err) {
        return next(err);
    }
}

const requestGetByContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const request = await Request.find({ requestContact: id });

        return res.status(200).json(request);
    } catch (err) {
        return next(err);
    }
}

const requestGetAdsMatched = async (req, res, next) => {
    try {
        const { id } = req.params;
        const request = await Request.findById({ _id: id })
        const ad = await Ad.find({
            adType: { $all: request.requestAdType },
        })
            .and({
                adBuildingType: { $all: request.requestBuildingType },
            })
            .and({
                zone: { $all: request.requestZone },
            })
            .and({
                sale: {
                    $lte: { saleValue: request.requestSalePrice.salePriceMax },
                    $gte: { saleValue: request.requestSalePrice.salePriceMin },
                },
            })
            .and({
                rent: {
                    $lte: { rentValue: request.requestRentPrice.rentPriceMax },
                    $gte: { rentValue: request.requestRentPrice.rentPriceMin },
                },
            })
            .and({
                $lte: { buildSurface: request.requestBuildSurface.buildSurfaceMax },
                $gte: { buildSurface: request.requestBuildSurface.buildSurfaceMin },
            })
            .and({
                $lte: { plotSurface: request.requestPlotSurface.plotSurfaceMax },
                $gte: { plotSurface: request.requestPlotSurface.plotSurfaceMin },
            })
            .and({
                $lte: { bedrooms: request.requestBedrooms.bedroomsMax },
                $gte: { bedrooms: request.requestBedrooms.bedroomsMin },
            })
            .and({
                $lte: { bathrooms: request.requestBathrooms.bathroomsMax },
                $gte: { bathrooms: request.requestBathrooms.bathroomsMin },

            })

        return res.status(200).json(ad);
    } catch (err) {
        return next(err);
    }
}

const requestGetNewMatched = async (req, res, next) => {
    try {
        const {
            requestBuildingType,
            requestZone,
            salePriceMin,
            salePriceMax,
            rentPriceMin,
            rentPriceMax,
            buildSurfaceMin,
            buildSurfaceMax,
            plotSurfaceMin,
            plotSurfaceMax
        } = req.body;

        const ads = await Ad.find({
            adBuildingType: { $all: requestBuildingType },
        })
            .and({
                zone: { $all: requestZone },
            })
            .and({
                sale: {
                    $lte: { saleValue: salePriceMax },
                    $gte: { saleValue: salePriceMin },
                },
            })
            .and({
                rent: {
                    $lte: { rentValue: rentPriceMax },
                    $gte: { rentValue: rentPriceMin },
                },
            })
            .and({
                $lte: { buildSurface: buildSurfaceMax },
                $gte: { buildSurface: buildSurfaceMin },
            })
            .and({
                $lte: { plotSurface: plotSurfaceMax },
                $gte: { plotSurface: plotSurfaceMin },
            })
        // .and({
        //     $lte: { bedrooms: request.requestBedrooms.bedroomsMax },
        //     $gte: { bedrooms: request.requestBedrooms.bedroomsMin },
        // })
        // .and({
        //     $lte: { bathrooms: request.requestBathrooms.bathroomsMax },
        //     $gte: { bathrooms: request.requestBathrooms.bathroomsMin },

        // })

        return res.status(200).json(ads);
    } catch (err) {
        return next(err);
    }
}

const requestCreate = async (req, res, next) => {
    console.log(req.body);

    try {
        const {
            requestContact,
            requestConsultant,
            requestComment,
            requestAdType,
            requestBuildingType,
            requestReference,
            residential,
            patrimonial,
            salePriceMax,
            salePriceMin,
            rentPriceMax,
            rentPriceMin,
            buildSurfaceMax,
            buildSurfaceMin,
            plotSurfaceMax,
            plotSurfaceMin,
            bedroomsMax,
            bedroomsMin,
            bathroomsMax,
            bathroomsMin
        } = req.body;

        let zone = [];
        if (residential.length !== 0) zone = residential;
        if (patrimonial.length !== 0) zone = patrimonial;

        const newRequest = new Request({
            creationDate: getDate(),
            requestContact,
            requestConsultant,
            requestComment,
            requestAdType,
            requestBuildingType,
            requestReference,
            requestZone: zone,
            requestSalePrice: {
                salePriceMax,
                salePriceMin
            },
            requestRentPrice: {
                rentPriceMax,
                rentPriceMin
            },
            requestBuildSurface: {
                buildSurfaceMax,
                buildSurfaceMin
            },
            requestPlotSurface: {
                plotSurfaceMax,
                plotSurfaceMin
            },
            requestBedrooms: {
                bedroomsMax,
                bedroomsMin
            },
            requestBathrooms: {
                bathroomsMax,
                bathroomsMin
            }
        })

        const requestCreated = await newRequest.save();

        return res.status(200).json(requestCreated);
    } catch (err) {
        return next(err);
    }
}

const requestDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        let response = "";

        const deleted = await Request.findByIdAndDelete(id);
        if (deleted) response = "Petición borrada de la base de datos";
        else response = "No se ha podido encontrar esta petición. ¿Estás seguro de que existe?";

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    requestsGetAll,
    requestGetOne,
    requestLastReference,
    requestGetByContact,
    requestGetAdsMatched,
    requestGetNewMatched,
    requestCreate,
    requestDelete,
}