const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { getApiTemperament } = require("./utils");

const router = Router();

router.get("/api", async (req, res) => {
  try {
    const dataTemperament = await getApiTemperament();
    res.json(dataTemperament);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const dataTemperament = await getApiTemperament();
    res.json(dataTemperament);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  let newTemperament = await Temperament.create({
    id: uuidv4(),
    name,
  });
  res.status(200).json(newTemperament);
});

module.exports = router;
