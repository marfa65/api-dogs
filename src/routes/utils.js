const axios = require("axios");
const { Breed, Temperament, Op } = require("../db.js");

const getApiInfo = async () => {
  try {
    const info = await axios.get("https://api.TheDogAPI.com/v1/breeds", {
      headers: { "x-api-key": "ae0a2c56-b39f-4473-8631-391eaf562816" },
    });
    console.log("infooo", info.data);
    return info.data;
    //   res.send("Hola");
  } catch (error) {
    console.log("error en servidor externo:", error);
    return error;
  }
};

module.exports = { getApiInfo };
