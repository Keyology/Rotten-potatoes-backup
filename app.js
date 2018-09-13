const express = require('express');
const app = express();
const methodOverride = require('method-override');
const comments = require('./controllers/comments')

const reviews = require('./controllers/reviews');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Review = require('./models/review');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

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




app.post('/reviews', (req, res) => {
  console.log(req.body);
  // res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

app.get('/reviews/:id', (req, res) => {
  res.send('I\'m a review')
});

app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})


app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

module.exports = app;
