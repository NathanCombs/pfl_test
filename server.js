var express = require("express");
var cors = require('cors')
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var axios = require("axios");
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);
app.use(cors())


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started`)
})

app.get("/", (req, res) => {
    res.sendfile("index.html")
})

app.get("/getProducts", (req, res) => {
    axios.get(
        'https://testapi.pfl.com/products',
        {
            params: {
                apikey: '136085'
            },
            headers: {
                Authorization: 'Basic bWluaXByb2plY3Q6UHIhbnQxMjM='
            }
        }
    )
        .then((response) => {
            res.json(response.data.results.data)
        },
            (error) => {
                console.log("Error: " + error)
            }
        );
})

app.post("/getProductDetails", (req, res) => {
    axios.get(
        `https://testapi.pfl.com/products/${req.body.productID}`,
        {
            params: {
                apikey: '136085'
            },
            headers: {
                Authorization: 'Basic bWluaXByb2plY3Q6UHIhbnQxMjM='
            }
        }
    )
        .then((response) => {
            res.json(response.data)
        },
            (error) => {
                console.log("Error: " + error)
            }
        );
})

app.post('/placeOrder', (req, res) => {
    console.log(req.body.templateData)
    axios('https://testapi.pfl.com/orders?apikey=136085', {
        method: 'POST',
        headers: {
            Authorization: 'Basic bWluaXByb2plY3Q6UHIhbnQxMjM=',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: {
            "partnerOrderReference": "MyReferenceNumber",
            "orderCustomer": {
                "firstName": "John",
                "lastName": "Doe",
                "companyName": "ACME",
                "address1": "1 Acme Way",
                "address2": "",
                "city": "Livingston",
                "state": "MT",
                "postalCode": "59047",
                "countryCode": "US",
                "email": "jdoe@acme.com",
                "phone": "1234567890"
            },
            "items": [
                {
                    "itemSequenceNumber": 1,
                    "productID": req.body.productID,
                    "quantity": 1000,
                    // This line of code causes a 400 if the req.body is an object (if null everything works). 
                    // The format of the object must be incorrect, and although I tried a couple different ways, 
                    // I was never able to post with this data successfully. 
                    // "templateData": req.body.templateData,
                    "partnerItemReference": "MyItemReferenceID",
                    "itemFile": "http://www.yourdomain.com/files/printReadyArtwork1.pdf"
                }
            ],
            "shipments": [
                {
                    "shipmentSequenceNumber": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "companyName": "ACME",
                    "address1": "1 Acme Way",
                    "address2": "",
                    "city": "Livingston",
                    "state": "MT",
                    "postalCode": "59047",
                    "countryCode": "US",
                    "phone": "1234567890",
                }
            ]
        }
    }).then((response) => {
        res.json(response.data.results.data.orderNumber)
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data.results.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.json('Encountered an error: ' + error.response.status + '. Please try again later.')
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    })
})
