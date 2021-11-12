const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestsSchema = new Schema({
    lastModifiedDate: { type: String },
    requestReference: { type: Number, required: true },
    requestContact: { type: mongoose.Types.ObjectId, ref: 'contacts' },
    requestConsultant: { type: mongoose.Types.ObjectId, ref: 'consultants' },
    requestComment: { type: String },
    requestAdType: { type: Array, enum: ["Alquiler", "Venta"] },
    requestBuildingType: { type: Array, enum: ["Casa", "Piso", "Parcela", "Ático", "Oficina", "Edificio", "Local", "Campo Rústico", "Activos Singulares", "Costa"] },
    requestZone: {
        residential: {
            residential: {
                laFlorida: { type: Boolean },
                aravaca: { type: Boolean },
                valdemarín: { type: Boolean },
                monteclaro: { type: Boolean },
                montealina: { type: Boolean },
                pradoLargo: { type: Boolean },
                lasEncinas: { type: Boolean },
                alamoDeBularas: { type: Boolean },
                mirasierra: { type: Boolean },
                jeronimos: { type: Boolean },
                elViso: { type: Boolean },
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
                    laMoraleja: { type: Boolean },
                    elEncinar: { type: Boolean },
                    elSoto: { type: Boolean },
                },
                somosaguas: {
                    somosaguasA: { type: Boolean },
                    somosaguasNorte: { type: Boolean },
                },
                nuevaEspana_hispanoamerica: {
                    nuevaEspana: { type: Boolean },
                    ciudadJardin: { type: Boolean },
                    hispanoamerica: { type: Boolean },
                },
                puertaDeHierro: {
                    coloniaPuertaDeHierro: { type: Boolean },
                    zonaPuertaDeHierro: { type: Boolean },
                },
                coloniaFuentelarreyna: {
                    coloniaFuentelarreyna: { type: Boolean },
                    penagrande: { type: Boolean },
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
            lasTablas_sanChinarro: { type: Boolean },
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
    requestSalePrice: {
        salePriceMax: { type: Number, default: 0 },
        salePriceMin: { type: Number, default: 0 },
    },
    requestRentPrice: {
        rentPriceMax: { type: Number, default: 0 },
        rentPriceMin: { type: Number, default: 0 },
    },
    requestBuildSurface: {
        buildSurfaceMax: { type: Number, default: 0 },
        buildSurfaceMin: { type: Number, default: 0 },
    },
    requestPlotSurface: {
        plotSurfaceMax: { type: Number, default: 0 },
        plotSurfaceMin: { type: Number, default: 0 },
    },
    requestBedrooms: {
        bedroomsMax: { type: Number, default: 0 },
        bedroomsMin: { type: Number, default: 0 },
    },
    requestBathrooms: {
        bathroomsMax: { type: Number, default: 0 },
        bathroomsMin: { type: Number, default: 0 },
    },
    consultantComments: {
        consultant: { type: mongoose.Types.ObjectId, ref: 'consultants' },
        creationDate: { type: String },
        consultantImage: { type: String },
        description: { type: String },
    },
},
    {
        timestamp: true
    })

const Request = mongoose.model('requests', requestsSchema);

module.exports = Request;