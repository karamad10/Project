const { HOUSES_PER_PAGE } = require('./constants');
const db = require('../db');
let valid = [];
let errors = [];

function isNanAndPos(num) {
  if (Number.isNaN(num) || num < 0) {
    return false;
  } else {
    return true;
  }
}

const validateSearch = SEARCH_VALUES => {
  let {
    price_min,
    price_max,
    page,
    size_rooms,
    location_city,
    location_country,
    order
  } = SEARCH_VALUES;

  size_rooms = parseInt(size_rooms, 10);
  price_min = parseInt(price_min, 10);
  price_max = parseInt(price_max, 10);
  page = parseInt(page, 10);
  if (
    isNanAndPos(price_min) === false ||
    isNanAndPos(price_max) === false ||
    isNanAndPos(page) === false
  ) {
    errors.push('this value should be a positive number');
  }
  if (price_min >= price_max) {
    errors.push('price_max should be bigger than price_min');
  }
  if (size_rooms <= 0 || size_rooms > 10) {
    errors.push('rooms should be between 1 and 10');
  }

  let order_field, order_direction;
  let index = order.lastIndexOf('_');
  if (index > 0) {
    order_field = order.slice(0, index);
    order_direction = order.slice(index + 1);
    if (['asc', 'desc'].indexOf(order_direction) === -1) {
      errors.push(`invalid order value ${index}`);
    }
  } else {
    errors.push('invalid order value');
  }

  if (!errors) {
    valid.push(SEARCH_VALUES);
  }
  const offset = (page - 1) * HOUSES_PER_PAGE;
  const conditions = [`price_value between ? and ?`];
  const params = [price_min, price_max];
  if (location_city) {
    conditions.push(`location_city = ?`);
    params.push(location_city);
  }
  if (location_country) {
    conditions.push(`location_country = ?`);
    params.push(location_country);
  }
  const queryBody = `
  FROM Houses
  WHERE ${conditions.join(' and ')}
  `;

  const queryTotal = `
  SELECT COUNT(id) AS total
  ${queryBody}
  `;

  let queryItems = `
  SELECT * ${queryBody}
  ORDER BY
  ${order_field} ${order_direction}
  LIMIT ${HOUSES_PER_PAGE}
  OFFSET ${offset}
  `;

  return {
    valid: errors.length === 0,
    errors,
    params,
    queryTotal,
    queryItems
  };
};

module.exports = { validateSearch };
