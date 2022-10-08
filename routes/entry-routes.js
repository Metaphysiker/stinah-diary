const express = require('express');
const router = express.Router();
const EntryModel = require('../model/entry');
const AnimalModel = require('../model/animal');


router.get(
  '/entries',
  async (req, res, next) => {

    const filter = {};
    const entries = await EntryModel.find(filter).sort({'updatedAt': -1});

    res.json(entries)
  }
);

router.get(
  '/entries/:id',
  async (req, res, next) => {
    const filter = {_id: req.params.id};
    const entry = await EntryModel.findOne(filter);

    res.json(entry)
  }
);

router.post(
  '/entries',
  async (req, res, next) => {

    //console.log('Got body:', req.body);

    try {
      const entry = await EntryModel.create({ content: req.body.content, animal_id: req.body.animal_id });
      const animal = await AnimalModel.findOneAndUpdate({ _id: req.body.animal_id }, {updatedAt: new Date()});
      res.json(entry)
    } catch (error) {
      console.log(error);
    }

  }
);

module.exports = router;
