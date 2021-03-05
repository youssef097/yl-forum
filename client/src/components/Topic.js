import React from 'react'

export default function Topic({topicData,history}) {    
    return (
        <div className="glass" onClick={()=>{history.push("/topic/"+topicData.id)}} style={{width:"100%", maxWidth:"700px", margin:"auto"}} >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/200px-Sport_balls.svg.png" width="50px" alt=""/>
            {topicData.title} <br/>
            Members: {topicData.subscribers}
        </div>
    )
}
