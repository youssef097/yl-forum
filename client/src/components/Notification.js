import React, { useEffect, useState } from 'react'

export default function Notification() {
    const [show, setShow] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 10000);
    }, [])
    return (
        <div>
            New message
        </div>
    )
}
