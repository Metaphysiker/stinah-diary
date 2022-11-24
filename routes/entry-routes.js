const express = require('express');
const multer = require("multer");
const router = express.Router();
const EntryModel = require('../model/entry');
const FileModel = require('../model/file');
const AnimalModel = require('../model/animal');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const sharp = require('sharp');
const isImage = require('is-image');
const s3 = require('../services/s3');



const storage = multer.memoryStorage();
const upload = multer({ storage });



router.get(
  '/entries',
  async (req, res, next) => {

    const filter = {};
    const entries = await EntryModel.find(filter).sort({'updatedAt': -1});

    res.json(entries)
  }
);

router.get(
  '/entries/date/:date',
  async (req, res, next) => {

    //const filter = {};
    //const entries = await EntryModel.find(filter).sort({'createdAt': -1});

    var date = req.params.date;
    //console.log("date: " + date);
    //var iso_date = ISODate(date);
    //console.log("iso_date: " + iso_date);

    var datex = new Date(date);
    //console.log(datex);

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    //console.log(startOfDay);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    //console.log(endOfDay);

    const entries = await EntryModel.find({
        createdAt: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    })

    res.json(entries)
  }
);

router.get(
  '/entries/date/:date/:animal_id',
  async (req, res, next) => {

    //const filter = {};
    //const entries = await EntryModel.find(filter).sort({'createdAt': -1});

    var date = req.params.date;
    //console.log("date: " + date);
    //var iso_date = ISODate(date);
    //console.log("iso_date: " + iso_date);

    var datex = new Date(date);
    //console.log(datex);

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    //console.log(startOfDay);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    //console.log(endOfDay);

    const entries = await EntryModel.find({
        animal_id: req.params.animal_id,
        createdAt: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    })

    res.json(entries)
  }
);

router.get(
  '/entries/calendar/:date',
  async (req, res, next) => {

    //const filter = {};
    //const entries = await EntryModel.find(filter).sort({'createdAt': -1});

    var date = new Date(req.params.date);
    //console.log("date: " + date);
    //var iso_date = ISODate(date);
    //console.log("iso_date: " + iso_date);

    //var datex = new Date(date);
    //console.log(datex);

    //const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    //const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    //const firstDay = getFirstDayOfWeek(firstDayOfMonth);
    //const lastDay = getLastDayOfWeek(lastDayOfMonth);

    const firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
    const lastDay = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));

    //console.log(firstDay);
    //console.log(lastDay);

    firstDay.setUTCHours(0, 0, 0, 0);
    lastDay.setUTCHours(23, 59, 59, 999);
    //console.log(endOfDay);

    const entries = await EntryModel.find({
        createdAt: {
            $gte: firstDay,
            $lt: lastDay
        }
    })

    res.json(entries)
  }
);

router.get(
  '/entries/calendar/:date/:animal_id',
  async (req, res, next) => {

    //const filter = {};
    //const entries = await EntryModel.find(filter).sort({'createdAt': -1});

    var date = new Date(req.params.date);
    //console.log("date: " + date);
    //var iso_date = ISODate(date);
    //console.log("iso_date: " + iso_date);

    //var datex = new Date(date);
    //console.log(datex);

    //const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    //const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    //const firstDay = getFirstDayOfWeek(firstDayOfMonth);
    //const lastDay = getLastDayOfWeek(lastDayOfMonth);

    const firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
    const lastDay = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));

    //console.log(firstDay);
    //console.log(lastDay);

    firstDay.setUTCHours(0, 0, 0, 0);
    lastDay.setUTCHours(23, 59, 59, 999);
    //console.log(endOfDay);

    const entries = await EntryModel.find({
        animal_id: req.params.animal_id,
        createdAt: {
            $gte: firstDay,
            $lt: lastDay
        }
    })

    res.json(entries)
  }
);

router.get(
  '/entries/search/',
  async (req, res, next) => {

    const filter = {};
    const entries = await EntryModel.find(filter).sort({'updatedAt': -1});

    res.json(entries)
  }
);

router.get(
  '/entries/search/:search_string',
  async (req, res, next) => {

    const entries = await EntryModel.find({$text: {$search: req.params.search_string}}).sort({'updatedAt': -1});

    res.json(entries)
  }
);

router.get(
  '/entries/animal/:animal_id',
  async (req, res, next) => {

    const filter = {animal_id: req.params.animal_id};
    const entries = await EntryModel.find(filter).sort({'updatedAt': -1});

    res.json(entries)
  }
);

router.get(
  '/entries/:id',
  async (req, res, next) => {
    const filter = {_id: req.params.id};
    const entry = await EntryModel.findOne(filter);
    const images = await FileModel.find({entry: entry._id}).sort({'updatedAt': -1});

    
    //const final_response = Object.assign({}, entry.toObject(), {images: images.map((r) => r.toObject())});

    EntryModel.
      findOne(filter).
      populate('animal').
      exec(function (err, entry) {
        if (err) return handleError(err);

        const final_response = Object.assign({}, entry.toObject(), {images: images.map((r) => r.toObject())});

        res.json(final_response);
      });

    //res.json(final_response)
  }
);

router.post(
  '/entries',
  async (req, res, next) => {
    let image;
    let upload_path;
    let file;

    const animal_object_id = new mongoose.Types.ObjectId(req.body.animal_id);
    const entry = await EntryModel.create({ content: req.body.content, animal_id: req.body.animal_id, animal: animal_object_id });
    const animal = await AnimalModel.findOneAndUpdate({ _id: req.body.animal_id }, {updatedAt: new Date()});

    create_file(req, entry)
      .then(() => {
        //res.json(entry);

        EntryModel
          .findOne({_id: entry._id})
          .populate('animal')
          .exec(function (err, entry2) {
            if (err) return handleError(err);

            res.json(entry2);
          });

      })
      .catch(
        (error) => {
          res.json(error);
        }
      );

  }
);

router.delete('/entries/:id',
  async (req, res, next) => {
    const filter = {_id: req.params.id};
    const file_filter = {entry_id: req.params.id};

    EntryModel.deleteOne(filter, function (err) {
      if (err) return handleError(err);
    });

    FileModel.findOne(file_filter).then(function (file, err) {
      //console.log("file: " + file);
      if (file) {
        file_path = path.join(__dirname, '../uploads/' + file.name);
        if (fs.existsSync(file_path)) {
          fs.unlink(file_path, (err_file_path) => {
            if (err_file_path) {
                throw err_file_path;
            }
            //console.log("Delete File successfully.");
            FileModel.deleteOne(file_filter, function (err_delete_file_model){
              if (err_delete_file_model) return handleError(err_delete_file_model);

            });
        });
        }

      }

    })


    res.json("entry_deleted")
  }
)

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
