const { static } = require("express")

const express = require("express"),
      path    = require("path"),
      sequelize = require("./utils/database"),
      app     = express(),
      todoRoutes = require("./routes/todo") 
const PORT = process.env.PORT || 3000


//APP CONFIG
//use static public folder
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())   //parse all json requests
app.use("/api/todo", todoRoutes)   //this route gets us to an api json file
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
