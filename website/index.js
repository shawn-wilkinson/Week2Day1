
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function(){
  console.log('server is listening.');
});

app.get('/hello', function(req, rsp){
    rsp.render('hello');
});

app.get('/hola', function(req, rsp){
    rsp.send('mundo');
});

app.get('/add/:x/:y', function(req, rsp){
  const x = req.params.x * 1;
  const y = req.params.y * 1;
  rsp.send({payload: x + y});
})

app.get('/getFactorial/:n', function(req, rsp){
  const n = req.params.n * 1;
  let tot = 1;
  for (let x = 1; x<=n; x++){
    tot *= x;
  }
  rsp.render('factorial', {total: tot, number: n});
})

app.get('/sumevensquare/:list', function(req, rsp){
  let numArray = req.params.list.split(',');
  let finalValue = numArray.reduce((acc,num) => num % 2 ? acc + 0 : acc + (num * num), 0);
  // let finalValue = numArray.filter(num => num % 2 == 0).reduce((acc,num)=> acc + (Math.pow(num, 2)),0);
  rsp.send({payload: finalValue});
})

app.post('/dog', function(req, rsp){
  rsp.send('woof woof!!');
})
app.get('/sum/:x/:y', function(req, rsp){
  const x = req.params.x * 1;
  const y = req.params.y * 1;
  rsp.render('sum',{x: x, y: y, sum: x+y});
})

app.get('/calc', function(req, rsp){
  rsp.render('calc');
})

app.post('/calc', function(req, rsp){
  const x = req.body.x * 1;
  const y = req.body.y * 1;
  const op = req.body.op;
  let result = 0;
  switch(op){
    case '*': result = x * y;
    break;
    case '+': result = x + y;
    break;
    case '-': result = x - y;
    break;
    case '/': result = x / y;
    break;
  }


  //rsp.send(req.body);
  rsp.render('calc',{x: x, y: y, op: op, result: result});
})
