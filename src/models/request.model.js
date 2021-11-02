const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestsSchema = new Schema({
    lastModifiedDate: { type: String },
    requestId: { type: String },
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
    requestSalePrice: {
        max: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
    },
    requestRentPrice: {
        max: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
    },
    requestBuildSurface: {
        max: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
    },
    requestPlotSurface: {
        max: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
    },
    requestBedrooms: {
        max: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
    },
    requestBathrooms: {
        max: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
    },
    consultantComments: {
        consultant: { type: mongoose.Types.ObjectId, ref: 'consultants' },
        creationDate: { type: string },
        consultantImage: { type: String },
        description: { type: String },
    },
},
    {
        timestamp: true
    })

const Request = mongoose.model('requests', requestsSchema);

module.exports = Request;