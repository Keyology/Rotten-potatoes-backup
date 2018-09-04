const express = require('express');
const app = express();
let exphbs = require('express-handlebars');

app.get('/', (req, res) => {
  res.render('home', { msg: 'Hello World!' });
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
