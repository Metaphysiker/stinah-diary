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

router.get(
  '/to_dos/:id',
  async (req, res, next) => {

    const filter = {_id: req.params.id};
    const to_do = await ToDoModel.findOne(filter);

    res.json(to_do)
  }
);

router.post(
  '/to_dos',
  async (req, res, next) => {

    try {
      const to_do = await ToDoModel.create(
        {
          content: req.body.content,
          completed: req.body.completed
        }
      );
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
