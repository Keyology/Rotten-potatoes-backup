const express = require('express');
const app = express();
let exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {useMongoClient: true})
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

app.get('/', (req, res) => {
  Review.find().then(reviews => {
    res.render('reviews-index', { reviews: reviews });

  })

});

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
});
Review.find().then((review) => {
  // Code in here is executed when the promise resolves
});
app.get('/reviews', (req,res)=>{res.render('reviews-index', { reviews: reviews });})

app.post('/reviews', (req, res) => {
  console.log(req.body);
  // res.render('reviews-new', {});
})
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
