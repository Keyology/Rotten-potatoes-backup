const express = require('express');
const app = express();
let exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {useMongoClient: true})
const Review = mongoose.model('Review', {
  title: String
});
app.get('/', (req, res) => {
  Review.find().then(reviews => {
    res.render('reviews-index', { reviews: reviews });

  })

});
/*let reviews = [{title:"Great Review"}, {title:"Next Review"}, {title: "Awsome movie"}, {title: "Great film"}
];*/
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

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
