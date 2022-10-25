const express = require('express');
const router = express.Router();
const AnimalModel = require('../model/animal');
const EntryModel = require('../model/entry');

router.get(
  '/animals',
  async (req, res, next) => {

    const filter = {};
    const animals = await AnimalModel.find(filter).collation({ locale: "de", strength: 2 }).sort({'name': 1});
    res.json(animals)
  }
);

router.get(
  '/animals/:id',
  async (req, res, next) => {
    const filter = {_id: req.params.id};
    const animal = await AnimalModel.findOne(filter);
    const entries = await EntryModel.find({animal_id: animal._id}).sort({'updatedAt': -1});
    const final_response = Object.assign({}, animal.toObject(), {entries: entries.map((r) => r.toObject())});

    res.json(final_response)
  }
);

router.post(
  '/animals',
  async (req, res, next) => {

    //console.log('Got body:', req.body);

    try {
      const animal = await AnimalModel.create({ name: req.body.name });
      res.json(animal)
    } catch (error) {
      console.log(error);
    }

  }
);

router.delete('/animals/:id',
  async (req, res, next) => {
    const filter = {_id: req.params.id};
    AnimalModel.deleteOne(filter, function (err) {
      if (err) return handleError(err);
      res.json("animal_deleted")
    });
  }
)

module.exports = router;
