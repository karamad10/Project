const express = require('express');
const apiRouter = express.Router();
// const uuid = require('uuid');

const fakeDB = [
  {
    id: 1,
    price: 10000,
  },
  {
    id: 2,
    price: 20000,
  },
  {
    id: 3,
    price: 30000,
  },
  {
    id: 4,
    price: 40000,
  },
  {
    id: 5,
    price: 50000,
  },
];

apiRouter.route('/').get((req, res) => {
  res.send('Main Api Page Only');
});

apiRouter
  .route('/Houses')
  .get((req, res) => {
    fakeDB.length === 0 ? res.send('No items to show') : res.send(fakeDB);
  })
  .post((req, res) => {
    let { newPrice } = req.body;
    newPrice = parseInt(req.body.price, 10);
    let newId = fakeDB[fakeDB.length - 1].id + 1;

    if (Number.isNaN(newPrice) || newPrice <= 0) {
      res.status(400).end('This should be a proper number');
    } else {
      let newHouse = {
        id: newId,
        price: newPrice,
      };
      fakeDB.push(newHouse);
      res.send(`added a new house: ${newId} `);
    }
  });

apiRouter
  .route('/Houses/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const objIndex = fakeDB.findIndex(obj => obj.id == id);
    if (fakeDB[objIndex]) {
      res.send(fakeDB[objIndex]);
    } else {
      // res.send('item does not exist');
      res.redirect(404, '/api/houses/');
    }
  })
  .delete((req, res) => {
    const { id } = parseInt(req.params.id);
    const objIndex = fakeDB.findIndex(obj => obj.id == id);
    if (fakeDB[objIndex]) {
      fakeDB.splice(objIndex, 1);
      res.send(fakeDB);
    } else res.send('item does not exist');
  });

apiRouter.use('*', (req, res) => {
  res.status(404).end('Page not found');
});

module.exports = apiRouter;
