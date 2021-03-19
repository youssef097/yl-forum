import React, { useState } from 'react'



export default function Chat() {
    const [showChat, setShowChat] = useState(false)
    return (
        <div className="chat glass">
            <div className="chat-header" onClick={() => { setShowChat(!showChat)}}>
                <strong> <i class="fas fa-comments"></i> Chat  </strong> - x online
            </div>
            {showChat &&
                <div className="chat-body">
                    <div className="chat-friends">

                    </div>
                    <div className="messages">
                        <div>

                        </div>
                    </div>
                </div>}
        </div>
    )
}
