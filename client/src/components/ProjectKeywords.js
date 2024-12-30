import React, {useState} from "react";
//found in projectComponents
function ProjectKeywords({keywords}){
    if(keywords.length>0){
    const individualKeyword = keywords.map(kw=>{
        return <p style={{color: 'red'}}>{kw.keyword}</p>
    })
    
    return individualKeyword}

    else if(keywords.length===0){
        return <p>No Keywords to display</p>
    }
}

export default ProjectKeywords