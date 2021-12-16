const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const countryRouter = require("./country.js");
// const activityRouter = require("./activity.js");

const router = Router();

router.get("/api", async (req, res) => {
  const info = await axios.get("https://api.TheDogAPI.com/v1/breeds", {
    headers: { "x-api-key": "ae0a2c56-b39f-4473-8631-391eaf562816" },
  });
  console.log("infooo", info.data);
  res.json(info.data);
  //   res.send("Hola");
});

// https://api.thedogapi.com/v1/images/search

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use("/countries", countryRouter);
// router.use("/activity", activityRouter);

module.exports = router;