const express = require('express');
const { HOUSES_PER_PAGE } = require('./constants');
const { execQuery } = require('../db');
const { validateInput, sqlDataFields } = require('./inputValidation');
const { validateSearch } = require('./searchValidation');
const apiRouter = express.Router();

const addHouses = `
REPLACE INTO Houses (
  link,
  market_date,
  location_country,
  location_city,
  location_address,
  size_living_area,
  size_rooms,
  price_value,
  price_currency,
  description,
  title,
  images,
  sold
) VALUES ?
`;
let validHouses = [];
let invalidHouses = [];
let errors = [];

const getHouseDetails = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const houses = await execQuery(`select * from houses`);
    const objIndex = houses.findIndex(house => house.id === id);
    if (houses[objIndex]) {
      res.send(houses[objIndex]);
    } else {
      // res.send('item does not exist');
      res.redirect(404, '/api/houses/');
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteHouse = (req, res) => {
  const { id } = req.params;
  const objIndex = houses.findIndex(obj => obj.id == id);
  if (houses[objIndex]) {
    houses.splice(objIndex, 1);
    res.send(houses);
  } else res.status(404).send(` item with id ${id} does not exist`);
};

const getHouses = async (req, res) => {
  // console.log('Req Q:', req.query);
  let SEARCH_VALUES = req.query;
  const { errors, valid, params, queryTotal, queryItems } = validateSearch(SEARCH_VALUES);

  if (!valid) {
    res.status(400).json({ error: errors });
  } else {
    try {
      const total = await execQuery(queryTotal, params);
      const houses = await execQuery(queryItems, params);
      res.json({ total: total[0].total, houses, pageSize: HOUSES_PER_PAGE });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
};

const postHouses = (req, res) => {
  let inputData = req.body;
  if (!Array.isArray(inputData)) {
    res.status(400).json({ error: 'Data must be an array' });
  }

  const validatedData = inputData.map(houseObj => {
    return validateInput(houseObj);
  });

  validatedData.forEach(house => {
    if (house.valid) {
      validHouses.push(house);
    } else {
      invalidHouses.push(house);
    }
  });
  invalidHouses.forEach(item => {
    return errors.push(item.errors);
  });
  const report = {
    validHouses,
    invalidHouses,
    errors
  };

  const sqlDataRaw = validHouses.map(item => sqlDataFields(item.rawData));

  if (validHouses.length) {
    (async function createData() {
      try {
        await execQuery(addHouses, [sqlDataRaw]);
        return res.json(report);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    })();
  } else res.send(report);
};

const getCitiesAndCountries = async (req, res) => {
  try {
    const cities = await execQuery(
      `SELECT DISTINCT location_city FROM houses ORDER BY location_city`
    );
    const countries = await execQuery(
      `SELECT DISTINCT location_country FROM houses ORDER BY location_country`
    );
    res.json({ cities, countries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

apiRouter.route('/').get((req, res) => {
  res.send('Main Api Page Only');
});

apiRouter
  .route('/Houses')
  .get(getHouses)
  .post(postHouses);

apiRouter.route('/Houses/citiesAndCountries/all').get(getCitiesAndCountries);

apiRouter
  .route('/Houses/:id')
  .get(getHouseDetails)
  .delete(deleteHouse);

apiRouter.use('*', (req, res) => {
  res.status(404).end('Page not found');
});

module.exports = apiRouter;
