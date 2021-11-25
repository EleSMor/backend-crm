const Request = require('./../models/request.model');
const { getDate } = require('./utils');

const requestsGetAll = async (req, res, next) => {
    try {
        const requests = await Request
            .find()
            .populate({ path:'requestContact', select:'fullName company'})
            .populate({ path:'requestConsultant', select:'fullName'})
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

const requestGetByConsultant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const request = await Request.find({ consultant: { id } });
        return res.status(200).json(request);
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
    requestGetByConsultant,
    requestCreate,
    requestDelete,
}