const { static } = require("express")

const express = require("express"),
      path    = require("path"),
      sequelize = require("./utils/database"),
      app     = express(),
const PORT = process.env.PORT || 3000


//APP CONFIG
//use static public folder
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())   //parse all json requests
//middleware
app.use((req, res, next) => {
    res.sendFile("/index.html")
})

async function start(){
    try{
        await sequelize.sync()  //connect to db
        app.listen(PORT)
    }catch(e){
        console.log(e);
    }
}

start()
