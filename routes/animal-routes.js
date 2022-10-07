const express = require('express');
const router = express.Router();
const AnimalModel = require('../model/animal');

router.get(
  '/animals',
  async (req, res, next) => {

    const filter = {};
    const animals = await AnimalModel.find(filter);

    res.json({
      animals: animals
    })
  }
);

module.exports = router;
