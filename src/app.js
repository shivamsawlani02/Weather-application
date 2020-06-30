const express = require("express")
const path = require("path")
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000 //getting port provided by heroku. 

//Define paths for Express config
const publicDirectory = path.join(__dirname,"../public") //joins two paths.In this case present directory and public
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')

//Setup handlebars engine and views directory
app.set('view engine','hbs')
app.set('views',viewsPath) //express by default checks for views directory.To change this we need to specify that instead of views we are using another directory.
hbs.registerPartials(partialsPath)



//Setup static directory to serve.
app.use(express.static(publicDirectory)) //This displays static files on home screen.By default it chooses index.html


app.get('',(req,res) => {
    //res.send("<h1>Hello express!</h1>")  //This is html syntax
    res.render('index',{
        title: "Weather App", //providing dynamic values to index.hbs
        name: "Shivam Sawlani"
    }) //It is used to setup the view we want to use.It by default checks the file in "views" folder. 
})

app.get('/help',(req,res) => {
    res.render("help",{
        name:"Shivam Sawlani",
        contact:"7887336778",
        email:"shivamsawlani02@gmail.com"
    })
})

app.get('/about',(req,res) => { //we can also send json values to the web server
    res.render('about',{
        name:"Shivam",
        age:18
        })
})
//We can only send one response at a time.
app.get("/products",(req,res) => {
    if(!req.query.search)
    {
       return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather',(req,res) => { //sending json values to web server.
    if(!req.query.address)
    {
        return res.send({
            error: "You must provide an address"
        })
    }
    const forecast=require("./utils/forecast.js")
    forecast(req.query.address,(error,data) => { //process.argv[2] is used to get the thing written on terminal after node app.js 
        if(error)
        {
            res.send({
                error: error        
            })
        }
        else
        {
            res.send({
                temp: data.temp,
                address: req.query.address,
                pressure:data.pressure,
                humidity: data.humidity
            })
        }
      }) 
})

app.get('*',(req,res) => { // * means all other requests other than those passed above.It should be setup at the end.
    res.send("My 404 page")
})

app.listen(port, () => { //3000 is the port number.We can choose others as well.
    console.log("Server is up on port "+port)
})