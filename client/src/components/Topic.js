import React from 'react'

export default function Topic({ topicData, history, reduced }) {
    return (
        <div className="topic-explore" onClick={() => { if (history) history.push("/topic/" + topicData.id) }}>
            <div className={`topic-banner ${reduced?" reduced":""}`}  style={{ backgroundImage: `url('/api/uploads/${topicData.banner}')`,    }}>

            </div>
            <div className="shadow topic"  style={{ width: "100%", maxWidth: "700px", margin: "auto" }} >
                <div>
                    <img width="30px" height="30px" style={{ borderRadius: "50%", border: "2px solid rgba(54, 255, 155)" }} src={topicData.image !== "null" ? "/api/uploads/" + topicData.image : "api/img/no-photo-topic.PNG"} alt="" />
                </div>
                <div>
                    <div className="topic-name">
                        {topicData.title}
                    </div>
                    <div className="topic-members">
                        <strong> {topicData.subscribers}</strong><small>  members</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
