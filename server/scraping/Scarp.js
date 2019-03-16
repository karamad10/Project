/* eslint-disable max-len */

// Apify execution results: https://api.apify.com/v1/Dq3kZgNKKojH2tXv2/crawlers/GGatFeesQuCWZnEy4/lastExec/results?token=WtjTBfqSqxbd2dTvkHWnKgw7K

// Apify function:
/*
function pageFunction(context) {
var $ = context.jQuery;
var result = [];
$(".no-bullet.property-list .property-list-element").each( function() {
    var sizeRegex = /\s+\d+.\w/;
    var roomsRegex = /\d+\s+Bedrooms/
    var rightNow = new Date();
    var date = rightNow.toISOString().slice(0,10)
    var path = $(this).find(".row div:nth-child(2) div:nth-child(2) div:nth-child(2)").text().trim()
    var pricePath = $(this).find(".row div:nth-of-type(2) div:nth-of-type(3) h3:nth-child(1)").text().replace(/[,\s]+|[,\s]+/g, "").substring(1)
    var currencyPath = $(this).find(".row div:nth-of-type(2) div:nth-of-type(3) h3:nth-child(1)").text().replace(/\s/g, "");
    var countryPath = $(this).find(".row div:nth-of-type(1) h3").text()
    var cityPath = $(this).find(".row div:nth-of-type(1) div:nth-child(2)").text()
    var streetPath = $(this).find(".row div:nth-of-type(1) div:nth-child(3)").text()
    var titlePath = $(this).find("a:eq(1)").text()
    var linkPath = $(this).find("a:eq(1)").attr("href")
    var imgPath = $(this).find("div:nth-child(1) img").attr("src")
    if (path.match(sizeRegex && roomsRegex)){return result.push({
         link : 'https://www.propertyunder50k.com'+linkPath,
         market_date: date,
         location_country : countryPath,
         location_city : cityPath,
         location_address: streetPath,
         size_living_area: parseInt(path.match(sizeRegex)),
         size_rooms: parseInt(path.match(roomsRegex)[0].charAt(0)),
         price_value: parseInt(pricePath),
         price_currency: currencyPath.charAt(0),
         location_coordinates_lat: 0,
         location_coordinates_lng: 0,
         title : titlePath,
         description: titlePath,
         images: imgPath,
         sold: 1
    })}
});
return result;
}
*/
