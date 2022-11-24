const express = require('express');
const multer = require("multer");
const multerS3 = require('multer-s3');
const router = express.Router();
const EntryModel = require('../model/entry');
const FileModel = require('../model/file');
const AnimalModel = require('../model/animal');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const sharp = require('sharp');
const isImage = require('is-image');
const AWS = require('aws-sdk');
AWS.config.update({
  region: "eu-central-1",
});
//const s3 = new S3Client();

//const upload = require("../services/FileUpload");
//const singleUpload = upload.single("files");

var s3 = new AWS.S3({apiVersion: '2006-03-01'});
//const s3 = new AWS.S3({
//  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//})


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/files',
  async (req, res, next) => {

    if(req.files && req.files.file){
      console.log("file is here");
      console.log(req.files);
    } else {
      console.log("no file");
    }

    var file = req.files.file


  const upload_path = path.join(__dirname, '../uploads/' + "-" + file.name);

  file.mv(upload_path, async function(err){
    if(err){
      console.log("file mv error");
    } else {
      console.log("file mv no error");

      var uploadParams = {Bucket: "stinah-diary", Key: '', Body: ''};

      var fileStream = fs.createReadStream(upload_path);
      fileStream.on('error', function(err) {
        console.log('File Error', err);
      });
      uploadParams.Body = fileStream;
      uploadParams.Key = path.basename(file.name);

      s3.upload (uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } if (data) {
          console.log("Upload Success", data.Location);
        }
      });

    }
  })




  }
);


module.exports = router;


async function asyncCall() {

  const result = await resolveAfter2Seconds();

}



function create_file(req, entry){
  return new Promise(function(final_resolve, final_reject){
    if(req.files && req.files.image){
      FileModel.create({})
      .then(function(file){
        const image = req.files.image
        const upload_path = path.join(__dirname, '../uploads/' + file._id + "-" + image.name);

        image.mv(upload_path, async function(err){
          if(err){

          } else {

            compress_image(upload_path)
            .then((upload_path2) => {

              const filename = path.basename(upload_path2);
              //console.log(filename);

              var file_filter =  {_id: file._id};
              var new_file_fields = {
                          name: filename,
                          entry_id: entry._id,
                          entry: entry._id
                        };


              FileModel.findOneAndUpdate(
                file_filter,
                new_file_fields,
                {
                  new: true
                }).then((file2) => {

                  final_resolve();
                });

            })

          }

        })

      });


    } else {
      final_resolve();
    }


  }) // end of final promise
}

function compress_image(file_path){
  return new Promise(function(final_resolve, final_reject){

    if(isImage(file_path)){

      const filename_without_extension = path.parse(file_path).name;
      var new_path = path.join(__dirname, '../uploads/' + filename_without_extension + ".webp");

      if(file_path === new_path){
        new_path = path.join(__dirname, '../uploads/' + filename_without_extension + "0" + ".webp");
      }

      sharp(file_path)
        .webp({ quality: 20 })
        .toFile(new_path)
        .then(() => {

          fs.unlink(file_path, (err_file_path) => {
            if (err_file_path) {
                throw err_file_path;
            }
          });

          final_resolve(new_path);
        })

    } else {
      final_resolve(file_path);
    }

  })
}

function getFirstDayOfWeek(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + 1;

  return new Date(date.setDate(diff));
}

function getLastDayOfWeek(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + 7;

  return new Date(date.setDate(diff));
}
