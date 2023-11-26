/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name:  George devid john       Student ID:  no1547325        Date:   November 26         
*
*
******************************************************************************
**/
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database2');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
const exphbs = require('express-handlebars');
var port     = process.env.PORT || 9000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

var path = require('path');
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main'
}));
// Set the view engine to 'hbs'.
app.set('view engine', 'hbs');
// Serve static files from the 'public' directory.
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(database.url);

var SalesProducts = require('./models/products');
 // Configure the URL-encoded body parser for parsing form data.
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Define a route for the root URL ('/').
app.get('/', function (req, res) {
	// Render the 'index' view and provide a title to the template.
	res.render('index', { title: 'Express' });
  });

//get all products data from db
app.get('/api/product', function(req, res) {
	// use mongoose to get all todos in the database
	SalesProducts.find(function(err, Products) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(Products); // return all employees in JSON format
	});
});

// get a product with invoide ID
app.get('/api/product/:id', function(req, res) {
	let id = req.params.id;
	SalesProducts.findById(id, function(err, Products) {
		if (err)
			res.send(err)
 
		res.json(Products);
	});
 
});


// create product and send back all products after creation
app.post('/api/product', function(req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

	SalesProducts.create({
		"Invoice ID": req.body.invoiceId,
		Branch: req.body.branch,
		City: req.body.city,
		"Customer Type": req.body.customerType,
		"Product line": req.body.productLine,
		name: req.body.name,
		"Unit price": req.body.unitPrice,
		Quantity: req.body.quantity,
		"Tax 5%": req.body.tax,
		Total: req.body.total,
		Date: req.body.date,
		Time: req.body.time,
		Payment: req.body.payment,
		cogs: req.body.cogs,
		Rating: req.body.rating,
	}, function(err, Products) {
		if (err)
			res.send(err);
 
		// get and return all the Products after newly created employe record
		SalesProducts.find(function(err, Products) {
			if (err)
				res.send(err)
			res.json(Products);
		});
	});
 
});

// create product and send back all products after creation
app.post('/add/product', function(req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);
	const round = (n, dp) => {
		const h = +('1'.padEnd(dp + 1, '0')) // 10 or 100 or 1000 or etc
		return Math.round(n * h) / h
	  }
	SalesProducts.create({
		"Invoice ID": req.body.InvoiceId,
		Branch: req.body.Branch,
		City: req.body.City,
		"Customer Type": req.body.CustomerType,
		"Product line": req.body.ProductLine,
		name: req.body.Name,
		"Unit price": req.body.UnitPrice,
		Quantity: req.body.Quantity,
		"Tax 5%": round((req.body.UnitPrice*req.body.Quantity)*.05,4),
		Total: (req.body.UnitPrice*req.body.Quantity)+ (req.body.UnitPrice*req.body.Quantity)*.05,
		Date: req.body.Date,
		Time: req.body.Time,
		Payment: req.body.Payment,
		cogs: req.body.UnitPrice*req.body.Quantity,
		"gross income":round((req.body.UnitPrice*req.body.Quantity)*.05,4),
		Rating: req.body.Rating,
	}, function(err, Products) {
		if (err)
			res.send(err);
        console.log(Products);
		res.render('thankyou', { foundData: Products.name });
	});
 
});


app.put('/api/product/:product_id', function(req, res) {
	// create mongose method to update an existing record into collection
    console.log(req.body);

	let id = req.params.product_id;
	var data = {
		"Invoice ID": req.body.invoiceId,
		Branch: req.body.branch,
		City: req.body.city,
		"Customer Type": req.body.customerType,
		"Product line": req.body.productLine,
		name: req.body.name,
		"Unit price": req.body.unitPrice,
		Quantity: req.body.quantity,
		"Tax 5%": req.body.tax,
		Total: req.body.total,
		Date: req.body.date,
		Time: req.body.time,
		Payment: req.body.payment,
		cogs: req.body.cogs,
		Rating: req.body.rating,
	}

	// save the user
	SalesProducts.findByIdAndUpdate(id, data, function(err, product) {
	if (err) throw err;

	res.send('Successfully! Product updated - '+product.name);
	});
});
// delete a employee by id
app.delete('/api/product/:product_id', function(req, res) {
	console.log(req.params.product_id);
	let id = req.params.product_id;
	SalesProducts.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Product has been Deleted.');	
	});
});
// delete a product by id
app.get('/del/:id', function(req, res) {
	console.log(req.params.id);
	let id = req.params.id;
	SalesProducts.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
		{
			SalesProducts.find(function(err, Products) {
				// If any error occurs while reading the file, response
				if (err) {
					//log the error
					res.status(500).send('Error loading JSON data');
				} else {
		
					//Checking the given condition and storng the value to the variable
					const foundData = Products
					console.log(foundData)
					if (foundData) {	
						//when data is fount sending the html data to the reponse
						res.render('delproduct', { foundDatas: foundData });
		
					}
				}
			});
		}
			
	});
});
app.get('/viewData', function (req, res) {

	SalesProducts.find(function(err, Products) {
        // If any error occurs while reading the file, response
        if (err) {
            //log the error
            res.status(500).send('Error loading JSON data');
        } else {

            //Checking the given condition and storng the value to the variable
            const foundData = Products
			console.log(foundData)
            if (foundData) {	
                //when data is fount sending the html data to the reponse
                res.render('viewAllProducts', { foundDatas: foundData });

            }
        }
    });

});
app.get('/addProduct', function (req, res) {
	res.render('addProduct');
});
app.get('/delProd', function (req, res) {
	SalesProducts.find(function(err, Products) {
        // If any error occurs while reading the file, response
        if (err) {
            //log the error
            res.status(500).send('Error loading JSON data');
        } else {

            //Checking the given condition and storng the value to the variable
            const foundData = Object.values(Products)
			console.log(foundData)
            if (foundData) {	
                //when data is fount sending the html data to the reponse
                res.render('delproduct', { foundDatas: foundData });

            }
        }
    });
});

app.listen(port);
console.log("App listening on port : " + port);