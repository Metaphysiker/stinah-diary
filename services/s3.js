const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");


AWS.config.update({
  region: "eu-central-1",
});

var s3 = new AWS.S3({apiVersion: '2006-03-01'});



const uploadFile = (file_path) => {
  console.log("s3.uploadFile");

  return new Promise(function(final_resolve, final_reject){

    var uploadParams = {Bucket: "stinah-diary", Key: '', Body: ''};

    var fileStream = fs.createReadStream(file_path);

    fileStream.on('error', function(err) {
      console.log('File Error', err);
      final_reject("filestream error");
    });

    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(file_path);

    s3.upload (uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
        final_reject("upload error");
      } if (data) {
        console.log("Upload Success", data.Location);
        final_resolve(data.Location);
      }
    });

  })


}

const retrieveFile = async (key) => {

  const client = new S3Client({
    region: "eu-central-1",
  });
  const command = new GetObjectCommand(
    {
      Bucket: "stinah-diary",
       Key: key,
      ContentType: ''}
  );
  const url = await getSignedUrl(client, command, { expiresIn: 3600 });

  return new Promise(function(final_resolve, final_reject){

    final_resolve(url);
  })

}

module.exports = {
  uploadFile: uploadFile,
  retrieveFile: retrieveFile
};
