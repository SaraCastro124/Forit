const { name } = require('ejs')
const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')


app.get('/', (req, res) => {
 res.render('index', {user})

app.get('/user', (req, res)=>{
  res.sendFile(path.join(__dirname, 'user.json'))
});
});

app.set('views', './views')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

let user = [];

fs.readFile(path.join(__dirname, 'user.json'), 'Utf8', (err, data)=>{
  if(err){
    console.log('El archivo no se lee correctamente', err)
  } else{
    user = JSON.parse(data)
  }
})

app.post('/add-user', (req, res) => {
  const newUser = {
      id: user.length + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      ciudad: { city: req.body.city },
      phone: req.body.phone,
      company: { name: req.body.company },
  };
  user.push(newUser);


  fs.writeFile(path.join(__dirname, 'user.json'), JSON.stringify(user, null, 2), (err) => {
      if (err) {
          console.log('Error al guardar el usuario', err);
      }
  });

  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})