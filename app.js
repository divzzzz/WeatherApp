const express = require("express");
const https= require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function (req,res){
    res.sendFile(__dirname+"/index.html");
 
});
app.post("/",function(req,res){
    const query =req.body.cityName;
    const apikey ="69e213b9170c4f33bd6143934232606";
    const url="https://api.weatherapi.com/v1/current.json?key="+apikey+"&q="+query+"&aqi=no";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temp=weatherData.current.temp_c
            res.send("<h1>the temp is london is "  + temp +  " Degrees celcius .</h1>");
        })

    })
    
})


app.listen(3000,function(){
    console.log("server is runnni g on port 3000");
});