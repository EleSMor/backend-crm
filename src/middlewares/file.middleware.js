const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { S3_ENDPOINT, BUCKET_NAME } = process.env

const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT);
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        const error = new Error('Tipo de archivo inválido. Solo png y jpg');
        cb(error)
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: multerS3({
        s3,
        bucket: BUCKET_NAME,
        ACL: 'public-read',
        metadata: (req, file, cb) => {
            console.log("archivo:", file);
            cb(null, {
                fieldname: file.fieldname
            })
        },
        key: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        },
    }),
    fileFilter
})

// const deleteImage = s3.deleteObject({ Bucket: BUCKET_NAME, Objects: [{ req }] }, function (err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log(data);
// });

module.exports = { upload, s3 }
