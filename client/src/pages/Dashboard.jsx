import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskCard from "../components/Taskcard";
import { useState,useEffect } from "react";
import axios from 'axios';

function Dashboard(){
    const [tasks,setTasks]= useState([]);

    const [newTask,setNewTask]= useState("");

    useEffect(()=>{
        const fetchTasks=async()=>{
            try{
            const response= await axios.get("http://localhost:5000/tasks");
            console.log(response.data);
            setTasks(response.data);
        }catch(err){
            console.error("Error fetching taska:",err)
        }
        }
        fetchTasks();
    },[]);

    const addTask=async()=>{
        try{
            const response = await axios.post("http://localhost:5000/tasks",{
                title:newTask,
                description:""
            });
            // setTasks([...tasks,response.data]);
            setTasks(prevTasks => [...prevTasks, response.data]);
            setNewTask("");
        }catch(err){
            console.error("Error adding task:",err);
        }
    }

    const deleteTask = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/tasks/${id}`);

        setTasks(prevTasks =>
            prevTasks.filter(task => task._id !== id)
        );
    } catch (err) {
        console.error("Error deleting task:", err);
    }
};

    const toggleComplete = async (id) => {
    try {
        const task = tasks.find(task => task._id === id);

        const response = await axios.put(
            `http://localhost:5000/tasks/${id}`,
            {
                completed: !task.completed
            }
        );

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task._id === id ? response.data : task
            )
        );
    } catch (err) {
        console.error(err);
    }
};

    return(
        <div className="container">
            <Sidebar/>

            <div className="content">
                <Header/>

                <input
                type="text"
                placeholder="Enter new Task"
                value={newTask}
                onChange={(e)=>setNewTask(e.target.value)}></input>

                <button onClick={addTask}>Add Task</button>

                {tasks.map((task)=>(
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    deleteTask={deleteTask} 
                    toggleComplete={toggleComplete}/>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;