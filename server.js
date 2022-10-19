const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


//accessing the index.html
app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
})
app.post("/",(req,res)=>{
  let city =req.body.cityname;
  url=`https://api.openweathermap.org/data/2.5/weather?q=+${city}+&appid=a02ec2cc6db4189d4df13df548f2311d&units=metric#`;
   https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on('data',(data)=>{
        const weatherData =JSON.parse(data)
        const temp=weatherData.main.temp;
        const  humidity=weatherData.main.humidity;
        const pressure=weatherData.main.pressure;
        const windSpeed=weatherData.wind.speed;
        const icon=weatherData.weather[0].icon;
       // const imageUrl= "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        const country=weatherData.sys.country;
        console.log(weatherData)
      
        let cloud_types=weatherData.weather;
               cloud_types.forEach(cloudType => {
                //res.write("<h1>the temperature in tz is</h1>"+temp)
                 res.write(`<h1>country is of ${country}`)
                 res.write(`<h1>city is of ${city}`)
                 res.write(`<h1>the temperature of ${city} is</h1>`+temp +"centigrade") 
                 res.write("<h1>the humidity  is</h1>"+humidity)
                 res.write("<h1>the wind speed is</h1>"+windSpeed+"m/s")
                 res.write("<h1>the atmospheric pressure is</h1>"+pressure+"pa")
                 res.write("<h1>the weather condition is</h1>"+cloudType.description)
                
                 res.send();
               });

      
    })
   })
  

})


//map the url for the data response
/*
app.get("/",(req,res)=>{
    url="https://api.openweathermap.org/data/2.5/weather?q=mwanza&appid=a02ec2cc6db4189d4df13df548f2311d&units=metric#";
   https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on('data',(data)=>{
        const weatherData =JSON.parse(data)
        const temp=weatherData.main.temp;
        const  humidity=weatherData.main.humidity;
        const pressure=weatherData.main.pressure;
        const windSpeed=weatherData.wind.speed;
        const icon=weatherData.weather[0].icon;
       // const imageUrl= "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        const country=weatherData.sys.county;
        let cloud_types=weatherData.weather;
               cloud_types.forEach(cloudType => {
                //res.write("<h1>the temperature in tz is</h1>"+temp)
                console.log(icon)
                 res.write("<h1>the temperature in tz is</h1>"+temp)
                 res.write("<h1>the humidity in tz is</h1>"+humidity)
                 res.write("<h1>the temperature in tz is</h1>"+windSpeed+"m/s")
                 res.write("<h1>the atmospheric  in tanzania is</h1>"+pressure+"pa")
                 res.write("<h1>the weather condition  in tanzania is</h1>"+cloudType.description)
                
                 res.send();
               });

      
    })
   })
  

})
*/

app.listen("3000",()=>{
    console.log("iam listerning to port 3000");
})
