const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const Task = require("./models/Task");

const app = express();
const port=5000;

app.use(express.json());
app.use(cors());

// const tasks=[{
//     id:1,
//     task:"dance",
//     completed:false
//     }]

app.post('/tasks',async(req,res)=>{
    try{
        const newTask=new Task({
        title:req.body.title,                             // new Task(req.body)
        description:req.body.description,
        priority:req.body.priority,
        category:req.body.category,
        dueDate:req.body.dueDate
        });
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch(err){
    console.error(err);
    res.status(500).json({
        message: err.message
    });
}
})

app.put('/tasks/:id',async(req,res)=>{
    try{
        const updatedTask=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators: true});
        if(!updatedTask){
            return res.status(404).json({message:"Task not found"});
            }
        res.json(updatedTask);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.delete('/tasks/:id',async(req,res)=>{
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if(!deletedTask){
        return res.status(404).json({message:"Task not found"});
        }
    res.json(deletedTask)
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.get('/tasks',async(req,res)=>{
    try{
        const tasks=await Task.find();
        res.status(200).json(tasks);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

// mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
// .then(()=>{
//     console.log("database connected")
// })
// .catch((err)=>{
//     console.log("error connecting to the database")
// })

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/taskmanager");
        console.log("connected to database");
    }
    catch{
        console.log(err);
    }
}
connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
})