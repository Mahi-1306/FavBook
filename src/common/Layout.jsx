const Layout = () =>{
    return(
        <div>
            <div>
                <Sidebar/>
                <Header/>
            </div>
        <div>
            <Outlet/>
        </div>
        <Footer/>
        </div>
    )
}
export default Layout;