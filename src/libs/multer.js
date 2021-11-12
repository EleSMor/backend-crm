const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { S3_ENDPOINT, BUCKET_NAME } = process.env

const spacesEndpoint = new AWS.Endpoint(S3_ENDPOINT);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint
})

// const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

// const fileFilter = (req, file, cb) => {
//     if (!VALID_FILE_TYPES.includes(file.mimetype)) {
//         const error = new Error('Tipo de archivo inválido. Solo png y jpg');
//         cb(error)
//     } else {
//         cb(null, true);
//     }
// };

const upload = multer({
    storage: multerS3({
        s3,
        bucket: BUCKET_NAME,
        ACL: 'public-read',
        metadata: (req, file, cb) => {
            console.log(file)
            cb(null, {
                fieldname: file.fieldname
            })
        },
        key: (req, file, cb) => {
            console.log(file);
            cb(null, `${Date.now()}-${file.originalname}`)
        },
    }),
})

module.exports = { upload, s3 }
