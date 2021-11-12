const Request = require('./../models/request.model');

const requestsGetAll = async (req, res, next) => {
    try {
        const requests = await Request.find();
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
            requestZone,
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

        const newRequest = new Request({
            requestContact,
            requestConsultant,
            requestComment,
            requestAdType,
            requestBuildingType,
            requestZone,
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
    requestGetByConsultant,
    requestCreate,
    requestDelete,
}