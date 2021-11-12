const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adSchema = new Schema(
    {
        adReference: { type: String, required: true },
        adStatus: { type: String, enum: ['En preparación', 'Activo', 'Inactivo'], default: 'En preparación', required: true },
        title: { type: String, required: true },
        showOnWeb: { type: Boolean, required: true, default: true },
        featuredOnMain: { type: Boolean, required: true },
        adDirection: {
            adress: {
                street: { type: String, required: true },
                directionNumber: { type: Number, required: true },
                directionFloor: { type: String, required: true }
            },
            postalCode: { type: Number, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true }
        },
        adType: { type: [String], enum: ['Alquiler', 'Venta'], required: true },
        gvOperationClose: { type: [String], enum: ['Vendido', 'Alquilado', ''], default: '' },
        owner: [{ type: mongoose.Types.ObjectId, ref: 'contacts' }],
        consultant: [{ type: mongoose.Types.ObjectId, ref: 'consultants' }],
        adBuildingType: { type: [String], enum: ['Casa', 'Piso', 'Parcela', 'Ático', 'Oficina', 'Edificio', 'Local', 'Campo Rústico', 'Activos Singulares', 'Costa'], required: true },
        zone: [{ type: mongoose.Types.ObjectId, ref: 'zones' }],
        // zone: {
        //     residential: {
        //         residential: {
        //             laFlorida: { type: Boolean, default: false },
        //             aravaca: { type: Boolean },
        //             valdemarín: { type: Boolean },
        //             monteclaro: { type: Boolean },
        //             montealina: { type: Boolean },
        //             pradoLargo: { type: Boolean },
        //             lasEncinas: { type: Boolean },
        //             alamoDeBularas: { type: Boolean },
        //             mirasierra: { type: Boolean },
        //             jeronimos: { type: Boolean },
        //             elViso: { type: Boolean },
        //             almagro: { type: Boolean },
        //             condeDeOrgaz: { type: Boolean },
        //             laFinca: { type: Boolean },
        //             rosales: { type: Boolean },
        //             justicia: { type: Boolean },
        //             cortes: { type: Boolean },
        //             palacio: { type: Boolean },
        //         },
        //         complexResidential: {
        //             barrioSalamanca: {
        //                 recoletos: { type: Boolean },
        //                 castellana: { type: Boolean },
        //             },
        //             laMoraleja: {
        //                 laMoraleja: { type: Boolean },
        //                 elEncinar: { type: Boolean },
        //                 elSoto: { type: Boolean },
        //             },
        //             somosaguas: {
        //                 somosaguasA: { type: Boolean },
        //                 somosaguasNorte: { type: Boolean },
        //             },
        //             nuevaEspana_hispanoamerica: {
        //                 nuevaEspana: { type: Boolean },
        //                 ciudadJardin: { type: Boolean },
        //                 hispanoamerica: { type: Boolean },
        //             },
        //             puertaDeHierro: {
        //                 coloniaPuertaDeHierro: { type: Boolean },
        //                 zonaPuertaDeHierro: { type: Boolean },
        //             },
        //             coloniaFuentelarreyna: {
        //                 coloniaFuentelarreyna: { type: Boolean },
        //                 penagrande: { type: Boolean },
        //             }
        //         },
        //     },
        //     patrimonial: {
        //         mendezAlvaro: { type: Boolean },
        //         jeronimos: { type: Boolean },
        //         centro: { type: Boolean },
        //         salamanca: { type: Boolean },
        //         almagro: { type: Boolean },
        //         chamberi: { type: Boolean },
        //         elViso: { type: Boolean },
        //         azca: { type: Boolean },
        //         cuzco: { type: Boolean },
        //         chamartin: { type: Boolean },
        //         ctba: { type: Boolean },
        //         lasTablas_sanChinarro: { type: Boolean },
        //         camposDeLasNaciones: { type: Boolean },
        //         arroyoDeLaVega: { type: Boolean },
        //         avenidaAmerica: { type: Boolean },
        //         josefaValcarcel: { type: Boolean },
        //         arturoSoria: { type: Boolean },
        //         julianCamarillo: { type: Boolean },
        //         valdemarin: { type: Boolean },
        //         elPlantio: { type: Boolean },
        //         pozuelo: { type: Boolean },
        //         peLaFinca: { type: Boolean },
        //         ciudadDeLaImagen: { type: Boolean },
        //         madridSecundario: { type: Boolean },
        //         otros: { type: Boolean },
        //         periferia: { type: Boolean },
        //     }
        // },
        department: { type: String, enum: ['Patrimonio', 'Residencial'], required: true },
        webSubtitle: { type: String, required: true },
        buildSurface: { type: Number },
        plotSurface: { type: Number },
        floor: { type: String },
        disponibility: { type: String },
        surfacesBox: [{
            surfaceFloor: { type: String },
            surfaceUse: { type: String },
            metersAvailables: { type: Number },
            meterPrice: { type: Number },
            surfaceDisponibility: { type: String },
        }],
        price: {
            sale: {
                saleValue: { type: Number },
                saleShowOnWeb: { type: Boolean },
            },
            rent: {
                rentValue: { type: Number },
                rentShowOnWeb: { type: Boolean },
            },
        },
        monthlyRent: { type: Number },
        expenses: { type: Number },
        expensesIncluded: { type: Number },
        communityExpenses: {
            expensesValue: { type: Number },
            expensesShowOnWeb: { type: Boolean },
        },
        ibi: {
            ibiValue: { type: Number },
            ibiShowOnWeb: { type: Boolean },
        },
        buildingYear: { type: String },
        quality: {
            bedrooms: { type: Number },
            bathrooms: { type: Number },
            parking: { type: Number },
            indoorPool: { type: Number },
            outdoorPool: { type: Number },
            jobPositions: { type: Number },
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
                raisedFloor: { type: Boolean },
                qualityBathrooms: { type: Boolean },
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
            media: { type: String },
        },
        requests: { type: mongoose.Types.ObjectId, ref: 'requests' }
    },
    {
        timestamps: true
    }
);

const Ad = mongoose.model('ads', adSchema);

module.exports = Ad;



