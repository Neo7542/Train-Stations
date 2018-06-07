const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const request = require('request');


var app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/' , (req , res ) =>{
  res.render('home.hbs' , {
  });
});

app.post('/',(req , res)=>{
  trainno = req.body.trainno;
  request({url : `https://api.railwayapi.com/v2/route/train/${trainno}/apikey/mxa545j3jq/` ,
  json : true
} , (error, response, body)=> {
  var data=[];
  if(error)
  {
    res.send({data : data , name : "Internal Server Error"});
  }
  else if(body.response_code === 404)
  {
    res.send({data : data , name : "Train not found"});
  }
  else {
    for(i=0;i<body.route.length;i++)
    {
      data.push({station: body.route[i].station.name , arrival : body.route[i].scharr , departure : body.route[i].schdep, day : body.route[i].day}  )
    }
    res.send({data : data , name : body.train.name});
  }
});
});

app.listen(process.env.PORT || 3000 , ()=>{
  console.log('server is up on port 3000');
});
