const express = require('express');
const router = express.Router();
const EntryModel = require('../model/entry');

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
      const entry = await EntryModel.create({ name: req.body.name });
      res.json(entry)
    } catch (error) {
      console.log(error);
    }

  }
);

module.exports = router;
