import React, { useState, useEffect, Route}  from "react";
import Login from "./Login";
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom';
import ProjectAggregate from "./ProjectAggregate";



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
    }, []);
  
    if (!user) return <Login setUser={setUser} />;
  
    return (
      <div>
        <Nav user={user} setUser={setUser} />
      <main>
        <h1>Your Projects</h1>
        <ProjectAggregate user ={user}/>
        <br></br>
        <br></br>
        <br></br>
      </main>
      </div>
        );
}

export default Home