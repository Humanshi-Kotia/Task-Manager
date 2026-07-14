import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskCard from "../components/Taskcard";
import TaskModal from "../components/TaskModal"
import { useState,useEffect } from "react";
import API from "../api/api";

function Dashboard(){
    const [tasks,setTasks]= useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [query,setQuery]=useState("");   //for search box

    //adding filters
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // const [newTask,setNewTask]= useState({
    //     title:"",
    //     description:"",
    //     priority:"",
    //     category:"",
    //     dueDate:""
    // });

    useEffect(()=>{
        const fetchTasks=async()=>{
            try{
            const response= await API.get("/tasks");
            console.log(response.data);
            setTasks(response.data);
        }catch(err){
            console.error("Error fetching task:",err)
        }
        }
        fetchTasks();
    },[]);;

    const addTask=async(taskData)=>{
        try{
            const response = await API.post("/tasks",taskData);
            // setTasks([...tasks,response.data]);
            setTasks(prevTasks => [...prevTasks, response.data]);
            // setNewTask("");
        }catch(err){
            console.log(err.response?.data);
            console.log(err.message);
        }
    }

    const deleteTask = async (id) => {
    try {
        const response = await API.delete(`/tasks/${id}`);
        console.log("Delete response:", response.data);
        
        setTasks(prevTasks =>
            prevTasks.filter(task => task._id !== id)
        );
    } catch (err) {
        console.error("Error deleting task:", err.response?.data || err.message);
    }
};

    const toggleComplete = async (id) => {
    try {
        const task = tasks.find(task => task._id === id);

        const response = await API.put(
            `/tasks/${id}`,
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

    function handleClick(){
        setIsModalOpen(true);
    }

    function closeModal(){
        setIsModalOpen(false);
    }

    const filteredTasks=tasks.filter(task=>{
        return((priorityFilter === "all" || task.priority.toLowerCase() === priorityFilter) &&
            (statusFilter === "all" || (task.completed?"completed":"pending")=== statusFilter)) &&
            (categoryFilter === "all" || task.category.toLowerCase() === categoryFilter)
    })

    const categories = Array.from(new Set(tasks.map(task => task.category)));

    return(
        <div className="container">
            <Sidebar
            priorityFilter={priorityFilter}
            categoryFilter={categoryFilter}
            statusFilter={statusFilter}
            setPriorityFilter={setPriorityFilter}
            setCategoryFilter={setCategoryFilter}
            setStatusFilter={setStatusFilter}
            categories={categories}/>

            <div className="content">
                <Header
                query={query}
                setQuery={setQuery}/>

                <button className="add_btn" onClick={handleClick}>+ Add Task</button>

                <TaskModal addTask={addTask} isOpen={isModalOpen} onClose={closeModal}/>

                {filteredTasks.map((task)=>(
                    <TaskCard 
                    key={task._id} 
                    task={task} 
                    deleteTask={deleteTask} 
                    toggleComplete={toggleComplete}
                    query={query}/>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;