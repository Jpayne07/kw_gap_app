import { NavLink } from 'react-router-dom'

function Nav({ user, setUser }){

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }
    return(
        <div>
        <nav style = {{padding:'20px', textAlign:"center", fontSize:"30px"}}>
            <NavLink to ="/">Home</NavLink>
            <NavLink to ="/projects">Projects</NavLink>
            <button onClick={handleLogoutClick}>logout</button>

        </nav>
        
        </div>
    )
    }
    
    export default Nav