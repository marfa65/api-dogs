const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");

const router = Router();

router.post("/", async (req, res) => {
  const { name } = req.body;
  let newTemperament = await Temperament.create({
    id: uuidv4(),
    name,
  });
  res.status(200).json(newTemperament);
});

module.exports = router;
