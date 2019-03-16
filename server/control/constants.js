const PORT = 4444;
const HOUSES_PER_PAGE = 9;
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

const requiredFields = [
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

module.exports = {
  PORT,
  HOUSES_PER_PAGE,
  addHouses,
  requiredFields
};
