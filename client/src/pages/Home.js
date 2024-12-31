import React, { useState, useEffect}  from "react";
import Login from "./Login";
import { useNavigate } from 'react-router-dom';
import ProjectComponent from "./ProjectAggregate";



function Home(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      fetch('/check_session').then((r) => {
        if (r.ok) {
            r.json().then((user) => setUser(user));
        }
        else {
            navigate('/login')
        }
      });
    }, [navigate]);
  
    if (!user) return <Login setUser={setUser} />;
  
    return (
      <div>
        {/* <Nav user={user} setUser={setUser} /> */}
      <main>
        <ProjectComponent />
      </main>
      </div>
        );
}

export default Home