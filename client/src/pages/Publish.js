import React, { useState,useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg"
import {EditorState, convertToRaw} from "draft-js"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import convert from "draftjs-to-html"
import parser from "html-react-parser"
import axios from 'axios';
import { Redirect } from 'react-router';
export default function Publish(props) {
    const [text, setText] = useState(()=>EditorState.createEmpty())
    const [topic, setTopic] = useState("")
    const [myTopics, setMyTopics] = useState(null)
    const [published, setPublished] = useState(false)
    useEffect(() => {
        axios.get("/api/topic/my-topics")
        .then(({data})=>{
            console.log(data);     
            if(data.topics.length){
                setMyTopics(data.topics)
            }else{
                setMyTopics(null)
            }

        }).catch((err)=>{
            setMyTopics(null)
        })       
    }, [])

    if(published){
        return <Redirect to="/home"/>
    }

    function handleSubmit(){
        axios.post("/api/post/create",{text:convert(convertToRaw(text.getCurrentContent())),topic:topic})
        .then(({data})=>{
            console.log(data);                        
            setPublished(true)
        }).catch((err)=>{
            console.log(err);
            setPublished(false)
        })    
    }
    return (
        
        <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
            {topic}
            <h2>Publish</h2>
            {myTopics?<select value={topic} onChange={(e)=>{setTopic(e.target.value)}}> 
                <option value="">
                    Select a topic
                </option>
                {myTopics.map((t)=>{
                    return <option key={t.title} value={t.id}> {t.title} </option>
                })}
            </select>:"Loading..."}
            {/* <Editor   toolbar={{embedded:{defaultSize:{width:1280/2,height:720/2}}}} editorState={text}  onEditorStateChange={setText} /> */}
            <Editor   toolbar={{embedded:{defaultSize:{width:"auto",height:"auto"}}}} editorState={text}  onEditorStateChange={setText} />

            <div>                
               {parser(convert(convertToRaw(text.getCurrentContent())))}
            </div>

            <button onClick={()=>{ handleSubmit() }} >Publish</button> <br/>
            {published&&"Published"}
            
        </div>
    )
}
