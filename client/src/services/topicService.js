import axios from "axios"



const joinTopic = (id) => {
    axios.post("/api/topic/join/"+id)    
}