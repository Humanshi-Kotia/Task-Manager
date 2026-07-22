require("dotenv").config();

const express = require('express');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose=require('mongoose');
const authMiddleware = require("./middleware/authMiddleware");
const Task = require("./models/Task");
const User = require("./models/User");

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/register',async(req,res)=>{
    try{
        const {name,password,email}=req.body;
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({
                message: "User already exsists"
            });}

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password:hashedPassword,
        })
        console.log(user);
        await user.save();
        res.status(201).json({
            message: "User registered successfully",
            });
        }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Wrong email or password"});
        }

        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Wrong email or password"})
        }
        
        const token=jwt.sign({
            id: user._id,
            email:user.email
        },
        JWT_SECRET,
        {
            expiresIn: "1d"
        });

        return res.status(200).json({
            message: "Login successful",
            token,
        });

    }catch(err){
        res.status(500).json({message:err.message});
    }
});

app.post('/tasks',authMiddleware,async(req,res)=>{
    try{
        const newTask=new Task({
        title:req.body.title,                             // new Task(req.body)
        description:req.body.description,
        priority:req.body.priority,
        category:req.body.category,
        dueDate:req.body.dueDate,
        user: req.user.id
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

app.put('/tasks/:id',authMiddleware,async(req,res)=>{
    try{
        const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
        if(!updatedTask){
            return res.status(404).json({message:"Task not found"});
            }
        res.json(updatedTask);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.delete('/tasks/:id',authMiddleware,async(req,res)=>{
    try{
        const deletedTask = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
        });
        if(!deletedTask){
            return res.status(404).json({message:"Task not found"});
            }   
        res.status(200).json({message:"Task deleted successfully", deletedTask});
    }
    catch(err){
        console.error("Delete error:", err);
        res.status(500).json({message:err.message});
    }
})

app.get('/tasks',authMiddleware,async(req,res)=>{
    try{
        const tasks=await Task.find({user: req.user.id});
        res.status(200).json(tasks);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database");
    }
    catch(err){
        console.log(err);
    }
}
connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
})