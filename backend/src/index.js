const server = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();

const ProductController = require('./controllers/ProductController')
const app = server()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

ProductController(app)

app.listen(8080, () => {
    console.log('Server on')
})