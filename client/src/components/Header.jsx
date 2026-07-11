function Header({query,setQuery}){
    return(
        <div className="header">
            <h1>Dashboard</h1>
            <div className="searchbox">
                <input type="text" placeholder={"Search here"} value={query} onChange={(e)=>setQuery(e.target.value)}></input>
            </div>
            
        </div>
    );
}

export default Header;