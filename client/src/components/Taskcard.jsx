function TaskCard({task, deleteTask, toggleComplete}){
    return(
        <div className="taskcard">
            <h3 className={task.completed?"completed":""}>{task.title}</h3>

            {/* <p>{task.priority}</p> */}

            {/* <p>{task.completed?"Completed":"Pending"}</p> */}

            <button onClick={()=>toggleComplete(task._id)}>
                {task.completed?"Undo":"Completed"}
            </button>
            
            <button onClick={()=>deleteTask(task._id)}>Delete</button>
        </div>
    );
}

export default TaskCard;