
import { React, useEffect, useState } from 'react'
import { initAxiosInterceptors } from '../auth';
import MyProfile from '../components/MyProfile';
import PostListContainer from '../components/PostListContainer';
import SuggestedFriends from '../components/SuggestedFriends';
import YourTopics from '../components/YourTopics';
// import { whoami } from '../fetchUser';

initAxiosInterceptors()
export default function HomePage(props) {
    const [user, setUser] = useState(null)
    useEffect(() => {        
        if(props.user){
            setUser(props.user)
        };
        props.updateUser()
    }, [])
    return (
        <div className="home">
            {/* {!user?"Loading...":<h2>Hello {user.name}</h2>} */}
            {user && <aside>
                <MyProfile user={user} />
                <SuggestedFriends updateUser = {(usr)=>setUser(usr)} id={user.id} />
            </aside>}
            <PostListContainer user={user} {...props}/>
            <YourTopics user = {user} />
        </div >
    )
}
