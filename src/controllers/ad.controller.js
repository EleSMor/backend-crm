const Ad = require('./../models/ad.model');

const adGetAll = (req, res, next) => {
    try {
        const ads = await Ad.find();
        return res.status(200).json(ads);
    } catch (err) {
        return next(err);
    }
}

const adCreate = async (req, res, next) => {
    console.log(req.body);
    try {
        const {
            adStatus,
            title,
            showOnWeb,
            featuredOnMain,
            street,
            postalCode,
            city,
            country,
            adType,
            gvOperationClose,
            owner,
            consultant,
            adBuildingType,
            laFlorida,
            aravaca,
            valdemarín,
            montealina,
            pradoLargo,
            lasEncinas,
            alamoDeBulanas,
            mirasierra,
            elViso,
            nuevaEspana,
            jeronimos,
            almagro,
            condeDeOrgaz,
            laFinca,
            rosales,
            justicia,
            cortes,
            palacio,
            recoletos,
            castellana,
            recoletos,
            castellana,
            somosaguasA,
            somosaguasNorte,
            ciudadJardin,
            coloniaPuertaDeHierro,
            zonaPuertaDeHierro,
            subColoniaFuentelarreyna,
            peniagrande,
            mendezAlvaro,
            jeronimos,
            centro,
            salamanca,
            almagro,
            chamberi,
            elViso,
            azca,
            cuzco,
            chamartin,
            ctba,
            lasTablas_sanchinarro,
            camposDeLasNaciones,
            arroyoDeLaVega,
            avenidaAmerica,
            josefaValcarcel,
            arturoSoria,
            julianCamarillo,
            valdemarin,
            elPlantio,
            pozuelo,
            peLaFinca,
            ciudadDeLaImagen,
            madridSecundario,
            otros,
            periferia,
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
            disponibility,
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
            bathrooms,
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

        let lastReference = await Ad.find().sort({ adReference: -1 }).limit(1);
        console.log(lastReference);

        const adDirection = { street, postalCode, city, country };
        const zone = {
            residential: {
                residential: {
                    laFlorida,
                    aravaca,
                    valdemarín,
                    montealina,
                    pradoLargo,
                    lasEncinas,
                    alamoDeBulanas,
                    mirasierra,
                    elViso,
                    nuevaEspana,
                    jeronimos,
                    almagro,
                    condeDeOrgaz,
                    laFinca,
                    rosales,
                    justicia,
                    cortes,
                    palacio,
                },
                complexResidential: {
                    barrioSalamanca: {
                        recoletos,
                        castellana,
                    },
                    laMoraleja: {
                        recoletos,
                        castellana,
                    },
                    somosaguas: {
                        somosaguasA,
                        somosaguasNorte,
                    },
                    hispanoamerica: {
                        ciudadJardin,
                    },
                    puertaDeHierro: {
                        coloniaPuertaDeHierro,
                        zonaPuertaDeHierro,
                    },
                    coloniaFuentelarreyna: {
                        subColoniaFuentelarreyna,
                        peniagrande,
                    }
                },
                patrimonial: {
                    mendezAlvaro,
                    jeronimos,
                    centro,
                    salamanca,
                    almagro,
                    chamberi,
                    elViso,
                    azca,
                    cuzco,
                    chamartin,
                    ctba,
                    lasTablas_sanchinarro,
                    camposDeLasNaciones,
                    arroyoDeLaVega,
                    avenidaAmerica,
                    josefaValcarcel,
                    arturoSoria,
                    julianCamarillo,
                    valdemarin,
                    elPlantio,
                    pozuelo,
                    peLaFinca,
                    ciudadDeLaImagen,
                    madridSecundario,
                    otros,
                    periferia,
                }
            }
        }

        const surfacesBox = {
            surfaceFloor,
            surfaceUse,
            metersAvailables,
            meterPrice,
            disponibility,
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
                bathrooms,
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
            adStatus,
            title,
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

module.exports = {
    adGetAll,
    adCreate
}