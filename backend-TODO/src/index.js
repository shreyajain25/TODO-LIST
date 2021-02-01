const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//environment variable
env.config();

// Connect to database mongoAtlas
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.m639u.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
).then(() => { console.log('Database Connected'); });

var tasksModel = require("./tasks");

app.get("/showTask", (req, res) => {
    tasksModel.find()
    .then((todos) => {
        res.json(todos);
    })
    .catch((error) => console.log(error));
});

app.post("/addTask", async (req, res) => {
    const {taskname, description, deadline, done} = req.body;
    
    const newTask = new tasksModel(
        {taskname, description, deadline, done: false}
    );
    newTask.save((error, data) => {
        if(error)
            return res.status(400).json({ error: 'Something went wrong' });
        if(data){
            return res.status(201).json({ taskname, description, deadline, done, createdAt, message: "Task Created Successfully!!" });
        }
    });
});

app.put("/updateTask", async (req, res) => {
    await tasksModel.findOne({createdAt: req.body.createdAt})
    .exec((error, task) => {
        if(error) return res.status(400);

        let {taskname, description, deadline, done} = req.body;
        if(!taskname)
            taskname = task.taskname;
        if(!description)
            description = task.description;
        if(!done)
            done = task.done;
        if(!deadline){
            deadline = task.deadline
        }
        
        tasksModel.updateOne(
            {taskname, description, deadline, done}
        ).then(() => {
            res.status(201).json({ taskname, description, deadline, done, message: "Task Updated Successfully!!" });
        }).catch((e) => {
            res.status(400).json({ error: 'Something went wrong' });
        });
    })
});

app.delete("/deleteTask", async (req, res) => {     
    await tasksModel.deleteOne(
        {createdAt: req.headers.createdAt}
    ).then(() => {
        res.status(201).json({ message: "Task Deleted Successfully!!" });
    }).catch((e) => {
        res.status(400).json({ error: e });
    });
});


app.listen(9000);