const express = require('express');
const { db_connection, execQuery } = require('../db');
const { validateInput, sqlDataFields, responseMessage } = require('../control/validator');
const apiRouter = express.Router();

const fakeDB = [
  {
    id: 1,
    price: 10000
  },
  {
    id: 2,
    price: 20000
  },
  {
    id: 3,
    price: 30000
  },
  {
    id: 4,
    price: 40000
  },
  {
    id: 5,
    price: 50000
  }
];

const new_date = new Date();
new_date.setHours(0, 0, 0, 0);
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

apiRouter.route('/').get((req, res) => {
  res.send('Main Api Page Only');
});

apiRouter
  .route('/Houses')
  .get((req, res) => {
    res.send(fakeDB);
  })
  .post((req, res) => {
    let data = req.body;
    if (!Array.isArray(data)) {
      res.status(400).json({ error: 'Data must be an array' });
    }
    const validatedData = data.map(houseObj => {
      return validateInput(houseObj);
    });

    validatedData.forEach(house => {
      if (house.valid) {
        house.market_date = new_date;
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
  });

apiRouter
  .route('/Houses/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const objIndex = fakeDB.findIndex(obj => obj.id === id);
    if (fakeDB[objIndex]) {
      res.send(fakeDB[objIndex]);
    } else {
      // res.send('item does not exist');
      res.redirect(404, '/api/houses/');
    }
  })
  .delete((req, res) => {
    const { id } = req.params;
    const objIndex = fakeDB.findIndex(obj => obj.id == id);
    if (fakeDB[objIndex]) {
      fakeDB.splice(objIndex, 1);
      res.send(fakeDB);
    } else res.status(404).send(` item with id ${id} does not exist`);
  });

apiRouter.use('*', (req, res) => {
  res.status(404).end('Page not found');
});

module.exports = apiRouter;
