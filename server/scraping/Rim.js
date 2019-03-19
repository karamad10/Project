// const puppeteer = require('puppeteer');
// const fs = require('fs');
// let browser;

// const extractUrl = async url => {
//   console.log(url);

//   const page = await browser.newPage();
//   await page.goto(url);

//   const data = await page.evaluate(() => {
//     const extractInfo = sizeText => {
//       const sizeInfo = sizeText.split(',');
//       const [size_rooms] = sizeInfo[2].match(/(\d)/);
//       const [size_area] = sizeInfo[1].match(/(\d\w)/);
//       return { size_area, size_rooms };
//     };
//     const SYMBOL_TO_CURRENCY = {
//       '€': 'EUR',
//       $: 'USD',
//       '£': 'GBP',
//       '‎¥': 'jpy'
//     };
//     const extractPrice = priceText => {
//       const priceArray = priceText.split(' ');
//       const price_value = priceArray[1].replace(/\D/, '');
//       const currency = priceArray[0];
//       return { price_value, price_currency: SYMBOL_TO_CURRENCY[currency] };
//     };
//     const extractAddress = addressText => {
//       addressInfo = addressText.split(',');
//       const location_city = addressInfo[1].trim();
//       const location_address = addressInfo[0];
//       return { location_address, location_city };
//     };
//     const housesArray = [];

//     document.querySelectorAll('.hl-search-object-display').forEach(el => {
//       const houseObject = {};
//       const href = el.querySelector('.object-panel a').getAttribute('href');
//       houseObject.link = `https://www.huislijn.nl${href}`;

//       const src = el.querySelector('.object-image img').getAttribute('src');
//       houseObject.images = src;

//       const priceText = el.querySelector('.object-price').innerText;
//       const price = extractPrice(priceText);
//       houseObject.price_value = price.price_value;
//       houseObject.price_currency = price.price_currency;
//       houseObject.location_coordinates_lat = 0;
//       houseObject.location_coordinates_lng = 0;

//       const sizeInfo = el.querySelector('.object-type').innerText;
//       const size = extractInfo(sizeInfo);
//       houseObject.size_rooms = parseInt(size.size_rooms, 10);
//       houseObject.size_area = Number(size.size_area);

//       const addressText = el.querySelector('.object-street').innerText;
//       const addressInfo = extractAddress(addressText);
//       houseObject.location_city = addressInfo.location_city;
//       houseObject.location_address = addressInfo.location_address;
//       houseObject.location_country = 'Netherlands';

//       const titleInfo = el.querySelector('.object-type').innerText;
//       const titleText = titleInfo.split(' ')[0].replace(/\,/g, '');
//       houseObject.title = titleText;

//       el.querySelector('.object-label') ? (houseObject.sold = 1) : (houseObject.sold = 0);

//       housesArray.push(houseObject);
//     });
//     return housesArray;
//   });

//   console.log('333');

//   return data;
// };

// const LISTING_BASE_URL = 'https://www.huislijn.nl/koopwoning/nederland/utrecht/utrecht';
// const listingUrl = pageNumber => `${LISTING_BASE_URL}?page=${pageNumber}&order=relevance`;
// const MAX_HOUSES = 50;

// (async () => {
//   browser = await puppeteer.launch();

//   let houses = [];
//   let currentPage = 1;

//   while (houses.length < MAX_HOUSES) {
//     const url = listingUrl(currentPage);
//     const housesData = await extractUrl(url);

//     if (!housesData.length) {
//       break;
//     }
//     houses = houses.concat(housesData);

//     currentPage += 1;
//   }

//   await browser.close();
//   await fs.writeFileSync('houses.json', JSON.stringify(houses));
// })();
