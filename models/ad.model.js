const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adSchema = new Schema(
    {
        adStatus: { type: String, enum: ["En preparación", "Activo", "Inactivo"], default: "En preparación", required: true },
        title: { type: String, required: true },
        showOnWeb: { type: Boolean, required: true, default: 'yes' },
        featuredOnMain: { type: Boolean, required: true, default: 'no' },
        direction: {
            street: { type: String, required: true },
            postalCode: { type: Number, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true }
        },
        adType: { type: Array, enum: ['Alquiler, Venta'], required: true },
        gvOperationClose: { type: String, enum: ['Vendido', 'Alquilado'] },
        owner: { type: mongoose.Types.ObjectId, ref: 'contacts' },
        consultant: { type: mongoose.Types.ObjectId, ref: 'consultants' },
        adReference: { type: String, required: true },
        adBuildingType: { type: Array, enum: ["Casa", "Piso", "Parcela", "Ático", "Oficina", "Edificio", "Local", "Campo Rústico", "Activos Singulares", "Costa"], required: true },
        zone: {
            residential: {
                residential: {
                    laFlorida: { type: Boolean },
                    aravaca: { type: Boolean },
                    valdemarín: { type: Boolean },
                    montealina: { type: Boolean },
                    pradoLargo: { type: Boolean },
                    lasEncinas: { type: Boolean },
                    alamoDeBulanas: { type: Boolean },
                    mirasierra: { type: Boolean },
                    elViso: { type: Boolean },
                    nuevaEspana: { type: Boolean },
                    jeronimos: { type: Boolean },
                    almagro: { type: Boolean },
                    condeDeOrgaz: { type: Boolean },
                    laFinca: { type: Boolean },
                    rosales: { type: Boolean },
                    justicia: { type: Boolean },
                    cortes: { type: Boolean },
                    palacio: { type: Boolean },
                },
                complexResidential: {
                    barrioSalamanca: {
                        recoletos: { type: Boolean },
                        castellana: { type: Boolean },
                    },
                    laMoraleja: {
                        subLaMoraleja: { type: Boolean },
                        elEncinar: { type: Boolean },
                        elSoto: { type: Boolean },
                    },
                    somosaguas: {
                        somosaguasA: { type: Boolean },
                        somosaguasNorte: { type: Boolean },
                    },
                    hispanoamerica: {
                        ciudadJardin: { type: Boolean },
                    },
                    puertaDeHierro: {
                        coloniaPuertaDeHierro: { type: Boolean },
                        zonaPuertaDeHierro: { type: Boolean },
                    },
                    coloniaFuentelarreyna: {
                        subColoniaFuentelarreyna: { type: Boolean },
                        peniagrande: { type: Boolean },
                    }
                },
            },
            patrimonial: {
                mendezAlvaro: { type: Boolean },
                jeronimos: { type: Boolean },
                centro: { type: Boolean },
                salamanca: { type: Boolean },
                almagro: { type: Boolean },
                chamberi: { type: Boolean },
                elViso: { type: Boolean },
                azca: { type: Boolean },
                cuzco: { type: Boolean },
                chamartin: { type: Boolean },
                ctba: { type: Boolean },
                lasTablas_sanchinarro: { type: Boolean },
                camposDeLasNaciones: { type: Boolean },
                arroyoDeLaVega: { type: Boolean },
                avenidaAmerica: { type: Boolean },
                josefaValcarcel: { type: Boolean },
                arturoSoria: { type: Boolean },
                julianCamarillo: { type: Boolean },
                valdemarin: { type: Boolean },
                elPlantio: { type: Boolean },
                pozuelo: { type: Boolean },
                peLaFinca: { type: Boolean },
                ciudadDeLaImagen: { type: Boolean },
                madridSecundario: { type: Boolean },
                otros: { type: Boolean },
                periferia: { type: Boolean },
            }
        },
        department: { type: String, enum: ["Patrimonio", "Residencial"], required: yes },
        webSubitle: { type: String, required: yes },
        buildSurface: { type: Number },
        plotSurface: { type: Number },
        floor: { type: String },
        disponibility: { type: String },
        surfacesBox: {
            floor: { type: String },
            use: { type: String },
            metersAvailables: { type: String },
            price: { type: Number },
            disponibility: { type: String },
        },
        price: {
            sale: {
                value: { type: Number },
                showOnWeb: { type: Boolean },
            },
            rent: {
                value: { type: Number },
                showOnWeb: { type: Boolean },
            },
        },
        monthlyRent: { type: Number },
        expenses: { type: Number },
        expensesIncluded: { type: Number },
        communityExpenses: {
            value: { type: Number },
            showOnWeb: { type: Boolean },
        },
        ibi: {
            value: { type: Number },
            showOnWeb: { type: Boolean },
        },
        buildingYear: { type: String },
        quality: {
            bedrooms: { type: Number },
            bathrooms: { type: Number },
            parking: { type: String },
            indoorPool: { type: String },
            outdoorPool: { type: String },
            jobPositions: { type: String },
            subway: { type: String },
            bus: { type: String },
            others: {
                lift: { type: Boolean },
                dumbwaiter: { type: Boolean },
                liftTruck: { type: Boolean },
                airConditioning: { type: Boolean },
                centralHeating: { type: Boolean },
                subfloorHeating: { type: Boolean },
                indoorAlarm: { type: Boolean },
                outdoorAlarm: { type: Boolean },
                fullHoursSecurity: { type: Boolean },
                gunRack: { type: Boolean },
                strongBox: { type: Boolean },
                well: { type: Boolean },
                homeAutomation: { type: Boolean },
                centralVacuum: { type: Boolean },
                padelCourt: { type: Boolean },
                tennisCourt: { type: Boolean },
                terrace: { type: Boolean },
                storage: { type: Boolean },
                swimmingPool: { type: Boolean },
                garage: { type: Boolean },
                falseCeiling: { type: Boolean },
                bathrooms: { type: Boolean },
                freeHeight: { type: Boolean },
                smokeOutlet: { type: Boolean },
                accesControl: { type: Boolean },
            },
        },
        description: {
            web: { type: String },
            emailPDF: { type: String },
            distribution: { type: String },
        },
        images: {
            main: { type: String },
            blueprint: { type: Array },
            others: { type: Array },
        },
        requests: { type: mongoose.Types.ObjectId, ref: 'requests' }
    },
    {
        timestamps: true
    }
);

const Ad = mongoose.model('ads', adSchema);

module.exports = Ad;



