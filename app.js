const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const mongoose = require("mongoose");



mongoose.set("strictQuery" , false);
mongoose.connect("mongodb://127.0.0.1/attendenceDB");

let Rajinder = [];
let Manoj = [];
let Abhishek_pal= [];
let Abhishek_Gupta = [];
let Pawan = [];
let Prabhu = [];
let dates = [];



const app = express();
app.set("view engine" , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


let todaysDate = new Date();
// todaysDate = todaysDate.getDay();
let options = {
    weekday: "long",
    day: "numeric",
    month:"short", 
    year:"numeric",
    timezone:"Asia/Kolata"
}
todaysDate = todaysDate.toLocaleDateString("en-us" , options);


const attSchema = new mongoose.Schema({
    name:String,
    attendence: String,
    time: String
})

const dateSchema = new mongoose.Schema({
    _id:Number,
    date:Array,
    hiddenDate:Array,
    Abhishek_Gupta:Array,
    Abhishek_Pal:Array,
    Manoj:Array,
    Prabhu:Array,
    Pawan:Array,
    rajinder:Array

})

const attItem = mongoose.model("attendence" , attSchema);
const date = mongoose.model("date" , dateSchema);


date.findOne({_id:1} , function(err , foundList){
    if(!foundList){
        const dateItem = new date({
            _id:1,
            date:[],
            hiddenDate:[],
            Abhishek_Gupta:[],
            Abhishek_Pal:[],
            Manoj:[],
            Prabhu:[],
            Pawan:[],
            rajinder:[]
        })
        dateItem.save();        
    }
    else{
       // console.log("already there");
    }
})


app.get("/attendence" , function(req,res){
    res.render("attendence-sheet" , {date:todaysDate})
})

app.get("/attendence-register" , function(req,res){
    date.findOne({_id:1} , function(err,foundList){
        Rajinder = foundList.rajinder;
        Pawan = foundList.Pawan;
        Prabhu = foundList.Prabhu;
        Abhishek_Gupta = foundList.Abhishek_Gupta;
        Abhishek_pal = foundList.Abhishek_Pal;
        Manoj = foundList.Manoj;
        dates = foundList.date;
        // console.log(Rajinder);

    })
    
    res.render("attendence-register" , {date:dates,  Rajinder:Rajinder , Manoj:Manoj , Abhishek_Gupta:Abhishek_Gupta , Abhishek_Pal:Abhishek_pal , Pawan:Pawan , Prabhu:Prabhu});
    
})


app.post("/attendence" , function(req,res){
    let objects = req.body;
    // attendence.push(req.body);
    // console.log(req.body);
    let objValue = Object.values(objects);
    
    let d = new Date();
    let Options = {
        day:"numeric",
        month:"short",
        year:"2-digit",
        timezone:"Asia/Kolata"
    } 
    let d1 =  d.getDate();
    if(d1<10){
        d1 = "0"+d1;
    }
    let d2 = d.getMonth()+1;
    if(d2<10){
        d2 = "0"+d2;
    }
    let d3 = d.getFullYear();
    let d4 = d1+"-"+d2+"-"+d;
    
     let attendenceDate = d.toLocaleDateString("en-us" , Options);

   console.log(attendenceDate);


    date.findOneAndUpdate({_id:"1"} , {$push:{date:attendenceDate , hiddenDate:d4,rajinder:objValue[0] , Abhishek_Pal:objValue[1] , Abhishek_Gupta:objValue[2] , Pawan:objValue[3] , Prabhu:objValue[4] , Manoj:objValue[5] }} , function(err , foundList){
        // console.log(foundList);
        res.redirect("/attendence-register");
    })
    
    
    
    
     

})


app.get("/attendence-register/delete" , function(req,res){
    res.render("delete");
})


app.listen(process.env.PORT||3000 , function(){
    console.log("server is up and running");
})

