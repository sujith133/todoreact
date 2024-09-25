import { Button } from "@mui/material"
import { Link } from "react-router-dom"


const NavBar=()=>{
    return(
        <div style={{position:'absolute',marginTop:10,width:'70%',backgroundColor:'#ccc',borderRadius:25,height:50,display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginLeft:'auto',marginRight:'auto'}}>
            <Link to='/'><Button variant="text">Home</Button></Link>
            <Link to='/profile'><Button variant="text">Profile</Button></Link>
        </div>
    )
}

export default NavBar