const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');


router.put(
  '/users',
  async (req, res, next) => {
    console.log("update users");

    const filter = {_id: req.user._id};

    const user = await UserModel.find(filter)
    const update = {
      get_daily_updates: req.body.get_daily_updates
    }

    try {
      const new_user = await UserModel.findOneAndUpdate(filter, update, {
        new: true
      });
      res.json(new_user);
    } catch (error) {
      console.log(error);
    }

  }
);


module.exports = router;
