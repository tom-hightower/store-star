const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var walmart = require('walmart')(process.env.WALMART_DEV_KEY, {protocol: 'http'})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {location: null, error: null})
    //res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post('/', function (req, res) {
    var product = req.body.product
    var store = req.body.store
    walmart.stores.search(store, product).then(function(data) {
	var location = data.results[0].location.detailed[0]
	var locationText = `The product ${product} is in section ${location.section} of aisle ${location.aisle} of zone ${location.zone} in store ${store}!`
	res.render('index', {location: locationText, error: null})
    });
})
