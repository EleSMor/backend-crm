const Ad = require('./../models/ad.model');

const adGetAll = async (req, res, next) => {
    try {
        const ads = await Ad.find();
        return res.status(200).json(ads);
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
    console.log(req.body);
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
            residential,
            patrimonial,
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
            distribution,
            main,
            blueprint,
            others
        } = req.body;

        const adDirection = {
            adress: { street, directionNumber, directionFloor },
            postalCode,
            city,
            country
        };

        let zone = [];
        if (residential) { zone = residential };
        if (patrimonial) zone = patrimonial;

        if (gvOperationClose.length === 0) gvOperationClose.push = ''; 

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
            main,
            blueprint,
            others,
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
    adDelete
}