import React, { useEffect, useState } from 'react'
import axios from "axios"
export default function CreateTopic() {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [banner, setBanner] = useState("")
    const [img, setImg] = useState("")


    useEffect(() => {
        // console.log(img);
        // console.log(banner);
    })

    let formData = new FormData()

    function handleSubmit(e) {

        formData.append("title", name)
        formData.append("desc", desc)
        formData.append("banner", banner)
        formData.append("image", img)

        console.log(formData.get("image"), formData.get("banner"));

        axios.post("/api/topic/create", formData, { body: { title: name, desc: desc }, headers: { "Content-Type": "multipart/form-data" } })
            .then(({ data }) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })

    }
    function handleFileSelect(e) {
        if (e.target.name === "image") {
            setImg(e.target.files[0])
        }
        if (e.target.name === "banner") {
            setBanner(e.target.files[0])
        }
        console.log(e.target.files[0]);
    }

    return (
        <div className="form-container">

            <div>
                <h2>Create Topic</h2>
                <div className="form-block" >
                    <label>
                        Name:
                        </label>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="form-block">
                    <label>
                        Desc:
                        </label>
                    <input type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} />
                </div>
                <div className="form-block">
                    <label>
                        Image:
                        </label>
                    <input type="file" name="image" onChange={(e) => { handleFileSelect(e) }} />
                </div>
                <div className="form-block">
                    <label>
                        Banner:
                        </label>
                    <input type="file" name="banner" onChange={(e) => { handleFileSelect(e) }} />
                </div>
                <div className="form-block">
                    <button onClick={handleSubmit}>
                        upload
               </button>
                </div>
            </div>
        </div>
    )
}
