const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    completed:{
        type:Boolean,
        default:false
    },
    priority: {
        type: String,
        enum: ["","low","medium","high","no priority"]
    },
    category: String,
    dueDate: {
    type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }},{
    timestamps:true
    });

const Task= mongoose.model("Task",taskSchema);

module.exports=Task;