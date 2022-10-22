const express = require('express');
const router = express.Router();
const EntryModel = require('../model/entry');
const FileModel = require('../model/file');
const AnimalModel = require('../model/animal');
const path = require('path');
const fs = require('fs');


router.get(
  '/entries',
  async (req, res, next) => {

    const filter = {};
    const entries = await EntryModel.find(filter).sort({'updatedAt': -1});

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
    const images = await FileModel.find({entry_id: entry._id}).sort({'updatedAt': -1});
    const final_response = Object.assign({}, entry.toObject(), {images: images.map((r) => r.toObject())});

    res.json(final_response)
  }
);

router.post(
  '/entries',
  async (req, res, next) => {
    let image;
    let upload_path;
    let file;

    if (!req.files || Object.keys(req.files).length === 0) {
      //console.log('No files were uploaded.');
    } else {
      //console.log('files are present.');
    }

    try {
      const entry = await EntryModel.create({ content: req.body.content, animal_id: req.body.animal_id });
      const animal = await AnimalModel.findOneAndUpdate({ _id: req.body.animal_id }, {updatedAt: new Date()});

      if(req.files && req.files.image){
        const file = await FileModel.create({});

        image = req.files.image
        upload_path = path.join(__dirname, '../uploads/' + file._id + "-" + image.name);

        image.mv(upload_path, async function(err){
          if(err){

          } else {
            //file = await FileModel.create({}); //FileModel.create({name: image.name, entry_id: entry._id});
            try {
              var entry_filter =  {_id: file._id};
              var new_entry_fields = {
                          name: file._id + "-" + image.name,
                          entry_id: entry._id
                        };
              const file2 = await FileModel.findOneAndUpdate(
                entry_filter,
                new_entry_fields,
                {
                  new: true
                });
            } catch (err){

            }

          }

        })

      }

      res.json(entry)
    } catch (error) {
      console.log(error);
    }

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
