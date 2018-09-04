const express = require('express');
const app = express();
let exphbs = require('express-handlebars');

app.get('/', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
});
let reviews = [{title:"Great Review"}, {title:"Next Review"}, {title: "Awsome movie"}, {title: "Great film"}
];

app.get('/reviews', (req,res)=>{res.render('reviews-index', { reviews: reviews });})

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
