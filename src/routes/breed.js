const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { Breed } = require("../db");

const { getApiInfo } = require("./utils.js");

const router = Router();

// router.get("/api", async (req, res) => {
//   const info = await axios.get("https://api.TheDogAPI.com/v1/breeds", {
//     headers: { "x-api-key": "ae0a2c56-b39f-4473-8631-391eaf562816" },
//   });
//   // console.log("infooo", info.data);
//   res.json(info.data);
//   //   res.send("Hola");
// });
router.get("/", async (req, res) => {
  try {
    const dogsApi = await getApiInfo();

    res.status(200).send(dogsApi);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const { name, height, weight, age, createdDb } = req.body;
  let newBreed = await Breed.create({
    id: uuidv4(),
    name,
    height,
    weight,
    age,
    createdDb,
  });
  res.status(200).json(newBreed);
});

module.exports = router;
