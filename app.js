var walmart = require('walmart')();

walmart.stores.search(100, "cheerios").then(function(data) {
  console.log("Found " + data.count + " items");
});

walmart.getItem(10449075).then(function(item) {
  console.log(item);
});
