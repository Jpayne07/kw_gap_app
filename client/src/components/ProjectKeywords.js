import React from "react";

//found in projectComponents
function ProjectKeywords({keywords, setProjectKeywords}){
    console.log(keywords)
    if(keywords.length>0){
    const individualKeyword = keywords.map(kw=>{
        return <p style={{color: 'red'}} key = {kw.id}>{kw.keyword}</p>
    })
    
    return <div>
                {individualKeyword}
                </div>}

    else if(keywords.length===0){
        return <p>No Keywords to display</p>
    }
}

export default ProjectKeywords