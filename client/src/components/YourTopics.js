import React from 'react'
import {Link} from "react-router-dom"
export default function YourTopics({user}) {
    return (
        <aside className="your-topics">
            <div>
                <h3>{user?"Topics you follow":"Popular Topics"}</h3>                    
                <Link to="/create-topic"> <button>Create your own topic</button></Link>
            </div>
        </aside>
    )
}
