const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const request = require('request');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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
//  console.log('error:', error); // Print the error if one occurred
//  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log(JSON.stringify(body.train.name , undefined , 2));
  // console.log(JSON.stringify(body.route[0].station.name , undefined , 2));
  // console.log(Array.isArray(body.route));
  for(i=0;i<body.route.length;i++)
  {
    //stations.push(body.route[i].station.name);

    data.push({station: body.route[i].station.name , arrival : body.route[i].scharr , departure : body.route[i].schdep, day : body.route[i].day}  )
  }
  res.render('Results.hbs' , {
  data : data ,
  train : trainno ,
  name : body.train.name
  });
});
});

app.listen(process.env.PORT || 3000 , ()=>{
  console.log('server is up on port 3000');
});
