const express = require('express');
const router = express.Router();
const ToDoModel = require('../model/to_do');

router.get(
  '/to_dos',
  async (req, res, next) => {

    const filter = {};
    const to_dos = await ToDoModel.find(filter);
    res.json(to_dos)
  }
);

router.post(
  '/to_dos',
  async (req, res, next) => {

    //console.log(req);

    try {
      const to_do = await ToDoModel.create({ content: req.body.content });
      res.json(to_do)
    } catch (error) {
      console.log(error);
    }

  }
);

router.delete('/to_dos/:id',
  async (req, res, next) => {
    const filter = {_id: req.params.id};
    ToDoModel.deleteOne(filter, function (err) {
      if (err) return handleError(err);
      res.json("to_do_deleted")
    });
  }
)


module.exports = router;
