import React, {useState} from "react";
//found in projectComponents
function ProjectKeywords({keywords}){
    const individualKeyword = keywords.map(kw=>{
        return <p style={{color: 'red'}}>{kw.keyword}</p>
    })
    
    return individualKeyword
}

export default ProjectKeywords