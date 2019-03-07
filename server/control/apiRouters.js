const express = require('express');
const { db_connection, execQuery } = require('../db');
const { validateInput, sqlDataFields, responseMessage } = require('../control/validator');
const apiRouter = express.Router();

const new_date = new Date();
function isNanAndPos(num) {
  if (Number.isNaN(num) || num === 20000) {
    return false;
  } else {
    return true;
  }
}

// function orderBy(x) {
//   let index = x.lastIndexOf('_');
// }
let DEFAULT_VALUES = {
  price_min: 0,
  price_max: 999999999,
  order: 'location_country_asc',
  page: 1
};
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

const getHouseDetails = (req, res) => {
  const id = parseInt(req.params.id);
  (async function createData() {
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
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  })();
};

const deleteHouse = (req, res) => {
  const { id } = req.params;
  const objIndex = fakeDB.findIndex(obj => obj.id == id);
  if (fakeDB[objIndex]) {
    fakeDB.splice(objIndex, 1);
    res.send(fakeDB);
  } else res.status(404).send(` item with id ${id} does not exist`);
};

const getHouses = (req, res) => {
  (async function createData() {
    console.log('Req Q:', req.query);
    if (!req.query === {}) {
      DEFAULT_VALUES = req.query;
      let { price_min, price_max, page, order } = DEFAULT_VALUES;
      price_max = parseInt(price_max, 10);
      page = parseInt(page, 10);
      if (!isNanAndPos(price_max) || !isNanAndPos(page)) {
        return res.status(400).json({
          error: 'invalid value'
        });
      }

      let order_field, order_direction;
      if (!!order) {
        let index = order.lastIndexOf('_');
        if (index > 0) {
          order_field = order.slice(0, index);
          order_direction = order.slice(index + 1);
          if (['asc', 'desc'].indexOf(order_direction) === -1)
            return res.status(400).json({
              error: 'invalid order value'
            });
        } else {
          return res.status(400).json({
            error: 'invalid order value'
          });
        }
      }
    }
    try {
      const houses = await execQuery(`select * from houses`);
      res.json(houses);
      // return res.json(report);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  })();
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
      house.rawData.market_date = new_date;
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
    responseMessage,
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

apiRouter.route('/').get((req, res) => {
  res.send('Main Api Page Only');
});

apiRouter
  .route('/Houses')
  .get(getHouses)
  .post(postHouses);

apiRouter
  .route('/Houses/:id')
  .get(getHouseDetails)
  .delete(deleteHouse);

apiRouter.use('*', (req, res) => {
  res.status(404).end('Page not found');
});

module.exports = apiRouter;
