var walmart = require('walmart')(process.env.WALMART_DEV_KEY, {protocol: 'http'});

walmart.stores.search(100, "cheerios").then(function(data) {
    console.log("Found " + data.count + " items");
    console.log(data.results[0].location);
});

walmart.getItem(10449075).then(function(item) {
    console.log("found item");//item);
});
