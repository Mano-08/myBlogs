const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();
const allPosts = [];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = 3000;
let hugePara = " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.!? ";
let aboutPara = "Hello hello! welcome to the friday night party! :))";
let contactPara = "Lets connect YOO! find me on potato.com";

app.get("/", (req, res)=>{
    res.render("index.ejs",{ homeData: hugePara, myBlogs : allPosts});
})

app.get("/posts/:topic", (req, res)=>{
    allPosts.forEach((element)=>{
        if(_.lowerCase(JSON.parse(element).title) == req.params.topic){
            console.log("Match Found!");
            return;
        } 
    })
});

app.get("/about", (req, res) => {
    res.render("about.ejs",{aboutData : aboutPara});
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs", {contactData : contactPara})
})

app.get("/publish", (req, res)=>{
    res.render("publish.ejs");
})

app.post("/publish",(req, res)=>{
    const publishData = {
        "title" : req.body.newBlogTitle,
        "post" : req.body.newBlogPost
    }
    allPosts.push(JSON.stringify(publishData));
    res.redirect("/");
})

app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT ${PORT}`);
})