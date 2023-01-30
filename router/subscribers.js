const express = require("express");
const router = express.Router();

const Subscriber = require("../module/subscribers");

//get one

router.get("/", async (req, res) => {
  try {
    const all_list = await Subscriber.find();
    res.json(all_list);
  } catch (e) {
    res.json({
      messages: e,
    });
  }
});

//get Id

router.get("/:id", getUsers, (req, res) => {
  res.json(res.subscriber);
});

//post

router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    Study: req.body.Study,
  });

  try {
    const saveData = await subscriber.save();
    res.json(saveData);
  } catch (err) {
    res.json({
      messages: err,
    });
  }
});

//patch
router.patch("/:id", getUsers, async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    Subscriber.findByIdAndUpdate(id, body, { new: true }, (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        status: true,
        user,
      });
    });
  } catch (err) {
    res.status(400).json({
      status: false,
    });
  }
});

//Delete
router.delete("/:id", getUsers, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({
      status: true,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error",
    });
  }
});

//to get user data
async function getUsers(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
  } catch (err) {
    return res.status(400).json({
      messages: "No profile Id",
    });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;
