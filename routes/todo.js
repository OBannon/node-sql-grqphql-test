const {Router, static} = require("express")
const Todo = require("../models/todo")
const todo = require("../models/todo")
const router = Router()

//CRUD ROUTES
//GET ToDo list
router.get("/", async (req, res) => {    
    try{
        const todos = await Todo.findAll()  //get Promise
        res.status(200).json(todos)  //parse json

    }catch(e){
        console.log(e);
        res.status(500).json({
        message: "Server Error"
    })
}
})
//CREATE a NEW ToDo item
router.post("/", async (req, res) => {
    try{
        const todo = await Todo.create({   //'create' is the same as 'buld().save()', but it builds and saves automatically
            title: req.body.title,   //req.body is a Buffer, we need to use a middleware in /index.js added app.use(express.json())
            done: false
        })
        res.status(201).json({todo})   //в скобках значит по ключу todo будет создан данный объект  
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }

})
//UPDATE the ToDo
router.put("/:id", async (req, res) => {
    try{
        const todo = await Todo.findByPk(+req.params.id)
        todo.done = req.body.done
        await todo.save()
        res.status(200).json({todo})
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }

})
//DELETE ToDo 
router.delete("/:id", async (req, res) => {
    try{
        const todos = await Todo.findAll({
            where: {     //'where' is a SQL word
                id: req.params.id
            }
        })
        const todo = todos[0]
        await todo.destroy()
        res.status(204).json({})  //everything's fine and 204 means no content
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }

})

module.exports = router;