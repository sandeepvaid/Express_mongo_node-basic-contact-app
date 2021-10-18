//First we import the express library as we did previously
const express = require('express');
port = 8000;
const path = require("path");

//Now we import the mongoose database and is should be access before the express app is setup
const db = require("./config/mongoose");
//Importing collection
const Contact = require("./models/contact");
//now we create a variable and name it as app which access all the functionality within the express
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//Here we use parer as a middlewear to parse the form data so that we can use
app.use(express.urlencoded());
//Now we add the static files to our project using the middlewears as follow by sprecifying the static folder
app.use(express.static("assets"));

// //Middlewear1 
// app.use((req,res,next)=>{
//     req.comingFrom = "md1";
//     next();
// });

// //Middlewear 2
// app.use((req,res,next)=>{
//     // req.comingFrom = "md1";
//     console.log(req.comingFrom);
//     next();
// });


//NOw we create an array having object representing the contact list of each person for now we create a dummy contact list
var contactList = [
    {
        name:"Sandeep",
        phone:"7006549000"
    },
    {
        name:"Kanu",
        phone:"7005456460"
    },
    {
        name:"Khushi",
        phone:"7004578120"
    }
]



//ROUTES TO ALL URL 


//NOw in express js in order to respond to some url request we use get method here as follow 
app.get('/',(request,respond)=>{

    Contact.find({},function(err,contacts){
        if(err){
            console.log("There is an error in fetching data");
            return;
        }

        return respond.render('home',{
            title:"My contact List",
            Contacts:contacts
        });

    });


    // console.log(request);
    //In node js we use the respond.end  to send back some respond but in express js we don in following way
    // return respond.render('home',{
    //     title:"My contact List",
    //     Contacts:contactList
    // });

});

app.get('/practice',(request,respond)=>{

    
    return respond.render('practice',{
        title:"Practice",
        j: 5
    });

});


//To handle the post request we use following syntax

app.post('/add-contact',(req,response)=>{
    

    // console.log('Am post url',req.comingFrom);
    // 
    //Now in that request we have form data which we access using req.body which contain the object having name and phone as key value pair which we append in our contact list array.

    // console.log(req.body.name);
    // contactList.push(req.body)

    Contact.create(req.body,function(err,newContact){

        if(err){
            console.log("Error occured in creating the contact");
            return;
        }

        console.log("Contact is pushed successfully in db" , newContact);

        return response.redirect('back');

    });

    //Here after adding the contact we simply redirect it into the home page or we can pass url like 
    //'back' this is the shorter way to write   url which points to the previous url
    // return response.redirect('/');

});


app.get("/delete-contact",(req,res)=>{

    //used to take the query data
    // console.log(req.query);
    // let phone = req.params.phone;
    
    let id = req.query.id;

    Contact.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log("There is an error in deleting the contact");
            return;
        }

        return res.redirect('back');
    });

    //Now we delete that contact having phone number equal to the query phone data
    // let contactindex = contactList.findIndex((contact)=>contact.phone == phone);

    // if(contactindex != -1){
    //     contactList.splice(contactindex,1);
    // }
    
    // return res.redirect('back');
});


//THis is same as we did in node js
app.listen(port,(err)=>{
    if(err){
        console.log("There is an error within the server");
        return;
    }

    console.log("The server is up and running on port number :-",port);
})