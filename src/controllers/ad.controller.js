const Ad = require('./../models/ad.model');
const Request = require('./../models/request.model');

const adGetAll = async (req, res, next) => {
    try {
        const ads = await Ad
            .find()
            .populate({ path: 'owner', select: 'fullName' })
            .populate({ path: 'consultant', select: 'fullName' })
        return res.status(200).json(ads);
    } catch (err) {
        return next(err);
    }
}

const adGetMatchedRequests = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ad = await Ad.findById({ _id: id })

        // Query constructor
        let query = Request.find();

        if (ad.adType.length !== 0) query.where({ requestAdType: { $all: ad.adType } })
        if (ad.adBuildingType.length !== 0) query.where({ requestBuildingType: { $in: ad.adBuildingType } })
        if (ad.zone.length !== 0) query.where({ requestZone: { $in: ad.zone } })

        if (!ad.price.sale.saleValue) ad.price.sale.saleValue = 0
        query.where({
            requestSalePrice: {
                $gte: { salePriceMax: ad.price.sale.saleValue },
                $lte: { salePriceMin: ad.price.sale.saleValue }
            },
        })

        if (!ad.price.rent.rentValue) ad.price.rent.rentValue = 0
        query.where({
            requestRentPrice: {
                $gte: { rentPriceMax: ad.price.rent.rentValue },
                $lte: { rentPriceMin: ad.price.rent.rentValue }
            },
        })

        if (!ad.buildSurface) ad.buildSurface = 0
        query.where({
            requestBuildSurface: {
                $gte: { buildSurfaceMax: ad.buildSurface },
                $lte: { buildSurfaceMin: ad.buildSurface }
            }
        })

        if (!ad.plotSurface) ad.plotSurface = 0
        query.where({
            requestPlotSurface: {
                $gte: { plotSurfaceMax: ad.plotSurface },
                $lte: { plotSurfaceMin: ad.plotSurface }
            },
        })

        if (!ad.quality.bedrooms) ad.quality.bedrooms = 0
        query.where({
            requestBedrooms: {
                $gte: { bedroomsMax: ad.quality.bedrooms },
                $lte: { bedroomsMin: ad.quality.bedrooms }
            },
        })

        if (!ad.quality.bathrooms) ad.quality.bathrooms = 0
        query.where({
            requestBathrooms: {
                $gte: { bathroomsMax: ad.quality.bathrooms },
                $lte: { bathroomsMin: ad.quality.bathrooms }
            },
        })

        query.populate({ path: 'requestContact', select: 'fullName company email consultantComments' })

        const requests = await query.exec()

        return res.status(200).json(requests);
    } catch (err) {
        return next(err);
    }
}


const adGetOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ad = await Ad.findById(id);
        return res.status(200).json(ad);
    } catch (err) {
        return next(err);
    }
};

const adCreate = async (req, res, next) => {
    try {
        const {
            title,
            adReference,
            showOnWeb,
            featuredOnMain,
            street,
            directionNumber,
            directionFloor,
            postalCode,
            city,
            country,
            adType,
            gvOperationClose,
            owner,
            consultant,
            adBuildingType,
            zone,
            department,
            webSubtitle,
            buildSurface,
            plotSurface,
            floor,
            disponibility,
            surfaceFloor,
            surfaceUse,
            metersAvailables,
            meterPrice,
            surfaceDisponibility,
            saleValue,
            saleShowOnWeb,
            rentValue,
            rentShowOnWeb,
            monthlyRent,
            expenses,
            expensesIncluded,
            expensesValue,
            expensesShowOnWeb,
            ibiValue,
            ibiShowOnWeb,
            buildingYear,
            bedrooms,
            bathrooms,
            parking,
            indoorPool,
            outdoorPool,
            jobPositions,
            subway,
            bus,
            lift,
            dumbwaiter,
            liftTruck,
            airConditioning,
            centralHeating,
            subfloorHeating,
            indoorAlarm,
            outdoorAlarm,
            fullHoursSecurity,
            gunRack,
            strongBox,
            well,
            homeAutomation,
            centralVacuum,
            padelCourt,
            tennisCourt,
            terrace,
            storage,
            swimmingPool,
            garage,
            falseCeiling,
            qualityBathrooms,
            freeHeight,
            smokeOutlet,
            accesControl,
            web,
            emailPDF,
            distribution
        } = req.body;

        // const main = req.files.main ? req.files.main[0].location : "";
        // const blueprint = req.files.blueprint ? req.files.blueprint[0].location : '';
        // const others = req.files.others ? req.files.others.map(file => file.location) : '';

        const adDirection = {
            address: { street, directionNumber, directionFloor },
            postalCode,
            city,
            country
        };

        const surfacesBox = {
            surfaceFloor,
            surfaceUse,
            metersAvailables,
            meterPrice,
            surfaceDisponibility,
        }

        const price = {
            sale: { saleValue, saleShowOnWeb },
            rent: { rentValue, rentShowOnWeb }
        }

        const communityExpenses = { expensesValue, expensesShowOnWeb }
        const ibi = { ibiValue, ibiShowOnWeb }

        const quality = {
            bedrooms,
            bathrooms,
            parking,
            indoorPool,
            outdoorPool,
            jobPositions,
            subway,
            bus,
            others: {
                lift,
                dumbwaiter,
                liftTruck,
                airConditioning,
                centralHeating,
                subfloorHeating,
                indoorAlarm,
                outdoorAlarm,
                fullHoursSecurity,
                gunRack,
                strongBox,
                well,
                homeAutomation,
                centralVacuum,
                padelCourt,
                tennisCourt,
                terrace,
                storage,
                swimmingPool,
                garage,
                falseCeiling,
                qualityBathrooms,
                freeHeight,
                smokeOutlet,
                accesControl,
            },
        }

        const description = {
            web,
            emailPDF,
            distribution,
        }

        const images = {
            main: "",
            blueprint: "",
            others: "",
        }

        const newAd = new Ad({
            title,
            adReference,
            showOnWeb,
            featuredOnMain,
            adDirection: adDirection,
            adType,
            gvOperationClose,
            owner,
            consultant,
            adBuildingType,
            zone,
            department,
            webSubtitle,
            buildSurface,
            plotSurface,
            floor,
            disponibility,
            surfacesBox,
            price,
            monthlyRent,
            expenses,
            expensesIncluded,
            communityExpenses,
            ibi,
            buildingYear,
            quality,
            description,
            images
        })

        const adCreated = await newAd.save();

        return res.status(200).json(adCreated);

    } catch (err) {
        return next(err);
    }
}

const adUpdate = async (req, res, next) => {
    try {
        const {
            id,
            title,
            adReference,
            showOnWeb,
            featuredOnMain,
            street,
            directionNumber,
            directionFloor,
            postalCode,
            city,
            country,
            adType,
            gvOperationClose,
            owner,
            consultant,
            adBuildingType,
            zone,
            department,
            webSubtitle,
            buildSurface,
            plotSurface,
            floor,
            disponibility,
            surfaceFloor,
            surfaceUse,
            metersAvailables,
            meterPrice,
            surfaceDisponibility,
            saleValue,
            saleShowOnWeb,
            rentValue,
            rentShowOnWeb,
            monthlyRent,
            expenses,
            expensesIncluded,
            expensesValue,
            expensesShowOnWeb,
            ibiValue,
            ibiShowOnWeb,
            buildingYear,
            bedrooms,
            bathrooms,
            parking,
            indoorPool,
            outdoorPool,
            jobPositions,
            subway,
            bus,
            lift,
            dumbwaiter,
            liftTruck,
            airConditioning,
            centralHeating,
            subfloorHeating,
            indoorAlarm,
            outdoorAlarm,
            fullHoursSecurity,
            gunRack,
            strongBox,
            well,
            homeAutomation,
            centralVacuum,
            padelCourt,
            tennisCourt,
            terrace,
            storage,
            swimmingPool,
            garage,
            falseCeiling,
            qualityBathrooms,
            freeHeight,
            smokeOutlet,
            accesControl,
            web,
            emailPDF,
            distribution
        } = req.body;

        const fieldsToUpdate = {}

        // const main = req.files.main ? req.files.main[0].location : "";
        // const blueprint = req.files.blueprint ? req.files.blueprint[0].location : '';
        // const others = req.files.others ? req.files.others.map(file => file.location) : '';

        fieldsToUpdate.title = title
        fieldsToUpdate.adReference = adReference
        fieldsToUpdate.showOnWeb = showOnWeb
        fieldsToUpdate.featuredOnMain = featuredOnMain
        fieldsToUpdate.adType = adType
        fieldsToUpdate.gvOperationClose = gvOperationClose
        fieldsToUpdate.owner = owner
        fieldsToUpdate.consultant = consultant
        fieldsToUpdate.adBuildingType = adBuildingType
        fieldsToUpdate.zone = zone
        fieldsToUpdate.department = department
        fieldsToUpdate.webSubtitle = webSubtitle
        fieldsToUpdate.buildSurface = buildSurface
        fieldsToUpdate.plotSurface = plotSurface
        fieldsToUpdate.floor = floor
        fieldsToUpdate.disponibility = disponibility
        fieldsToUpdate.monthlyRent = monthlyRent
        fieldsToUpdate.expenses = expenses
        fieldsToUpdate.expensesIncluded = expensesIncluded
        fieldsToUpdate.buildingYear = buildingYear

        fieldsToUpdate.adDirection = {
            address: { street, directionNumber, directionFloor },
            postalCode,
            city,
            country
        };

        fieldsToUpdate.surfacesBox = {
            surfaceFloor,
            surfaceUse,
            metersAvailables,
            meterPrice,
            surfaceDisponibility,
        }

        fieldsToUpdate.price = {
            sale: { saleValue, saleShowOnWeb },
            rent: { rentValue, rentShowOnWeb }
        }

        fieldsToUpdate.communityExpenses = { expensesValue, expensesShowOnWeb }
        fieldsToUpdate.ibi = { ibiValue, ibiShowOnWeb }

        fieldsToUpdate.quality = {
            bedrooms,
            bathrooms,
            parking,
            indoorPool,
            outdoorPool,
            jobPositions,
            subway,
            bus,
            others: {
                lift,
                dumbwaiter,
                liftTruck,
                airConditioning,
                centralHeating,
                subfloorHeating,
                indoorAlarm,
                outdoorAlarm,
                fullHoursSecurity,
                gunRack,
                strongBox,
                well,
                homeAutomation,
                centralVacuum,
                padelCourt,
                tennisCourt,
                terrace,
                storage,
                swimmingPool,
                garage,
                falseCeiling,
                qualityBathrooms,
                freeHeight,
                smokeOutlet,
                accesControl,
            },
        }

        fieldsToUpdate.description = {
            web,
            emailPDF,
            distribution,
        }

        fieldsToUpdate.images = {
            main: "",
            blueprint: "",
            others: "",
        }

        const updatedAd = await Ad.findByIdAndUpdate(id, fieldsToUpdate, { new: true })

        return res.status(200).json(updatedAd);

    } catch (err) {
        return next(err);
    }
}

const adDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        let response = "";

        const deleted = await Ad.findByIdAndDelete(id);
        if (deleted) response = "Anuncio borrado de la base de datos";
        else response = "No se ha podido encontrar este anuncio. ¿Estás seguro de que existe?";

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    adGetAll,
    adGetOne,
    adCreate,
    adUpdate,
    adDelete,
    adGetMatchedRequests
}