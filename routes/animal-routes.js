const express = require('express');
const router = express.Router();
const AnimalModel = require('../model/animal');

router.get(
  '/animals',
  async (req, res, next) => {

    const filter = {};
    const animals = await AnimalModel.find(filter);

    res.json(animals)
  }
);

router.get(
  '/animals/:id',
  async (req, res, next) => {
    const filter = {_id: req.params.id};
    const animal = await AnimalModel.findOne(filter);

    res.json(animal)
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

module.exports = router;
