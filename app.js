const express = require('express'),
      mongoose = require('mongoose'),
      path = require('path'),
      keys = require('./keys.js'),
      chartRouter = require('./routes/chart.js'),
      hbs = require('hbs');
      

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, '/templates/views');



mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then( _ => console.log('MongoDB connected') )
  .catch( err => console.log(err) );


const app = express();
app.use('', chartRouter);
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Setup static directory to serve
app.use(express.static(publicDirectory));

// Main page route
app.get('/', (req, res) => {
  res.render('index', {});
});


app.listen(port, () => console.log('Server running at http://127.0.0.1:3000'));