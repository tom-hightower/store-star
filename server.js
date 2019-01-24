const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var walmart = require('walmart')(process.env.WALMART_DEV_KEY, {protocol: 'http'})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {location: null, error: null, productList: null})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post('/addProduct', function (req, res) {
    console.log(req.body);
    res.redirect('/');
})

app.post('/', function (req, res) {
    var product = req.body.product
    var zipcode = req.body.zipcode

    findStore(zipcode).then(function whenOk(store) {
	
	walmart.stores.search(store.no, product).then(function(data) {
	    var products = data.results
	    var location = products[0].location.detailed[0]
	    var locationText = `The product ${product} is in section ${location.section} of aisle ${location.aisle} of zone ${location.zone} in store ${store.name}!`
	    res.render('index', {location: locationText, error: null, productList: products})
	})	
	return store
	
    }).catch(function notOk(err) {
	console.error(err)
	res.render('index', {location: null, error: err, productList: null})
    })
    
})

var findStore = function(zipcode){
    return new Promise(function(resolve, reject) {
	var store = walmart.stores.byZip(zipcode).then(function(data) {
	    return data[0]
	})
	
	if (store !== null && store !== undefined) {
	    resolve(store)
	} else {
	    reject('Problem with Zip code')
	}
    })
}
