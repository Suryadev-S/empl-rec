const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const viewPath = path.join(__dirname,'views');
const filePath = path.join(__dirname,'data','data.json');

app.use(express.urlencoded({extended: false}));
app.set("view engine","ejs");
app.set("views",viewPath);

app.get("/",(req,res)=>{
    res.render("index");
})
app.post("/store",(req,res)=>{
    const data = req.body;

    let entries = fs.readFileSync(filePath);
    entries = JSON.parse(entries);
    entries.push(data);//data will in object form

    fs.writeFileSync(filePath,JSON.stringify(entries));//conversion from object to json
    
    res.redirect("/");

})

app.get("/details",(req,res)=>{

    let entries = fs.readFileSync(filePath);//reading the json file
    entries = JSON.parse(entries);//converting from json to js object

    res.render("details",{details:entries});
})

app.listen(3000,()=>{
    console.log("port connected");
})