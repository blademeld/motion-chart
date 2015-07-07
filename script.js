// data files. All data taken from gapminder.org
var xAxisDataFile = "data/nominal_gdp.csv";
var yAxisDataFile = "data/population.csv";
var valueDataFile = "data/population.csv";

// date format of the data
var dataDateFormat = "YYYY";
// data step (difference between data points)
var dataPeriod = "YYYY";

// bubble/country opacity of unselected countries (only applied when some countries are selected)
var nonSelectedOpacity = 0.15;
// bubble/country opacity when no countries are selected or of the selected ones
var selectedOpacity = 0.9;

// height of continents map
var smallMapHeight = 190;
// height of play controls
var playControlsHeight = 80;
// height of x axis controls
var xAxisControlsHeight = 40;
// height of map controls
var mapControlsHeight = 50;
// height of CHART and MAP tabs
var tabsHeight = 36;

// data holders for each axis
var xAxisData;
var yAxisData;
var valueData;

// minimum and maximum dates, we'll get it from data
var fromDate;
var toDate;
// same dates but as strings
var fromDateString;
var toDateString;

// declaring variables
// main xy chart
var chart;
// main map
var map;
// small map
var smallMap;
// x Axis of XY chart
var xAxis;
// y Axis of XY chart
var yAxis;

// if x Axis should be logarithmic or not
var xAxisLog = true;
// if y Axis should be logarithmic or not
var yAxisLog = true;
// which tab is active by default (set 1 to show map first)
var activeTab = 0;

// some strings (there might be some in HTML too)
var mapOption0 = "Nominal GDP (Billions of U.S. dollars)";
var mapOption1 = "Population (Millions of people)";
var mapOption2 = "Population";
// which map option is selected by default
var selectedMapOption = 0;

// some more strings
var totalText = "Total population:";
var xAxisText = "Nominal GDP (Billions of U.S. dollars)";
var yAxisText = "Population (Millions of people)";

// maximum size of a bubble
var maxBulletSize = 100;
// minimum size of a bubble
var minBulletSize = 3;

// type of a map (can also be "colors")
var mapType = "bubbles";

// default play back speed
var playSpeed = 10;

// default theme
AmCharts.theme = AmCharts.themes.black;

// country data, colors, dependency to continents
var countryData = {
  africa: {
    title: "Africa",
    color: "#de4c4f",
    countries: ["AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "DJ", "DZ", "EG", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "KE", "LR", "LS", "LY", "MA", "MU", "MG", "ML", "MR", "MW", "MZ", "NA", "NE", "NG", "RW", "SD", "SL", "SN", "SO", "SS", "SZ", "TD", "TG", "TN", "TZ", "UG", "ZA", "ZM", "ZW", "EH", "KM", "GO", "JU", "SH", "ST", "YT", "BV", "CV"]
  },
  europe: {
    title: "Europe",
    color: "#d8854f",
    countries: ["AL", "AM", "AT", "AZ", "BA", "BE", "BG", "BY", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "KV", "LT", "LU", "LV", "MD", "ME", "MK", "NL", "NO", "PL", "PT", "RO", "RS", "RU_europe", "SE", "SI", "SJ", "SK", "TR", "UA", "RU", "VA", "MT", "MC", "XK", "LI", "IM", "GI", "FO", "AD", "AX", "GG", "JE", "SM"]
  },
  asia: {
    title: "Asia",
    color: "#eea638",
    countries: ["AE", "AF", "BD", "BN", "BT", "CN", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "RU-asia", "SA", "SY", "TH", "TJ", "TL", "TM", "TW", "UZ", "VN", "YE", "HK", "MV", "BH", "SG"]
  },
  north_america: {
    title: "North America",
    color: "#a7a737",
    countries: ["BS", "BZ", "CA", "CR", "CU", "DO", "GL", "GT", "HN", "HT", "JM", "MX", "NI", "PA", "PR", "SV", "US", "AG", "AW", "BB", "BL", "GD", "KN", "LC", "MQ", "TC", "VG", "AI", "BM", "DM", "PM", "GP", "KY", "MF", "MS", "SX", "TT", "VC", "VI", "BQ", "CW"]
  },
  south_america: {
    title: "South America",
    color: "#86a965",
    countries: ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE", "GS"]
  },
  australia: {
    title: "Australia & Oceania",
    color: "#8aabb0",
    countries: ["AS", "AU", "CC", "CX", "FJ", "FM", "GU", "HM", "IO", "KI", "MH", "MO", "MP", "NC", "NF", "NR", "NU", "NZ", "PG", "PW", "RE", "SB", "SC", "TF", "TK", "TO", "TV", "UM-81", "UM-84", "UM-67", "UM-71", "UM-79", "VU", "WF", "WS", "CK", "UM-86", "PF", "PN"]
  }
}

// data from GapMinder doesn't have country ID's and country names not always match names in our map files, so we need this table
var countryIds = {};

countryIds["Brunei Darussalam"] = "BN";				// update
countryIds["Bhutan"] = "BT";
countryIds["French Guiana"] = "GF";
countryIds["Central African Republic"] = "CF";		// update
countryIds["Congo, Dem. Rep. of the"] = "CD";		// update
countryIds["Congo, Republic of "] = "CG";			// update
countryIds["Cote d'Ivoire"] = "CI";					// update
countryIds["Czech Republic"] = "CZ";				// update
countryIds["Dominican Republic"] = "DO";			// update
countryIds["Guinea-Bissau"] = "GW";
countryIds["Hong Kong SAR"] = "HK";					// update
countryIds["Korea, Dem. People's Rep. of"] = "KP";	// update
countryIds["Korea, Republic of"] = "KR";			// update
countryIds["Lao P.D.R."] = "LA";					// update
countryIds["FYR Macedonia"] = "MK";					// update
countryIds["Slovak Republic"] = "SK";
countryIds["United States"] = "US";
countryIds["West Bank and Gaza"] = "PS";
countryIds["Yemen"] = "YE";							// update
countryIds["United Arab Emirates"] = "AE";
countryIds["Afghanistan"] = "AF";
countryIds["Albania"] = "AL";
countryIds["Armenia"] = "AM";
countryIds["Angola"] = "AO";
countryIds["Argentina"] = "AR";
countryIds["Austria"] = "AT";
countryIds["Australia"] = "AU";
countryIds["Azerbaijan"] = "AZ";
countryIds["Bosnia and Herzegovina"] = "BA";
countryIds["Bangladesh"] = "BD";
countryIds["Belgium"] = "BE";
countryIds["Burkina Faso"] = "BF";
countryIds["Bulgaria"] = "BG";
countryIds["Bahrain"] = "BH";
countryIds["Burundi"] = "BI";
countryIds["Benin"] = "BJ";
countryIds["Bolivia"] = "BO";
countryIds["Brazil"] = "BR";
countryIds["Botswana"] = "BW";
countryIds["Belarus"] = "BY";
countryIds["Canada"] = "CA";
countryIds["Switzerland"] = "CH";
countryIds["Chile"] = "CL";
countryIds["Cameroon"] = "CM";
countryIds["China, People's Republic of"] = "CN";	// update
countryIds["Colombia"] = "CO";
countryIds["Costa Rica"] = "CR";
countryIds["Cuba"] = "CU";
countryIds["Cabo Verde"] = "CV";					// update
countryIds["Cyprus"] = "CY";
countryIds["Germany"] = "DE";
countryIds["Djibouti"] = "DJ";
countryIds["Denmark"] = "DK";
countryIds["Algeria"] = "DZ";
countryIds["Ecuador"] = "EC";
countryIds["Egypt"] = "EG";
countryIds["Estonia"] = "EE";
countryIds["Eritrea"] = "ER";
countryIds["Spain"] = "ES";
countryIds["Ethiopia"] = "ET";
countryIds["Finland"] = "FI";
countryIds["Fiji"] = "FJ";
countryIds["France"] = "FR";
countryIds["Gabon"] = "GA";
countryIds["United Kingdom"] = "GB";
countryIds["Georgia"] = "GE";
countryIds["Ghana"] = "GH";
countryIds["Gambia, The"] = "GM";					// update
countryIds["Guinea"] = "GN";
countryIds["Equatorial Guinea"] = "GQ";
countryIds["Greece"] = "GR";
countryIds["Guatemala"] = "GT";
countryIds["Guyana"] = "GY";
countryIds["Honduras"] = "HN";
countryIds["Croatia"] = "HR";
countryIds["Haiti"] = "HT";
countryIds["Hungary"] = "HU";
countryIds["Indonesia"] = "ID";
countryIds["Ireland"] = "IE";
countryIds["Israel"] = "IL";
countryIds["India"] = "IN";
countryIds["Iraq"] = "IQ";
countryIds["Iran"] = "IR";
countryIds["Iceland"] = "IS";
countryIds["Italy"] = "IT";
countryIds["Jamaica"] = "JM";
countryIds["Jordan"] = "JO";
countryIds["Japan"] = "JP";
countryIds["Kenya"] = "KE";
countryIds["Kyrgyz Republic"] = "KG";				// update
countryIds["Cambodia"] = "KH";
countryIds["Comoros"] = "KM";
countryIds["Kuwait"] = "KW";
countryIds["Kazakhstan"] = "KZ";
countryIds["Lebanon"] = "LB";
countryIds["Sri Lanka"] = "LK";
countryIds["Liberia"] = "LR";
countryIds["Lesotho"] = "LS";
countryIds["Lithuania"] = "LT";
countryIds["Luxembourg"] = "LU";
countryIds["Latvia"] = "LV";
countryIds["Libya"] = "LY";
countryIds["Morocco"] = "MA";
countryIds["Moldova"] = "MD";
countryIds["Madagascar"] = "MG";
countryIds["Montenegro"] = "ME";
countryIds["Mali"] = "ML";
countryIds["Myanmar"] = "MM";
countryIds["Mongolia"] = "MN";
countryIds["Mauritania"] = "MR";
countryIds["Mauritius"] = "MU";
countryIds["Malawi"] = "MW";
countryIds["Mexico"] = "MX";
countryIds["Malaysia"] = "MY";
countryIds["Mozambique"] = "MZ";
countryIds["Namibia"] = "NA";
countryIds["Niger"] = "NE";
countryIds["Nigeria"] = "NG";
countryIds["Nicaragua"] = "NI";
countryIds["Netherlands"] = "NL";
countryIds["Norway"] = "NO";
countryIds["Nepal"] = "NP";
countryIds["New Zealand"] = "NZ";
countryIds["Oman"] = "OM";
countryIds["Panama"] = "PA";
countryIds["Peru"] = "PE";
countryIds["Papua New Guinea"] = "PG";
countryIds["Philippines"] = "PH";
countryIds["Pakistan"] = "PK";
countryIds["Poland"] = "PL";
countryIds["Puerto Rico"] = "PR";
countryIds["Portugal"] = "PT";
countryIds["Paraguay"] = "PY";
countryIds["Qatar"] = "QA";
countryIds["Romania"] = "RO";
countryIds["Serbia"] = "RS";
countryIds["Russian Federation"] = "RU";			// update
countryIds["Rwanda"] = "RW";
countryIds["Saudi Arabia"] = "SA";
countryIds["Solomon Islands"] = "SB";
countryIds["Sudan"] = "SD";
countryIds["Sweden"] = "SE";
countryIds["Singapore"] = "SG";
countryIds["Slovenia"] = "SI";
countryIds["Sierra Leone"] = "SL";
countryIds["Senegal"] = "SN";
countryIds["Somalia"] = "SO";
countryIds["Suriname"] = "SR";
countryIds["South Sudan, Republic of"] = "SS";		// update
countryIds["El Salvador"] = "SV";
countryIds["Syria"] = "SY";
countryIds["Swaziland"] = "SZ";
countryIds["Chad"] = "TD";
countryIds["Togo"] = "TG";
countryIds["Thailand"] = "TH";
countryIds["Tajikistan"] = "TJ";
countryIds["Timor-Leste"] = "TL";
countryIds["Turkmenistan"] = "TM";
countryIds["Tunisia"] = "TN";
countryIds["Turkey"] = "TR";
countryIds["Trinidad and Tobago"] = "TT";
countryIds["Taiwan Province of China"] = "TW";		// update
countryIds["Tanzania"] = "TZ";
countryIds["Ukraine"] = "UA";
countryIds["Uganda"] = "UG";
countryIds["Uruguay"] = "UY";
countryIds["Uzbekistan"] = "UZ";
countryIds["Venezuela"] = "VE";
countryIds["Vietnam"] = "VN";
countryIds["South Africa"] = "ZA";
countryIds["Zambia"] = "ZM";
countryIds["Zimbabwe"] = "ZW";

// same as above but by id
var countryNames = {};
for (var name in countryIds) {
  countryNames[countryIds[name]] = name;
}

// when page is loaded, fix size of divs, add strings, etc.
jQuery(function() {

  // BEGIN OF UI ////////////////////////////////////////////////////
  var documentHeight = jQuery(document).height();
  var documentWidth = jQuery(document).width();
  // application will occupy 80% of the height
  var appHeight = Math.round(documentHeight * 0.9);
  if(appHeight > 750){
    appHeight = 750;
  }

  // vertical margins
  var vMargin = Math.round((documentHeight - appHeight) / 2);

  // set heights, margins, etc
  jQuery('#application').height(appHeight);
  //jQuery('#application').css('margin-top', vMargin);
  //jQuery('#application').css('margin-bottom', vMargin);
  jQuery('#list-div').height(appHeight - smallMapHeight - tabsHeight - 5);
  jQuery('#small-map-div').height(smallMapHeight);
  jQuery('#play-controls-div').height(playControlsHeight);
  jQuery('#x-axis-controls-div').height(xAxisControlsHeight);
  jQuery('#map-controls-div').height(mapControlsHeight);
  jQuery('#main-chart-div').height(appHeight - playControlsHeight - xAxisControlsHeight - tabsHeight);
  jQuery('#main-map-div').height(appHeight - playControlsHeight - mapControlsHeight - tabsHeight);
  jQuery('#x-axis-text-div').html(xAxisText);
  jQuery('#right-side-div').css('padding-top', tabsHeight);
  //jQuery('#loading-div').css("top", documentHeight / 2 - 15);
  //jQuery('#loading-div').css("left", documentWidth /2 - 15);

  // TABS
  // create Chart / Map tabs
  jQuery('#tabs').tabs({
    active: activeTab
  });

  // what happens when tab is clicked
  jQuery("#tabs").on("tabsactivate", function(event, ui) {
    if (ui.newPanel.selector == "#tabs-0") {
      activeTab = 0;
      chart.validateNow();
    }
    if (ui.newPanel.selector == "#tabs-1") {
      activeTab = 1;
      map.validateNow();
    }
    updateChart(currentIndex);
  });


  // X AXIS SCALE
  // check x axis scale
  if (xAxisLog) {
    jQuery('#x-axis-scale-0').prop('checked', true);
  } else {
    jQuery('#x-axis-scale-1').prop('checked', true);
  }

  // Y AXIS SCALE
  // check y axis scale
  if (yAxisLog) {
    jQuery('#y-axis-scale-0').prop('checked', true);
  } else {
    jQuery('#y-axis-scale-1').prop('checked', true);
  }

  // set behavior of radio boxes
  // make x axis logarithmic
  jQuery('#x-axis-scale-0').click(function() {
    if (!xAxis.logarithmic) {
      xAxis.logarithmic = true;
      chart.validateNow();
    }
  });
  // make x axis linear
  jQuery('#x-axis-scale-1').click(function() {
    if (xAxis.logarithmic) {
      xAxis.logarithmic = false;
      chart.validateNow();
    }
  });

  // make y axis logarithmic
  jQuery('#y-axis-scale-0').click(function() {
    if (!yAxis.logarithmic) {
      yAxis.logarithmic = true;
      chart.validateNow();
    }
  });
  // make x axis linear
  jQuery('#y-axis-scale-1').click(function() {
    if (yAxis.logarithmic) {
      yAxis.logarithmic = false;
      chart.validateNow();
    }
  });

  // MAP OPTIONS
  // check map option
  jQuery('#map-option-' + selectedMapOption).prop('checked', true);

  // enable map option 0
  jQuery('#map-option-0').click(function() {
    selectedMapOption = 0;
    updateChart(currentIndex);
  });

  // enable map option 1
  jQuery('#map-option-1').click(function() {
    selectedMapOption = 1;
    updateChart(currentIndex);
  });

  // enable map option 2
  jQuery('#map-option-2').click(function() {
    selectedMapOption = 2;
    updateChart(currentIndex);
  });

  // add labels for map options
  jQuery('<label for="map-option-0" title="Show ' + mapOption0 + ' on map">' + mapOption0 + '</label>').insertAfter('#map-option-0');
  jQuery('<label for="map-option-1" title="Show ' + mapOption0 + ' on map">' + mapOption1 + '</label>').insertAfter('#map-option-1');
  jQuery('<label for="map-option-2" title="Show ' + mapOption0 + ' on map">' + mapOption2 + '</label>').insertAfter('#map-option-2');


  // MAP TYPE
  // check map type
  if (mapType == "bubbles") {
    jQuery('#map-type-0').prop('checked', true);
  } else {
    jQuery('#map-type-1').prop('checked', true);
  }

  // enable map type 0
  jQuery('#map-type-0').click(function() {
    mapType = "bubbles";
    updateChart(currentIndex);
  });

  // enable map type 1
  jQuery('#map-type-1').click(function() {
    mapType = "colors";
    updateChart(currentIndex);
  });

  // PLAYBACK
  // roll-over behavior
  jQuery('#play-controls-div .ui-state-default').hover(
    function() {
      jQuery(this).addClass('ui-state-hover');
    },
    function() {
      jQuery(this).removeClass('ui-state-hover');
    }
  );
  // click behavior
  jQuery('#play-controls-div .ui-state-default').click(function() {
    jQuery(this).toggleClass('ui-state-active');
  });
  // play button behavior
  jQuery('#play').click(function() {
    togglePlay();
  });
  // repeat button behavior
  jQuery('#repeat').click(function() {
    toggleRepeat();
  });

  // END OF UI ///////////////////////////////////////////////////////////

  // create chart, maps, small map, list
  makeChart();
  makeMap();
  makeSmallMap();

  // hide while loading
  jQuery('#application').hide();

  // load latitudes/longitudes of countries
  loadData("data/country_latlon.csv", "", parseLatLong);
  // load data
  setTimeout(function(){loadData(xAxisDataFile, "xAxis", parseData)}, 0);
  setTimeout(function(){loadData(yAxisDataFile, "yAxis", parseData)}, 0);
  setTimeout(function(){loadData(valueDataFile, "value", parseData)}, 0);
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD & PARSE DATA //////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// load data
function loadData(file, axis, funct) {
  jQuery.get(file, function(data) {
    if (funct) {
      // CSVToArray is in csv2JSON.js file, returns array of rows
      // when data is loaded, we call parseData method
      funct(CSVToArray(data), axis);
    }
  });
}

// Parse data
/*  first round of data parsing we will create a separate object for xAxis, yAxis and value.
 The structure of each object will be:

 {
 "DE": {
 "title": "Germany",
 "1990": 121,
 "1991": 151,
 "1992": 171
 },
 "SE": {
 "title": "Sweden",
 "1990": 121,
 "1991": 151,
 "1992": 171
 }
 }
 */

var jsonData = {};
var counter = 0;
// not all countries are in data, so we will store them for checking availability
var availableCountries = {};

function parseData(data, axis) {
  counter++;

  // get first and last dates form all and use the most recent fromDate and the most oldest toDate
  var range = getDateRange(data);
  if (!fromDate || fromDate.getTime() < range.fromDate.getTime()) {
    fromDate = range.fromDate;
  }

  if (!toDate || toDate.getTime() > range.toDate.getTime()) {
    toDate = range.toDate;
  }

  fromDateString = AmCharts.formatDate(fromDate, dataDateFormat);
  toDateString = AmCharts.formatDate(toDate, dataDateFormat);

  var parsedData = {};

  // first row contains dates
  var dates = data[0];

  // now go through each row (country)
  for (var j = 1; j < data.length; j++) {
    var row = data[j];
    var countryName = row[0];
    if (countryName) {

      availableCountries[countryName] = true;

      var hasValues = false;
      var singleCountryData = {};
      // go through all dates
      // start from the second, as first has title
      for (var i = 1; i < dates.length; i++) {
        var date = String(dates[i]);
        var value = row[i];
        if (value) {
          // sometimes values has commas separating thousands
          value = Number(value.split(",").join(""));
          if (!isNaN(value)) {
            singleCountryData[date] = value;
            hasValues = true;
          }
        }
      }
      // if this country has at least one value
      if (hasValues) {
        singleCountryData.title = countryName;
        parsedData[countryIds[countryName]] = singleCountryData;
      }
    }
  }

  // store the parsed data in jsonData variable
  jsonData[axis] = parsedData;

  // check if all three files loaded
  if (counter == 3) {
    // and merge data
    // we set time out not to overload cpu and progress bar to keep animating
    setTimeout(mergeData, 200);
  }
}

// get date range from data
function getDateRange(data) {
  // dates are in first row
  var row = data[0];
  // second item is first date
  var fromDate = AmCharts.stringToDate(row[1], dataDateFormat);

  // last item is last date
  var toDate = AmCharts.stringToDate(row[row.length - 1], dataDateFormat);

  return {
    fromDate: fromDate,
    toDate: toDate
  };
}

// Merge data
/* merge data into a separate data provider for each date. After we'll process this we will have
 chart-ready data providers for each year, like:

 [{
 id: "DE",
 title: "Germany",
 x: 10,
 y: 10,
 value: 100
 }, {
 id: "SE",
 title: "Sweden",
 x: 20,
 y: 20,
 value: 150
 }]

 all the missing values will be calculated based on previous and next available value
 */
var chartDataProviders = {};
var timeLineDataProvider = [];

var maxX;
var minX;
var maxY;
var minY;
var maxValue;
var minValue;
// this one is needed for time line slider, we need to know how many steps slider will have
var totalDataCount;

function mergeData() {

  totalDataCount = 0;

  minX = Infinity;
  maxX = -Infinity;

  minY = Infinity;
  maxY = -Infinity;

  maxValue = -Infinity;
  minValue = Infinity;

  /* there are a lot of missing values in the data. That's why we will store previous value
   also increment and add missing values to the data provider.
   */
  var incrementX = {};
  var incrementY = {};
  var incrementValue = {};

  var previousX = {};
  var previousY = {};
  var previousValue = {};

  // now we will go through each date, starting from the first
  var date = new Date(fromDate);
  while (date.getTime() <= toDate.getTime()) {
    var dateString = AmCharts.formatDate(date, dataDateFormat);
    // data provider for this date
    var dataProvider = [];
    var total = 0;
    // go through each country
    for (var countryId in jsonData.xAxis) {
      // data item
      var dataItem = {};
      // country name
      dataItem.title = jsonData.xAxis[countryId].title;
      // country id
      dataItem.id = countryId;
      // get continent
      var continent = getContinent(countryId);
      // set color and continent
      if (continent) {
        dataItem.color = countryData[continent].color;
        dataItem.continent = continent;
      }

      // VALUES
      // get X value
      var valX = getValue(jsonData.xAxis, dateString, countryId, previousX[countryId], incrementX[countryId]);
      // get Y value
      var valY = getValue(jsonData.yAxis, dateString, countryId, previousY[countryId], incrementY[countryId]);
      // get value (bubble size)
      var valValue = getValue(jsonData.value, dateString, countryId, previousValue[countryId], incrementValue[countryId]);

      // getValue method returns object with value and increment values
      dataItem.x = valX.value;
      dataItem.y = valY.value;
      dataItem.value = valValue.value;

      incrementX[countryId] = valX.increment;
      incrementY[countryId] = valY.increment;
      incrementValue[countryId] = valValue.increment;
      // also store previous
      previousX[countryId] = dataItem.x;
      previousY[countryId] = dataItem.y;
      previousValue[countryId] = dataItem.value;

      // if at least one is missing, drop it
      if (isNaN(dataItem.x) || isNaN(dataItem.y) || isNaN(dataItem.value) || dataItem.id == 'undefined') {
        dataItem = undefined;
      }

      if (dataItem) {
        //count total value
        total += dataItem.value;
        // check min and max
        if (minX > dataItem.x) {
          minX = dataItem.x;
        }
        if (maxX < dataItem.x) {
          maxX = dataItem.x;
        }

        if (minY > dataItem.y) {
          minY = dataItem.y;
          temp = dataItem;
        }
        if (maxY < dataItem.y) {
          maxY = dataItem.y;
        }

        if (maxValue < dataItem.value) {
          maxValue = dataItem.value;
        }
        if (minValue > dataItem.value) {
          minValue = dataItem.value;
        }
        // add data item to data provider
        dataProvider.push(dataItem);
      }
    }
    // store data provider
    chartDataProviders[dateString] = dataProvider;
    // also store total value for time-line chart
    timeLineDataProvider.push({
      date: new Date(date),
      value: total
    });
    // change date by one for next cycle
    AmCharts.changeDate(date, dataPeriod, 1);
    // count data providers
    totalDataCount++;
  }

  /* add  data item with max value. It will be invisible (alpha:0)
   if we will not add this item, the bubble with the biggest value of each date
   will always be of the biggest size and won't change in time.
   */

  for (var d in chartDataProviders) {
    chartDataProviders[d].push({
      x: minX,
      y: 1000,
      value: maxValue,
      alpha: 0
    });
  }

  // set min/max for axes
  xAxis.minimum = minX;
  xAxis.maximum = maxX;

  yAxis.minimum = minY;
  yAxis.maximum = maxY;

  // show app
  jQuery('#application').show();
  jQuery('#loading-div').hide();

  setTimeout(firstTimeShow, 100);
}

function firstTimeShow(){
  // update chart with the first data provider
  // set (totalDataCount - 1) instead of 0 if you want most recent data to appear first
  updateChart(0);
  // create slider
  createSlider();
  // create time-line chart
  makeTimeLineChart();
  // create list
  createList();
}

// get value
function getValue(data, date, country, previous, increment) {
  var countryData = data[country];
  if (countryData) {
    var value = countryData[date];
    // if it doesn't have value, look for the next available
    if (isNaN(value) && !isNaN(previous)) {
      // if we already know increment, just add it
      if (!isNaN(increment)) {
        value = previous + increment;
        // if we don't have increment, look for next available value
      } else {
        var nextValueObj = findNextValue(data, date, country);
        if (nextValueObj) {
          if (!isNaN(nextValueObj.value)) {
            // calculate missing value
            increment = (nextValueObj.value - previous) / nextValueObj.count;
            value = previous + increment;
          }
        }
      }
    } else {
      increment = NaN;
    }
  }
  return {
    value: value,
    increment: increment
  };
}

// find next available value
function findNextValue(data, date, country) {
  var count = 1;
  var dateObj = AmCharts.stringToDate(date, dataDateFormat);
  while (dateObj.getTime() <= toDate.getTime()) {
    AmCharts.changeDate(dateObj, dataPeriod, 1);
    var dateString = AmCharts.formatDate(dateObj, dataDateFormat);
    var value = data[country][dateString];
    if (!isNaN(value)) {
      return {
        value: value,
        count: count
      };
    }
    count++;
  }
}

// gets continent of the country
function getContinent(country) {
  for (var c in countryData) {

    var continentData = countryData[c];
    var countries = continentData.countries;

    for (var i = 0; i < countries.length; i++) {
      if (countries[i] == country) {
        return c;
      }
    }
  }
}

// PARSING LATITUDES AND LONGITUDES
/*  although our map has getAreaCenterLatitude and getAreaCenterLongitude methods,
 we can't use them, as some countries are of the shape where middle is not... in the country.
 so we load the latitudes/longitudes from a file
 */
var longitudes = {};
var latitudes = {};
// parse latitude/longitude data
function parseLatLong(data) {
  for (var i = 1; i < data.length; i++) {
    var dataItem = data[i];
    latitudes[dataItem[0]] = Number(dataItem[1]);
    longitudes[dataItem[0]] = Number(dataItem[2]);
  }
}

/// END OF DATA PARSING

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUILD CHARTS ///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// create XY (Bubble) chart
function makeChart() {
  // XY Chart
  chart = new AmCharts.AmXYChart();
  chart.fontFamily = "Lato";
  chart.pathToImages = "http://www.amcharts.com/lib/3/images/";
  chart.dataProvider = [];
  chart.startDuration = 0;
  chart.autoMargins = false;
  chart.marginLeft = 80;
  chart.marginTop = 0;
  chart.marginRight = 8;
  chart.marginBottom = 30;
  chart.numberFormatter = {
    precision: 0,
    decimalSeparator: ",",
    thousandsSeparator: "."
  };

  // AXES
  // X
  xAxis = new AmCharts.ValueAxis();
  xAxis.position = "bottom";
  xAxis.axisAlpha = 0;
  xAxis.logarithmic = xAxisLog;
  chart.addValueAxis(xAxis);

  chart.plotAreaFillColors = "#292929";
  chart.plotAreaFillAlphas = 1;

  // Y
  yAxis = new AmCharts.ValueAxis();
  yAxis.position = "left";
  yAxis.title = yAxisText;
  yAxis.titleColor = "#555555";
  yAxis.titleFontSize = 30;
  yAxis.titleAlign = "right";
  yAxis.titleBold = false;
  //yAxis.inside = true;
  //yAxis.minMaxMultiplier = 1;
  yAxis.axisAlpha = 0;
  yAxis.logarithmic = yAxisLog;
  chart.addValueAxis(yAxis);

  // GRAPH
  var graph = new AmCharts.AmGraph();
  graph.valueField = "value";
  graph.xField = "x";
  graph.yField = "y";
  graph.alphaField = "alpha";
  graph.colorField = "color";

  graph.lineAlpha = 0;
  graph.bulletAlpha = selectedOpacity;
  graph.bulletBorderColor = "#000000";
  graph.bulletBorderAlpha = 0;
  graph.bulletBorderThickness = 1;
  graph.bullet = "circle";

  graph.minBulletSize = minBulletSize;
  graph.maxBulletSize = maxBulletSize;

  graph.balloonText = "<span style='font-size:16px;'><b>[[title]]</b></span><span style='font-size:13px;'><table style='border-spacing: 0px; border-collapse: separate;'><tr><td>Nominal GDP:</td><td><b>$[[x]]</b></td></tr><tr><td>Population:</td><td><b>[[y]] Millions</b></td></tr></table></span>";
  chart.addGraph(graph);

  setTimeout(function() {
    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chart.addChartCursor(chartCursor);

    // SCROLLBAR
    var chartScrollbar = new AmCharts.ChartScrollbar();
    chart.addChartScrollbar(chartScrollbar);

    // WRITE
    chart.write("main-chart-div");
  }, 3000);
}

// creat time-line chart
function makeTimeLineChart() {
  // XY Chart
  var chart = new AmCharts.AmSerialChart();
  chart.fontFamily = "Lato";
  chart.pathToImages = "http://www.amcharts.com/lib/3/images/";
  chart.categoryField = "date";
  chart.dataProvider = timeLineDataProvider;
  chart.autoMargins = false;
  chart.marginLeft = 0;
  chart.marginTop = 0;
  chart.marginRight = 10;
  chart.marginBottom = 0;
  chart.numberFormatter = {
    precision: 0,
    decimalSeparator: ",",
    thousandsSeparator: "."
  };

  var categoryAxis = chart.categoryAxis;
  categoryAxis.parseDates = true;
  categoryAxis.minPeriod = dataPeriod;
  categoryAxis.inside = true;
  categoryAxis.minHorizontalGap = 40;
  categoryAxis.axisAlpha = 0;

  var valueAxis = new AmCharts.ValueAxis();
  valueAxis.axisAlpha = 0;
  valueAxis.gridAlpha = 0;
  chart.addValueAxis(valueAxis);

  // GRAPH
  var graph = new AmCharts.AmGraph();
  graph.valueField = "value";
  graph.type = "step";
  graph.lineColor = "#2e2e2e";
  graph.balloonText = totalText + "[[value]]";
  graph.fillAlphas = 1;
  graph.lineAlpha = 1;
  chart.addGraph(graph);

  // CURSOR
  var chartCursor = new AmCharts.ChartCursor();
  chartCursor.categoryBalloonEnabled = false;
  chartCursor.zoomable = false;
  chartCursor.cursorAlpha = 0;
  chart.addChartCursor(chartCursor);

  // WRITE
  chart.write("time-line-chart-div");
}

// SMALL MAP AND INTERACTION WITH ACCORDION
// make small map
function makeSmallMap() {
  smallMap = new AmCharts.AmMap();
  smallMap.pathToImages = "http://www.amcharts.com/lib/3/images/";
  smallMap.zoomControl.minZoomLevel = 0.5;
  smallMap.zoomControl.zoomControlEnabled = false;
  smallMap.zoomControl.panControlEnabled = false;
  smallMap.backgroundZoomsToTop = true;

  smallMap.areasSettings = {
    autoZoom: true,
    rollOverOutlineColor: "#000000",
    selectedColor: undefined,
    rollOverColor: undefined
  };

  smallMap.dataProvider = {
    mapVar: AmCharts.maps.continentsLow,
    zoomLevel: 0.90,
    areas: [{
      id: "africa",
      color: countryData.africa.color
    }, {
      id: "asia",
      color: countryData.asia.color,
    }, {
      id: "australia",
      color: countryData.australia.color,
    }, {
      id: "europe",
      color: countryData.europe.color,
    }, {
      id: "north_america",
      color: countryData.north_america.color,
    }, {
      id: "south_america",
      color: countryData.south_america.color,
    }],

    images:[{imageURL: "http://www.amcharts.com/lib/3/images/lensWhite.png", id:"zoomOut", selectable:true, width:17, height:17, left:10, top:10}]
  };
  smallMap.addListener("clickMapObject", handleMapClick);
  smallMap.write("small-map-div");
}

// small map click handler
function handleMapClick(event) {
  highlightedCountries = [];

  // if it's zoom-out button
  if(event.mapObject.id == "zoomOut"){
    smallMap.selectObject(); // this will zoom-out
    updateDataByContinent();
    jQuery('#accordion').accordion("option", "active", undefined);
  }
  // if its a continent
  else{
    updateDataByContinent(event.mapObject.id);
    jQuery('#accordion').accordion("option", "active", accordionIndex[event.mapObject.id]);
  }
}

// update data by continent
function updateDataByContinent(continent) {
  for (var d in chartDataProviders) {
    var dp = chartDataProviders[d];
    for (var i = 0; i < dp.length; i++) {
      var dataItem = dp[i];
      var id = dataItem.id;
      // check/uncheck checkboxes
      if (dataItem.continent != continent) {
        jQuery("#cb_" + id).prop('checked', false);
      } else {
        jQuery("#cb_" + id).prop('checked', true);
      }
    }
  }
  highlightCountries();
}

// highlight countries - we simply set alpha for unselected countries to nonSelectedOpacity

var highlightedCountries = [];
function highlightCountries() {
  // get list of checked countries
  getChecked();

  if (highlightedCountries.length > 0) {

    setOpacity(nonSelectedOpacity);

    for (var p = 0; p < highlightedCountries.length; p++) {
      var countryId = highlightedCountries[p];

      for (var d in chartDataProviders) {
        var dp = chartDataProviders[d];
        for (var di in dp) {
          var dataItem = dp[di];
          if (dataItem.id) {
            if (dataItem.id == countryId) {
              dataItem.alpha = NaN;
            }
          }
        }
      }
    }
  } else {
    setOpacity(NaN);
  }
  updateChart(currentIndex);
}

// set opacity
function setOpacity(value) {
  for (var d in chartDataProviders) {
    var dp = chartDataProviders[d];
    for (var di in dp) {
      var dataItem = dp[di];
      if (dataItem.id) {
        dataItem.alpha = value;
      }
    }
  }
}

// get list of checked countries
function getChecked() {
  highlightedCountries = [];
  for (var n in countryNames) {
    if (jQuery("#cb_" + n).is(':checked')) {
      highlightedCountries.push(n);
    }
  }
}

// END OF SMALL MAP

// BIG MAP
// create map
function makeMap() {
  map = new AmCharts.AmMap();
  map.fontFamily = "Lato";
  map.numberFormatter = {
    precision: 0,
    decimalSeparator: ",",
    thousandsSeparator: "."
  };
  map.pathToImages = "http://www.amcharts.com/lib/3/images/";

  var zoomControl = map.zoomControl;
  zoomControl.minZoomLevel = 0.5;
  colorSteps = 20;

  map.areasSettings = {
    autoZoom: true,
    colorSolid: "#7e0000",
    color: "#ffc4c4",
    rollOverOutlineColor: "#000000",
    selectedColor: undefined,
    rollOverColor: undefined,
    unlistedAreasAlpha: 0.1,
    balloonText: "[[title]]:[[value]]"
  };

  // we set getAreasFromMap to true only because we need coordinates of countries
  // later we'll set it to false
  map.dataProvider = {
    mapVar: AmCharts.maps.worldLow,
    getAreasFromMap: true,
    zoomLevel: 0.90
  };
  map.write("main-map-div");
}


// CREATE ACCORDION
var accordionIndex = {};
function createList() {
  var accordion = jQuery('#accordion');
  var index = 0;
  for (var c in countryData) {
    var continentData = countryData[c];
    accordion.append("<h3>" + continentData.title + "</h3>");
    var div = jQuery("<div></div>");
    accordion.append(div);

    accordionIndex[c] = index;

    var countries = continentData.countries;

    for (var i = 0; i < countries.length; i++) {
      var countryId = countries[i];
      var name = countryNames[countryId];

      if(availableCountries[name]){
        if (name) {
          div.append('<label><li style="padding-bottom:10px;"><input class="accordion_cb" type="checkbox" value="' + countryId + '" id="cb_' + countryId + '" style="float:left; margin-left: -20px;">' + name + '</label></li>');
        }
      }
    }

    index++;
  }

  jQuery(".accordion_cb").click(function() {
    highlightCountries();
  });

  accordion.accordion({
    active: false,
    collapsible: true,
    heightStyle: "fill"
  });
}


// TIME SLIDER
var sliderPlaying = false;
var sliderInterval;
var repeat = false;

function createSlider() {
  jQuery("#slider-div").slider({
    value: 0,
    min: 0,
    max: totalDataCount - 1,
    step: 1,
    slide: function(event, ui) {
      updateChart(ui.value);
      if (sliderPlaying) {
        togglePlay();
      }
    }
  });

  jQuery("#speed-slider-div").slider({
    value: playSpeed,
    min: 0,
    max: 20,
    step: 1,
    slide: function(event, ui) {
      updateSpeed(ui.value);
    }
  });
}

// update speed
function updateSpeed(value) {
  playSpeed = value;
  if (sliderPlaying) {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(updateSlider, 1000 / (playSpeed + 1));
  }
}

// start/stop playback
function togglePlay() {
  if (sliderPlaying) {
    sliderPlaying = false;
    clearInterval(sliderInterval);
    jQuery('#play').html('<span class="ui-icon ui-icon-play"></span>');
    jQuery('#play').removeClass('ui-state-active');
  } else {
    if (currentIndex >= totalDataCount - 1) {
      currentIndex = 0;
    }
    sliderPlaying = true;
    updateSpeed(playSpeed);
    jQuery('#play').html('<span class="ui-icon ui-icon-pause"></span>');
  }
}

// toggle repeat
function toggleRepeat() {
  repeat = !repeat;
}

// update slider
function updateSlider() {
  if (currentIndex < totalDataCount - 1) {
    currentIndex++;
  } else {
    if (repeat) {
      currentIndex = 0;
    } else {
      togglePlay();
    }
  }
  jQuery("#slider-div").slider("value", currentIndex);
  updateChart(currentIndex);
}

// UPDATE CHART AND MAP WITH NEW DATA
var currentIndex;
var labelOnChart;

function updateChart(index) {
  currentIndex = index;
  var date = AmCharts.changeDate(new Date(fromDate), dataPeriod, index);
  var dateString = AmCharts.formatDate(date, dataDateFormat);

  var labelOnChart = {
    "x": chart.realWidth - 35,
    "y": chart.realHeight - 90,
    "text": dateString,
    "align": "right",
    "size": 50,
    "color": "#555555"
  };
  chart.allLabels = [labelOnChart];

  var labelOnMap = {
    "x": map.realWidth - 5,
    "y": map.realHeight - 60,
    "text": dateString,
    "align": "right",
    "size": 50,
    "color": "#555555"
  };
  map.allLabels = [labelOnMap];

  // with chart, it's simple, we only set new data provider
  var dataProvider = chartDataProviders[dateString];
  chart.dataProvider = dataProvider;

  // update map too
  map.dataProvider.getAreasFromMap = false;
  // if it's bubbles
  if (mapType == "bubbles") {
    map.dataProvider.areas = [];
    map.dataProvider.images = [];
    // create a bubble for each country
    for (var i = 0; i < dataProvider.length; i++) {
      var dataItem = dataProvider[i];

      var value;
      var min;
      var max;
      var bt;
      var maxSize = maxBulletSize;

      // get data by the selected map option
      if (selectedMapOption == 0) {
        value = dataItem.x;
        min = minX;
        max = maxX;
        bt = mapOption0;
      }
      if (selectedMapOption == 1) {
        value = dataItem.y;
        min = minY;
        max = maxY;
        maxSize = maxSize / 4; // this is not very correct, we should add a possibility to change bullet size for the user
        bt = mapOption1;
      }
      if (selectedMapOption == 2) {
        value = dataItem.value;
        min = minValue;
        max = maxValue;
        bt = mapOption2;
      }

      map.imagesSettings.balloonText = "<span style='font-size:14px;'><b>[[title]]</b> (" + dateString + ")<br>" + bt + ": [[value]]</span>";
      var size = (value - min) / (max - min) * (maxSize - minBulletSize) + minBulletSize;
      if (size < minBulletSize) {
        size = minBulletSize
      }
      var bubbleOpacity;
      if (dataItem.id) {
        if (highlightedCountries.length > 0) {
          bubbleOpacity = nonSelectedOpacity;
          for (var h = 0; h < highlightedCountries.length; h++) {
            if (dataItem.id == highlightedCountries[h]) {
              bubbleOpacity = selectedOpacity;
            }
          }
        }
        var longitude = longitudes[dataItem.id];
        var latitude = latitudes[dataItem.id];
        if (!isNaN(longitude) && !isNaN(latitude)) {
          map.dataProvider.images.push({
            type: "circle",
            width: size,
            height: size,
            alpha: bubbleOpacity,
            color: dataItem.color,
            longitude: longitudes[dataItem.id],
            latitude: latitudes[dataItem.id],
            title: dataItem.title,
            value: value
          });
        }
      }
    }
  }
  // if the map should show colors,not bubbles
  else {
    var minMapValue = Infinity;
    map.dataProvider.areas = [];
    map.dataProvider.images = [];

    for (var i = 0; i < dataProvider.length; i++) {
      var dataItem = dataProvider[i];

      var value;
      if (selectedMapOption == 0) {
        value = dataItem.x;
      }
      if (selectedMapOption == 1) {
        value = dataItem.y;
      }
      if (selectedMapOption == 2) {
        value = dataItem.value;
      }


      if (dataItem.id) {
        var areaOpacity;
        if (highlightedCountries.length > 0) {
          areaOpacity = nonSelectedOpacity;
          for (var h = 0; h < highlightedCountries.length; h++) {
            if (dataItem.id == highlightedCountries[h]) {
              areaOpacity = selectedOpacity;
            }
          }
        }

        if (value < minMapValue) {
          minMapValue = value;
        }
        map.dataProvider.areas.push({
          id: dataItem.id,
          title: dataItem.title,
          value: value,
          alpha: areaOpacity
        });
      }
    }
    map.minValue = minMapValue;
  }
  // validate data
  if (activeTab == 0) {
    chart.validateData();
    chart.validateNow();
  }
  if (activeTab == 1) {
    map.validateData();
    map.validateNow();
  }
}