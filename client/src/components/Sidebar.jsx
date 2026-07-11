function Sidebar({priorityFilter,categoryFilter,statusFilter,setPriorityFilter,setCategoryFilter,setStatusFilter,categories}){
    return(
        <div className="sidebar">
            <h2>Task Manager</h2>

            <p>PRIORITY</p>
            <select value={priorityFilter} onChange={(e)=>setPriorityFilter(e.target.value)}>
                <option value={"all"}>All</option>
                <option value={"low"}>Low</option>
                <option value={"medium"}>Medium</option>
                <option value={"high"}>High</option>
            </select>

            <p>CATEGORY</p>
            <select value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)}>
                <option value={"all"}>All</option>
                {categories.map(category=>(
                    <option key={category} value={category.toLowerCase()}>{category}</option>
                ))}
            </select>

            <p>STATUS</p>
            <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
                <option value={"all"}>All</option>
                <option value={"completed"}>Completed</option>
                <option value={"pending"}>Pending</option>
            </select>
        </div>
    );
}
export default Sidebar;