const Request = require('./../models/request.model');
const Ad = require('./../models/ad.model');
const mongoose = require('mongoose');


const requestsGetAll = async (req, res, next) => {
    try {
        const requests = await Request
            .find()
            .populate({ path: 'requestContact', select: 'fullName company' })
            .populate({ path: 'requestConsultant', select: 'fullName' })
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

        // Query constructor
        let query = Ad.find();

        query.where({ adStatus: "Activo" })

        if (request.requestAdType.length !== 0) query.where({ adType: { $all: request.requestAdType } })
        if (request.requestBuildingType.length !== 0) query.where({ adBuildingType: { $in: request.requestBuildingType } })
        if (request.requestZone.length !== 0) query.where({ zone: { $in: request.requestZone } })

        if (!request.requestSalePrice.salePriceMax) request.requestSalePrice.salePriceMax = 99999999
        if (!request.requestSalePrice.salePriceMin) request.requestSalePrice.salePriceMin = 0
        query.where({
            sale: {
                $lte: { saleValue: request.requestSalePrice.salePriceMax },
                $gte: { saleValue: request.requestSalePrice.salePriceMin },
            },
        })

        if (!request.requestRentPrice.rentPriceMax) request.requestRentPrice.rentPriceMax = 99999
        if (!request.requestRentPrice.rentPriceMin) request.requestRentPrice.rentPriceMin = 0
        query.where({
            rent: {
                $lte: { rentValue: request.requestRentPrice.rentPriceMax },
                $gte: { rentValue: request.requestRentPrice.rentPriceMin },
            },
        })

        if (!request.requestBuildSurface.buildSurfaceMax) request.requestBuildSurface.buildSurfaceMax = 9999
        if (!request.requestBuildSurface.buildSurfaceMin) request.requestBuildSurface.buildSurfaceMin = 0
        query.where({
            $lte: { buildSurface: request.requestBuildSurface.buildSurfaceMax },
            $gte: { buildSurface: request.requestBuildSurface.buildSurfaceMin },
        })

        if (!request.requestPlotSurface.plotSurfaceMax) request.requestPlotSurface.plotSurfaceMax = 99999
        if (!request.requestPlotSurface.plotSurfaceMin) request.requestPlotSurface.plotSurfaceMin = 0
        query.where({
            $lte: { plotSurface: request.requestPlotSurface.plotSurfaceMax },
            $gte: { plotSurface: request.requestPlotSurface.plotSurfaceMin },
        })

        if (!request.requestBedrooms.bedroomsMax) request.requestBedrooms.bedroomsMax = 99
        if (!request.requestBedrooms.bedroomsMin) request.requestBedrooms.bedroomsMin = 0
        query.where({
            $lte: { bedrooms: request.requestBedrooms.bedroomsMax },
            $gte: { bedrooms: request.requestBedrooms.bedroomsMin },
        })

        if (!request.requestBathrooms.bathroomsMax) request.requestBathrooms.bathroomsMax = 99
        if (!request.requestBathrooms.bathroomsMin) request.requestBathrooms.bathroomsMin = 0
        query.where({
            $lte: { bathrooms: request.requestBathrooms.bathroomsMax },
            $gte: { bathrooms: request.requestBathrooms.bathroomsMin },
        })

        const ad = await query.exec()

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

        return res.status(200).json(ads);
    } catch (err) {
        return next(err);
    }
}

const requestCreate = async (req, res, next) => {

    try {
        const requestSalePrice = {
            salePriceMax: req.body.salePriceMax,
            salePriceMin: req.body.salePriceMin
        }

        const requestRentPrice = {
            rentPriceMax: req.body.rentPriceMax,
            rentPriceMin: req.body.rentPriceMin
        }

        const requestBuildSurface = {
            buildSurfaceMax: req.body.buildSurfaceMax,
            buildSurfaceMin: req.body.buildSurfaceMin
        }

        const requestPlotSurface = {
            plotSurfaceMax: req.body.plotSurfaceMax,
            plotSurfaceMin: req.body.plotSurfaceMin
        }

        const requestBedrooms = {
            bedroomsMax: req.body.bedroomsMax,
            bedroomsMin: req.body.bedroomsMin
        }

        const requestBathrooms = {
            bathroomsMax: req.body.bathroomsMax,
            bathroomsMin: req.body.bathroomsMin
        }

        const newRequest = new Request({
            requestContact: req.body.requestContact,
            requestConsultant: req.body.requestConsultant,
            requestComment: req.body.requestComment,
            requestAdType: req.body.requestAdType,
            requestBuildingType: req.body.requestBuildingType,
            requestPlotSurface,
            requestBedrooms,
            requestBathrooms,
            requestReference: req.body.requestReference,
            requestZone: req.body.requestZone,
            requestSalePrice,
            requestRentPrice,
            requestBuildSurface,
        })

        const requestCreated = await newRequest.save();

        return res.status(200).json(requestCreated);
    } catch (err) {
        return next(err);
    }
}

const requestUpdate = async (req, res, next) => {

    try {  
        let fieldsToUpdate = {};

        fieldsToUpdate.requestContact = req.body.requestContact
        fieldsToUpdate.requestConsultant = req.body.requestConsultant
        fieldsToUpdate.requestComment = req.body.requestComment
        fieldsToUpdate.requestAdType = req.body.requestAdType
        fieldsToUpdate.requestBuildingType = req.body.requestBuildingType
        fieldsToUpdate.requestReference = req.body.requestReference
        fieldsToUpdate.requestZone = req.body.requestZone;

        fieldsToUpdate.requestSalePrice = {
            salePriceMax: req.body.salePriceMax,
            salePriceMin: req.body.salePriceMin
        }

        fieldsToUpdate.requestRentPrice = {
            rentPriceMax: req.body.rentPriceMax,
            rentPriceMin: req.body.rentPriceMin
        }

        fieldsToUpdate.requestBuildSurface = {
            buildSurfaceMax: req.body.buildSurfaceMax,
            buildSurfaceMin: req.body.buildSurfaceMin
        }

        fieldsToUpdate.requestPlotSurface = {
            plotSurfaceMax: req.body.plotSurfaceMax,
            plotSurfaceMin: req.body.plotSurfaceMin
        }

        fieldsToUpdate.requestBedrooms = {
            bedroomsMax: req.body.bedroomsMax,
            bedroomsMin: req.body.bedroomsMin
        }

        fieldsToUpdate.requestBathrooms = {
            bathroomsMax: req.body.bathroomsMax,
            bathroomsMin: req.body.bathroomsMin
        }

        const updatedRequest = await Request.findByIdAndUpdate(req.body.id, fieldsToUpdate, { new: true })

        return res.status(200).json(updatedRequest);

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
    requestUpdate,
    requestDelete,
}