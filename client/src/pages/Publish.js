import React, { useState, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw } from "draft-js"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import convert from "draftjs-to-html"
// import parser from "html-react-parser"
import axios from 'axios';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import Topic from '../components/Topic';
import { Link } from 'react-router-dom';

export default function Publish(props) {
    const [text, setText] = useState(() => EditorState.createEmpty())
    const [topic, setTopic] = useState(props.location.search.split("=")[1] || "")
    const [myTopics, setMyTopics] = useState(null)
    const [published, setPublished] = useState(false)

    useEffect(() => {
        axios.get("/api/topic/subscribed-topics")
            .then(({ data }) => {
                console.log(data);
                if (data.topics.length) {
                    setMyTopics(data.topics)
                } else {
                    setMyTopics([])
                }

            }).catch((err) => {
                // setMyTopics()
            })
    }, [])



    function handleSubmit() {
        axios.post("/api/post/create", { text: convert(convertToRaw(text.getCurrentContent())), topic: topic })
            .then(({ data }) => {
                console.log(data);
                setPublished(true)
            }).catch((err) => {
                console.log(err);
                setPublished(false)
            })
    }
    return (
        <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
            <div className="publish-container">

                <h2>Publish</h2>
                {myTopics ? <div className="select-topic-publish">
                    {
                        topic === "" ? <div style={{ height: "3.5em", width:"10em"}}></div> :
                            myTopics.map((t) => {
                                if (t.id === topic) {
                                    return <Topic reduced={true} topicData={t} />
                                }
                            })
                    }

                    <select value={topic} onChange={(e) => { setTopic(e.target.value) }}>
                        <option value="">Select a Topic</option>
                        {myTopics.map((t) => {
                            return <option key={t.title} value={t.id}>  {t.title} </option>
                        })}
                    </select>
                </div> : <Loading />}
                {/* <Editor   toolbar={{embedded:{defaultSize:{width:1280/2,height:720/2}}}} editorState={text}  onEditorStateChange={setText} /> */}
                <div className="shadow"
                    style={{ padding: "1em" }}>
                    {myTopics ?
                        <Editor editorStyle={{ background: "white" }} toolbar={{ embedded: { defaultSize: { width: "auto", height: "auto" } } }} editorState={text} onEditorStateChange={setText} /> :

                        <div>
                            <h3>You are subscribed to 0 topics  <Link to="/explore"> <button> Explore</button></Link></h3>

                        </div>
                    }
                </div>
                {/* 
            <div>
                {parser(convert(convertToRaw(text.getCurrentContent())))}
            </div> */}

                <button onClick={() => { handleSubmit() }} >Publish</button> <br />
                {published && <Redirect to={`/topic/${topic}`} />}
            </div>

        </div>
    )
}
