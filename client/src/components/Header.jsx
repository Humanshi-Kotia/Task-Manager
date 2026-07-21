function Header({query,setQuery,isSidebarOpen,setIsSidebarOpen}){
    return(
        <div className="header">
            
            <div className="left-half">
                <button className="sidebar_btn" onClick={()=>setIsSidebarOpen(true)}><i className="bi bi-layout-sidebar-inset"></i></button>
                <h1>Dashboard</h1>
            </div>
            
            <div className="searchbox">
                <input type="text" placeholder={"Search here"} value={query} onChange={(e)=>setQuery(e.target.value)}></input>
            </div>
            
        </div>
    );
}

export default Header;