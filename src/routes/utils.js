const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { Breed, Temperament, Op } = require("../db.js");

const getApiInfo = async () => {
  try {
    const info = await axios.get("https://api.TheDogAPI.com/v1/breeds", {
      headers: { "x-api-key": "ae0a2c56-b39f-4473-8631-391eaf562816" },
    });
    // console.log("infooo", info.data);
    return info.data;
    //   res.send("Hola");
  } catch (error) {
    console.log("error en servidor externo:", error);
    return error;
  }
};

const getDbAll = async () => {
  try {
    const infoDb = await Breed.findAll({
      include: {
        model: Temperament,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });

    let infoDogs = infoDb.map((e) => (e = e.dataValues));
    infoDogs = infoDogs.map((d) => {
      return {
        id: d.id,
        name: d.name,
        height: d.height,
        weight: d.weight,
        age: d.age,
        image: d.image,
        createdDb: d.createdDb,
        temperament: d.temperament,
      };
    });
    return infoDogs;
  } catch (error) {
    console.log("error en servidor local:", error);
    return error;
  }
};

const getApiTemperament = async () => {
  try {
    const dataApi = await getApiInfo();

    const dataTemperament = dataApi.map((temp) => (temp = temp.temperament));

    let temperamento = [];
    dataTemperament.forEach((n) => {
      n?.split(/,\s*/).forEach((e) => {
        temperamento.push(e.trim());
      });
    });

    temperamento = new Set(temperamento);
    temperamento = Array.from(temperamento);

    temperamento.forEach((e) => {
      Temperament.findOrCreate({
        where: {
          id: uuidv4(),
          name: e,
        },
      });
    });
    const allTemperaments = await Temperament.findAll();
    return allTemperaments;
    // console.log("dataaa", temperamento);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getApiInfo,
  getApiTemperament,
  getDbAll,
};
