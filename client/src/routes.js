import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ProjectComponent from "./pages/ProjectAggregate"; // Correct import
import IndividualProjectPage from "./pages/IndividualProjectPage";

const routes = [
    {   
        path: "/login",
        element: <Login />,
        // errorElement: <ErrorPage/>
    },
    {   
        path: "/",
        element: <Home />,
        // errorElement: <ErrorPage/>
    },
    {   
        path: "/signup",
        element: <Signup />,
        // errorElement: <ErrorPage/>
    },
    {   
        path: "/projects",
        element: <ProjectComponent />,
        // errorElement: <ErrorPage/>
    },
    {   
        path: "/projects/:id",
        element: <IndividualProjectPage />,
        // errorElement: <ErrorPage/>
    }
    ,
    {   path:"/check_session",
        element:<IndividualProjectPage />,
        // errorElement: <ErrorPage/>
    }
];

export default routes;
