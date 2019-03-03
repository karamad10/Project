const validate = require('validate.js');

let requiredFields = [
  'link',
  'market_date',
  'location_country',
  'location_city',
  'location_address',
  'size_living_area',
  'size_rooms',
  'price_value',
  'price_currency',
  'description',
  'title',
  'images',
  'sold'
];

let responseMessage = [];

const validateInput = houseObj => {
  // const new_date = new Date().toISOString().slice(0, 10);
  function validURL(x) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return pattern.test(x);
  }

  let valid = true;
  let errors = [];
  const {
    link,
    market_date,
    location_country,
    location_city,
    location_address,
    size_living_area,
    size_rooms,
    price_value,
    location_coordinates_lat,
    location_coordinates_lng,
    description,
    title,
    images,
    sold
  } = houseObj;
  const url = validURL(link);

  if (typeof houseObj !== 'object') {
    (valid = false), errors.push('Houses must be an object');
  } else if (Object.entries(houseObj).length === 0 && houseObj.constructor === Object) {
    (valid = false), errors.push('invalid empty object');
  } else if (url === false) {
    (valid = false), errors.push(` Invalid URL`);
  } else if (!isNaN(location_country || location_city)) {
    (valid = false), errors.push('invalid Location');
  } else if (location_address.length < 10 || location_address.length > 25) {
    (valid = false), errors.push('address should be 10-40 characters');
  } else if (!size_living_area.match(/(\d+).?(\d*)\s*(m)/)) {
    (valid = false), errors.push('size should be per m');
  } else if (isNaN(size_rooms) || size_rooms > 20 || size_rooms <= 0) {
    (valid = false), errors.push('invalid rooms size');
  } else if (price_value <= 0) {
    (valid = false), errors.push('invalid price');
  } else if (isNaN(location_coordinates_lat, location_coordinates_lng)) {
    (valid = false), errors.push('lat/lng should be a number');
  } else if (description.length < 10) {
    (valid = false), errors.push('description should be at least 10 characters');
  } else if (title.length < 20 && title.length < 5) {
    (valid = false), errors.push('title should be 5-20 characters');
  } else if (sold < 0 || sold > 1) {
    (valid = false), errors.push('sold is either 1 or 0');
  } else if (errors.length == 0) {
    (valid = true), responseMessage.splice(0, responseMessage.length, 'Success 👍');
  } else {
    requiredFields.forEach(field => {
      if (typeof houseObj[field] === 'undefined' || '') {
        (valid = false), errors.push(` ${field} is required !`);
      }
    });
  }
  return {
    valid,
    errors,
    responseMessage,
    rawData: houseObj
  };
};

const sqlDataFields = houseObj => {
  return requiredFields.map(field => houseObj[field]);
};

module.exports = { validateInput, sqlDataFields, responseMessage };
