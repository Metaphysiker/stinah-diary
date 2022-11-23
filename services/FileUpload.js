var express = require('express'),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY_ID,
  accessKeyId: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "eu-central-1",
});

var app = express(),
    s3 = new aws.S3();

var upload = multer({
storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'bucket-name',
    key: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname); //use Date.now() for unique file keys
    }
})
});

const fileFilter = (req, file, cb) => {
  console.log("fileFilter");
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'stinah-diary',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

module.exports = upload;
