const express = require("express");
const path = require('path')
const port = 8000;

const db = require('./mongoose/mongoose')
const Contact = require('./models/contact')

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views')) ;
app.use(express.urlencoded());
app.use(express.static('assets'))

// middleware 1
// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     next();
// });

// middleware 2
// app.use(function(req,res,next){
//     console.log('middleware 2 called');
//     next();
// });

// var contactList = [

//     {
//         name: "Pooja",
//         phone: "1234567890"
//     },
//     {
//         name: "Timothy",
//         phone: "0987654321"
//     },
//     {
//         name: "Bhaloo",
//         phone: "8374659283"
//     }
// ]

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if (err){
            console.log('error in fetching');
            return;
        }
        return res.render('home',{
            title: "my contact list",
            contact_list: contacts
        });
    })
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "let's play with ejs"
    });
});

app.post('/create-contact',function(req,res){
    // return res.redirect('/practice')
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },(err,newContact)=>{
        if (err){console.log('error');
    return;}
    console.log('*********',newContact);
    })
    return res.redirect('/');
});

app.get('/delete-content/',(req,res)=>{
    console.log(req.query);
    
    let id=req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error',err);
            return;
        }    
        return res.redirect('/');
    });
    // let contactIndex=contactList.findIndex(contact => contact.id == id);
    // if (contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

})

app.listen(port,function(err){
    if (err){
        console.log('error in running the server');
    }
    console.log("my server is running fine");
});