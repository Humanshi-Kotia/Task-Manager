import { useState } from "react";

function TaskModal({addTask, isOpen, onClose}){

    const [newTask,setNewTask]= useState({
            title:"",
            description:"",
            priority:"",
            category:"",
            dueDate:""
        });

    function handleSubmit(e){
        e.preventDefault();
        addTask(newTask);
        setNewTask({
        title: "",
        description: "",
        priority: "",
        category: "",
        dueDate: ""
        });
        onClose();
    }

    function handleChange(e){
        setNewTask({...newTask,[e.target.name]:e.target.value});
    }

    return(
        <div className={`modal ${isOpen ? "modal open" : ""}`}>
            <div className="header">
                <h2>Create New Task</h2>
                <p className="close" onClick={onClose}>&times;</p>
            </div>

            <div className="content">
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={newTask.title} onChange={handleChange}/>
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={newTask.description} onChange={handleChange}/>
                    </label>
                    <label>
                        Priority: 
                        <select name="priority" value={newTask.priority} onChange={handleChange}>
                            <option>low</option>
                            <option>medium</option>
                            <option>high</option>
                            <option>no priority</option>
                        </select>
                    </label>
                    <label>
                        Category:
                        <input type="text" name="category" value={newTask.category} onChange={handleChange}/>
                    </label>
                    <label>
                        Due Date:
                        <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleChange}/>
                    </label>
                    <button type="submit" >
                        Save Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;