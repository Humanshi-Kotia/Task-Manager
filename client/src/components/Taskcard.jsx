function TaskCard({task, deleteTask, toggleComplete,query}){
    const isMatch=query.trim() !== "" && task.title.toLowerCase().includes(query.toLowerCase())

    return(
        <div className={`taskcard ${isMatch ? "highlighted" : ""}`}>
            <div className="title">
                <h3 className={task.completed?"completed":""}>{task.title}</h3>
            </div>

            <div className="detail">
                 <p>{task.priority}</p>
                <p>{task.category}</p>
            </div>

            <div className="btn">
                <button onClick={()=>toggleComplete(task._id)}>
                {task.completed?<i className="bi bi-x-square"></i>:<i className="bi bi-check-square"></i>}
                </button>
            
                <button onClick={()=>deleteTask(task._id)}><i className="bi bi-trash"></i></button>
            </div>   
            
        </div>
    );
}

export default TaskCard; 